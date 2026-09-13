# ☕ Cozy Barista - Virtual Cafe Web Toy

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-brightgreen?style=for-the-badge&logo=github)](https://pages.github.com/)

> **Submission for SRM GitHub Community Entry Challenge**  
> **Track:** Web Development / Frontend  
> **Task:** Option A: Build a Web Toy  
> **Tech Stack:** Vanilla HTML5, Modern CSS3, Pure JavaScript (ES6)

---

## 🌟 Live Demo
🔗 **Live Demo Link:** `https://<YOUR_GITHUB_USERNAME>.github.io/cozy-barista/` *(Update with your repository URL after enabling GitHub Pages)*

---

## 📖 Project Overview
**Cozy Barista** is a charming, tactile and aesthetic virtual beverage toy. Built to provide an interactive, relaxing break for students and developers, it allows users to craft custom drinks, drop in bouncy toppings, take satisfying warm sips and discover a hidden secret recipe.

Focusing on **visual polish, responsiveness, and delightful micro-interactions**, the project runs 100% in the browser with **zero external dependencies** and uses the browser's native **Web Audio API** for synthesized acoustic feedback.

---

## ✨ Features & Rubric Checklist

### 🎯 Core Required Interactions
1. **Choose Drink Base & Fill Cup**:
   - Select between *Classic Espresso*, *Latte*, *Strawberry Milk* or *Hot Cocoa*.
   - Watch the cup smoothly fill with animated rising liquid and gentle wafting steam, accompanied by a realistic liquid pour sound.
2. **Layer Custom Toppings**:
   - Toggle **Boba Tapioca Pearls** (bounce into the base), **Ice Cubes** (float and bob near the surface), **Whipped Cream** (fluffy swirl on top) and **Rainbow Sprinkles**.
   - Sound effects accompany each topping drop.
3. **"Take a Sip"**:
   - Tap the **"Take a Sip"** button (or click directly on the cup / press the `Spacebar`).
   - The liquid level decreases with a tactile squish bounce animation and plays a cozy sipping sound effect.
4. **Cup Refill & Fresh Rinse**:
   - "Top Up" restores your beverage to full, and "Fresh Cup" rinses the glass clean to start a new creation.

### 🏆 Bonus Criteria Implemented
- 🎶 **Peaceful Lo-Fi Background Song**: A built-in, gentle acoustic music-box/lo-fi cafe melody synthesized via Web Audio API that plays a calming loop at the tap of the `🎵 Music` button.
- 🔊 **Synthesized Web Audio SFX**: Realistic pouring sounds, topping "plops", sips, and cozy chimes generated dynamically without relying on external MP3 files (guarantees no 404s or CORS issues). Includes an instant Mute/Unmute toggle.
- 🌙 **Day & Rainy Night Themes**: Toggle between a sunny, pastel morning cafe (with drifting clouds) and a lo-fi rainy night cafe (with animated falling raindrops on the window).
- 💾 **LocalStorage Persistence**: Saves your total drinks crafted, sips taken, and unlocked achievements so your progress remains intact even after refreshing the page.
- 🦄 **Secret Easter Egg**: Adding all 4 toppings (*Boba + Ice + Cream + Sprinkles*) to any drink unlocks the **Secret Brew**, featuring animated rainbow-shimmering liquid, a sparkly banner, and an ascending magical chime!

---

## 📂 Project Structure

```
cozy-barista/
├── index.html        # Semantic HTML5 layout and interactive cup elements
├── style.css         # Modern CSS variables, glassmorphism, responsive styles & keyframe animations
├── script.js         # Web Audio API sound synthesizer, state management & DOM controller
└── README.md         # Documentation, submission guidelines & setup instructions
```

---

## 👩‍💻 Author
- **Name:** Aafreen
- **Community Submission:** SRM GitHub Community
- **License:** MIT License
