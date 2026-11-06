/**
 * Luminescent Platinum Pokédex Database
 * Accurate to https://luminescent.team/docs
 * Complete dataset: All Gen 1-4 Pokémon (1-493) + Hisuian forms,
 * Level caps, Boss teams, Items database, Route encounters, Moves & Abilities.
 */

var TYPE_CHART = {
  Normal:   { Rock: 0.5, Ghost: 0, Steel: 0.5 },
  Fire:     { Fire: 0.5, Water: 0.5, Grass: 2, Ice: 2, Bug: 2, Rock: 0.5, Dragon: 0.5, Steel: 2 },
  Water:    { Fire: 2, Water: 0.5, Grass: 0.5, Ground: 2, Rock: 2, Dragon: 0.5 },
  Grass:    { Fire: 0.5, Water: 2, Grass: 0.5, Poison: 0.5, Ground: 2, Flying: 0.5, Bug: 0.5, Rock: 2, Dragon: 0.5, Steel: 0.5 },
  Electric: { Water: 2, Grass: 0.5, Electric: 0.5, Ground: 0, Flying: 2, Dragon: 0.5 },
  Ice:      { Fire: 0.5, Water: 0.5, Grass: 2, Ice: 0.5, Ground: 2, Flying: 2, Dragon: 2, Steel: 0.5 },
  Fighting: { Normal: 2, Ice: 2, Poison: 0.5, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2, Ghost: 0, Dark: 2, Steel: 2, Fairy: 0.5 },
  Poison:   { Grass: 2, Poison: 0.5, Ground: 0.5, Rock: 0.5, Ghost: 0.5, Steel: 0, Fairy: 2 },
  Ground:   { Fire: 2, Electric: 2, Grass: 0.5, Poison: 2, Flying: 0, Bug: 0.5, Rock: 2, Steel: 2 },
  Flying:   { Grass: 2, Electric: 0.5, Fighting: 2, Bug: 2, Rock: 0.5, Steel: 0.5 },
  Psychic:  { Fighting: 2, Poison: 2, Psychic: 0.5, Dark: 0, Steel: 0.5 },
  Bug:      { Fire: 0.5, Grass: 2, Fighting: 0.5, Poison: 0.5, Flying: 0.5, Psychic: 2, Ghost: 0.5, Dark: 2, Steel: 0.5, Fairy: 0.5 },
  Rock:     { Fire: 2, Ice: 2, Fighting: 0.5, Ground: 0.5, Flying: 2, Bug: 2, Steel: 0.5 },
  Ghost:    { Normal: 0, Psychic: 2, Ghost: 2, Dark: 0.5 },
  Dragon:   { Dragon: 2, Steel: 0.5, Fairy: 0 },
  Steel:    { Fire: 0.5, Water: 0.5, Electric: 0.5, Ice: 2, Rock: 2, Steel: 0.5, Fairy: 2 },
  Dark:     { Fighting: 0.5, Psychic: 2, Ghost: 2, Dark: 0.5, Fairy: 0.5 },
  Fairy:    { Fire: 0.5, Fighting: 2, Poison: 0.5, Dragon: 2, Dark: 2, Steel: 0.5 }
};

var ALL_TYPES = [
  "Normal", "Fire", "Water", "Grass", "Electric", "Ice",
  "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug",
  "Rock", "Ghost", "Dragon", "Steel", "Dark", "Fairy"
];

function calculateMatchups(types) {
  const multipliers = {};
  ALL_TYPES.forEach(t => { multipliers[t] = 1; });
  types.forEach(defType => {
    ALL_TYPES.forEach(atkType => {
      const chart = TYPE_CHART[atkType];
      if (chart && chart[defType] !== undefined) {
        multipliers[atkType] *= chart[defType];
      }
    });
  });
  return multipliers;
}

// ==========================================
// --- LEVEL CAPS DATA ---
// ==========================================
var LEVEL_CAPS_DATA = [
  { badge: 1, name: "Coal Badge", leader: "Roark", city: "Oreburgh City", cap: 16, type: "Rock", ace: "Cranidos (Lv. 16)", notes: "Rock-type gym. Water/Grass/Fighting recommended." },
  { badge: 2, name: "Forest Badge", leader: "Gardenia", city: "Eterna City", cap: 26, type: "Grass", ace: "Roserade (Lv. 26)", notes: "Grass-type gym. Fire/Flying/Ice/Poison recommended." },
  { badge: 3, name: "Cobble Badge", leader: "Maylene", city: "Veilstone City", cap: 33, type: "Fighting", ace: "Lucario (Lv. 33)", notes: "Fighting-type gym. Flying/Psychic/Fairy recommended." },
  { badge: 4, name: "Relic Badge", leader: "Fantina", city: "Hearthome City", cap: 39, type: "Ghost", ace: "Mismagius (Lv. 39)", notes: "Ghost-type gym. Dark/Ghost recommended." },
  { badge: 5, name: "Fen Badge", leader: "Crasher Wake", city: "Pastoria City", cap: 44, type: "Water", ace: "Floatzel (Lv. 44)", notes: "Water-type gym. Electric/Grass recommended." },
  { badge: 6, name: "Mine Badge", leader: "Byron", city: "Canalave City", cap: 53, type: "Steel", ace: "Bastiodon (Lv. 53)", notes: "Steel-type gym. Fire/Ground/Fighting recommended." },
  { badge: 7, name: "Icicle Badge", leader: "Candice", city: "Snowpoint City", cap: 56, type: "Ice", ace: "Froslass (Lv. 56)", notes: "Ice-type gym. Fire/Fighting/Rock/Steel recommended." },
  { badge: 8, name: "Beacon Badge", leader: "Volkner", city: "Sunyshore City", cap: 62, type: "Electric", ace: "Electivire (Lv. 62)", notes: "Electric-type gym. Ground-type recommended." },
  { badge: "Galactic", name: "Spear Pillar", leader: "Cyrus", city: "Mt. Coronet", cap: 68, type: "Dark", ace: "Weavile (Lv. 68)", notes: "Climactic battle atop Mt. Coronet before Dialga/Palkia." },
  { badge: "E4", name: "Elite Four", leader: "Aaron, Bertha, Flint, Lucian", city: "Pokémon League", cap: 75, type: "Mixed", ace: "Drapion, Hippowdon, Magmortar, Bronzong", notes: "Bug, Ground, Fire, and Psychic masters." },
  { badge: "Champ", name: "Champion", leader: "Cynthia", city: "Pokémon League", cap: 78, type: "Champion", ace: "Garchomp (Lv. 78)", notes: "Ultimate battle. Competitive EV spreads, held items, and coverage." }
];

