<div align="center">

<br/>

# Zenith Dashboard

### Productivity Dashboard with Live Weather & Pomodoro Timer

<br/>

A zero-dependency glassmorphism dashboard featuring a high-precision Pomodoro timer, live geolocation weather, task & goal manager, daily planner, and Web Audio API alerts.

<br/>

<p align="center">
  <a href="https://zenith-dashboard-olive.vercel.app"><img src="https://badgen.net/badge/▶%20LIVE%20DEMO/%20/000?icon=vercel&labelColor=000" alt="Live Demo" height="32" /></a>&nbsp;&nbsp;
  <a href="https://github.com/Rishikesh-Kumar811/zenith-dashboard/issues"><img src="https://badgen.net/badge/REPORT%20BUG/%20/e11d48?labelColor=e11d48" alt="Report Bug" height="32" /></a>&nbsp;&nbsp;
  <a href="https://github.com/Rishikesh-Kumar811/zenith-dashboard/issues"><img src="https://badgen.net/badge/REQUEST%20FEATURE/%20/8B5CF6?labelColor=8B5CF6" alt="Request Feature" height="32" /></a>
</p>

</div>

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=html,css,js" alt="Tech Stack" />
</p>

---

## ✨ Features

- ⏱️ **High-Precision Pomodoro Timer** — `requestAnimationFrame`-powered countdown with 3 modes (25m / 5m / 15m)
- 🌤️ **Live Geolocation Weather** — Real-time temperature via Open-Meteo API with `Intl.DateTimeFormat` clock
- 📋 **Multi-List Task Manager** — Reusable `initListManager` for tasks & daily goals with animated check-off transitions
- 📅 **Interactive Daily Planner** — Editable schedule panel with live text preview/edit toggle
- 🔊 **Web Audio API Alerts** — Synthetic sine-wave beep notification when timer completes
- 📤 **Native Web Share API** — OS-level share sheet for exporting productivity data
- 🌗 **Glassmorphism Theme Toggle** — Smooth dark/light transition via `data-theme` attribute with LocalStorage persistence

---

## 🏗️ Architecture

> Zero-dependency Vanilla JS architecture with event delegation pattern. Modular helper functions (`initListManager`, `toggleSubmitButton`, `fetchData`) and animated CSS mesh background.

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Rishikesh-Kumar811/zenith-dashboard.git

# Open in browser
cd zenith-dashboard && open index.html
```

---

<div align="center">

**[⬆ Back to Top](#zenith-dashboard)**

<br/>

<img src="https://badgen.net/badge/Built%20with/♥%20Love/ff69b4?labelColor=ff69b4" alt="Built with Love" height="28" />

</div>
