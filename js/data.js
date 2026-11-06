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
    {
        "id":  "ability-capsule",
        "name":  "Ability Capsule",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Mt. Coronet B1F (Hidden)",
                          "Great Marsh",
                          "Galactic HQ",
                          "Route 210 North",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "ability-patch",
        "name":  "Ability Patch",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Mt. Coronet Upper 1F (Hidden)",
                          "Fuego Ironworks",
                          "Route 224",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "adamant-mint",
        "name":  "Adamant Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Eterna Forest (Hidden)",
                          "Former Name Rater",
                          "Fuego Ironworks",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "adamant-orb",
        "name":  "Adamant Orb",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Mt. Coronet"
    },
    {
        "id":  "amulet-coin",
        "name":  "Amulet Coin",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Amity Square"
    },
    {
        "id":  "big-root",
        "name":  "Big Root",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Route 214"
    },
    {
        "id":  "black-belt",
        "name":  "Black Belt",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Route 221"
    },
    {
        "id":  "black-glasses",
        "name":  "Black Glasses",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Route 215",
                          "Celestic Town"
                      ]
    },
    {
        "id":  "black-sludge",
        "name":  "Black Sludge",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Great Marsh"
    },
    {
        "id":  "blue-scarf",
        "name":  "Blue Scarf",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Pastoria City"
    },
    {
        "id":  "bold-mint",
        "name":  "Bold Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Mt Coronet 1F (Hidden)",
                          "Former Name Rater",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "bottle-cap",
        "name":  "Bottle Cap",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Oreburgh City",
                          "Hotel Grand Lake",
                          "Iron Island",
                          "Route 210 North",
                          "Route 212 South",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "brave-mint",
        "name":  "Brave Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Former Name Rater",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "bright-powder",
        "name":  "Bright Powder",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Mt. Coronet"
    },
    {
        "id":  "calm-mint",
        "name":  "Calm Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Former Name Rater",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "careful-mint",
        "name":  "Careful Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Former Name Rater",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "charcoal",
        "name":  "Charcoal",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Route 227",
                          "attached to Charmander",
                          "Cyndaquil and Torchic gifts"
                      ]
    },
    {
        "id":  "choice-band",
        "name":  "Choice Band",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Route 214 (from NPC)"
    },
    {
        "id":  "choice-scarf",
        "name":  "Choice Scarf",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Solaceon Ruins (from NPC)"
    },
    {
        "id":  "choice-specs",
        "name":  "Choice Specs",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Celestic Town (from NPC at Morning)"
    },
    {
        "id":  "cleanse-tag",
        "name":  "Cleanse Tag",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Lost Tower"
    },
    {
        "id":  "damp-rock",
        "name":  "Damp Rock",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Route 220"
    },
    {
        "id":  "dawn-stone",
        "name":  "Dawn Stone",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Eterna City (Gift from Bike Shop Owner)",
                          "Mt. Coronet",
                          "Route 212 (South) (Hidden)",
                          "Route 225",
                          "Veilstone Dept. Store (Buyable)"
                      ]
    },
    {
        "id":  "deep-sea-scale",
        "name":  "Deep Sea Scale",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Floaroma Town",
                          "Veilstone Shady Vendor (Buyable)"
                      ]
    },
    {
        "id":  "deep-sea-tooth",
        "name":  "Deep Sea Tooth",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Floaroma Town",
                          "Veilstone Shady Vendor (Buyable)"
                      ]
    },
    {
        "id":  "destiny-knot",
        "name":  "Destiny Knot",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Route 205",
                          "Route 224"
                      ]
    },
    {
        "id":  "dragon-fang",
        "name":  "Dragon Fang",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  "Celestic Town"
    },
    {
        "id":  "dragon-scale",
        "name":  "Dragon Scale",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Veilstone City (NPC in Pokémon Center)",
                          "Victory Road",
                          "Snowpoint City (Buyable)"
                      ]
    },
    {
        "id":  "dubious-disc",
        "name":  "Dubious Disc",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Veilstone City",
                          "Snowpoint City (Buyable)"
                      ]
    },
    {
        "id":  "dusk-stone",
        "name":  "Dusk Stone",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Wayward Cave (Hidden)",
                          "Wayward Cave",
                          "Galactic Warehouse",
                          "Victory Road",
                          "Veilstone Dept. Store (Buyable)"
                      ]
    },
    {
        "id":  "electirizer",
        "name":  "Electirizer",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Hotel Grand Lake (Route 213)",
                          "Snowpoint City (Buyable)"
                      ]
    },
    {
        "id":  "everstone",
        "name":  "Everstone",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  "Veilstone Dept. Store (Buyable)"
    },
    {
        "id":  "exp-share",
        "name":  "Exp. Share",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Route 203"
    },
    {
        "id":  "expert-belt",
        "name":  "Expert Belt",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Ravaged Path",
                          "Veilstone Shady Vendor (Buyable)"
                      ]
    },
    {
        "id":  "fire-stone",
        "name":  "Fire Stone",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Oreburgh Mine",
                          "Route 211 (East)",
                          "Fuego Ironworks",
                          "Solaceon Ruins (Hidden)",
                          "Stark Mountain (Hidden)",
                          "Veilstone Dept. Store (Buyable)"
                      ]
    },
    {
        "id":  "flame-orb",
        "name":  "Flame Orb",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Veilstone Shady Vendor (Buyable)"
    },
    {
        "id":  "focus-band",
        "name":  "Focus Band",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Wayward Cave"
    },
    {
        "id":  "focus-sash",
        "name":  "Focus Sash",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Route 221",
                          "Veilstone Shady Vendor (Buyable)"
                      ]
    },
    {
        "id":  "full-incense",
        "name":  "Full Incense",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Veilstone City"
    },
    {
        "id":  "golden-bottle-cap",
        "name":  "Golden Bottle Cap",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Fuego Ironworks",
                          "Route 224",
                          "Great Marsh",
                          "Fight Zone",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "green-scarf",
        "name":  "Green Scarf",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Pastoria City"
    },
    {
        "id":  "grip-claw",
        "name":  "Grip Claw",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  "Wayward Cave"
    },
    {
        "id":  "griseous-orb",
        "name":  "Griseous Orb",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Turnback Cave"
    },
    {
        "id":  "hard-stone",
        "name":  "Hard Stone",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  "Route 207"
    },
    {
        "id":  "hasty-mint",
        "name":  "Hasty Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Former Name Rater",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "heart-scale",
        "name":  "Heart Scale",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Grand Underground",
                          "steal from Luvdisc",
                          "Jan (Quest)",
                          "reward from Lucian (Solaceon)",
                          "Celestic Elder (Quest)"
                      ]
    },
    {
        "id":  "heat-rock",
        "name":  "Heat Rock",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Route 214"
    },
    {
        "id":  "ice-stone",
        "name":  "Ice Stone",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Oreburgh Mine",
                          "Route 216",
                          "Route 217 (Ice Rock)",
                          "Snowpoint Temple",
                          "Veilstone Dept. Store (Buyable)"
                      ]
    },
    {
        "id":  "icy-rock",
        "name":  "Icy Rock",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Route 217"
    },
    {
        "id":  "impish-mint",
        "name":  "Impish Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Former Name Rater",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "iron-ball",
        "name":  "Iron Ball",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Iron Island"
    },
    {
        "id":  "jolly-mint",
        "name":  "Jolly Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Former Name Rater",
                          "Iron Island",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "king-s-rock",
        "name":  "King\u0027s Rock",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Wayward Cave",
                          "Celestic Town (Hidden)",
                          "Veilstone Shady Vendor (Buyable)"
                      ]
    },
    {
        "id":  "lagging-tail",
        "name":  "Lagging Tail",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Route 226"
    },
    {
        "id":  "lax-incense",
        "name":  "Lax Incense",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Route 225"
    },
    {
        "id":  "lax-mint",
        "name":  "Lax Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Former Name Rater",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "leaf-stone",
        "name":  "Leaf Stone",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Oreburgh Mine",
                          "Eterna Forest (Moss Rock)",
                          "Floaroma Meadow",
                          "Great Marsh (Hidden)",
                          "Route 225 (Hidden)",
                          "Veilstone Dept. Store (Buyable)"
                      ]
    },
    {
        "id":  "leftovers",
        "name":  "Leftovers",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Victory Road",
                          "Veilstone Shady Vendor (Buyable)"
                      ]
    },
    {
        "id":  "life-orb",
        "name":  "Life Orb",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Route 210 (South)",
                          "Stark Mountain",
                          "Veilstone Shady Vendor (Buyable)"
                      ]
    },
    {
        "id":  "light-ball",
        "name":  "Light Ball",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Floaroma Town"
    },
    {
        "id":  "light-clay",
        "name":  "Light Clay",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Oreburgh Gate",
                          "Veilstone Shady Vendor (Buyable)"
                      ]
    },
    {
        "id":  "lonely-mint",
        "name":  "Lonely Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Former Name Rater",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "luck-incense",
        "name":  "Luck Incense",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Ravaged Path"
    },
    {
        "id":  "lucky-egg",
        "name":  "Lucky Egg",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Pokémon Mansion"
    },
    {
        "id":  "lucky-punch",
        "name":  "Lucky Punch",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Floaroma Town"
    },
    {
        "id":  "lustrous-orb",
        "name":  "Lustrous Orb",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Mt. Coronet"
    },
    {
        "id":  "macho-brace",
        "name":  "Macho Brace",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Pastoria City"
    },
    {
        "id":  "magmarizer",
        "name":  "Magmarizer",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Hotel Grand Lake (Route 213)",
                          "Snowpoint City (Buyable)"
                      ]
    },
    {
        "id":  "magnet",
        "name":  "Magnet",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Valley Windworks"
    },
    {
        "id":  "max-revive",
        "name":  "Max Revive",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Route 224",
                          "Great Marsh",
                          "Fuego Ironworks"
                      ]
    },
    {
        "id":  "mental-herb",
        "name":  "Mental Herb",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Route 216",
                          "Veilstone Shady Vendor (Buyable)"
                      ]
    },
    {
        "id":  "metal-coat",
        "name":  "Metal Coat",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Route 207",
                          "Iron Island",
                          "Veilstone Shady Vendor (Buyable)",
                          "Sunyshore City"
                      ]
    },
    {
        "id":  "metal-powder",
        "name":  "Metal Powder",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Floaroma Town"
    },
    {
        "id":  "metronome",
        "name":  "Metronome",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Amity Square",
                          "Veilstone Shady Vendor (Buyable)"
                      ]
    },
    {
        "id":  "mild-mint",
        "name":  "Mild Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Former Name Rater",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "miracle-seed",
        "name":  "Miracle Seed",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Route 204 (North)",
                          "Floaroma Meadow",
                          "attached to Bulbasaur",
                          "Chikorita and Treecko gifts"
                      ]
    },
    {
        "id":  "modest-mint",
        "name":  "Modest Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Eterna Forest (Hidden)",
                          "Former Name Rater",
                          "Great Marsh",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "moon-stone",
        "name":  "Moon Stone",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Oreburgh Mine",
                          "Mt. Coronet (Route 211 entrance)",
                          "Eterna City (Hidden)",
                          "Mt. Coronet (Hidden)",
                          "Veilstone Dept. Store (Buyable)"
                      ]
    },
    {
        "id":  "muscle-band",
        "name":  "Muscle Band",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Oreburgh Mine"
    },
    {
        "id":  "mystic-water",
        "name":  "Mystic Water",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Pastoria City",
                          "attached to Squirtle",
                          "Totodile and Mudkip gifts"
                      ]
    },
    {
        "id":  "naive-mint",
        "name":  "Naive Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Former Name Rater",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "naughty-mint",
        "name":  "Naughty Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Former Name Rater",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "never-melt-ice",
        "name":  "Never-Melt Ice",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Mt. Coronet 1F (Hidden)",
                          "Route 207",
                          "Snowpoint Temple",
                          "Trade for Spheal in Oreburgh"
                      ]
    },
    {
        "id":  "odd-incense",
        "name":  "Odd Incense",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Solaceon Ruins"
    },
    {
        "id":  "oval-stone",
        "name":  "Oval Stone",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Oreburgh City",
                          "Lost Tower",
                          "Veilstone Dept. Store (Buyable)"
                      ]
    },
    {
        "id":  "pink-scarf",
        "name":  "Pink Scarf",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Pastoria City"
    },
    {
        "id":  "poison-barb",
        "name":  "Poison Barb",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Route 206",
                          "Trade for Skorupi in Floaroma"
                      ]
    },
    {
        "id":  "power-anklet",
        "name":  "Power Anklet",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Solaceon Town"
    },
    {
        "id":  "power-band",
        "name":  "Power Band",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Solaceon Town"
    },
    {
        "id":  "power-belt",
        "name":  "Power Belt",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Solaceon Town"
    },
    {
        "id":  "power-bracer",
        "name":  "Power Bracer",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Solaceon Town"
    },
    {
        "id":  "power-herb",
        "name":  "Power Herb",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Veilstone Shady Vendor (Buyable)"
    },
    {
        "id":  "power-lens",
        "name":  "Power Lens",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Solaceon Town"
    },
    {
        "id":  "power-weight",
        "name":  "Power Weight",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Solaceon Town"
    },
    {
        "id":  "pp-max",
        "name":  "PP Max",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Poké Mart (7 badges)"
    },
    {
        "id":  "pp-up",
        "name":  "PP Up",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Poké Mart (7 badges)"
    },
    {
        "id":  "prism-scale",
        "name":  "Prism Scale",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Mt. Coronet B1F",
                          "Snowpoint City (Buyable)"
                      ]
    },
    {
        "id":  "protector",
        "name":  "Protector",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Iron Island",
                          "Route 228",
                          "Snowpoint City (Buyable)"
                      ]
    },
    {
        "id":  "pure-incense",
        "name":  "Pure Incense",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Route 221"
    },
    {
        "id":  "quick-claw",
        "name":  "Quick Claw",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  "Jubilife City"
    },
    {
        "id":  "quick-powder",
        "name":  "Quick Powder",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Floaroma Town"
    },
    {
        "id":  "quiet-mint",
        "name":  "Quiet Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Former Name Rater",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "rash-mint",
        "name":  "Rash Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Former Name Rater",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "razor-claw",
        "name":  "Razor Claw",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Route 215",
                          "Veilstone Galactic HQ",
                          "Route 224",
                          "Victory Road",
                          "Snowpoint City (Buyable)"
                      ]
    },
    {
        "id":  "razor-fang",
        "name":  "Razor Fang",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Route 215",
                          "Route 214 (Hidden)",
                          "Snowpoint City (Buyable)"
                      ]
    },
    {
        "id":  "reaper-cloth",
        "name":  "Reaper Cloth",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Lost Tower (NPC)",
                          "Acuity Lakefront",
                          "Route 229",
                          "Snowpoint City (Buyable)"
                      ]
    },
    {
        "id":  "red-scarf",
        "name":  "Red Scarf",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Pastoria City"
    },
    {
        "id":  "relaxed-mint",
        "name":  "Relaxed Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Former Name Rater",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "rock-incense",
        "name":  "Rock Incense",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Fuego Ironworks"
    },
    {
        "id":  "rose-incense",
        "name":  "Rose Incense",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Route 212"
    },
    {
        "id":  "sassy-mint",
        "name":  "Sassy Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Former Name Rater",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "scope-lens",
        "name":  "Scope Lens",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Jubilife City",
                          "Fight Area"
                      ]
    },
    {
        "id":  "sea-incense",
        "name":  "Sea Incense",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Route 204"
    },
    {
        "id":  "serious-mint",
        "name":  "Serious Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Former Name Rater",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "sharp-beak",
        "name":  "Sharp Beak",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Trade for Chatot in Eterna",
                          "Valor Lakefront"
                      ]
    },
    {
        "id":  "shed-shell",
        "name":  "Shed Shell",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Great Marsh",
                          "Route 228"
                      ]
    },
    {
        "id":  "shell-bell",
        "name":  "Shell Bell",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Hearthome City"
    },
    {
        "id":  "shiny-stone",
        "name":  "Shiny Stone",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Oreburgh Mine",
                          "Hearthome City",
                          "Iron Island",
                          "Route 210 (North) (Hidden)",
                          "Veilstone Dept. Store (Buyable)"
                      ]
    },
    {
        "id":  "silk-scarf",
        "name":  "Silk Scarf",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Route 203"
    },
    {
        "id":  "silver-powder",
        "name":  "Silver Powder",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Eterna Forest"
    },
    {
        "id":  "smoke-ball",
        "name":  "Smoke Ball",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Route 210"
    },
    {
        "id":  "smooth-rock",
        "name":  "Smooth Rock",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Iron Island"
    },
    {
        "id":  "soft-sand",
        "name":  "Soft Sand",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Mt. Coronet"
    },
    {
        "id":  "soothe-bell",
        "name":  "Soothe Bell",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Route 203",
                          "Pokémon Mansion"
                      ]
    },
    {
        "id":  "soul-dew",
        "name":  "Soul Dew",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Oreburgh City"
    },
    {
        "id":  "spell-tag",
        "name":  "Spell Tag",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Old Chateau",
                          "Route 217"
                      ]
    },
    {
        "id":  "stick",
        "name":  "Stick",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Floaroma Town"
    },
    {
        "id":  "sticky-barb",
        "name":  "Sticky Barb",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Veilstone Dept. Store"
    },
    {
        "id":  "sun-stone",
        "name":  "Sun Stone",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Oreburgh Mine",
                          "Eterna City",
                          "Valor Lakefront (Hidden)",
                          "Mt. Coronet (Hidden)",
                          "Veilstone Dept. Store (Buyable)"
                      ]
    },
    {
        "id":  "thick-club",
        "name":  "Thick Club",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Floaroma Town"
    },
    {
        "id":  "thunder-stone",
        "name":  "Thunder Stone",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Oreburgh Mine",
                          "Route 206",
                          "Solaceon Ruins (Hidden)",
                          "Sunyshore City",
                          "Route 229 (Hidden)",
                          "Veilstone Dept. Store (Buyable)"
                      ]
    },
    {
        "id":  "timid-mint",
        "name":  "Timid Mint",
        "icon":  "🌿",
        "desc":  "Changes stat growth profile to match this Nature.",
        "category":  "Mint",
        "locations":  [
                          "Valor Lakefront",
                          "Former Name Rater",
                          "Pastoria Heart Scale Trader (Buyable)"
                      ]
    },
    {
        "id":  "toxic-orb",
        "name":  "Toxic Orb",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Galactic HQ",
                          "Veilstone Shady Vendor (Buyable)"
                      ]
    },
    {
        "id":  "twisted-spoon",
        "name":  "Twisted Spoon",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Route 209"
    },
    {
        "id":  "up-grade",
        "name":  "Up-Grade",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Hearthome City",
                          "Snowpoint City (Buyable)"
                      ]
    },
    {
        "id":  "water-stone",
        "name":  "Water Stone",
        "icon":  "✨",
        "desc":  "Triggers evolution for specific Pokémon species.",
        "category":  "Evolution",
        "locations":  [
                          "Oreburgh Mine",
                          "Route 205",
                          "Solaceon Ruins (Hidden)",
                          "Route 213",
                          "Route 230 (Hidden)",
                          "Veilstone Dept. Store (Buyable)"
                      ]
    },
    {
        "id":  "wave-incense",
        "name":  "Wave Incense",
        "icon":  "⚔️",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Route 210 (North)"
    },
    {
        "id":  "white-herb",
        "name":  "White Herb",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Floaroma Meadow",
                          "Veilstone Shady Vendor (Buyable)"
                      ]
    },
    {
        "id":  "wide-lens",
        "name":  "Wide Lens",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Veilstone Shady Vendor (Buyable)"
    },
    {
        "id":  "wise-glasses",
        "name":  "Wise Glasses",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  [
                          "Eterna Galactic Building",
                          "Veilstone Shady Vendor (Buyable)",
                          "Celestic Town"
                      ]
    },
    {
        "id":  "yellow-scarf",
        "name":  "Yellow Scarf",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Pastoria City"
    },
    {
        "id":  "zoom-lens",
        "name":  "Zoom Lens",
        "icon":  "🥊",
        "desc":  "Held battle and training item in Luminescent Platinum.",
        "category":  "Battle Item",
        "locations":  "Veilstone Shady Vendor (Buyable)"
    },
    {
        "id":  "incense-burner",
        "name":  "Incense Burner",
        "icon":  "🔑",
        "desc":  "A small incense burner shaped like a Pokémon from Sinnoh\u0027s myths. When filled with flowers, strange Pokémon stir.",
        "category":  "Key Item",
        "locations":  "Lake Verity"
    },
    {
        "id":  "guidebook",
        "name":  "Guidebook",
        "icon":  "🔑",
        "desc":  "A book full of useful information for your adventure.",
        "category":  "Key Item",
        "locations":  "Twinleaf Town"
    },
    {
        "id":  "infinite-repel",
        "name":  "Infinite Repel",
        "icon":  "🔑",
        "desc":  "A repel that never runs out, keep Pokémon away forever. This item does not work with the repel trick.",
        "category":  "Key Item",
        "locations":  "Visit a Pokémon Center"
    },
    {
        "id":  "parcel",
        "name":  "Parcel",
        "icon":  "🔑",
        "desc":  "A parcel entrusted into your care. You’re supposed to deliver it to your childhood friend who left Twinleaf Town.",
        "category":  "Key Item",
        "locations":  "Twinleaf Town"
    },
    {
        "id":  "bike",
        "name":  "Bike",
        "icon":  "🔑",
        "desc":  "A folding bike that enables a rider to get around much faster than with Running Shoes.",
        "category":  "Key Item",
        "locations":  "Twinleaf Town"
    },
    {
        "id":  "pok-radar",
        "name":  "Poké Radar",
        "icon":  "🔑",
        "desc":  "A tool that can search out Pokémon that are hiding in the tall grass.",
        "category":  "Key Item",
        "locations":  "Sandgem Town"
    },
    {
        "id":  "ds-sounds",
        "name":  "DS Sounds",
        "icon":  "🔑",
        "desc":  "A music player that allows you to listen to nostalgic songs. It’s operated with the flip of a single switch.",
        "category":  "Key Item",
        "locations":  "Jubilife City"
    },
    {
        "id":  "old-rod",
        "name":  "Old Rod",
        "icon":  "🔑",
        "desc":  "An old and beat-up fishing rod. Use it at any body of water to fish for wild aquatic Pokémon.",
        "category":  "Key Item",
        "locations":  "Jubilife City - Route 218 Gate"
    },
    {
        "id":  "sprayduck",
        "name":  "Sprayduck",
        "icon":  "🔑",
        "desc":  "A watering can shaped like a Psyduck. It helps promote the healthy growth of any Berries planted in good, soft soil.",
        "category":  "Key Item",
        "locations":  "Floaroma Town"
    },
    {
        "id":  "works-key",
        "name":  "Works Key",
        "icon":  "🔑",
        "desc":  "A large key for operating the doors of the Valley Windworks in the canyon. It was held by a Team Galactic Grunt.",
        "category":  "Key Item",
        "locations":  "Floaroma Meadow"
    },
    {
        "id":  "secret-key",
        "name":  "Secret Key",
        "icon":  "🔑",
        "desc":  "A high-tech key that has to be used at a specific location. It emits a special electronic signal to open a door.",
        "category":  "Key Item",
        "locations":  "Old Chateau"
    },
    {
        "id":  "explorer-kit",
        "name":  "Explorer Kit",
        "icon":  "🔑",
        "desc":  "A bag filled with convenient tools for exploring. It provides access to the Grand Underground.",
        "category":  "Key Item",
        "locations":  "Eterna City"
    },
    {
        "id":  "rotom-catalog",
        "name":  "Rotom Catalog",
        "icon":  "🔑",
        "desc":  "A catalog of devices that Rotom like. Use the catalog to have Rotom hop in and out of the various devices listed within.",
        "category":  "Key Item",
        "locations":  "Eterna City Galactic Building"
    },
    {
        "id":  "vs-seeker",
        "name":  "Vs. Seeker",
        "icon":  "🔑",
        "desc":  "A device that indicates Trainers who want to battle. Its battery charges while you walk.",
        "category":  "Key Item",
        "locations":  "Route 207"
    },
    {
        "id":  "poffin-case",
        "name":  "Poffin Case",
        "icon":  "🔑",
        "desc":  "A case for storing Poffins cooked from Berries.",
        "category":  "Key Item",
        "locations":  "Hearthome City"
    },
    {
        "id":  "good-rod",
        "name":  "Good Rod",
        "icon":  "🔑",
        "desc":  "A new, good-quality fishing rod. Use it at any body of water to fish for wild aquatic Pokémon.",
        "category":  "Key Item",
        "locations":  "Route 209"
    },
    {
        "id":  "point-card",
        "name":  "Point Card",
        "icon":  "🔑",
        "desc":  "A card that lists how many Battle Points you have earned.",
        "category":  "Key Item",
        "locations":  "Battle Park"
    },
    {
        "id":  "suite-key",
        "name":  "Suite Key",
        "icon":  "🔑",
        "desc":  "A key to one of the suites at a certain luxury hotel by a lake. For some odd reason, it often disappears.",
        "category":  "Key Item",
        "locations":  "Valor Lakefront (Hidden)"
    },
    {
        "id":  "secret-medicine",
        "name":  "Secret Medicine",
        "icon":  "🔑",
        "desc":  "A fantastic medicine dispensed by the pharmacy in Cianwood City. It fully heals a Pokémon of any ailment.",
        "category":  "Key Item",
        "locations":  "Route 214"
    },
    {
        "id":  "old-charm",
        "name":  "Old Charm",
        "icon":  "🔑",
        "desc":  "An ancient good-luck charm made of Pokémon bones to be taken to the elder of Celestic Town.",
        "category":  "Key Item",
        "locations":  "Route 210"
    },
    {
        "id":  "gs-ball",
        "name":  "GS Ball",
        "icon":  "🔑",
        "desc":  "A mysterious Ball. This item makes you think of the forest.",
        "category":  "Key Item",
        "locations":  "Celestic Town"
    },
    {
        "id":  "tea",
        "name":  "Tea",
        "icon":  "🔑",
        "desc":  "Aromatic tea that has a slightly bitter taste. It soothes a dry throat.",
        "category":  "Key Item",
        "locations":  "Renegade Park"
    },
    {
        "id":  "super-rod",
        "name":  "Super Rod",
        "icon":  "🔑",
        "desc":  "An awesome, high-tech fishing rod. Use it at any body of water to fish for wild aquatic Pokémon.",
        "category":  "Key Item",
        "locations":  "Snowpoint City"
    },
    {
        "id":  "galactic-key",
        "name":  "Galactic Key",
        "icon":  "🔑",
        "desc":  "A card key for disengaging the security systems in the Galactic HQ. Losing it can result in punishment, apparently.",
        "category":  "Key Item",
        "locations":  "Galactic Warehouse"
    },
    {
        "id":  "gracidea",
        "name":  "Gracidea",
        "icon":  "🔑",
        "desc":  "A flower sometimes bundled in bouquets to convey gratitude on special occasions, such as birthdays.",
        "category":  "Key Item",
        "locations":  "Pokémon League"
    },
    {
        "id":  "oak-s-letter",
        "name":  "Oak\u0027s Letter",
        "icon":  "🔑",
        "desc":  "A letter from Professor Oak. Written in it is a request for you to go to Route 224.",
        "category":  "Key Item",
        "locations":  "Twinleaf Town"
    },
    {
        "id":  "oval-charm",
        "name":  "Oval Charm",
        "icon":  "🔑",
        "desc":  "An oval charm said to increase the chance of Pokémon Eggs being found at the Nursery.",
        "category":  "Key Item",
        "locations":  "Hotel Grand Lake"
    },
    {
        "id":  "shiny-charm",
        "name":  "Shiny Charm",
        "icon":  "🔑",
        "desc":  "A shiny charm said to increase the chance of finding a Shiny Pokémon in the wild.",
        "category":  "Key Item",
        "locations":  "Hotel Grand Lake"
    },
    {
        "id":  "catching-charm",
        "name":  "Catching Charm",
        "icon":  "🔑",
        "desc":  "Holding it is said to increase the chance of getting a critical catch. Curiously, the charm doesn’t shake much.",
        "category":  "Key Item",
        "locations":  "Hotel Grand Lake"
    },
    {
        "id":  "lunar-feather",
        "name":  "Lunar Feather",
        "icon":  "🔑",
        "desc":  "A feather that glows like the moon. It’s said to possess the power to dispel nightmares.",
        "category":  "Key Item",
        "locations":  "Fullmoon Island"
    },
    {
        "id":  "member-card",
        "name":  "Member Card",
        "icon":  "🔑",
        "desc":  "A card needed for entering the inn in Canalave City. Oddly, the last date marked on it was 50 years ago.",
        "category":  "Key Item",
        "locations":  "Route 217"
    },
    {
        "id":  "wind-badge",
        "name":  "Wind Badge",
        "icon":  "🔑",
        "desc":  "The Wing badge, acquired from Heather. This item does absolutely nothing.",
        "category":  "Key Item",
        "locations":  "Route 225"
    },
    {
        "id":  "fang-badge",
        "name":  "Fang Badge",
        "icon":  "🔑",
        "desc":  "The Fang badge, acquired from Wyver. This badge is totally useless really.",
        "category":  "Key Item",
        "locations":  "Route 226"
    },
    {
        "id":  "acid-badge",
        "name":  "Acid Badge",
        "icon":  "🔑",
        "desc":  "The Acid badge, acquired from Slythe. This badge is just a pretty token.",
        "category":  "Key Item",
        "locations":  "Route 227"
    },
    {
        "id":  "shadow-badge",
        "name":  "Shadow Badge",
        "icon":  "🔑",
        "desc":  "The Shadow badge, acquired from Shade. A reminder of the impending darkness, apparently.",
        "category":  "Key Item",
        "locations":  "Route 228"
    },
    {
        "id":  "general-badge",
        "name":  "General Badge",
        "icon":  "🔑",
        "desc":  "The General badge, acquired from Gene. A token of victory over plain, but dangerous foes.",
        "category":  "Key Item",
        "locations":  "Route 229"
    },
    {
        "id":  "moon-badge",
        "name":  "Moon Badge",
        "icon":  "🔑",
        "desc":  "The Moon badge, acquired from Luna. A memento, as beautiful as the moon itself.",
        "category":  "Key Item",
        "locations":  "Route 230"
    },
    {
        "id":  "odd-invitation",
        "name":  "Odd Invitation",
        "icon":  "🔑",
        "desc":  "A mysterious invitation given to you by a nurse. It says to meet somebody at the Gate.",
        "category":  "Key Item",
        "locations":  "Resort Area"
    },
    {
        "id":  "silver-wing",
        "name":  "Silver Wing",
        "icon":  "🔑",
        "desc":  "A strange, silvery feather that sparkles.",
        "category":  "Key Item",
        "locations":  "Eterna City"
    },
    {
        "id":  "rainbow-wing",
        "name":  "Rainbow Wing",
        "icon":  "🔑",
        "desc":  "A mystical rainbow feather that sparkles.",
        "category":  "Key Item",
        "locations":  "Eterna City"
    },
    {
        "id":  "azure-flute",
        "name":  "Azure Flute",
        "icon":  "🔑",
        "desc":  "A flute that puts out echoing sounds that do not seem to be of this world. No one knows who made it.",
        "category":  "Key Item",
        "locations":  "Hearthome City"
    },
    {
        "id":  "magma-stone",
        "name":  "Magma Stone",
        "icon":  "🔑",
        "desc":  "A stone formed by boulders melting in intensely hot magma, then hardening. Magma remains sealed inside it.",
        "category":  "Key Item",
        "locations":  "Stark Mountain"
    },
    {
        "id":  "blue-orb",
        "name":  "Blue Orb",
        "icon":  "🔑",
        "desc":  "A shiny blue orb that is said to have a legend tied to it. It’s known to have a deep connection with the Hoenn region.",
        "category":  "Key Item",
        "locations":  "Oreburgh City"
    },
    {
        "id":  "red-orb",
        "name":  "Red Orb",
        "icon":  "🔑",
        "desc":  "A shiny red orb that is said to have a legend tied to it. It’s known to have a deep connection with the Hoenn region.",
        "category":  "Key Item",
        "locations":  "Oreburgh City"
    },
    {
        "id":  "jade-orb",
        "name":  "Jade Orb",
        "icon":  "🔑",
        "desc":  "A shiny green orb that is said to have a legend tied to it. It’s known to have a deep connection with the Hoenn region.",
        "category":  "Key Item",
        "locations":  "Oreburgh City"
    },
    {
        "id":  "everlasting-candy",
        "name":  "Everlasting Candy",
        "icon":  "🔑",
        "desc":  "Reusable Rare Candy key item that instantly levels up Pokémon to test builds or reach the level cap effortlessly.",
        "category":  "Key Item",
        "locations":  "Sandgem Town"
    },
    {
        "id":  "link-cable",
        "name":  "Link Cable",
        "icon":  "✨",
        "desc":  "Evolution cable triggering trade evolutions without trading.",
        "category":  "Evolution",
        "locations":  [
                          "Veilstone Dept Store (4F)",
                          "Solaceon Ruins",
                          "Grand Underground"
                      ]
    },
    {
        "id":  "peat-block",
        "name":  "Peat Block",
        "icon":  "✨",
        "desc":  "Evolves Ursaring into Ursaluna during the Full Moon in Solaceon Town.",
        "category":  "Evolution",
        "locations":  [
                          "Grand Underground mining",
                          "Route 216 snow"
                      ]
    },
    {
        "id":  "black-augurite",
        "name":  "Black Augurite",
        "icon":  "✨",
        "desc":  "Volcanic stone that evolves Scyther into Kleavor.",
        "category":  "Evolution",
        "locations":  [
                          "Grand Underground mining",
                          "Solaceon Ruins hidden room"
                      ]
    },
    {
        "id":  "tm01-focus-punch",
        "name":  "TM01 Focus Punch",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Oreburgh Gate"
                      ]
    },
    {
        "id":  "tm02-dragon-claw",
        "name":  "TM02 Dragon Claw",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Mt. Coronet"
                      ]
    },
    {
        "id":  "tm03-water-pulse",
        "name":  "TM03 Water Pulse",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 218"
                      ]
    },
    {
        "id":  "tm04-calm-mind",
        "name":  "TM04 Calm Mind",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Solaceon Ruins"
                      ]
    },
    {
        "id":  "tm05-roar",
        "name":  "TM05 Roar",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Oreburgh Gate"
                      ]
    },
    {
        "id":  "tm06-toxic",
        "name":  "TM06 Toxic",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 212 (South)"
                      ]
    },
    {
        "id":  "tm07-hail",
        "name":  "TM07 Hail",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 217"
                      ]
    },
    {
        "id":  "tm08-bulk-up",
        "name":  "TM08 Bulk Up",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 205 (South)"
                      ]
    },
    {
        "id":  "tm09-bullet-seed",
        "name":  "TM09 Bullet Seed",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 204 (North)"
                      ]
    },
    {
        "id":  "tm10-hidden-power",
        "name":  "TM10 Hidden Power",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Jubilife City"
                      ]
    },
    {
        "id":  "tm11-sunny-day",
        "name":  "TM11 Sunny Day",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 212 (North)"
                      ]
    },
    {
        "id":  "tm12-taunt",
        "name":  "TM12 Taunt",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 211 (West)"
                      ]
    },
    {
        "id":  "tm13-ice-beam",
        "name":  "TM13 Ice Beam",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Route 216"
                      ]
    },
    {
        "id":  "tm14-blizzard",
        "name":  "TM14 Blizzard",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Lake Acuity"
                      ]
    },
    {
        "id":  "tm15-hyper-beam",
        "name":  "TM15 Hyper Beam",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Sunyshore City"
                      ]
    },
    {
        "id":  "tm16-light-screen",
        "name":  "TM16 Light Screen",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Eterna Galactic Building"
                      ]
    },
    {
        "id":  "tm17-protect",
        "name":  "TM17 Protect",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Great Marsh"
                      ]
    },
    {
        "id":  "tm18-rain-dance",
        "name":  "TM18 Rain Dance",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 223"
                      ]
    },
    {
        "id":  "tm19-giga-drain",
        "name":  "TM19 Giga Drain",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 209"
                      ]
    },
    {
        "id":  "tm20-safeguard",
        "name":  "TM20 Safeguard",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 212 (North)"
                      ]
    },
    {
        "id":  "tm21-dream-eater",
        "name":  "TM21 Dream Eater",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Galactic HQ"
                      ]
    },
    {
        "id":  "tm22-solar-beam",
        "name":  "TM22 Solar Beam",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 210"
                      ]
    },
    {
        "id":  "tm23-iron-tail",
        "name":  "TM23 Iron Tail",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Iron Island"
                      ]
    },
    {
        "id":  "tm24-thunderbolt",
        "name":  "TM24 Thunderbolt",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Valley Windworks"
                      ]
    },
    {
        "id":  "tm25-thunder",
        "name":  "TM25 Thunder",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Lake Valor"
                      ]
    },
    {
        "id":  "tm26-earthquake",
        "name":  "TM26 Earthquake",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Reward from Bertha)",
        "category":  "TM",
        "locations":  [
                          "Veilstone City Dept. Store"
                      ]
    },
    {
        "id":  "tm27-low-sweep",
        "name":  "TM27 Low Sweep",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from Cheryl)",
        "category":  "TM",
        "locations":  [
                          "Eterna Forest"
                      ]
    },
    {
        "id":  "tm28-dig",
        "name":  "TM28 Dig",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Eterna City"
                      ]
    },
    {
        "id":  "tm29-psychic",
        "name":  "TM29 Psychic",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from Lucian)",
        "category":  "TM",
        "locations":  [
                          "Solaceon Town"
                      ]
    },
    {
        "id":  "tm30-shadow-ball",
        "name":  "TM30 Shadow Ball",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from Fantina)",
        "category":  "TM",
        "locations":  [
                          "Hearthome City"
                      ]
    },
    {
        "id":  "tm31-brick-break",
        "name":  "TM31 Brick Break",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 213"
                      ]
    },
    {
        "id":  "tm32-double-team",
        "name":  "TM32 Double Team",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Wayward Cave"
                      ]
    },
    {
        "id":  "tm33-reflect",
        "name":  "TM33 Reflect",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Eterna Galactic Building"
                      ]
    },
    {
        "id":  "tm34-shock-wave",
        "name":  "TM34 Shock Wave",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Valley Windworks"
                      ]
    },
    {
        "id":  "tm35-flamethrower",
        "name":  "TM35 Flamethrower",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Fuego Ironworks"
                      ]
    },
    {
        "id":  "tm36-sludge-bomb",
        "name":  "TM36 Sludge Bomb",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Great Marsh"
                      ]
    },
    {
        "id":  "tm37-sandstorm",
        "name":  "TM37 Sandstorm",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 228"
                      ]
    },
    {
        "id":  "tm38-fire-blast",
        "name":  "TM38 Fire Blast",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Lake Verity"
                      ]
    },
    {
        "id":  "tm39-rock-tomb",
        "name":  "TM39 Rock Tomb",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Ravaged Path"
                      ]
    },
    {
        "id":  "tm40-aerial-ace",
        "name":  "TM40 Aerial Ace",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Floaroma Town"
                      ]
    },
    {
        "id":  "tm41-torment",
        "name":  "TM41 Torment",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 213"
                      ]
    },
    {
        "id":  "tm42-facade",
        "name":  "TM42 Facade",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Jubilife City"
                      ]
    },
    {
        "id":  "tm43-volt-switch",
        "name":  "TM43 Volt Switch",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Amity Square"
                      ]
    },
    {
        "id":  "tm44-rest",
        "name":  "TM44 Rest",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Hearthome City"
                      ]
    },
    {
        "id":  "tm45-attract",
        "name":  "TM45 Attract",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Amity Square"
                      ]
    },
    {
        "id":  "tm46-thief",
        "name":  "TM46 Thief",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Eterna City"
                      ]
    },
    {
        "id":  "tm47-steel-wing",
        "name":  "TM47 Steel Wing",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 209"
                      ]
    },
    {
        "id":  "tm48-skill-swap",
        "name":  "TM48 Skill Swap",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Canalave City"
                      ]
    },
    {
        "id":  "tm49-brine",
        "name":  "TM49 Brine",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Galactic Warehouse"
                      ]
    },
    {
        "id":  "tm50-overheat",
        "name":  "TM50 Overheat",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from Flint)",
        "category":  "TM",
        "locations":  [
                          "Sunyshore City"
                      ]
    },
    {
        "id":  "tm51-roost",
        "name":  "TM51 Roost",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Route 210 (South)"
                      ]
    },
    {
        "id":  "tm52-focus-blast",
        "name":  "TM52 Focus Blast",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from Maylene)",
        "category":  "TM",
        "locations":  [
                          "Route 217"
                      ]
    },
    {
        "id":  "tm53-energy-ball",
        "name":  "TM53 Energy Ball",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Valor Lakefront"
                      ]
    },
    {
        "id":  "tm54-false-swipe",
        "name":  "TM54 False Swipe",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Eterna City (Guardhouse)"
                      ]
    },
    {
        "id":  "tm55-scald",
        "name":  "TM55 Scald",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC (requires Burn Heal))",
        "category":  "TM",
        "locations":  [
                          "Hearthome City"
                      ]
    },
    {
        "id":  "tm56-fling",
        "name":  "TM56 Fling",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 222"
                      ]
    },
    {
        "id":  "tm57-wild-charge",
        "name":  "TM57 Wild Charge",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Reward from Volkner)",
        "category":  "TM",
        "locations":  [
                          "Sunyshore Gym"
                      ]
    },
    {
        "id":  "tm58-endure",
        "name":  "TM58 Endure",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 203"
                      ]
    },
    {
        "id":  "tm59-dragon-pulse",
        "name":  "TM59 Dragon Pulse",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Maniac Tunnel"
                      ]
    },
    {
        "id":  "tm60-drain-punch",
        "name":  "TM60 Drain Punch",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Reward from Maylene)",
        "category":  "TM",
        "locations":  [
                          "Veilstone Gym"
                      ]
    },
    {
        "id":  "tm61-will-o-wisp",
        "name":  "TM61 Will-O-Wisp",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Lost Tower"
                      ]
    },
    {
        "id":  "tm62-bug-buzz",
        "name":  "TM62 Bug Buzz",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 212 (South)"
                      ]
    },
    {
        "id":  "tm63-nasty-plot",
        "name":  "TM63 Nasty Plot",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Veilstone City"
                      ]
    },
    {
        "id":  "tm64-explosion",
        "name":  "TM64 Explosion",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Bought from Shady Vendor)",
        "category":  "TM",
        "locations":  [
                          "Veilstone City"
                      ]
    },
    {
        "id":  "tm65-shadow-claw",
        "name":  "TM65 Shadow Claw",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Old Chateau"
                      ]
    },
    {
        "id":  "tm66-payback",
        "name":  "TM66 Payback",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Route 215"
                      ]
    },
    {
        "id":  "tm67-recycle",
        "name":  "TM67 Recycle",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Eterna City"
                      ]
    },
    {
        "id":  "tm68-giga-impact",
        "name":  "TM68 Giga Impact",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Victory Road"
                      ]
    },
    {
        "id":  "tm69-rock-polish",
        "name":  "TM69 Rock Polish",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Mt. Coronet"
                      ]
    },
    {
        "id":  "tm70-flash",
        "name":  "TM70 Flash",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Oreburgh Gate"
                      ]
    },
    {
        "id":  "tm71-stone-edge",
        "name":  "TM71 Stone Edge",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Ravaged Path"
                      ]
    },
    {
        "id":  "tm72-avalanche",
        "name":  "TM72 Avalanche",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Reward from Candice)",
        "category":  "TM",
        "locations":  [
                          "Snowpoint City"
                      ]
    },
    {
        "id":  "tm73-thunder-wave",
        "name":  "TM73 Thunder Wave",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Eterna Galactic Bldg"
                      ]
    },
    {
        "id":  "tm74-gyro-ball",
        "name":  "TM74 Gyro Ball",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 206"
                      ]
    },
    {
        "id":  "tm75-swords-dance",
        "name":  "TM75 Swords Dance",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 208"
                      ]
    },
    {
        "id":  "tm76-stealth-rock",
        "name":  "TM76 Stealth Rock",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Reward from Roark)",
        "category":  "TM",
        "locations":  [
                          "Oreburgh Gym"
                      ]
    },
    {
        "id":  "tm77-psych-up",
        "name":  "TM77 Psych Up",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Route 211"
                      ]
    },
    {
        "id":  "tm78-snarl",
        "name":  "TM78 Snarl",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Route 204"
                      ]
    },
    {
        "id":  "tm79-dark-pulse",
        "name":  "TM79 Dark Pulse",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Veilstone City"
                      ]
    },
    {
        "id":  "tm80-rock-slide",
        "name":  "TM80 Rock Slide",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Show Aerodactyl to NPC)",
        "category":  "TM",
        "locations":  [
                          "Eterna City"
                      ]
    },
    {
        "id":  "tm81-x-scissor",
        "name":  "TM81 X-Scissor",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from Aaron)",
        "category":  "TM",
        "locations":  [
                          "Route 208"
                      ]
    },
    {
        "id":  "tm82-sleep-talk",
        "name":  "TM82 Sleep Talk",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Eterna Forest Outside"
                      ]
    },
    {
        "id":  "tm83-hyper-voice",
        "name":  "TM83 Hyper Voice",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 215"
                      ]
    },
    {
        "id":  "tm84-poison-jab",
        "name":  "TM84 Poison Jab",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 212 (South)"
                      ]
    },
    {
        "id":  "tm85-dazzling-gleam",
        "name":  "TM85 Dazzling Gleam",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from Mira)",
        "category":  "TM",
        "locations":  [
                          "Wayward Cave"
                      ]
    },
    {
        "id":  "tm86-grass-knot",
        "name":  "TM86 Grass Knot",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Reward from Gardenia)",
        "category":  "TM",
        "locations":  [
                          "Eterna Gym"
                      ]
    },
    {
        "id":  "tm87-swagger",
        "name":  "TM87 Swagger",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Pokémon Mansion"
                      ]
    },
    {
        "id":  "tm88-hurricane",
        "name":  "TM88 Hurricane",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Route 210 (North)"
                      ]
    },
    {
        "id":  "tm89-u-turn",
        "name":  "TM89 U-turn",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Canalave City"
                      ]
    },
    {
        "id":  "tm90-substitute",
        "name":  "TM90 Substitute",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Old Chateau"
                      ]
    },
    {
        "id":  "tm91-flash-cannon",
        "name":  "TM91 Flash Cannon",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Reward from Byron)",
        "category":  "TM",
        "locations":  [
                          "Canalave Gym"
                      ]
    },
    {
        "id":  "tm92-trick-room",
        "name":  "TM92 Trick Room",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Route 213"
                      ]
    },
    {
        "id":  "tm93-cut",
        "name":  "TM93 Cut",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from Cynthia)",
        "category":  "TM",
        "locations":  [
                          "Eterna City"
                      ]
    },
    {
        "id":  "tm94-fly",
        "name":  "TM94 Fly",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on ground)",
        "category":  "TM",
        "locations":  [
                          "Galactic Warehouse"
                      ]
    },
    {
        "id":  "tm95-surf",
        "name":  "TM95 Surf",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Celestic Town"
                      ]
    },
    {
        "id":  "tm96-strength",
        "name":  "TM96 Strength",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from Riley)",
        "category":  "TM",
        "locations":  [
                          "Iron Island"
                      ]
    },
    {
        "id":  "tm97-defog",
        "name":  "TM97 Defog",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Item on the ground)",
        "category":  "TM",
        "locations":  [
                          "Solaceon Ruins"
                      ]
    },
    {
        "id":  "tm98-rock-smash",
        "name":  "TM98 Rock Smash",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from NPC)",
        "category":  "TM",
        "locations":  [
                          "Oreburgh Gate"
                      ]
    },
    {
        "id":  "tm99-waterfall",
        "name":  "TM99 Waterfall",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Reward from Wake)",
        "category":  "TM",
        "locations":  [
                          "Pastoria Gym"
                      ]
    },
    {
        "id":  "tm100-rock-climb",
        "name":  "TM100 Rock Climb",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Gift from Candice)",
        "category":  "TM",
        "locations":  [
                          "Snowpoint City"
                      ]
    },
    {
        "id":  "tm101-charge-beam",
        "name":  "TM101 Charge Beam",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Obtained from TM Completionist at the Pokémon League)",
        "category":  "TM",
        "locations":  [
                          "Pokémon League"
                      ]
    },
    {
        "id":  "tm102-bulldoze",
        "name":  "TM102 Bulldoze",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Obtained from TM Completionist at the Pokémon League)",
        "category":  "TM",
        "locations":  [
                          "Pokémon League"
                      ]
    },
    {
        "id":  "tm103-pluck",
        "name":  "TM103 Pluck",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Obtained from TM Completionist at the Pokémon League)",
        "category":  "TM",
        "locations":  [
                          "Pokémon League"
                      ]
    },
    {
        "id":  "tm104-work-up",
        "name":  "TM104 Work Up",
        "icon":  "💿",
        "desc":  "Technical Machine teaching a battle move. (Obtained from TM Completionist at the Pokémon League)",
        "category":  "TM",
        "locations":  [
                          "Pokémon League"
                      ]
    },
    {
        "id":  "sitrus-berry",
        "name":  "Sitrus Berry",
        "icon":  "🫐",
        "desc":  "Restores 25% max HP when HP drops below 50%.",
        "category":  "Berry",
        "locations":  [
                          "Berry trees across Sinnoh"
                      ]
    },
    {
        "id":  "lum-berry",
        "name":  "Lum Berry",
        "icon":  "🫐",
        "desc":  "Instantly cures any status condition.",
        "category":  "Berry",
        "locations":  [
                          "Route 212 Berry Master, Berry trees"
                      ]
    },
    {
        "id":  "yache-berry",
        "name":  "Yache Berry",
        "icon":  "🫐",
        "desc":  "Weakens a super-effective Ice-type attack by 50%.",
        "category":  "Berry",
        "locations":  [
                          "Pastoria City Berry Master (daily gift)"
                      ]
    },
    {
        "id":  "passho-berry",
        "name":  "Passho Berry",
        "icon":  "🫐",
        "desc":  "Weakens a super-effective Water-type attack by 50%.",
        "category":  "Berry",
        "locations":  [
                          "Route 212 Berry Master"
                      ]
    },
    {
        "id":  "rindo-berry",
        "name":  "Rindo Berry",
        "icon":  "🫐",
        "desc":  "Weakens a super-effective Grass-type attack by 50%.",
        "category":  "Berry",
        "locations":  [
                          "Route 212 Berry Master"
                      ]
    },
    {
        "id":  "chople-berry",
        "name":  "Chople Berry",
        "icon":  "🫐",
        "desc":  "Weakens a super-effective Fighting-type attack by 50%.",
        "category":  "Berry",
        "locations":  [
                          "Route 212 Berry Master"
                      ]
    },
    {
        "id":  "colbur-berry",
        "name":  "Colbur Berry",
        "icon":  "🫐",
        "desc":  "Weakens a super-effective Dark-type attack by 50%.",
        "category":  "Berry",
        "locations":  [
                          "Route 212 Berry Master"
                      ]
    },
    {
        "id":  "shuca-berry",
        "name":  "Shuca Berry",
        "icon":  "🫐",
        "desc":  "Weakens a super-effective Ground-type attack by 50%.",
        "category":  "Berry",
        "locations":  [
                          "Route 212 Berry Master"
                      ]
    },
    {
        "id":  "babiri-berry",
        "name":  "Babiri Berry",
        "icon":  "🫐",
        "desc":  "Weakens a super-effective Steel-type attack by 50%.",
        "category":  "Berry",
        "locations":  [
                          "Route 212 Berry Master"
                      ]
    },
    {
        "id":  "occa-berry",
        "name":  "Occa Berry",
        "icon":  "🫐",
        "desc":  "Weakens a super-effective Fire-type attack by 50%.",
        "category":  "Berry",
        "locations":  [
                          "Route 212 Berry Master"
                      ]
    },
    {
        "id":  "wacan-berry",
        "name":  "Wacan Berry",
        "icon":  "🫐",
        "desc":  "Weakens a super-effective Electric-type attack by 50%.",
        "category":  "Berry",
        "locations":  [
                          "Route 212 Berry Master"
                      ]
    },
    {
        "id":  "payapa-berry",
        "name":  "Payapa Berry",
        "icon":  "🫐",
        "desc":  "Weakens a super-effective Psychic-type attack by 50%.",
        "category":  "Berry",
        "locations":  [
                          "Route 212 Berry Master"
                      ]
    },
    {
        "id":  "coba-berry",
        "name":  "Coba Berry",
        "icon":  "🫐",
        "desc":  "Weakens a super-effective Flying-type attack by 50%.",
        "category":  "Berry",
        "locations":  [
                          "Route 212 Berry Master"
                      ]
    },
    {
        "id":  "haban-berry",
        "name":  "Haban Berry",
        "icon":  "🫐",
        "desc":  "Weakens a super-effective Dragon-type attack by 50%.",
        "category":  "Berry",
        "locations":  [
                          "Route 212 Berry Master"
                      ]
    },
    {
        "id":  "kasib-berry",
        "name":  "Kasib Berry",
        "icon":  "🫐",
        "desc":  "Weakens a super-effective Ghost-type attack by 50%.",
        "category":  "Berry",
        "locations":  [
                          "Route 212 Berry Master"
                      ]
    },
    {
        "id":  "roseli-berry",
        "name":  "Roseli Berry",
        "icon":  "🫐",
        "desc":  "Weakens a super-effective Fairy-type attack by 50%.",
        "category":  "Berry",
        "locations":  [
                          "Route 212 Berry Master"
                      ]
    },
    {
        "id":  "custap-berry",
        "name":  "Custap Berry",
        "icon":  "🫐",
        "desc":  "Allows holder to strike first in priority when HP is low.",
        "category":  "Berry",
        "locations":  [
                          "Battle Park (32 BP)"
                      ]
    },
    {
        "id":  "salac-berry",
        "name":  "Salac Berry",
        "icon":  "🫐",
        "desc":  "Sharply boosts Speed by +1 in a pinch.",
        "category":  "Berry",
        "locations":  [
                          "Battle Park (32 BP)"
                      ]
    }
];

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
      { name: "Shinx", method: "Walking", rate: "20%", lvls: "3-5", types: ["Electric"] },
      { name: "Poochyena", method: "Walking", rate: "15%", lvls: "3-5", types: ["Dark"] },
      { name: "Houndour", method: "Walking (Night)", rate: "15%", lvls: "3-5", types: ["Dark", "Fire"] },
      { name: "Starly", method: "Walking", rate: "20%", lvls: "3-4", types: ["Normal", "Flying"] },
      { name: "Bidoof", method: "Walking", rate: "15%", lvls: "3-4", types: ["Normal"] },
      { name: "Growlithe", method: "Walking / Radar", rate: "10%", lvls: "4-5", types: ["Fire"] },
      { name: "Kricketot", method: "Morning/Night", rate: "10%", lvls: "3-4", types: ["Bug"] }
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