// ==========================================
// --- ITEMS DATABASE ---
// ==========================================
var ITEMS_DATA = [
  // Key & Mod Items
  { id: "incense-burner", name: "Incense Burner", category: "Key Mod Item", icon: "🏮", desc: "Ancient key item that channels Hisuian energy. Allows encountering and evolving Hisuian forms across Sinnoh.", locations: ["Gift from NPC in Floaroma Town (near Flower Shop)"] },
  { id: "everlasting-candy", name: "Everlasting Candy", category: "Key Mod Item", icon: "🍬", desc: "Reusable Rare Candy key item that instantly levels up Pokémon to test builds or reach the level cap effortlessly.", locations: ["Gift from Lucas/Dawn in Sandgem Town"] },
  { id: "shiny-charm", name: "Shiny Charm", category: "Key Mod Item", icon: "✨", desc: "A shiny, magical charm that greatly increases the chance of finding Shiny Pokémon in the wild and from eggs.", locations: ["Hotel Grand Lake (Game Freak Director after completing National Dex)"] },
  { id: "oval-charm", name: "Oval Charm", category: "Key Mod Item", icon: "🥚", desc: "An oval charm that increases the frequency with which eggs are found at the Solaceon Pokémon Nursery.", locations: ["Hotel Grand Lake (defeat Game Freak Morimoto)"] },
  { id: "ability-capsule", name: "Ability Capsule", category: "Key Mod Item", icon: "💊", desc: "Switches a Pokémon with two standard abilities between its primary and secondary ability.", locations: ["Veilstone Dept Store (4F)", "Battle Park (50 BP)"] },
  { id: "ability-patch", name: "Ability Patch", category: "Key Mod Item", icon: "🩹", desc: "A patch that unlocks a Pokémon's rare Hidden Ability, enabling powerful hidden traits.", locations: ["Veilstone Dept Store (4F)", "Battle Park (99 BP)"] },
  { id: "bottle-cap", name: "Bottle Cap", category: "Key Mod Item", icon: "🪙", desc: "Allows Mr. Hyper in the Fight Area to Hyper Train one individual stat IV to 31 maximum.", locations: ["Grand Underground mining", "Battle Park (25 BP)"] },
  { id: "gold-bottle-cap", name: "Gold Bottle Cap", category: "Key Mod Item", icon: "👑", desc: "Allows Mr. Hyper in the Fight Area to Hyper Train all 6 stat IVs to 31 maximum in one go.", locations: ["Grand Underground rare mining", "Battle Park (75 BP)"] },
  { id: "nature-mints", name: "Nature Mints", category: "Key Mod Item", icon: "🌿", desc: "Aromatic mints (Adamant, Jolly, Modest, Timid, Bold, Impish, Calm, Careful, Brave, Quiet) that alter stat growth to match the specified nature.", locations: ["Veilstone Dept Store (4F)", "Battle Park (20 BP)"] },

  // Evolution Items
  { id: "link-cable", name: "Link Cable", category: "Evolution", icon: "🔗", desc: "A cord providing energy to trigger trade evolutions instantly without trading (e.g. Kadabra, Machoke, Graveler, Haunter, Scyther, Onix, Porygon, Dusclops, Electabuzz, Magmar).", locations: ["Veilstone Dept Store (4F)", "Solaceon Ruins", "Grand Underground mining"] },
  { id: "peat-block", name: "Peat Block", category: "Evolution", icon: "🧱", desc: "A block of muddy peat. Triggers Ursaring's evolution into Ursaluna during the Full Moon in Solaceon Town.", locations: ["Grand Underground mining", "Route 216 snow item pickup"] },
  { id: "black-augurite", name: "Black Augurite", category: "Evolution", icon: "🪓", desc: "Volcanic stone that triggers Scyther's evolution into the mighty Bug/Rock axe warrior Kleavor.", locations: ["Grand Underground mining", "Solaceon Ruins hidden room"] },
  { id: "dawn-stone", name: "Dawn Stone", category: "Evolution", icon: "✨", desc: "Evolves male Kirlia into Gallade, and female Snorunt into Froslass.", locations: ["Route 212 (requires Surf)", "Mt. Coronet B1F", "Pickup ability (Lv 51+)"] },
  { id: "dusk-stone", name: "Dusk Stone", category: "Evolution", icon: "🌘", desc: "Evolves Murkrow into Honchkrow, and Misdreavus into Mismagius.", locations: ["Galactic Warehouse (Veilstone)", "Victory Road B1F", "Grand Underground mining"] },
  { id: "shiny-stone", name: "Shiny Stone", category: "Evolution", icon: "🌟", desc: "Evolves Roselia into Roserade, and Togetic into Togekiss.", locations: ["Iron Island B3F", "Route 228 (requires Rock Climb)"] },
  { id: "moon-stone", name: "Moon Stone", category: "Evolution", icon: "🌙", desc: "Evolves Nidorina, Nidorino, Clefairy, Jigglypuff, and Skitty.", locations: ["Grand Underground mining", "Held by wild Clefairy (5%)"] },
  { id: "sun-stone", name: "Sun Stone", category: "Evolution", icon: "☀️", desc: "Evolves Gloom into Bellossom, Sunkern into Sunflora, and Petilil into Hisuian Lilligant.", locations: ["Grand Underground mining", "Held by wild Solrock (5%)"] },
  { id: "fire-stone", name: "Fire Stone", category: "Evolution", icon: "🔥", desc: "Evolves Vulpix, Growlithe (into Arcanine / Hisuian Arcanine), and Eevee into Flareon.", locations: ["Fuego Ironworks", "Grand Underground mining"] },
  { id: "water-stone", name: "Water Stone", category: "Evolution", icon: "💧", desc: "Evolves Poliwhirl, Shellder, Staryu, Lombre, and Eevee into Vaporeon.", locations: ["Route 213 (requires Surf)", "Grand Underground mining"] },
  { id: "thunder-stone", name: "Thunder Stone", category: "Evolution", icon: "⚡", desc: "Evolves Pikachu, Eevee into Jolteon, and Eelektrik.", locations: ["Sunyshore City", "Grand Underground mining"] },
  { id: "leaf-stone", name: "Leaf Stone", category: "Evolution", icon: "🍃", desc: "Evolves Gloom, Weepinbell, Exeggcute, Nuzleaf, and Hisuian Voltorb into Hisuian Electrode.", locations: ["Floaroma Meadow", "Grand Underground mining"] },
  { id: "ice-stone", name: "Ice Stone", category: "Evolution", icon: "❄️", desc: "Evolves Alolan Vulpix, Alolan Sandshrew, and Eevee into Glaceon.", locations: ["Route 217 snow pickup", "Grand Underground Glacial Cave"] },
  { id: "electirizer", name: "Electirizer", category: "Evolution", icon: "🔌", desc: "Evolves Electabuzz into Electivire when used with Link Cable or level-up.", locations: ["Held by wild Elekid/Electabuzz (Route 222, 5% chance)", "Grand Underground Whiteout Cave"] },
  { id: "magmarizer", name: "Magmarizer", category: "Evolution", icon: "🌋", desc: "Evolves Magmar into Magmortar when used with Link Cable or level-up.", locations: ["Held by wild Magby/Magmar (Fuego Ironworks, 5% chance)", "Grand Underground Volcanic Cave"] },
  { id: "razor-claw", name: "Razor Claw", category: "Evolution", icon: "🦅", desc: "Evolves Sneasel into Weavile (Night), or Hisuian Sneasel into Sneasler (Day). Boosts critical hit ratio.", locations: ["Route 224", "Victory Road", "Battle Park (48 BP)"] },
  { id: "razor-fang", name: "Razor Fang", category: "Evolution", icon: "🦇", desc: "Evolves Gligar into Gliscor at Night. May cause target to flinch.", locations: ["Route 214", "Battle Park (48 BP)"] },
  { id: "metal-coat", name: "Metal Coat", category: "Evolution", icon: "🛡️", desc: "Evolves Scyther into Scizor, and Onix into Steelix. Boosts Steel-type attacks by 20%.", locations: ["Iron Island (gift from Byron)", "Held by wild Magnemite/Bronzor (5%)"] },
  { id: "protector", name: "Protector", category: "Evolution", icon: "🦏", desc: "Heavy protective armor. Evolves Rhydon into Rhyperior.", locations: ["Route 228", "Grand Underground mining"] },
  { id: "reaper-cloth", name: "Reaper Cloth", category: "Evolution", icon: "👻", desc: "Imbued with spiritual power. Evolves Dusclops into Dusknoir.", locations: ["Route 229", "Turnback Cave"] },
  { id: "prism-scale", name: "Prism Scale", category: "Evolution", icon: "🐟", desc: "Mysterious scale that radiates rainbow light. Evolves Feebas into Milotic.", locations: ["Mt. Coronet B1F water tile", "Pastoria City beach"] },
  { id: "oval-stone", name: "Oval Stone", category: "Evolution", icon: "🥚", desc: "Round stone that evolves Happiny into Chansey when leveled up during the day.", locations: ["Lost Tower", "Held by wild Happiny/Chansey (50%)"] },
  { id: "kings-rock", name: "King's Rock", category: "Evolution", icon: "👑", desc: "Evolves Poliwhirl into Politoed, and Slowpoke into Slowking. Gives attacks a 10% flinch rate.", locations: ["Wild Poliwhirl / Poliwrath (5%)", "Battle Park (32 BP)"] },
  { id: "dragon-scale", name: "Dragon Scale", category: "Evolution", icon: "🐉", desc: "A thick and tough scale. Evolves Seadra into Kingdra.", locations: ["Held by wild Horsea/Seadra (5%)"] },
  { id: "upgrade", name: "Up-Grade", category: "Evolution", icon: "💾", desc: "A transparent device packed with all sorts of data. Evolves Porygon into Porygon2.", locations: ["Team Galactic Eterna Building (from Prof. Oak)"] },
  { id: "dubious-disc", name: "Dubious Disc", category: "Evolution", icon: "💿", desc: "A transparent device overflowing with dubious data. Evolves Porygon2 into Porygon-Z.", locations: ["Route 225 (requires Surf)"] },
  { id: "deep-sea-tooth", name: "Deep Sea Tooth", category: "Evolution", icon: "🦷", desc: "Evolves Clamperl into Huntail. Doubles Clamperl's Special Attack while held.", locations: ["Held by wild Carvanha/Sharpedo (5%)"] },
  { id: "deep-sea-scale", name: "Deep Sea Scale", category: "Evolution", icon: "🐚", desc: "Evolves Clamperl into Gorebyss. Doubles Clamperl's Special Defense while held.", locations: ["Held by wild Chinchou/Lanturn (5%)"] },

  // Competitive Battle Items
  { id: "leftovers", name: "Leftovers", category: "Battle Item", icon: "🥪", desc: "Restores 1/16th of maximum HP at the end of every turn.", locations: ["Held by wild Munchlax / Snorlax (100%)", "Victory Road hidden item"] },
  { id: "life-orb", name: "Life Orb", category: "Battle Item", icon: "🔮", desc: "Boosts move power by 1.3x at the cost of 10% maximum HP per strike.", locations: ["Stark Mountain", "Battle Park (48 BP)"] },
  { id: "focus-sash", name: "Focus Sash", category: "Battle Item", icon: "🥋", desc: "Guarantees survival with 1 HP when hit by a lethal strike from full health.", locations: ["Route 221 (gift from NPC)", "Battle Park (48 BP)"] },
  { id: "choice-band", name: "Choice Band", category: "Battle Item", icon: "🥊", desc: "Boosts Attack by 1.5x, but locks the holder into using only one move.", locations: ["Battle Park (48 BP)", "Route 225"] },
  { id: "choice-specs", name: "Choice Specs", category: "Battle Item", icon: "👓", desc: "Boosts Special Attack by 1.5x, but locks the holder into using only one move.", locations: ["Celestic Town (Shop morning NPC)", "Battle Park (48 BP)"] },
  { id: "choice-scarf", name: "Choice Scarf", category: "Battle Item", icon: "🧣", desc: "Boosts Speed by 1.5x, but locks the holder into using only one move.", locations: ["Galactic Veilstone HQ", "Battle Park (48 BP)"] },
  { id: "heavy-duty-boots", name: "Heavy-Duty Boots", category: "Battle Item", icon: "🥾", desc: "Protects the holder from the effects of entry hazards (Stealth Rock, Spikes, Toxic Spikes).", locations: ["Veilstone Dept Store (4F)", "Route 210 North"] },
  { id: "assault-vest", name: "Assault Vest", category: "Battle Item", icon: "🦺", desc: "Boosts Special Defense by 1.5x, but prevents the use of status moves.", locations: ["Battle Park (48 BP)", "Snowpoint Temple"] },
  { id: "toxic-orb", name: "Toxic Orb", category: "Battle Item", icon: "🧪", desc: "Badly poisons the holder at the end of the first turn (Enables Poison Heal Gliscor and Guts wallbreakers).", locations: ["Battle Park (16 BP)", "Great Marsh (Safari Zone)"] },
  { id: "flame-orb", name: "Flame Orb", category: "Battle Item", icon: "🔥", desc: "Burns the holder at the end of the first turn (Activates Guts Ursaluna/Heracross and Flare Boost).", locations: ["Battle Park (16 BP)", "Fuego Ironworks"] },
  { id: "eviolite", name: "Eviolite", category: "Battle Item", icon: "💎", desc: "Boosts Defense and Special Defense by 1.5x for any Pokémon that can still evolve.", locations: ["Oreburgh Mine B2F", "Route 208 hiker gift"] },
  { id: "expert-belt", name: "Expert Belt", category: "Battle Item", icon: "🥋", desc: "Boosts the power of super-effective moves by 20% without taking recoil damage.", locations: ["Route 221 (from old man NPC)"] },
  { id: "rocky-helmet", name: "Rocky Helmet", category: "Battle Item", icon: "🪖", desc: "If the holder is hit by a contact attack, the attacker takes damage equal to 1/6th of its maximum HP.", locations: ["Iron Island B2F", "Battle Park (48 BP)"] },
  { id: "weakness-policy", name: "Weakness Policy", category: "Battle Item", icon: "📜", desc: "Sharply raises both Attack and Sp. Atk by +2 stages when hit by a super-effective move.", locations: ["Battle Park (48 BP)"] },
  { id: "black-sludge", name: "Black Sludge", category: "Battle Item", icon: "🧪", desc: "Gradually restores 1/16th max HP to Poison-type Pokémon each turn; damages any other type.", locations: ["Held by wild Croagunk/Toxicroak/Grimer (5%)"] },
  { id: "light-clay", name: "Light Clay", category: "Battle Item", icon: "🧱", desc: "Extends the duration of barrier moves like Reflect, Light Screen, and Aurora Veil from 5 to 8 turns.", locations: ["Mt. Coronet", "Grand Underground mining"] },
  { id: "smooth-rock", name: "Smooth Rock", category: "Battle Item", icon: "🪨", desc: "Extends the duration of the Sandstorm weather created by the holder from 5 to 8 turns.", locations: ["Route 228", "Grand Underground mining"] },
  { id: "heat-rock", name: "Heat Rock", category: "Battle Item", icon: "🪨", desc: "Extends the duration of Harsh Sunlight weather created by the holder from 5 to 8 turns.", locations: ["Route 214", "Grand Underground mining"] },
  { id: "damp-rock", name: "Damp Rock", category: "Battle Item", icon: "🪨", desc: "Extends the duration of Rain weather created by the holder from 5 to 8 turns.", locations: ["Route 220", "Grand Underground mining"] },
  { id: "icy-rock", name: "Icy Rock", category: "Battle Item", icon: "🪨", desc: "Extends the duration of Snow/Hail weather created by the holder from 5 to 8 turns.", locations: ["Route 217", "Grand Underground mining"] },
  { id: "terrain-extender", name: "Terrain Extender", category: "Battle Item", icon: "📡", desc: "Extends the duration of Electric, Grassy, Misty, or Psychic Terrain from 5 to 8 turns.", locations: ["Battle Park (48 BP)"] },
  { id: "air-balloon", name: "Air Balloon", category: "Battle Item", icon: "🎈", desc: "Makes the holder float in the air with Ground immunity until hit by an attack.", locations: ["Route 215", "Battle Park (32 BP)"] },
  { id: "red-card", name: "Red Card", category: "Battle Item", icon: "🟥", desc: "A card with mysterious power. When hit by an attack, it instantly ejects the attacker from battle.", locations: ["Battle Park (32 BP)"] },
  { id: "shed-shell", name: "Shed Shell", category: "Battle Item", icon: "🐚", desc: "Enables holder to switch out without fail, ignoring Shadow Tag, Arena Trap, and Magnet Pull.", locations: ["Route 228", "Wild Venomoth (5%)"] },
  { id: "mental-herb", name: "Mental Herb", category: "Battle Item", icon: "🌿", desc: "Snaps holder out of infatuation and nullifies Taunt, Encore, Torment, Disable, and Heal Block.", locations: ["Route 216", "Battle Park (16 BP)"] },
  { id: "white-herb", name: "White Herb", category: "Battle Item", icon: "🌿", desc: "Instantly restores all lowered stat stages back to normal once (ideal for Shell Smash or Close Combat).", locations: ["Route 217", "Battle Park (32 BP)"] },
  { id: "power-herb", name: "Power Herb", category: "Battle Item", icon: "🌿", desc: "Allows charging attacks like Solar Beam, Meteor Beam, and Geomancy to strike in a single turn.", locations: ["Route 227", "Battle Park (32 BP)"] },
  { id: "scope-lens", name: "Scope Lens", category: "Battle Item", icon: "🔍", desc: "A lens that improves vision. Boosts the holder's critical-hit ratio by 1 stage (+12.5%).", locations: ["Fight Area (from NPC)", "Battle Park (48 BP)"] },
  { id: "wide-lens", name: "Wide Lens", category: "Battle Item", icon: "👓", desc: "A magnifying lens that boosts the accuracy of moves by 1.1x (10% higher hit chance).", locations: ["Veilstone Game Corner / Dept Store", "Route 215"] },
  { id: "loaded-dice", name: "Loaded Dice", category: "Battle Item", icon: "🎲", desc: "Ensures multi-strike moves (Bullet Seed, Icicle Spear, Scale Shot) hit at least 4 or 5 times.", locations: ["Veilstone Dept Store (4F)"] },
  { id: "punching-glove", name: "Punching Glove", category: "Battle Item", icon: "🥊", desc: "Boosts punching moves by 10% and prevents direct contact effects (Iron Barbs, Flame Body, Rocky Helmet).", locations: ["Veilstone Dept Store (4F)"] },
  { id: "covert-cloak", name: "Covert Cloak", category: "Battle Item", icon: "🧥", desc: "Protects holder from secondary effects of attacks (burn from Scald, flinch from Fake Out).", locations: ["Veilstone Dept Store (4F)"] },
  { id: "clear-amulet", name: "Clear Amulet", category: "Battle Item", icon: "🧿", desc: "Protects the holder from having its stats lowered by opponents' moves or abilities (like Intimidate).", locations: ["Battle Park (48 BP)"] },

  // Competitive Berries
  { id: "sitrus-berry", name: "Sitrus Berry", category: "Berry", icon: "🫐", desc: "Restores 25% of the holder's maximum HP when health drops below 50%. Essential staple.", locations: ["Berry trees across Sinnoh", "Pastoria City Berry Master"] },
  { id: "lum-berry", name: "Lum Berry", category: "Berry", icon: "🍒", desc: "Instantly cures any status condition (Burn, Poison, Paralysis, Freeze, Sleep, or Confusion).", locations: ["Route 212 Berry Master", "Berry trees"] },
  { id: "yache-berry", name: "Yache Berry", category: "Berry", icon: "🫐", desc: "Weakens a super-effective Ice-type attack by 50% (The signature survival item for Garchomp).", locations: ["Pastoria City Berry Master (daily gift)"] },
  { id: "passho-berry", name: "Passho Berry", category: "Berry", icon: "🫐", desc: "Weakens a super-effective Water-type attack by 50% for Fire, Ground, or Rock Pokémon.", locations: ["Route 212 Berry Master"] },
  { id: "rindo-berry", name: "Rindo Berry", category: "Berry", icon: "🫐", desc: "Weakens a super-effective Grass-type attack by 50% (Saves Swampert, Gastrodon, and Quagsire).", locations: ["Route 212 Berry Master"] },
  { id: "chople-berry", name: "Chople Berry", category: "Berry", icon: "🫐", desc: "Weakens a super-effective Fighting-type attack by 50% (Used on Tyranitar, Blissey, Weavile).", locations: ["Route 212 Berry Master"] },
  { id: "colbur-berry", name: "Colbur Berry", category: "Berry", icon: "🫐", desc: "Weakens a super-effective Dark-type attack by 50% for Psychic or Ghost Pokémon.", locations: ["Route 212 Berry Master"] },
  { id: "shuca-berry", name: "Shuca Berry", category: "Berry", icon: "🫐", desc: "Weakens a super-effective Ground-type attack by 50% (Essential for Heatran and Magnezone).", locations: ["Route 212 Berry Master"] },
  { id: "babiri-berry", name: "Babiri Berry", category: "Berry", icon: "🫐", desc: "Weakens a super-effective Steel-type attack by 50% (Protects Fairy, Ice, and Rock Pokémon).", locations: ["Route 212 Berry Master"] },
  { id: "occa-berry", name: "Occa Berry", category: "Berry", icon: "🫐", desc: "Weakens a super-effective Fire-type attack by 50% (Guarantees survival for Scizor and Metagross).", locations: ["Route 212 Berry Master"] },
  { id: "wacan-berry", name: "Wacan Berry", category: "Berry", icon: "🫐", desc: "Weakens a super-effective Electric-type attack by 50% (Signature defense for Gyarados).", locations: ["Route 212 Berry Master"] },
  { id: "payapa-berry", name: "Payapa Berry", category: "Berry", icon: "🫐", desc: "Weakens a super-effective Psychic-type attack by 50% for Fighting and Poison Pokémon.", locations: ["Route 212 Berry Master"] },
  { id: "coba-berry", name: "Coba Berry", category: "Berry", icon: "🫐", desc: "Weakens a super-effective Flying-type attack by 50% for Grass, Fighting, and Bug Pokémon.", locations: ["Route 212 Berry Master"] },
  { id: "haban-berry", name: "Haban Berry", category: "Berry", icon: "🫐", desc: "Weakens a super-effective Dragon-type attack by 50% in Dragon mirror matches.", locations: ["Route 212 Berry Master"] },
  { id: "kasib-berry", name: "Kasib Berry", category: "Berry", icon: "🫐", desc: "Weakens a super-effective Ghost-type attack by 50% for Ghost and Psychic Pokémon.", locations: ["Route 212 Berry Master"] },
  { id: "roseli-berry", name: "Roseli Berry", category: "Berry", icon: "🫐", desc: "Weakens a super-effective Fairy-type attack by 50% for Dragon, Fighting, and Dark Pokémon.", locations: ["Route 212 Berry Master"] },
  { id: "custap-berry", name: "Custap Berry", category: "Berry", icon: "🫐", desc: "Allows holder to strike first in their priority bracket once when HP falls below 25%.", locations: ["Battle Park (32 BP)"] },
  { id: "salac-berry", name: "Salac Berry", category: "Berry", icon: "🫐", desc: "Sharply boosts holder's Speed by +1 stage in a pinch (below 25% max HP).", locations: ["Battle Park (32 BP)"] }
];

