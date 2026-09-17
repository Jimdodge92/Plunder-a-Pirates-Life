# 🏴‍☠️ Plunder: A Pirate's Life — Digital Companion v2.0

A rich, modern tabletop companion web app for the board game **Plunder: A Pirate's Life**, built with **Vite**, **React**, **Tailwind CSS**, and custom AI-generated maritime artwork.

---

## 🚀 Features

1. **🧭 Dual Compass Coordinate Spin Dial ("Cast Luck to the Seas")**
   * Configurable modular board dimensions (Alphabet Tiles for depth × Number Tiles for length, 6 spaces per tile; default 2×3 = A–L and 1–18).
   * Realistic spinning compass rose animations with nautical needle indicators.
   * Coordinate history log with single-click clipboard copying.
   * Sea boundary presets (Standard 2x3, Compact 2x2, Large 3x3, Armada 3x4).

2. **🃏 Booty Card Deck ("Draw Your Bounty")**
   * 3D card-flip interaction displaying custom fantasy card art for **Timber Wood**, **Spiced Rum**, **Forged Iron**, and **Gold Doubloons**.
   * Live session loot tally so players can track total resources plundered.

3. **⚔️ Skirmish Battle Simulator ("Fire Cannons!")**
   * Attacker vs Defender dice combat engine with animated 3D dice faces.
   * Cannon upgrade bonuses (+0 to +3) and hull armor bonuses (+0 to +3).
   * Attacker prevails on ties (official game rule).
   * Explosive cannon sound effects, confetti celebrations on victory, and Wilhelm scream homage on defeat.
   * Skirmish history log.

4. **⚓ Captains Fleet Roster**
   * Tabletop scorecard for 2 to 6 pirate captains.
   * Tracks Plunder Points (Victory), Doubloons, Ship Cannons, and Masts.
   * Quick increment / decrement controls.

5. **🔊 Zero-Dependency Web Audio Synthesizer**
   * Built-in dynamic sound synthesizer for cannons, coin jingles, dice rattles, compass ratchets, and fanfare.
   * One-click mute/unmute toggle.

---

## 💻 Running Locally

To run the development server:
```powershell
npm run dev
```

To build for production:
```powershell
npm run build
```

To preview the production build locally:
```powershell
npm run preview
```

---

## 🚢 Deploying to GitHub Pages

Because the app is configured with relative paths (`base: './'` in `vite.config.js`), publishing to **GitHub Pages** is straightforward:

1. Push your code to your GitHub repository.
2. Under your repository **Settings > Pages**, select:
   * **Source:** GitHub Actions (or deploy the `dist` folder to the `gh-pages` branch).
3. The app is also a **PWA (Progressive Web App)**, which means you and your game night crew can tap **"Add to Home Screen"** on iOS Safari or Android Chrome to run it full-screen and offline at the table!