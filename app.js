const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

const timeEl = document.getElementById('current-time');
const dateEl = document.getElementById('current-date');
const dateFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

function updateClock() {
    const now = new Date();
    if(dateEl) dateEl.textContent = dateFormatter.format(now);
    if(timeEl) timeEl.textContent = timeFormatter.format(now);
}
setInterval(updateClock, 1000);
updateClock();

let timerRaf;
let targetEndTime = 0;
let timeLeft = 25 * 60;
let isRunning = false;
let currentModeDuration = 25 * 60;

const minEl = document.getElementById('minutes');
const secEl = document.getElementById('seconds');
const btnStart = document.getElementById('btn-start');
const btnPause = document.getElementById('btn-pause');
const btnReset = document.getElementById('btn-reset');
const modeBtns = document.querySelectorAll('.mode-btn');
const shareDialog = document.getElementById('share-dialog');
const btnCloseDialog = document.getElementById('btn-close-dialog');
const btnShare = document.getElementById('btn-share');

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function ensureAudio() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playBeep() {
    ensureAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 1);
    osc.stop(audioCtx.currentTime + 1);
}

function updateDisplay() {
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');
    if(minEl) minEl.textContent = m;
    if(secEl) secEl.textContent = s;
}

function tick() {
    if (!isRunning) return;
    const remainingMs = targetEndTime - performance.now();
    if (remainingMs <= 0) {
        isRunning = false;
        timeLeft = 0;
        updateDisplay();
        playBeep();
        if(shareDialog) shareDialog.showModal();
        return;
    }
    timeLeft = Math.ceil(remainingMs / 1000);
    updateDisplay();
    timerRaf = requestAnimationFrame(tick);
}

function startTimer() {
    if (isRunning) return;
    ensureAudio();
    isRunning = true;
    targetEndTime = performance.now() + (timeLeft * 1000);
    timerRaf = requestAnimationFrame(tick);
}

function pauseTimer() {
    isRunning = false;
    cancelAnimationFrame(timerRaf);
}

function resetTimer() {
    pauseTimer();
    timeLeft = currentModeDuration;
    updateDisplay();
}

function setMode(mode) {
    modeBtns.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.mode-btn[data-mode="${mode}"]`);
    if(activeBtn) activeBtn.classList.add('active');
    
    if (mode === 'pomodoro') {
        currentModeDuration = 25 * 60;
    } else if (mode === 'shortBreak') {
        currentModeDuration = 5 * 60;
    } else if (mode === 'longBreak') {
        currentModeDuration = 15 * 60;
    }
    
    resetTimer();
}

modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setMode(btn.dataset.mode);
    });
});

if(btnStart) btnStart.addEventListener('click', startTimer);
if(btnPause) btnPause.addEventListener('click', pauseTimer);
if(btnReset) btnReset.addEventListener('click', resetTimer);

if(btnCloseDialog) btnCloseDialog.addEventListener('click', () => shareDialog.close());

if(btnShare) {
    btnShare.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Focus Session Complete',
                    text: 'I just completed a focus session!',
                    url: window.location.href
                });
            } catch (e) {}
        }
    });
}

function showToast(message) {
    let toast = document.getElementById('save-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'save-toast';
        document.body.appendChild(toast);
        
        const style = document.createElement('style');
        style.textContent = `
            #save-toast {
                position: fixed;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background: var(--primary-color);
                color: white;
                padding: 1rem 2rem;
                border-radius: 9999px;
                font-weight: 500;
                box-shadow: var(--shadow-md);
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 9999;
                pointer-events: none;
            }
            #save-toast.show {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function toggleSubmitButton(inputEl, btnEl) {
    if (inputEl && btnEl) {
        btnEl.disabled = inputEl.value.trim() === '';
        inputEl.addEventListener('input', () => {
            btnEl.disabled = inputEl.value.trim() === '';
        });
    }
}