// ==========================================
// --- BOSS TEAMS DATA ---
// ==========================================
var BOSS_TEAMS_DATA = [
  {
    "bossId": "roark",
    "name": "Roark",
    "title": "Oreburgh Gym Leader",
    "badge": "Coal Badge",
    "category": "gym",
    "levelCap": 16,
    "icon": "🪨",
    "quote": "Welcome to the Oreburgh Gym! My name is Roark! Let's see your fighting spirit!",
    "team": [
      { "name": "Geodude", "lvl": 14, "types": ["Rock", "Ground"], "item": "Hard Stone", "ability": "Rock Head", "moves": ["Stealth Rock", "Rock Throw", "Defense Curl", "Rollout"] },
      { "name": "Onix", "lvl": 14, "types": ["Rock", "Steel"], "item": "Passho Berry", "ability": "Sturdy", "moves": ["Rock Tomb", "Iron Head", "Dragon Breath", "Screech"] },
      { "name": "Cranidos", "lvl": 16, "types": ["Rock"], "item": "Sitrus Berry", "ability": "Mold Breaker", "moves": ["Headbutt", "Rock Tomb", "Bite", "Pursuit"] }
    ]
  },
  {
    "bossId": "gardenia",
    "name": "Gardenia",
    "title": "Eterna Gym Leader",
    "badge": "Forest Badge",
    "category": "gym",
    "levelCap": 26,
    "icon": "🌿",
    "quote": "You must be a challenger! Let's see your passion for grass Pokémon!",
    "team": [
      { "name": "Bellossom", "lvl": 24, "types": ["Grass", "Fairy"], "item": "Miracle Seed", "ability": "Chlorophyll", "moves": ["Draining Kiss", "Mega Drain", "Sunny Day", "Sleep Powder"] },
      { "name": "Cherrim", "lvl": 24, "types": ["Grass", "Fairy"], "item": "Heat Rock", "ability": "Flower Gift", "moves": ["Sunny Day", "Solar Beam", "Play Rough", "Morning Sun"] },
      { "name": "Turtwig", "lvl": 25, "types": ["Grass"], "item": "Eviolite", "ability": "Shell Armor", "moves": ["Seed Bomb", "Curse", "Bite", "Reflect"] },
      { "name": "Roserade", "lvl": 26, "types": ["Grass", "Poison"], "item": "Sitrus Berry", "ability": "Technician", "moves": ["Magical Leaf", "Sludge", "Mega Drain", "Stun Spore"] }
    ]
  },
  {
    "bossId": "maylene",
    "name": "Maylene",
    "title": "Veilstone Gym Leader",
    "badge": "Cobble Badge",
    "category": "gym",
    "levelCap": 33,
    "icon": "🥋",
    "quote": "I'm Maylene! I'm the Gym Leader! I'll fight with everything I've got!",
    "team": [
      { "name": "Meditite", "lvl": 31, "types": ["Fighting", "Psychic"], "item": "Eviolite", "ability": "Pure Power", "moves": ["Fake Out", "Drain Punch", "Zen Headbutt", "Bullet Punch"] },
      { "name": "Machoke", "lvl": 31, "types": ["Fighting"], "item": "Flame Orb", "ability": "Guts", "moves": ["Close Combat", "Knock Off", "Ice Punch", "Bullet Punch"] },
      { "name": "Infernape", "lvl": 32, "types": ["Fire", "Fighting"], "item": "Life Orb", "ability": "Iron Fist", "moves": ["Mach Punch", "Fire Punch", "Thunder Punch", "U-turn"] },
      { "name": "Lucario", "lvl": 33, "types": ["Fighting", "Steel"], "item": "Sitrus Berry", "ability": "Adaptability", "moves": ["Aura Sphere", "Meteor Mash", "Bullet Punch", "Work Up"] }
    ]
  },
  {
    "bossId": "fantina",
    "name": "Fantina",
    "title": "Hearthome Gym Leader",
    "badge": "Relic Badge",
    "category": "gym",
    "levelCap": 39,
    "icon": "👻",
    "quote": "Ooh la la! I am Fantina, the Hearthome Gym Leader! Dance with my ghosts!",
    "team": [
      { "name": "Drifblim", "lvl": 37, "types": ["Ghost", "Flying"], "item": "Sitrus Berry", "ability": "Unburden", "moves": ["Acrobatics", "Hex", "Will-O-Wisp", "Tailwind"] },
      { "name": "Banette", "lvl": 37, "types": ["Ghost"], "item": "Spell Tag", "ability": "Insomnia", "moves": ["Shadow Sneak", "Knock Off", "Gunk Shot", "Destiny Bond"] },
      { "name": "Gengar", "lvl": 38, "types": ["Ghost", "Poison"], "item": "Focus Sash", "ability": "Levitate", "moves": ["Shadow Ball", "Sludge Bomb", "Dazzling Gleam", "Thunderbolt"] },
      { "name": "Mismagius", "lvl": 39, "types": ["Ghost", "Fairy"], "item": "Colbur Berry", "ability": "Levitate", "moves": ["Shadow Ball", "Dazzling Gleam", "Mystical Fire", "Nasty Plot"] }
    ]
  },
  {
    "bossId": "crasher-wake",
    "name": "Crasher Wake",
    "title": "Pastoria Gym Leader",
    "badge": "Fen Badge",
    "category": "gym",
    "levelCap": 44,
    "icon": "🌊",
    "quote": "The torrential master of water! Crasher Wake is here to wash you away!",
    "team": [
      { "name": "Gyarados", "lvl": 42, "types": ["Water", "Flying"], "item": "Wacan Berry", "ability": "Intimidate", "moves": ["Waterfall", "Bounce", "Dragon Dance", "Ice Fang"] },
      { "name": "Quagsire", "lvl": 42, "types": ["Water", "Ground"], "item": "Leftovers", "ability": "Unaware", "moves": ["Scald", "Earthquake", "Recover", "Toxic"] },
      { "name": "Ludicolo", "lvl": 43, "types": ["Water", "Grass"], "item": "Life Orb", "ability": "Swift Swim", "moves": ["Hydro Pump", "Giga Drain", "Ice Beam", "Rain Dance"] },
      { "name": "Floatzel", "lvl": 44, "types": ["Water"], "item": "Choice Band", "ability": "Technician", "moves": ["Aqua Jet", "Waterfall", "Ice Spinner", "Crunch"] }
    ]
  },
  {
    "bossId": "byron",
    "name": "Byron",
    "title": "Canalave Gym Leader",
    "badge": "Mine Badge",
    "category": "gym",
    "levelCap": 53,
    "icon": "🛡️",
    "quote": "Steel yourself! Roark's father won't go easy on you!",
    "team": [
      { "name": "Skarmory", "lvl": 51, "types": ["Steel", "Flying"], "item": "Leftovers", "ability": "Sturdy", "moves": ["Stealth Rock", "Spikes", "Roost", "Brave Bird"] },
      { "name": "Steelix", "lvl": 51, "types": ["Steel", "Ground"], "item": "Chesto Berry", "ability": "Sheer Force", "moves": ["Earthquake", "Heavy Slam", "Fire Fang", "Rest"] },
      { "name": "Magnezone", "lvl": 52, "types": ["Electric", "Steel"], "item": "Choice Specs", "ability": "Magnet Pull", "moves": ["Thunderbolt", "Flash Cannon", "Volt Switch", "Body Press"] },
      { "name": "Bastiodon", "lvl": 53, "types": ["Rock", "Steel"], "item": "Sitrus Berry", "ability": "Sturdy", "moves": ["Metal Burst", "Body Press", "Stone Edge", "Toxic"] }
    ]
  },
  {
    "bossId": "candice",
    "name": "Candice",
    "title": "Snowpoint Gym Leader",
    "badge": "Icicle Badge",
    "category": "gym",
    "levelCap": 56,
    "icon": "❄️",
    "quote": "You want to freeze? I'll show you the absolute zero focus and warmth in my heart!",
    "team": [
      { "name": "Abomasnow", "lvl": 54, "types": ["Grass", "Ice"], "item": "Focus Sash", "ability": "Snow Warning", "moves": ["Blizzard", "Wood Hammer", "Ice Shard", "Aurora Veil"] },
      { "name": "Mamoswine", "lvl": 54, "types": ["Ice", "Ground"], "item": "Life Orb", "ability": "Thick Fat", "moves": ["Earthquake", "Icicle Crash", "Ice Shard", "Knock Off"] },
      { "name": "Weavile", "lvl": 55, "types": ["Dark", "Ice"], "item": "Choice Band", "ability": "Technician", "moves": ["Triple Axel", "Knock Off", "Ice Shard", "Poison Jab"] },
      { "name": "Froslass", "lvl": 56, "types": ["Ice", "Ghost"], "item": "Colbur Berry", "ability": "Cursed Body", "moves": ["Blizzard", "Shadow Ball", "Destiny Bond", "Spikes"] }
    ]
  },
  {
    "bossId": "volkner",
    "name": "Volkner",
    "title": "Sunyshore Gym Leader",
    "badge": "Beacon Badge",
    "category": "gym",
    "levelCap": 62,
    "icon": "⚡",
    "quote": "I hope you can reignite my burning passion for Pokémon battling!",
    "team": [
      { "name": "Jolteon", "lvl": 60, "types": ["Electric"], "item": "Focus Sash", "ability": "Volt Absorb", "moves": ["Thunderbolt", "Shadow Ball", "Volt Switch", "Thunder Wave"] },
      { "name": "Raichu", "lvl": 60, "types": ["Electric"], "item": "Life Orb", "ability": "Lightning Rod", "moves": ["Volt Tackle", "Fake Out", "Play Rough", "Knock Off"] },
      { "name": "Luxray", "lvl": 61, "types": ["Electric", "Dark"], "item": "Choice Scarf", "ability": "Strong Jaw", "moves": ["Wild Charge", "Crunch", "Psychic Fangs", "Ice Fang"] },
      { "name": "Electivire", "lvl": 62, "types": ["Electric", "Fighting"], "item": "Expert Belt", "ability": "Iron Fist", "moves": ["Plasma Fists", "Close Combat", "Ice Punch", "Fire Punch"] }
    ]
  },
  {
    "bossId": "mars",
    "name": "Commander Mars",
    "title": "Team Galactic Admin",
    "badge": "Windworks / Verity",
    "category": "galactic",
    "levelCap": 42,
    "icon": "🚀",
    "quote": "I won't let you interfere with our glorious plan for the new universe!",
    "team": [
      { "name": "Golbat", "lvl": 40, "types": ["Poison", "Flying"], "item": "Black Sludge", "ability": "Infiltrator", "moves": ["Brave Bird", "Cross Poison", "U-turn", "Roost"] },
      { "name": "Bronzor", "lvl": 40, "types": ["Steel", "Psychic"], "item": "Eviolite", "ability": "Levitate", "moves": ["Stealth Rock", "Gyro Ball", "Confuse Ray", "Toxic"] },
      { "name": "Purugly", "lvl": 42, "types": ["Normal"], "item": "Silk Scarf", "ability": "Thick Fat", "moves": ["Fake Out", "Body Slam", "Sucker Punch", "U-turn"] }
    ]
  },
  {
    "bossId": "jupiter",
    "name": "Commander Jupiter",
    "title": "Team Galactic Admin",
    "badge": "Eterna HQ / Acuity",
    "category": "galactic",
    "levelCap": 46,
    "icon": "🚀",
    "quote": "You're a persistent little pest, aren't you? Let Skuntank handle you!",
    "team": [
      { "name": "Golbat", "lvl": 44, "types": ["Poison", "Flying"], "item": "Black Sludge", "ability": "Infiltrator", "moves": ["Air Slash", "Sludge Bomb", "Heat Wave", "Roost"] },
      { "name": "Bronzong", "lvl": 44, "types": ["Steel", "Psychic"], "item": "Colbur Berry", "ability": "Levitate", "moves": ["Iron Head", "Zen Headbutt", "Earthquake", "Trick Room"] },
      { "name": "Skuntank", "lvl": 46, "types": ["Poison", "Dark"], "item": "Black Glasses", "ability": "Aftermath", "moves": ["Sucker Punch", "Poison Jab", "Flamethrower", "Explosion"] }
    ]
  },
  {
    "bossId": "saturn",
    "name": "Commander Saturn",
    "title": "Team Galactic Admin",
    "badge": "Lake Valor / HQ",
    "category": "galactic",
    "levelCap": 50,
    "icon": "🚀",
    "quote": "Commander Saturn does not tolerate insolence. Witness our supreme power!",
    "team": [
      { "name": "Golbat", "lvl": 48, "types": ["Poison", "Flying"], "item": "Eviolite", "ability": "Infiltrator", "moves": ["Brave Bird", "Toxic", "Super Fang", "Defog"] },
      { "name": "Bronzor", "lvl": 48, "types": ["Steel", "Psychic"], "item": "Light Clay", "ability": "Levitate", "moves": ["Reflect", "Light Screen", "Psychic", "Flash Cannon"] },
      { "name": "Toxicroak", "lvl": 50, "types": ["Poison", "Fighting"], "item": "Life Orb", "ability": "Dry Skin", "moves": ["Cross Chop", "Gunk Shot", "Sucker Punch", "Swords Dance"] }
    ]
  },
  {
    "bossId": "cyrus",
    "name": "Cyrus",
    "title": "Galactic Boss",
    "badge": "Spear Pillar",
    "category": "galactic",
    "levelCap": 68,
    "icon": "🌌",
    "quote": "This world is incomplete. With the power of time and space, I will forge a world free of strife!",
    "team": [
      { "name": "Houndoom", "lvl": 65, "types": ["Dark", "Fire"], "item": "Focus Sash", "ability": "Flash Fire", "moves": ["Nasty Plot", "Dark Pulse", "Flamethrower", "Sludge Bomb"] },
      { "name": "Honchkrow", "lvl": 65, "types": ["Dark", "Flying"], "item": "Life Orb", "ability": "Super Luck", "moves": ["Brave Bird", "Sucker Punch", "Heat Wave", "Tailwind"] },
      { "name": "Gyarados", "lvl": 66, "types": ["Water", "Flying"], "item": "Wacan Berry", "ability": "Intimidate", "moves": ["Dragon Dance", "Waterfall", "Bounce", "Earthquake"] },
      { "name": "Crobat", "lvl": 66, "types": ["Poison", "Flying"], "item": "Black Sludge", "ability": "Infiltrator", "moves": ["Cross Poison", "Brave Bird", "U-turn", "Defog"] },
      { "name": "Weavile", "lvl": 68, "types": ["Dark", "Ice"], "item": "Choice Band", "ability": "Pickpocket", "moves": ["Triple Axel", "Knock Off", "Ice Shard", "Poison Jab"] }
    ]
  },
  {
    "bossId": "aaron",
    "name": "Aaron",
    "title": "Elite Four",
    "badge": "Bug Master",
    "category": "e4",
    "levelCap": 72,
    "icon": "🦋",
    "quote": "Hello! I am Aaron of the Elite Four! Bug Pokémon are beautiful and strong!",
    "team": [
      { "name": "Yanmega", "lvl": 70, "types": ["Bug", "Dragon"], "item": "Focus Sash", "ability": "Speed Boost", "moves": ["Bug Buzz", "Draco Meteor", "Air Slash", "Protect"] },
      { "name": "Heracross", "lvl": 70, "types": ["Bug", "Fighting"], "item": "Flame Orb", "ability": "Guts", "moves": ["Close Combat", "Megahorn", "Facade", "Knock Off"] },
      { "name": "Vespiquen", "lvl": 70, "types": ["Bug", "Flying"], "item": "Leftovers", "ability": "Pressure", "moves": ["Attack Order", "Defend Order", "Roost", "Toxic"] },
      { "name": "Scizor", "lvl": 71, "types": ["Bug", "Steel"], "item": "Life Orb", "ability": "Technician", "moves": ["Bullet Punch", "U-turn", "Dual Wingbeat", "Swords Dance"] },
      { "name": "Drapion", "lvl": 72, "types": ["Poison", "Dark"], "item": "Scope Lens", "ability": "Sniper", "moves": ["Cross Poison", "Night Slash", "Earthquake", "Swords Dance"] }
    ]
  },
  {
    "bossId": "bertha",
    "name": "Bertha",
    "title": "Elite Four",
    "badge": "Ground Master",
    "category": "e4",
    "levelCap": 73,
    "icon": "🏜️",
    "quote": "Well, well, you're quite a remarkable child! I'm Bertha, and the earth is my ally!",
    "team": [
      { "name": "Hippowdon", "lvl": 71, "types": ["Ground"], "item": "Smooth Rock", "ability": "Sand Stream", "moves": ["Earthquake", "Slack Off", "Stealth Rock", "Yawn"] },
      { "name": "Gliscor", "lvl": 71, "types": ["Ground", "Flying"], "item": "Toxic Orb", "ability": "Poison Heal", "moves": ["Earthquake", "Facade", "Swords Dance", "Roost"] },
      { "name": "Whiscash", "lvl": 71, "types": ["Water", "Ground"], "item": "Rindo Berry", "ability": "Oblivious", "moves": ["Earthquake", "Waterfall", "Dragon Dance", "Stone Edge"] },
      { "name": "Steelix", "lvl": 72, "types": ["Steel", "Ground"], "item": "Chesto Berry", "ability": "Sturdy", "moves": ["Earthquake", "Heavy Slam", "Rest", "Sleep Talk"] },
      { "name": "Rhyperior", "lvl": 73, "types": ["Ground", "Rock"], "item": "Weakness Policy", "ability": "Solid Rock", "moves": ["Earthquake", "Stone Edge", "Megahorn", "Ice Punch"] }
    ]
  },
  {
    "bossId": "flint",
    "name": "Flint",
    "title": "Elite Four",
    "badge": "Fire Master",
    "category": "e4",
    "levelCap": 74,
    "icon": "🔥",
    "quote": "I'm Flint of the Elite Four! My fiery spirit burns brighter than any sun!",
    "team": [
      { "name": "Ninetales", "lvl": 72, "types": ["Fire"], "item": "Heat Rock", "ability": "Drought", "moves": ["Sunny Day", "Fire Blast", "Solar Beam", "Will-O-Wisp"] },
      { "name": "Houndoom", "lvl": 72, "types": ["Dark", "Fire"], "item": "Life Orb", "ability": "Solar Power", "moves": ["Dark Pulse", "Flamethrower", "Solar Beam", "Nasty Plot"] },
      { "name": "Rapidash", "lvl": 72, "types": ["Fire"], "item": "Choice Band", "ability": "Flash Fire", "moves": ["Flare Blitz", "High Horsepower", "Megahorn", "Wild Charge"] },
      { "name": "Infernape", "lvl": 73, "types": ["Fire", "Fighting"], "item": "Focus Sash", "ability": "Iron Fist", "moves": ["Close Combat", "Flare Blitz", "Mach Punch", "Thunder Punch"] },
      { "name": "Magmortar", "lvl": 74, "types": ["Fire"], "item": "Assault Vest", "ability": "Mega Launcher", "moves": ["Fire Blast", "Aura Sphere", "Dragon Pulse", "Thunderbolt"] }
    ]
  },
  {
    "bossId": "lucian",
    "name": "Lucian",
    "title": "Elite Four",
    "badge": "Psychic Master",
    "category": "e4",
    "levelCap": 75,
    "icon": "🔮",
    "quote": "Welcome. I am Lucian. I read books, which give me profound insight into the human heart!",
    "team": [
      { "name": "Mr. Mime", "lvl": 73, "types": ["Psychic", "Fairy"], "item": "Light Clay", "ability": "Filter", "moves": ["Reflect", "Light Screen", "Psychic", "Dazzling Gleam"] },
      { "name": "Alakazam", "lvl": 73, "types": ["Psychic"], "item": "Life Orb", "ability": "Magic Guard", "moves": ["Psychic", "Focus Blast", "Shadow Ball", "Energy Ball"] },
      { "name": "Medicham", "lvl": 73, "types": ["Fighting", "Psychic"], "item": "Choice Scarf", "ability": "Pure Power", "moves": ["High Jump Kick", "Zen Headbutt", "Ice Punch", "Thunder Punch"] },
      { "name": "Gallade", "lvl": 74, "types": ["Psychic", "Fighting"], "item": "Expert Belt", "ability": "Sharpness", "moves": ["Sacred Sword", "Psycho Cut", "Leaf Blade", "Night Slash"] },
      { "name": "Bronzong", "lvl": 75, "types": ["Steel", "Psychic"], "item": "Leftovers", "ability": "Levitate", "moves": ["Gyro Ball", "Zen Headbutt", "Calm Mind", "Trick Room"] }
    ]
  },
  {
    "bossId": "cynthia",
    "name": "Cynthia",
    "title": "Sinnoh League Champion",
    "badge": "Champion",
    "category": "e4",
    "levelCap": 78,
    "icon": "👑",
    "quote": "Before me stands a Trainer who has climbed the highest peaks of Sinnoh. Show me your heart and soul!",
    "team": [
      { "name": "Spiritomb", "lvl": 75, "types": ["Ghost", "Dark"], "item": "Leftovers", "ability": "Pressure", "moves": ["Shadow Ball", "Dark Pulse", "Will-O-Wisp", "Pain Split"] },
      { "name": "Roserade", "lvl": 75, "types": ["Grass", "Poison"], "item": "Focus Sash", "ability": "Technician", "moves": ["Leaf Storm", "Sludge Bomb", "Dazzling Gleam", "Sleep Powder"] },
      { "name": "Gastrodon", "lvl": 76, "types": ["Water", "Ground"], "item": "Rindo Berry", "ability": "Storm Drain", "moves": ["Scald", "Earth Power", "Ice Beam", "Recover"] },
      { "name": "Lucario", "lvl": 76, "types": ["Fighting", "Steel"], "item": "Life Orb", "ability": "Adaptability", "moves": ["Aura Sphere", "Meteor Mash", "Extreme Speed", "Nasty Plot"] },
      { "name": "Milotic", "lvl": 77, "types": ["Water", "Fairy"], "item": "Flame Orb", "ability": "Marvel Scale", "moves": ["Scald", "Moonblast", "Recover", "Ice Beam"] },
      { "name": "Garchomp", "lvl": 78, "types": ["Dragon", "Ground"], "item": "Yache Berry", "ability": "Rough Skin", "moves": ["Earthquake", "Dragon Claw", "Swords Dance", "Poison Jab"] }
    ]
  }
];

