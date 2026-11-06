# Pokémon Luminescent Platinum — Pokédex

A responsive, high-performance web-based Pokédex application for [Pokémon Luminescent Platinum](https://luminescent.team/docs) (the premier *Brilliant Diamond & Shining Pearl* enhancement ROM hack inspired by Drayano's *Renegade Platinum*), styled in the dark aesthetic of the [Radical Red Pokédex](https://sangvo1991.github.io/Radical-Red-Pokedex/) by ydarissep & sangvo1991.

---

## 🌟 Key Features

* **Radical Red / YdaDex Styling:** Dark slate UI (`#0b0f17`), authentic Pokémon type badges, responsive layout, animated sprites, and color-coded stat bars.
* **Luminescent Platinum Balance Changes:**
  * **Typing Overhauls:** Highlights signature changes like Flygon (**Bug / Dragon**), Luxray (**Electric / Dark**), Meganium (**Grass / Fairy**), Typhlosion (**Fire / Ground**), Feraligatr (**Water / Dark**), Electivire (**Electric / Fighting**), Yanmega (**Bug / Dragon**), Milotic (**Water / Fairy**), etc.
  * **Base Stat Changes:** Direct side-by-side comparison with vanilla BDSP base stats featuring green `+X` / red `-X` delta badges and updated Base Stat Totals (e.g. Flygon boosted to 600 BST).
  * **Custom & Buffed Abilities:** Highlights Strong Jaw Luxray, Triage Meganium, Drought Typhlosion, Sharpness Samurott/Gallade/Kleavor, Adaptability Lucario, and Mega Launcher Magmortar.
* **Hisuian Forms & Incense Burner:** Dedicated database tracking Hisuian regional evolutions and variants (Hisuian Typhlosion, Decidueye, Samurott, Zoroark, Goodra, Sneasler, Kleavor, Ursaluna) unlocked via the key-item Incense Burner.
* **Dual View Modes:**
  * **Table View (Spreadsheet Style):** Ultra-compact list showing Sprites, Types, Abilities, and colored Stat Bars.
  * **Grid Card View:** Visual card layout with sprite previews and quick stats.
* **Instant Filtering & Search:**
  * Filter by Primary Type, Secondary Type, Generation, and Sorting order (Dex #, Name, BST, HP, Atk, Def, SpA, SpD, Spe).
  * Quick Filter Chips: `[✨ Lumi Changes Only]` and `[🏔️ Hisuian Forms]`.
  * Instant search across Pokémon names, types, abilities, moves, or encounter locations. Press `/` to focus search anytime.
* **Detail Inspector Panel:**
  * **Shiny Sprite Toggle:** Switch between regular and shiny sprites on the fly.
  * **Defensive Matchups Matrix:** Real-time type matchup calculator showing 4×, 2× weaknesses, ½×, ¼× resistances, and 0× immunities.
  * **Learnset Tabs:** Level-Up learnsets, TM learnsets, and egg moves with power, accuracy, category, and effect descriptions.
  * **Encounter Locations:** Route listings, Grand Underground biomes (Spacious Cave, Fountainspring Cave, etc.), and Poké Radar spots.
* **Team Planner (0/6):** Bookmark and construct your 6-Pokémon Sinnoh squad with persistent local storage saving.

---

## 🚀 How to Run Locally

Because this project is built using vanilla HTML5, CSS3, and modern JavaScript, there is zero build toolchain or installation required.

1. Double click [`index.html`](file:///C:/Users/bason/.gemini/antigravity/scratch/luminescent-pokedex/index.html) to open directly in any modern browser (Chrome, Edge, Firefox, Safari).
2. Alternatively, serve via any lightweight static server:
   ```bash
   # Python (if installed)
   python -m http.server 8000

   # Or npx
   npx serve .
   ```

---

## 🌐 Deploying to GitHub Pages (Like Sangvo1991)

To host your Luminescent Platinum Pokédex publicly on GitHub Pages:
1. Create a new repository on GitHub (e.g., `luminescent-pokedex`).
2. Push this folder to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Luminescent Platinum Pokedex"
   git branch -M main
   git remote add origin https://github.com/<your-username>/luminescent-pokedex.git
   git push -u origin main
   ```
3. In your GitHub repository, navigate to **Settings** > **Pages**.
4. Under **Source**, select `Deploy from a branch` and choose branch `main` with folder `/ (root)`.
5. Click **Save**. Your Pokédex will be live at `https://<your-username>.github.io/luminescent-pokedex/`!

---

## 📁 Project Structure

```
luminescent-pokedex/
├── css/
│   ├── style.css       # Core layout, dark theme, drawer, tables, responsiveness
│   └── types.css       # Pokémon type badges, category badges, glowing styles
├── js/
│   ├── data.js         # Pokémon dataset, type chart, learnsets, encounter tables
│   └── app.js          # App controller, filtering, sorting, drawer, team planner
├── index.html          # Main application page
└── README.md           # Documentation
```
