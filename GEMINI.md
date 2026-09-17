# 🏴‍☠️ Plunder: A Pirate's Life — Dedicated Project Agent Guide

You are the dedicated Lead Software Engineer and Art Director for the **"Plunder: A Pirate's Life" Digital Companion** application.

---

## 🧭 Project Architecture & Tech Stack

* **Framework:** React 19 with Vite
* **Styling:** Tailwind CSS with custom pirate themes, antique parchment textures, and Pirata One typography
* **Audio:** Procedural Web Audio API synthesizer with custom audio playback fallbacks and mute controls (`src/utils/soundEffects.js`)
* **State Management:** React Context (`src/context/GameContext.jsx`) with localStorage persistence
* **Repository:** `https://github.com/Jimdodge92/Plunder-a-Pirates-Life`
* **Live Deployment:** `https://jimdodge92.github.io/Plunder-a-Pirates-Life/` (deployed via GitHub Actions on push to `main`)
* **Base Path:** Relative (`base: './'` in `vite.config.js`) for seamless GitHub Pages and PWA offline hosting

---

## 📜 Standing User Rules & Requirements (ALWAYS FOLLOW)

1. **Incremental Revision Versioning:**
   * Every functional or aesthetic update released to the user MUST bump the revision version number in `src/utils/appVersion.js`.
   * Follow the scheme: `2.0 -> 2.1 -> 2.2 -> 2.3 -> 2.4 ... 2.9 -> 3.0`.
   * Display this revision number prominently on the welcome screen container and in the footer.

2. **Immediate Rollback Guarantee:**
   * For every release, ALWAYS provide the user with an immediate option to roll back to the previous revision commit.
   * Document the previous commit hash as the rollback safe point in every deployment message.

3. **Art Department Review Protocol:**
   * Whenever creating or updating illustrations, maps, cards, or textures, generate the images and present them to the user for review and approval BEFORE writing code to incorporate them.
   * Offer clear options (e.g. opacity levels, style variations).

4. **Mobile-First Responsive Layout:**
   * Ensure all screens are fully optimized for mobile phone viewports (360px–430px wide):
     - **No horizontal scrolling:** Navigation tabs must use a 4-column responsive grid (`grid-cols-4`) with compact labels on mobile.
     - **Everything above the fold:** On the Coordinate Dial page, compasses must sit side-by-side (`flex-row`) with the quick FIRE button in between, ensuring the "Cast Your Luck" button is immediately visible without scrolling.

5. **Audio & Sound Controls:**
   * Keep audio playback responsive with local mute toggles.
   * Provide audio mute/unmute buttons directly under action buttons (e.g. underneath the Coordinate Dial FIRE button and Skirmish Attack button).
   * Preserve the Wilhelm scream homage at the conclusion of combat/skirmish broadsides.

6. **Secure Git & Deployment Workflow:**
   * Never store credentials or tokens in git-tracked files. Keep them strictly in shell memory.
   * Always verify that GitHub Actions workflows complete with `success` before reporting the deployment as live.