var ROUTES_DATA = [
  {
    routeId: "route-201",
    name: "Route 201",
    region: "Sinnoh Surface",
    type: "Grassland",
    encounters: [
      { name: "Starly", method: "Walking", rate: "50%", lvls: "2-4", types: ["Normal", "Flying"] },
      { name: "Bidoof", method: "Walking", rate: "50%", lvls: "2-4", types: ["Normal"] },
      { name: "Nidoran♀", method: "Poké Radar", rate: "20%", lvls: "3-4", types: ["Poison"] },
      { name: "Nidoran♂", method: "Poké Radar", rate: "20%", lvls: "3-4", types: ["Poison"] }
    ]
  },
  {
    routeId: "route-202",
    name: "Route 202",
    region: "Sinnoh Surface",
    type: "Path",
    encounters: [
      { name: "Shinx", method: "Walking", rate: "35%", lvls: "3-5", types: ["Electric"] },
      { name: "Starly", method: "Walking", rate: "30%", lvls: "3-4", types: ["Normal", "Flying"] },
      { name: "Bidoof", method: "Walking", rate: "25%", lvls: "3-4", types: ["Normal"] },
      { name: "Kricketot", method: "Morning/Night", rate: "10%", lvls: "3-4", types: ["Bug"] },
      { name: "Growlithe", method: "Poké Radar", rate: "20%", lvls: "4-5", types: ["Fire"] }
    ]
  },
  {
    routeId: "eterna-forest",
    name: "Eterna Forest",
    region: "Sinnoh Forest",
    type: "Forest",
    encounters: [
      { name: "Budew", method: "Walking", rate: "20%", lvls: "10-12", types: ["Grass", "Poison"] },
      { name: "Buneary", method: "Walking", rate: "20%", lvls: "10-12", types: ["Normal"] },
      { name: "Gastly", method: "Walking (Night)", rate: "20%", lvls: "11-13", types: ["Ghost", "Poison"] },
      { name: "Misdreavus", method: "Walking (Night)", rate: "15%", lvls: "11-13", types: ["Ghost"] },
      { name: "Slakoth", method: "Poké Radar", rate: "20%", lvls: "12-14", types: ["Normal"] },
      { name: "Decidueye (Hisui)", method: "Incense Burner (Day)", rate: "Special", lvls: "15+", types: ["Grass", "Fighting"] }
    ]
  },
  {
    routeId: "wayward-cave",
    name: "Wayward Cave (Hidden Basement)",
    region: "Cave",
    type: "Underground",
    encounters: [
      { name: "Gible", method: "Walking", rate: "25%", lvls: "15-18", types: ["Dragon", "Ground"] },
      { name: "Bronzor", method: "Walking", rate: "30%", lvls: "14-16", types: ["Steel", "Psychic"] },
      { name: "Geodude", method: "Walking", rate: "25%", lvls: "14-16", types: ["Rock", "Ground"] },
      { name: "Zubat", method: "Walking", rate: "20%", lvls: "14-16", types: ["Poison", "Flying"] }
    ]
  },
  {
    routeId: "gu-spacious-cave",
    name: "Grand Underground: Spacious Cave",
    region: "Grand Underground",
    type: "Cavern",
    encounters: [
      { name: "Shinx", method: "Overworld Roam", rate: "Common", lvls: "16-50", types: ["Electric"] },
      { name: "Machop", method: "Overworld Roam", rate: "Common", lvls: "16-50", types: ["Fighting"] },
      { name: "Zubat", method: "Overworld Roam", rate: "Common", lvls: "16-50", types: ["Poison", "Flying"] },
      { name: "Houndoom", method: "Overworld Roam (Post-Badge 3)", rate: "Uncommon", lvls: "28-50", types: ["Dark", "Fire"] }
    ]
  },
  {
    routeId: "gu-fountainspring",
    name: "Grand Underground: Fountainspring Cave",
    region: "Grand Underground",
    type: "Water Cavern",
    encounters: [
      { name: "Squirtle", method: "Overworld Roam", rate: "Rare", lvls: "16-50", types: ["Water"] },
      { name: "Mudkip", method: "Overworld Roam", rate: "Rare", lvls: "16-50", types: ["Water"] },
      { name: "Piplup", method: "Overworld Roam", rate: "Rare", lvls: "16-50", types: ["Water"] },
      { name: "Psyduck", method: "Overworld Roam", rate: "Common", lvls: "16-50", types: ["Water"] },
      { name: "Shellos", method: "Overworld Roam", rate: "Common", lvls: "16-50", types: ["Water", "Ground"] }
    ]
  },
  {
    routeId: "gu-volcanic",
    name: "Grand Underground: Volcanic Cave",
    region: "Grand Underground",
    type: "Fire Cavern",
    encounters: [
      { name: "Charmander", method: "Overworld Roam", rate: "Rare", lvls: "16-50", types: ["Fire"] },
      { name: "Torchic", method: "Overworld Roam", rate: "Rare", lvls: "16-50", types: ["Fire"] },
      { name: "Chimchar", method: "Overworld Roam", rate: "Rare", lvls: "16-50", types: ["Fire"] },
      { name: "Numel", method: "Overworld Roam", rate: "Common", lvls: "16-50", types: ["Fire", "Ground"] },
      { name: "Magby", method: "Overworld Roam", rate: "Uncommon", lvls: "16-50", types: ["Fire"] }
    ]
  }
];

window.TYPE_CHART = TYPE_CHART;
window.ALL_TYPES = ALL_TYPES;
window.calculateMatchups = calculateMatchups;
window.LEVEL_CAPS_DATA = LEVEL_CAPS_DATA;
window.ITEMS_DATA = ITEMS_DATA;
window.BOSS_TEAMS_DATA = BOSS_TEAMS_DATA;
window.ROUTES_DATA = ROUTES_DATA;
