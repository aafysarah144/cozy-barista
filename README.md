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
**Cozy Barista** is a charming, tactile, and aesthetic virtual beverage toy. Built to provide an interactive, relaxing break for students and developers, it allows users to craft custom drinks, drop in bouncy toppings, take satisfying warm sips, and discover hidden secret recipes.

Focusing on **visual polish, responsiveness, and delightful micro-interactions**, the project runs 100% in the browser with **zero external dependencies** and uses the browser's native **Web Audio API** for synthesized acoustic feedback.

---

## ✨ Features & Rubric Checklist

### 🎯 Core Required Interactions (3+ Meaningful Actions)
1. **Choose Drink Base & Fill Cup**:
   - Select between *Classic Espresso*, *Cafe Latte*, *Strawberry Boba Milk*, or *Cozy Hot Cocoa*.
   - Watch the cup smoothly fill with animated rising liquid and gentle wafting steam, accompanied by a realistic liquid pour sound.
2. **Layer Custom Toppings**:
   - Toggle **Boba Tapioca Pearls** (bounce into the base), **Ice Cubes** (float and bob near the surface), **Whipped Cream** (fluffy swirl on top), and **Rainbow Sprinkles**.
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

## 🚀 Running Locally

No complicated build steps or npm installations needed!

### Option 1: Direct Browser Open
1. Clone or download this repository.
2. Double-click `index.html` to launch it immediately in Google Chrome, Microsoft Edge, Firefox, or Safari.

### Option 2: Using VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and click **"Open with Live Server"**.

---

## 🌐 How to Deploy to GitHub Pages (Free & Instant)

Follow these quick steps to get your live deployment link for submission:

1. **Initialize Git & Commit**:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial commit for Cozy Barista Web Toy"
   ```

2. **Create a new public repository on GitHub**:
   - Go to [GitHub.com/new](https://github.com/new).
   - Name your repository `cozy-barista`.
   - Make sure the visibility is set to **Public** (as required by the submission guidelines).
   - Do **not** initialize with a README (we already have one).

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/cozy-barista.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - On GitHub, go to your repository's **Settings** tab.
   - Click on **Pages** in the left sidebar.
   - Under **Build and deployment > Branch**, select `main` branch and `/ (root)` folder.
   - Click **Save**.
   - Within 1–2 minutes, your live site will be ready at:
     `https://<YOUR_GITHUB_USERNAME>.github.io/cozy-barista/`

---

## 📹 Suggested Demo Video Script (30 Seconds)

When recording your short demonstration video for the submission form, follow this sequence:

1. **0:00 – 0:08**: Open the page, tap **"🎵 Music: ON"** (hear the peaceful music box melody), then click on **Latte** (show liquid pouring and steam rising).
2. **0:08 – 0:15**: Add **Boba Pearls** and **Whipped Cream** (show topping animations and sound).
3. **0:15 – 0:20**: Click **"Take a Sip"** twice (show liquid decreasing with tactile squish bounce and sipping audio).
4. **0:20 – 0:25**: Add the remaining toppings (Ice + Sprinkles) to trigger the **Barista's Secret Brew** easter egg!
5. **0:25 – 0:30**: Toggle the **Rainy Night Mode** and open the **Barista Log** to show your saved stats.

---

## 👩‍💻 Author
- **Name:** Aafreen
- **Community Submission:** SRM GitHub Community
- **License:** MIT License
