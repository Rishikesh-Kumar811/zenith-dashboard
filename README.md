<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,100:1a1a2e&height=120&section=header" />

<div align="center">

# 📊 Zenith Dashboard

### Productivity Dashboard with Live Weather & Pomodoro Timer

<br/>

A zero-dependency glassmorphism dashboard featuring a high-precision Pomodoro timer, live geolocation weather, task & goal manager, daily planner, and Web Audio API alerts.

<br/>

<p align="center">
  <a href="https://zenith-dashboard-olive.vercel.app"><img src="https://img.shields.io/badge/▶_Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /></a>&nbsp;
  <a href="https://github.com/Rishikesh-Kumar811/zenith-dashboard/issues"><img src="https://img.shields.io/badge/Report_Bug-e11d48?style=for-the-badge" alt="Report Bug" /></a>&nbsp;
  <a href="https://github.com/Rishikesh-Kumar811/zenith-dashboard/issues"><img src="https://img.shields.io/badge/Request_Feature-8B5CF6?style=for-the-badge" alt="Request Feature" /></a>
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

<br/>

<h3>Built with ❤️ by <a href="https://github.com/Rishikesh-Kumar811">Rishikesh</a></h3>

</div>

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,100:1a1a2e&height=120&section=footer" />