function initListManager(storageKey, formId, inputId, listId) {
    const form = document.getElementById(formId);
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);
    if (!form || !input || !list) return;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    let items = [];
    try {
        items = JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch (e) {}
    
    toggleSubmitButton(input, submitBtn);
    
    function saveAndRender() {
        localStorage.setItem(storageKey, JSON.stringify(items));
        list.innerHTML = '';
        items.forEach((item, i) => {
            const li = document.createElement('li');
            li.className = `task-item ${item.completed ? 'completed' : ''}`;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.checked = item.completed;
            checkbox.dataset.index = i;
            
            const span = document.createElement('span');
            span.className = 'task-text';
            span.textContent = item.text;
            
            const btn = document.createElement('button');
            btn.className = 'btn-delete';
            btn.dataset.index = i;
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`;
            
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(btn);
            list.appendChild(li);
        });
    }
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            items.push({ text, completed: false });
            saveAndRender();
            showToast(`Saved: ${text}`);
            input.value = '';
            if(submitBtn) submitBtn.disabled = true;
        }
    });
    
    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('task-checkbox')) {
            items[e.target.dataset.index].completed = e.target.checked;
            saveAndRender();
        }
        const btn = e.target.closest('.btn-delete');
        if (btn) {
            const idx = btn.dataset.index;
            const li = btn.closest('.task-item');
            if (li.classList.contains('removing')) return;
            li.classList.add('removing');
            li.addEventListener('transitionend', () => {
                items.splice(idx, 1);
                saveAndRender();
            }, { once: true });
        }
    });
    
    saveAndRender();
}

initListManager('tasks', 'task-form', 'task-input', 'task-list');
initListManager('goals', 'goal-form', 'goal-input', 'goal-list');

const plannerInput = document.getElementById('planner-input');
const btnSavePlanner = document.getElementById('btn-save-planner');
const btnClearPlanner = document.getElementById('btn-clear-planner');
const btnEditPlanner = document.getElementById('btn-edit-planner');
const plannerEditView = document.getElementById('planner-edit-view');
const plannerDisplayView = document.getElementById('planner-display-view');
const plannerDisplayContent = document.getElementById('planner-display-content');

if(plannerInput && btnSavePlanner && plannerEditView && plannerDisplayView) {
    const savedPlanner = localStorage.getItem('planner') || '';
    plannerInput.value = savedPlanner;
    
    if (savedPlanner.trim() !== '') {
        plannerDisplayContent.textContent = savedPlanner;
        plannerEditView.classList.add('hidden');
        plannerDisplayView.classList.remove('hidden');
    }
    
    toggleSubmitButton(plannerInput, btnSavePlanner);
    if (btnClearPlanner) {
        toggleSubmitButton(plannerInput, btnClearPlanner);
        
        btnClearPlanner.addEventListener('click', () => {
            plannerInput.value = '';
            localStorage.removeItem('planner');
            btnSavePlanner.disabled = true;
            btnClearPlanner.disabled = true;
        });
    }

    btnSavePlanner.addEventListener('click', () => {
        const val = plannerInput.value.trim();
        localStorage.setItem('planner', val);
        
        if(val !== '') {
            plannerDisplayContent.textContent = val;
            plannerEditView.classList.add('hidden');
            plannerDisplayView.classList.remove('hidden');
            showToast(`Saved Planner Schedule!`);
        }
        
        const originalText = 'Save Schedule';
        btnSavePlanner.textContent = 'Saved!';
        btnSavePlanner.classList.add('success');
        setTimeout(() => { 
            btnSavePlanner.textContent = originalText; 
            btnSavePlanner.classList.remove('success');
        }, 2000);
    });

    if (btnEditPlanner) {
        btnEditPlanner.addEventListener('click', () => {
            plannerDisplayView.classList.add('hidden');
            plannerEditView.classList.remove('hidden');
            plannerInput.focus();
        });
    }
}

async function fetchData(url, onSuccess, onFail) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        onSuccess(data);
    } catch (e) {
        onFail();
    }
}

const weatherDisplay = document.getElementById('weather-display');
if (weatherDisplay) {
    const updateWeather = (lat, lon) => {
        fetchData(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
            (data) => weatherDisplay.textContent = `🌡️ ${data.current_weather.temperature}°C`,
            () => weatherDisplay.textContent = `Could not load weather`
        );
    };
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            pos => updateWeather(pos.coords.latitude, pos.coords.longitude),
            () => updateWeather(51.5074, -0.1278)
        );
    } else {
        updateWeather(51.5074, -0.1278);
    }
}

const quoteDisplay = document.querySelector('#quote-display p');
const quoteAuthor = document.getElementById('quote-author');
if (quoteDisplay) {
    fetchData(
        'https://dummyjson.com/quotes/random',
        (data) => {
            quoteDisplay.textContent = `"${data.quote}"`;
            if (quoteAuthor) quoteAuthor.textContent = data.author;
        },
        () => {
            quoteDisplay.textContent = `"Stay positive, work hard, make it happen."`;
            if (quoteAuthor) quoteAuthor.textContent = "Unknown";
        }
    );
}
