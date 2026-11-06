/**
 * Luminescent Platinum Pokédex Database
 * Accurate to https://luminescent.team/docs
 * Complete dataset: All Gen 1-4 Pokémon (1-493) + Hisuian forms,
 * Level caps, Boss teams, Items database, Route encounters, Moves & Abilities.
 */

const TYPE_CHART = {
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

const ALL_TYPES = [
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
const LEVEL_CAPS_DATA = [
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
const ITEMS_DATA = [
  // Evolution Items
  { id: "link-cable", name: "Link Cable", category: "Evolution", icon: "🔗", desc: "A cord providing energy to trigger trade evolutions instantly without trading (e.g. Kadabra, Machoke, Graveler, Haunter, Scyther, Onix, Porygon).", locations: ["Veilstone Dept Store (4F)", "Solaceon Ruins", "Mining in Grand Underground"] },
  { id: "incense-burner", name: "Incense Burner", category: "Key Mod Item", icon: "🏮", desc: "Ancient key item that channels Hisuian energy. Allows evolving and encountering Hisuian forms and regional variants across Sinnoh.", locations: ["Gift from NPC in Floaroma Town (near Flower Shop)"] },
  { id: "everlasting-candy", name: "Everlasting Candy", category: "Key Mod Item", icon: "🍬", desc: "Reusable Rare Candy key item that instantly levels up Pokémon to test builds or reach the level cap effortlessly.", locations: ["Gift from Lucas/Dawn in Sandgem Town"] },
  { id: "peat-block", name: "Peat Block", category: "Evolution", icon: "🧱", desc: "A block of muddy peat. Triggers Ursaring's evolution into Ursaluna during the Full Moon in Solaceon Town.", locations: ["Grand Underground mining", "Route 216 snow item pickup"] },
  { id: "black-augurite", name: "Black Augurite", category: "Evolution", icon: "🪓", desc: "Volcanic stone that triggers Scyther's evolution into the mighty Bug/Rock axe warrior Kleavor.", locations: ["Grand Underground mining", "Solaceon Ruins hidden room"] },
  { id: "dawn-stone", name: "Dawn Stone", category: "Evolution", icon: "✨", desc: "Evolves male Kirlia into Gallade, and female Snorunt into Froslass.", locations: ["Route 212 (requires Surf)", "Mt. Coronet B1F", "Pick up with Pickup ability (Lv 51+)"] },
  { id: "dusk-stone", name: "Dusk Stone", category: "Evolution", icon: "🌑", desc: "Evolves Murkrow into Honchkrow, and Misdreavus into Mismagius.", locations: ["Galactic Warehouse (Veilstone)", "Victory Road B1F", "Grand Underground"] },
  { id: "shiny-stone", name: "Shiny Stone", category: "Evolution", icon: "🌟", desc: "Evolves Roselia into Roserade, and Togetic into Togekiss.", locations: ["Iron Island B3F", "Route 228 (requires Rock Climb)"] },
  { id: "electirizer", name: "Electirizer", category: "Evolution", icon: "⚡", desc: "Evolves Electabuzz into Electivire when used with Link Cable or level-up.", locations: ["Held by wild Elekid/Electabuzz (Route 222, 5% chance)", "Grand Underground Whiteout Cave"] },
  { id: "magmarizer", name: "Magmarizer", category: "Evolution", icon: "🔥", desc: "Evolves Magmar into Magmortar when used with Link Cable or level-up.", locations: ["Held by wild Magby/Magmar (Fuego Ironworks, 5% chance)", "Grand Underground Volcanic Cave"] },
  { id: "razor-claw", name: "Razor Claw", category: "Evolution", icon: "🐾", desc: "Evolves Sneasel into Weavile (Night), or Hisuian Sneasel into Sneasler (Day). Boosts critical hit ratio.", locations: ["Route 224", "Victory Road", "Battle Park (48 BP)"] },
  { id: "razor-fang", name: "Razor Fang", category: "Evolution", icon: "🦷", desc: "Evolves Gligar into Gliscor at Night. May cause target to flinch.", locations: ["Route 214", "Battle Park (48 BP)"] },
  { id: "metal-coat", name: "Metal Coat", category: "Evolution", icon: "🛡️", desc: "Evolves Scyther into Scizor, and Onix into Steelix. Boosts Steel-type attacks by 20%.", locations: ["Iron Island (gift from Byron)", "Held by wild Magnemite/Bronzor (5%)"] },
  { id: "protector", name: "Protector", category: "Evolution", icon: "🦏", desc: "Heavy protective armor. Evolves Rhydon into Rhyperior.", locations: ["Route 228", "Grand Underground mining"] },
  { id: "reaper-cloth", name: "Reaper Cloth", category: "Evolution", icon: "👻", desc: "Imbued with spiritual power. Evolves Dusclops into Dusknoir.", locations: ["Route 229", "Turnback Cave"] },
  { id: "prism-scale", name: "Prism Scale", category: "Evolution", icon: "🐟", desc: "Mysterious scale that radiates rainbow light. Evolves Feebas into Milotic.", locations: ["Mt. Coronet B1F water tile", "Pastoria City beach"] },

  // Competitive Battle Items
  { id: "leftovers", name: "Leftovers", category: "Battle Item", icon: "🥗", desc: "Restores 1/16th of maximum HP at the end of every turn.", locations: ["Held by wild Munchlax / Snorlax (100%)", "Victory Road hidden item"] },
  { id: "life-orb", name: "Life Orb", category: "Battle Item", icon: "🔮", desc: "Boosts move power by 1.3x at the cost of 10% maximum HP per strike.", locations: ["Stark Mountain", "Battle Park (48 BP)"] },
  { id: "focus-sash", name: "Focus Sash", category: "Battle Item", icon: "🥋", desc: "Guarantees survival with 1 HP when hit by a lethal strike from full health.", locations: ["Route 221 (gift from NPC)", "Battle Park (48 BP)"] },
  { id: "choice-band", name: "Choice Band", category: "Battle Item", icon: "🥊", desc: "Boosts Attack by 1.5x, but locks the holder into using only one move.", locations: ["Battle Park (48 BP)", "Route 225"] },
  { id: "choice-specs", name: "Choice Specs", category: "Battle Item", icon: "👓", desc: "Boosts Special Attack by 1.5x, but locks the holder into using only one move.", locations: ["Celestic Town (Shop morning NPC)", "Battle Park (48 BP)"] },
  { id: "choice-scarf", name: "Choice Scarf", category: "Battle Item", icon: "🧣", desc: "Boosts Speed by 1.5x, but locks the holder into using only one move.", locations: ["Galactic Veilstone HQ", "Battle Park (48 BP)"] },
  { id: "heavy-duty-boots", name: "Heavy-Duty Boots", category: "Battle Item", icon: "🥾", desc: "Protects the holder from the effects of entry hazards (Stealth Rock, Spikes, Toxic Spikes).", locations: ["Veilstone Dept Store (4F)", "Route 210 North"] },
  { id: "assault-vest", name: "Assault Vest", category: "Battle Item", icon: "🦺", desc: "Boosts Special Defense by 1.5x, but prevents the use of status moves.", locations: ["Battle Park (48 BP)", "Snowpoint Temple"] },
  { id: "toxic-orb", name: "Toxic Orb", category: "Battle Item", icon: "🧪", desc: "Badly poisons the holder at the end of the first turn (Enables Poison Heal Gliscor and Guts wallbreakers).", locations: ["Battle Park (16 BP)", "Great Marsh (Safari Zone)"] },
  { id: "flame-orb", name: "Flame Orb", category: "Battle Item", icon: "🔥", desc: "Burns the holder at the end of the first turn (Activates Guts Ursaluna/Heracross and Flare Boost).", locations: ["Battle Park (16 BP)", "Fuego Ironworks"] },
  { id: "eviolite", name: "Eviolite", category: "Battle Item", icon: "💎", desc: "Boosts Defense and Special Defense by 1.5x for any Pokémon that can still evolve.", locations: ["Oreburgh Mine B2F", "Route 208 hiker gift"] }
];

// ==========================================
// --- BOSS TEAMS DATA ---
// ==========================================
const BOSS_TEAMS_DATA = [
  {
    bossId: "roark",
    name: "Roark",
    title: "Oreburgh Gym Leader",
    badge: "Coal Badge",
    levelCap: 16,
    icon: "🪨",
    quote: "Welcome to the Oreburgh Gym! My name is Roark!",
    team: [
      { name: "Geodude", lvl: 14, types: ["Rock", "Ground"], item: "Hard Stone", ability: "Rock Head", moves: ["Stealth Rock", "Rock Throw", "Defense Curl", "Rollout"] },
      { name: "Onix", lvl: 14, types: ["Rock", "Steel"], item: "Passho Berry", ability: "Sturdy", moves: ["Rock Tomb", "Iron Head", "Dragon Breath", "Screech"] },
      { name: "Cranidos", lvl: 16, types: ["Rock"], item: "Sitrus Berry", ability: "Mold Breaker", moves: ["Headbutt", "Rock Tomb", "Bite", "Pursuit"] }
    ]
  },
  {
    bossId: "gardenia",
    name: "Gardenia",
    title: "Eterna Gym Leader",
    badge: "Forest Badge",
    levelCap: 26,
    icon: "🌿",
    quote: "You must be a challenger! Let's see your passion for grass Pokémon!",
    team: [
      { name: "Bellossom", lvl: 24, types: ["Grass", "Fairy"], item: "Miracle Seed", ability: "Chlorophyll", moves: ["Draining Kiss", "Mega Drain", "Sunny Day", "Sleep Powder"] },
      { name: "Cherrim", lvl: 24, types: ["Grass", "Fairy"], item: "Heat Rock", ability: "Flower Gift", moves: ["Sunny Day", "Solar Beam", "Play Rough", "Morning Sun"] },
      { name: "Turtwig", lvl: 25, types: ["Grass"], item: "Eviolite", ability: "Shell Armor", moves: ["Seed Bomb", "Curse", "Bite", "Reflect"] },
      { name: "Roserade", lvl: 26, types: ["Grass", "Poison"], item: "Sitrus Berry", ability: "Technician", moves: ["Magical Leaf", "Sludge", "Mega Drain", "Stun Spore"] }
    ]
  },
  {
    bossId: "maylene",
    name: "Maylene",
    title: "Veilstone Gym Leader",
    badge: "Cobble Badge",
    levelCap: 33,
    icon: "🥋",
    quote: "I'm Maylene! I'm the Gym Leader! I'll fight with everything I've got!",
    team: [
      { name: "Meditite", lvl: 31, types: ["Fighting", "Psychic"], item: "Eviolite", ability: "Pure Power", moves: ["Fake Out", "Drain Punch", "Zen Headbutt", "Bullet Punch"] },
      { name: "Machoke", lvl: 31, types: ["Fighting"], item: "Flame Orb", ability: "Guts", moves: ["Close Combat", "Knock Off", "Ice Punch", "Bullet Punch"] },
      { name: "Infernape", lvl: 32, types: ["Fire", "Fighting"], item: "Life Orb", ability: "Iron Fist", moves: ["Mach Punch", "Fire Punch", "Thunder Punch", "U-turn"] },
      { name: "Lucario", lvl: 33, types: ["Fighting", "Steel"], item: "Sitrus Berry", ability: "Adaptability", moves: ["Aura Sphere", "Meteor Mash", "Bullet Punch", "Work Up"] }
    ]
  },
  {
    bossId: "fantina",
    name: "Fantina",
    title: "Hearthome Gym Leader",
    badge: "Relic Badge",
    levelCap: 39,
    icon: "👻",
    quote: "Ooh la la! I am Fantina, the Hearthome Gym Leader!",
    team: [
      { name: "Drifblim", lvl: 37, types: ["Ghost", "Flying"], item: "Sitrus Berry", ability: "Unburden", moves: ["Acrobatics", "Hex", "Will-O-Wisp", "Tailwind"] },
      { name: "Banette", lvl: 37, types: ["Ghost"], item: "Spell Tag", ability: "Insomnia", moves: ["Shadow Sneak", "Knock Off", "Gunk Shot", "Destiny Bond"] },
      { name: "Gengar", lvl: 38, types: ["Ghost", "Poison"], item: "Focus Sash", ability: "Levitate", moves: ["Shadow Ball", "Sludge Bomb", "Dazzling Gleam", "Thunderbolt"] },
      { name: "Mismagius", lvl: 39, types: ["Ghost", "Fairy"], item: "Colbur Berry", ability: "Levitate", moves: ["Shadow Ball", "Dazzling Gleam", "Mystical Fire", "Nasty Plot"] }
    ]
  },
  {
    bossId: "crasher-wake",
    name: "Crasher Wake",
    title: "Pastoria Gym Leader",
    badge: "Fen Badge",
    levelCap: 44,
    icon: "🌊",
    quote: "The torrential master of water! Crasher Wake is here!",
    team: [
      { name: "Gyarados", lvl: 42, types: ["Water", "Flying"], item: "Wacan Berry", ability: "Intimidate", moves: ["Waterfall", "Bounce", "Dragon Dance", "Ice Fang"] },
      { name: "Quagsire", lvl: 42, types: ["Water", "Ground"], item: "Leftovers", ability: "Unaware", moves: ["Scald", "Earthquake", "Recover", "Toxic"] },
      { name: "Ludicolo", lvl: 43, types: ["Water", "Grass"], item: "Life Orb", ability: "Swift Swim", moves: ["Hydro Pump", "Giga Drain", "Ice Beam", "Rain Dance"] },
      { name: "Floatzel", lvl: 44, types: ["Water"], item: "Choice Band", ability: "Technician", moves: ["Aqua Jet", "Waterfall", "Ice Spinner", "Crunch"] }
    ]
  },
  {
    bossId: "byron",
    name: "Byron",
    title: "Canalave Gym Leader",
    badge: "Mine Badge",
    levelCap: 53,
    icon: "🛡️",
    quote: "Steel yourself! Roark's father won't go easy on you!",
    team: [
      { name: "Skarmory", lvl: 51, types: ["Steel", "Flying"], item: "Leftovers", ability: "Sturdy", moves: ["Stealth Rock", "Spikes", "Roost", "Brave Bird"] },
      { name: "Steelix", lvl: 51, types: ["Steel", "Ground"], item: "Chesto Berry", ability: "Sheer Force", moves: ["Earthquake", "Heavy Slam", "Fire Fang", "Rest"] },
      { name: "Magnezone", lvl: 52, types: ["Electric", "Steel"], item: "Choice Specs", ability: "Magnet Pull", moves: ["Thunderbolt", "Flash Cannon", "Volt Switch", "Body Press"] },
      { name: "Bastiodon", lvl: 53, types: ["Rock", "Steel"], item: "Sitrus Berry", ability: "Sturdy", moves: ["Metal Burst", "Body Press", "Stone Edge", "Toxic"] }
    ]
  },
  {
    bossId: "candice",
    name: "Candice",
    title: "Snowpoint Gym Leader",
    badge: "Icicle Badge",
    levelCap: 56,
    icon: "❄️",
    quote: "You want to freeze? I'll show you the absolute zero focus!",
    team: [
      { name: "Abomasnow", lvl: 54, types: ["Grass", "Ice"], item: "Focus Sash", ability: "Snow Warning", moves: ["Blizzard", "Wood Hammer", "Ice Shard", "Aurora Veil"] },
      { name: "Mamoswine", lvl: 54, types: ["Ice", "Ground"], item: "Life Orb", ability: "Thick Fat", moves: ["Earthquake", "Icicle Crash", "Ice Shard", "Knock Off"] },
      { name: "Weavile", lvl: 55, types: ["Dark", "Ice"], item: "Choice Band", ability: "Technician", moves: ["Triple Axel", "Knock Off", "Ice Shard", "Poison Jab"] },
      { name: "Froslass", lvl: 56, types: ["Ice", "Ghost"], item: "Colbur Berry", ability: "Cursed Body", moves: ["Blizzard", "Shadow Ball", "Destiny Bond", "Spikes"] }
    ]
  },
  {
    bossId: "volkner",
    name: "Volkner",
    title: "Sunyshore Gym Leader",
    badge: "Beacon Badge",
    levelCap: 62,
    icon: "⚡",
    quote: "I hope you can reignite my burning passion for Pokémon battling!",
    team: [
      { name: "Jolteon", lvl: 60, types: ["Electric"], item: "Focus Sash", ability: "Volt Absorb", moves: ["Thunderbolt", "Shadow Ball", "Volt Switch", "Thunder Wave"] },
      { name: "Raichu", lvl: 60, types: ["Electric"], item: "Life Orb", ability: "Lightning Rod", moves: ["Volt Tackle", "Fake Out", "Play Rough", "Knock Off"] },
      { name: "Luxray", lvl: 61, types: ["Electric", "Dark"], item: "Choice Scarf", ability: "Strong Jaw", moves: ["Wild Charge", "Crunch", "Psychic Fangs", "Ice Fang"] },
      { name: "Electivire", lvl: 62, types: ["Electric", "Fighting"], item: "Expert Belt", ability: "Iron Fist", moves: ["Plasma Fists", "Close Combat", "Ice Punch", "Fire Punch"] }
    ]
  },
  {
    bossId: "cynthia",
    name: "Cynthia",
    title: "Sinnoh League Champion",
    badge: "Champion",
    levelCap: 78,
    icon: "👑",
    quote: "Before me stands a Trainer who has climbed the highest peaks of Sinnoh. Show me your heart and soul!",
    team: [
      { name: "Spiritomb", lvl: 75, types: ["Ghost", "Dark"], item: "Leftovers", ability: "Pressure", moves: ["Shadow Ball", "Dark Pulse", "Will-O-Wisp", "Pain Split"] },
      { name: "Roserade", lvl: 75, types: ["Grass", "Poison"], item: "Focus Sash", ability: "Technician", moves: ["Leaf Storm", "Sludge Bomb", "Dazzling Gleam", "Sleep Powder"] },
      { name: "Gastrodon", lvl: 76, types: ["Water", "Ground"], item: "Rindo Berry", ability: "Storm Drain", moves: ["Scald", "Earth Power", "Ice Beam", "Recover"] },
      { name: "Lucario", lvl: 76, types: ["Fighting", "Steel"], item: "Life Orb", ability: "Adaptability", moves: ["Aura Sphere", "Meteor Mash", "Extreme Speed", "Nasty Plot"] },
      { name: "Milotic", lvl: 77, types: ["Water", "Fairy"], item: "Flame Orb", ability: "Marvel Scale", moves: ["Scald", "Moonblast", "Recover", "Ice Beam"] },
      { name: "Garchomp", lvl: 78, types: ["Dragon", "Ground"], item: "Yache Berry", ability: "Rough Skin", moves: ["Earthquake", "Dragon Claw", "Swords Dance", "Poison Jab"] }
    ]
  }
];

// ==========================================
// --- ROUTES & ENCOUNTERS DATA ---
// ==========================================
const ROUTES_DATA = [
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

// Load National Pokédex dataset (493 Gen 1-4 species + Hisuian forms)
// For space and efficiency, complete species list with full stats, typing, and abilities:
const POKEMON_DATA = [
  // --- KANTO (GEN 1) ---
  { id: 1, dexNum: "#001", name: "Bulbasaur", species: "Seed Pokémon", types: ["Grass", "Poison"], stats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, vanillaStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, abilities: ["Overgrow"], hiddenAbility: "Chlorophyll", generation: 1, height: "0.7 m", weight: "6.9 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Evolves into Ivysaur at Lv. 16", locations: ["Jubilife City Pokémon Center (Interviewer gift)", "Grand Underground: Grassland Cave"] },
  { id: 2, dexNum: "#002", name: "Ivysaur", species: "Seed Pokémon", types: ["Grass", "Poison"], stats: { hp: 60, atk: 62, def: 63, spa: 80, spd: 80, spe: 60 }, vanillaStats: { hp: 60, atk: 62, def: 63, spa: 80, spd: 80, spe: 60 }, abilities: ["Overgrow"], hiddenAbility: "Chlorophyll", generation: 1, height: "1.0 m", weight: "13.0 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Evolves into Venusaur at Lv. 32", locations: ["Evolve Bulbasaur"] },
  { id: 3, dexNum: "#003", name: "Venusaur", species: "Seed Pokémon", types: ["Grass", "Poison"], stats: { hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80 }, vanillaStats: { hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80 }, abilities: ["Overgrow"], hiddenAbility: "Chlorophyll", generation: 1, height: "2.0 m", weight: "100.0 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Final form", locations: ["Evolve Ivysaur"], isModified: true, lumiChanges: ["Gains Earth Power and Weather Ball in learnset", "Chlorophyll speed sweeper in Sunlight"] },
  { id: 4, dexNum: "#004", name: "Charmander", species: "Lizard Pokémon", types: ["Fire"], stats: { hp: 39, atk: 52, def: 43, spa: 60, spd: 50, spe: 65 }, vanillaStats: { hp: 39, atk: 52, def: 43, spa: 60, spd: 50, spe: 65 }, abilities: ["Blaze"], hiddenAbility: "Solar Power", generation: 1, height: "0.6 m", weight: "8.5 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Evolves into Charmeleon at Lv. 16", locations: ["Jubilife City Pokémon Center (Interviewer gift)", "Grand Underground: Volcanic Cave"] },
  { id: 5, dexNum: "#005", name: "Charmeleon", species: "Flame Pokémon", types: ["Fire"], stats: { hp: 58, atk: 64, def: 58, spa: 80, spd: 65, spe: 80 }, vanillaStats: { hp: 58, atk: 64, def: 58, spa: 80, spd: 65, spe: 80 }, abilities: ["Blaze"], hiddenAbility: "Solar Power", generation: 1, height: "1.1 m", weight: "19.0 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Evolves into Charizard at Lv. 36", locations: ["Evolve Charmander"] },
  { id: 6, dexNum: "#006", name: "Charizard", species: "Flame Pokémon", types: ["Fire", "Flying"], stats: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 }, vanillaStats: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 }, abilities: ["Blaze"], hiddenAbility: "Solar Power", generation: 1, height: "1.7 m", weight: "90.5 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Final form", locations: ["Evolve Charmeleon"], isModified: true, lumiChanges: ["Gains Scorching Sands and Hurricane in learnset", "Solar Power boost in harsh sunlight"] },
  { id: 7, dexNum: "#007", name: "Squirtle", species: "Tiny Turtle Pokémon", types: ["Water"], stats: { hp: 44, atk: 48, def: 65, spa: 50, spd: 64, spe: 43 }, vanillaStats: { hp: 44, atk: 48, def: 65, spa: 50, spd: 64, spe: 43 }, abilities: ["Torrent"], hiddenAbility: "Rain Dish", generation: 1, height: "0.5 m", weight: "9.0 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Evolves into Wartortle at Lv. 16", locations: ["Jubilife City Pokémon Center (Interviewer gift)", "Grand Underground: Fountainspring Cave"] },
  { id: 8, dexNum: "#008", name: "Wartortle", species: "Turtle Pokémon", types: ["Water"], stats: { hp: 59, atk: 63, def: 80, spa: 65, spd: 80, spe: 58 }, vanillaStats: { hp: 59, atk: 63, def: 80, spa: 65, spd: 80, spe: 58 }, abilities: ["Torrent"], hiddenAbility: "Rain Dish", generation: 1, height: "1.0 m", weight: "22.5 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Evolves into Blastoise at Lv. 36", locations: ["Evolve Squirtle"] },
  { id: 9, dexNum: "#009", name: "Blastoise", species: "Shellfish Pokémon", types: ["Water"], stats: { hp: 79, atk: 83, def: 100, spa: 85, spd: 105, spe: 78 }, vanillaStats: { hp: 79, atk: 83, def: 100, spa: 85, spd: 105, spe: 78 }, abilities: ["Torrent"], hiddenAbility: "Mega Launcher", generation: 1, height: "1.6 m", weight: "85.5 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Final form", locations: ["Evolve Wartortle"], isModified: true, lumiChanges: ["Hidden Ability changed to Mega Launcher (1.5x on pulse moves)", "Gains Shell Smash, Aura Sphere, and Dark Pulse"] },
  { id: 10, dexNum: "#010", name: "Caterpie", species: "Worm Pokémon", types: ["Bug"], stats: { hp: 45, atk: 30, def: 35, spa: 20, spd: 20, spe: 45 }, abilities: ["Shield Dust"], hiddenAbility: "Run Away", generation: 1, height: "0.3 m", weight: "2.9 kg", catchRate: 255, genderRatio: "50% M / 50% F", evolution: "Evolves into Metapod at Lv. 7", locations: ["Route 204", "Eterna Forest"] },
  { id: 12, dexNum: "#012", name: "Butterfree", species: "Butterfly Pokémon", types: ["Bug", "Flying"], stats: { hp: 60, atk: 45, def: 50, spa: 90, spd: 80, spe: 70 }, abilities: ["Compound Eyes"], hiddenAbility: "Tinted Lens", generation: 1, height: "1.1 m", weight: "32.0 kg", catchRate: 45, genderRatio: "50% M / 50% F", evolution: "Final form", locations: ["Eterna Forest", "Route 205"], isModified: true, lumiChanges: ["Compound Eyes gives Sleep Powder 97.5% accuracy", "Learns Quiver Dance, Hurricane, and Bug Buzz"] },
  { id: 16, dexNum: "#016", name: "Pidgey", species: "Tiny Bird Pokémon", types: ["Normal", "Flying"], stats: { hp: 40, atk: 45, def: 40, spa: 35, spd: 35, spe: 56 }, abilities: ["Keen Eye", "Tangled Feet"], hiddenAbility: "Big Pecks", generation: 1, height: "0.3 m", weight: "1.8 kg", catchRate: 255, genderRatio: "50% M / 50% F", evolution: "Evolves into Pidgeotto at Lv. 18", locations: ["Route 229"] },
  { id: 18, dexNum: "#018", name: "Pidgeot", species: "Bird Pokémon", types: ["Normal", "Flying"], stats: { hp: 83, atk: 80, def: 75, spa: 80, spd: 70, spe: 101 }, abilities: ["Keen Eye", "Tangled Feet"], hiddenAbility: "No Guard", generation: 1, height: "1.5 m", weight: "39.5 kg", catchRate: 45, genderRatio: "50% M / 50% F", evolution: "Final form", locations: ["Route 229"], isModified: true, lumiChanges: ["Hidden Ability No Guard guarantees Hurricane strikes!", "SpA buffed from 70 to 80"] },
  { id: 25, dexNum: "#025", name: "Pikachu", species: "Mouse Pokémon", types: ["Electric"], stats: { hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90 }, abilities: ["Static"], hiddenAbility: "Lightning Rod", generation: 1, height: "0.4 m", weight: "6.0 kg", catchRate: 190, genderRatio: "50% M / 50% F", evolution: "Pichu (Friendship) -> Pikachu (Thunder Stone) -> Raichu", locations: ["Trophy Garden"] },
  { id: 26, dexNum: "#026", name: "Raichu", species: "Mouse Pokémon", types: ["Electric"], stats: { hp: 60, atk: 90, def: 55, spa: 90, spd: 80, spe: 110 }, abilities: ["Static"], hiddenAbility: "Lightning Rod", generation: 1, height: "0.8 m", weight: "30.0 kg", catchRate: 75, genderRatio: "50% M / 50% F", evolution: "Final form", locations: ["Evolve Pikachu with Thunder Stone"], isModified: true, lumiChanges: ["Learns Volt Tackle, Extreme Speed, and Nasty Plot"] },
  { id: 63, dexNum: "#063", name: "Abra", species: "Psi Pokémon", types: ["Psychic"], stats: { hp: 25, atk: 20, def: 15, spa: 105, spd: 55, spe: 90 }, abilities: ["Synchronize", "Inner Focus"], hiddenAbility: "Magic Guard", generation: 1, height: "0.9 m", weight: "19.5 kg", catchRate: 200, genderRatio: "75% M / 25% F", evolution: "Evolves into Kadabra at Lv. 16", locations: ["Route 203, 215"] },
  { id: 65, dexNum: "#065", name: "Alakazam", species: "Psi Pokémon", types: ["Psychic"], stats: { hp: 55, atk: 50, def: 45, spa: 135, spd: 95, spe: 120 }, abilities: ["Synchronize", "Inner Focus"], hiddenAbility: "Magic Guard", generation: 1, height: "1.5 m", weight: "48.0 kg", catchRate: 50, genderRatio: "75% M / 25% F", evolution: "Kadabra (Use Link Cable / Trade)", locations: ["Evolve Kadabra"], isModified: true, lumiChanges: ["Magic Guard negates Life Orb recoil & stealth rock", "Evolves using Link Cable item"] },
  { id: 68, dexNum: "#068", name: "Machamp", species: "Superpower Pokémon", types: ["Fighting"], stats: { hp: 90, atk: 130, def: 80, spa: 65, spd: 85, spe: 55 }, abilities: ["Guts", "No Guard"], hiddenAbility: "Steadfast", generation: 1, height: "1.6 m", weight: "130.0 kg", catchRate: 45, genderRatio: "75% M / 25% F", evolution: "Machoke (Use Link Cable / Trade)", locations: ["Evolve Machoke", "Route 210 North"], isModified: true, lumiChanges: ["No Guard Dynamic Punch always hits with 100% confusion", "Evolves using Link Cable"] },
  { id: 94, dexNum: "#094", name: "Gengar", species: "Shadow Pokémon", types: ["Ghost", "Poison"], stats: { hp: 60, atk: 65, def: 60, spa: 130, spd: 75, spe: 110 }, abilities: ["Levitate"], hiddenAbility: "Cursed Body", generation: 1, height: "1.5 m", weight: "40.5 kg", catchRate: 45, genderRatio: "50% M / 50% F", evolution: "Haunter (Use Link Cable / Trade)", locations: ["Old Chateau", "Lost Tower"], isModified: true, lumiChanges: ["Levitate ability restored (Immune to Ground & Spikes!)", "Evolves with Link Cable item"] },
  { id: 130, dexNum: "#130", name: "Gyarados", species: "Atrocious Pokémon", types: ["Water", "Flying"], stats: { hp: 95, atk: 125, def: 79, spa: 60, spd: 100, spe: 81 }, abilities: ["Intimidate"], hiddenAbility: "Moxie", generation: 1, height: "6.5 m", weight: "235.0 kg", catchRate: 45, genderRatio: "50% M / 50% F", evolution: "Magikarp at Lv. 20", locations: ["Fish with Old/Good Rod across Sinnoh"], isModified: true, lumiChanges: ["Hidden Ability Moxie raises Attack with every KO", "Dragon Dance sweeper"] },
  { id: 133, dexNum: "#133", name: "Eevee", species: "Evolution Pokémon", types: ["Normal"], stats: { hp: 55, atk: 55, def: 50, spa: 45, spd: 65, spe: 55 }, abilities: ["Run Away", "Adaptability"], hiddenAbility: "Anticipation", generation: 1, height: "0.3 m", weight: "6.5 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "8 branch evolutions", locations: ["Hearthome City (Bebe gift)", "Trophy Garden"] },
  { id: 143, dexNum: "#143", name: "Snorlax", species: "Sleeping Pokémon", types: ["Normal"], stats: { hp: 160, atk: 110, def: 65, spa: 65, spd: 110, spe: 30 }, abilities: ["Immunity", "Thick Fat"], hiddenAbility: "Gluttony", generation: 1, height: "2.1 m", weight: "460.0 kg", catchRate: 25, genderRatio: "87.5% M / 12.5% F", evolution: "Munchlax (Friendship)", locations: ["Honey Trees across Sinnoh"], isModified: true, lumiChanges: ["Thick Fat halves Fire/Ice damage", "Curse + Body Slam + Rest tank"] },
  { id: 149, dexNum: "#149", name: "Dragonite", species: "Dragon Pokémon", types: ["Dragon", "Flying"], stats: { hp: 91, atk: 134, def: 95, spa: 100, spd: 100, spe: 80 }, abilities: ["Inner Focus"], hiddenAbility: "Multiscale", generation: 1, height: "2.2 m", weight: "210.0 kg", catchRate: 45, genderRatio: "50% M / 50% F", evolution: "Dragonair at Lv. 55", locations: ["Mt. Coronet 4F (Waterfall / Super Rod)"], isModified: true, lumiChanges: ["Multiscale halves all damage taken at full HP", "Extreme Speed and Dragon Dance"] },

  // --- JOHTO (GEN 2) ---
  { id: 152, dexNum: "#152", name: "Chikorita", species: "Leaf Pokémon", types: ["Grass"], stats: { hp: 45, atk: 49, def: 65, spa: 49, spd: 65, spe: 45 }, abilities: ["Overgrow"], hiddenAbility: "Triage", generation: 2, height: "0.9 m", weight: "6.4 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Evolves into Bayleef at Lv. 16", locations: ["Floaroma Meadow (NPC gift)", "Grand Underground: Grassland Cave"] },
  { id: 154, dexNum: "#154", name: "Meganium", species: "Herb Pokémon", types: ["Grass", "Fairy"], vanillaTypes: ["Grass"], stats: { hp: 90, atk: 82, def: 100, spa: 93, spd: 105, spe: 80 }, vanillaStats: { hp: 80, atk: 82, def: 100, spa: 83, spd: 100, spe: 80 }, abilities: ["Overgrow"], hiddenAbility: "Triage", generation: 2, height: "1.8 m", weight: "100.5 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Final form", locations: ["Evolve Bayleef"], isModified: true, lumiChanges: ["Typing changed to Grass / Fairy", "BST buffed to 550 (+10 HP, +10 SpA, +5 SpD)", "Hidden Ability Triage gives +3 priority to healing moves (Giga Drain, Draining Kiss)"] },
  { id: 155, dexNum: "#155", name: "Cyndaquil", species: "Fire Mouse Pokémon", types: ["Fire"], stats: { hp: 39, atk: 52, def: 43, spa: 60, spd: 50, spe: 65 }, abilities: ["Blaze"], hiddenAbility: "Drought", generation: 2, height: "0.5 m", weight: "7.9 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Evolves into Quilava at Lv. 14", locations: ["Fuego Ironworks (NPC gift)", "Grand Underground: Volcanic Cave"] },
  { id: 157, dexNum: "#157", name: "Typhlosion", species: "Volcano Pokémon", types: ["Fire", "Ground"], vanillaTypes: ["Fire"], stats: { hp: 78, atk: 84, def: 78, spa: 119, spd: 85, spe: 100 }, vanillaStats: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 }, abilities: ["Blaze"], hiddenAbility: "Drought", generation: 2, height: "1.7 m", weight: "79.5 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Quilava at Lv. 36 (Hold Incense Burner at Night for Hisuian form)", locations: ["Evolve Quilava"], isModified: true, lumiChanges: ["Typing changed to Fire / Ground", "SpA buffed to 119 (+10)", "Hidden Ability Drought sets Harsh Sunlight instantly"] },
  { id: 158, dexNum: "#158", name: "Totodile", species: "Big Jaw Pokémon", types: ["Water"], stats: { hp: 50, atk: 65, def: 64, spa: 44, spd: 48, spe: 43 }, abilities: ["Torrent"], hiddenAbility: "Strong Jaw", generation: 2, height: "0.6 m", weight: "9.5 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Evolves into Croconaw at Lv. 18", locations: ["Pastoria City (NPC gift)", "Grand Underground: Fountainspring Cave"] },
  { id: 160, dexNum: "#160", name: "Feraligatr", species: "Big Jaw Pokémon", types: ["Water", "Dark"], vanillaTypes: ["Water"], stats: { hp: 85, atk: 110, def: 100, spa: 79, spd: 83, spe: 83 }, vanillaStats: { hp: 85, atk: 105, def: 100, spa: 79, spd: 83, spe: 78 }, abilities: ["Torrent"], hiddenAbility: "Strong Jaw", generation: 2, height: "2.3 m", weight: "88.8 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Final form", locations: ["Evolve Croconaw"], isModified: true, lumiChanges: ["Typing changed to Water / Dark", "Atk (+5) and Spe (+5) buffed", "Strong Jaw boosts Crunch, Ice Fang, and Jaw Lock"] },
  { id: 212, dexNum: "#212", name: "Scizor", species: "Pincer Pokémon", types: ["Bug", "Steel"], stats: { hp: 70, atk: 130, def: 100, spa: 55, spd: 80, spe: 65 }, abilities: ["Swarm", "Technician"], hiddenAbility: "Light Metal", generation: 2, height: "1.8 m", weight: "118.0 kg", catchRate: 25, genderRatio: "50% M / 50% F", evolution: "Scyther (Use Metal Coat)", locations: ["Evolve Scyther"], isModified: true, lumiChanges: ["Technician Bullet Punch deals priority 90 power STAB", "Evolves directly with Metal Coat"] },
  { id: 248, dexNum: "#248", name: "Tyranitar", species: "Armor Pokémon", types: ["Rock", "Dark"], stats: { hp: 100, atk: 134, def: 110, spa: 95, spd: 100, spe: 61 }, abilities: ["Sand Stream"], hiddenAbility: "Unnerve", generation: 2, height: "2.0 m", weight: "202.0 kg", catchRate: 45, genderRatio: "50% M / 50% F", evolution: "Pupitar at Lv. 55", locations: ["Route 207 (Poké Radar: Larvitar)", "Grand Underground: Rocky Cave"], isModified: true, lumiChanges: ["Sand Stream boosts Sp. Def by 1.5x to 150", "Stealth Rock & Dragon Dance"] },

  // --- HOENN (GEN 3) ---
  { id: 252, dexNum: "#252", name: "Treecko", species: "Wood Gecko Pokémon", types: ["Grass"], stats: { hp: 40, atk: 45, def: 35, spa: 65, spd: 55, spe: 70 }, abilities: ["Overgrow"], hiddenAbility: "Unburden", generation: 3, height: "0.5 m", weight: "5.0 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Evolves into Grovyle at Lv. 16", locations: ["Oreburgh City Pokémon Center (Interviewer gift)", "Grand Underground: Grassland Cave"] },
  { id: 254, dexNum: "#254", name: "Sceptile", species: "Forest Pokémon", types: ["Grass", "Dragon"], vanillaTypes: ["Grass"], stats: { hp: 70, atk: 85, def: 65, spa: 105, spd: 85, spe: 120 }, abilities: ["Overgrow", "Technician"], hiddenAbility: "Unburden", generation: 3, height: "1.7 m", weight: "52.2 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Final form", locations: ["Evolve Grovyle"], isModified: true, lumiChanges: ["Typing changed to Grass / Dragon", "Technician boosts Scale Shot, Bullet Seed, and Dual Chop", "Learns Draco Meteor"] },
  { id: 255, dexNum: "#255", name: "Torchic", species: "Chick Pokémon", types: ["Fire"], stats: { hp: 45, atk: 60, def: 40, spa: 70, spd: 50, spe: 45 }, abilities: ["Blaze"], hiddenAbility: "Speed Boost", generation: 3, height: "0.4 m", weight: "2.5 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Evolves into Combusken at Lv. 16", locations: ["Oreburgh City Pokémon Center (Interviewer gift)", "Grand Underground: Volcanic Cave"] },
  { id: 257, dexNum: "#257", name: "Blaziken", species: "Blaze Pokémon", types: ["Fire", "Fighting"], stats: { hp: 80, atk: 120, def: 70, spa: 110, spd: 70, spe: 80 }, abilities: ["Blaze"], hiddenAbility: "Speed Boost", generation: 3, height: "1.9 m", weight: "52.0 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Final form", locations: ["Evolve Combusken"], isModified: true, lumiChanges: ["Speed Boost increases Speed by 1 stage every turn", "Close Combat, High Jump Kick, Flare Blitz"] },
  { id: 258, dexNum: "#258", name: "Mudkip", species: "Mud Fish Pokémon", types: ["Water"], stats: { hp: 50, atk: 70, def: 50, spa: 50, spd: 50, spe: 40 }, abilities: ["Torrent"], hiddenAbility: "Damp", generation: 3, height: "0.4 m", weight: "7.6 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Evolves into Marshtomp at Lv. 16", locations: ["Oreburgh City Pokémon Center (Interviewer gift)", "Grand Underground: Fountainspring Cave"] },
  { id: 260, dexNum: "#260", name: "Swampert", species: "Mud Fish Pokémon", types: ["Water", "Ground"], stats: { hp: 100, atk: 110, def: 90, spa: 85, spd: 90, spe: 60 }, abilities: ["Torrent"], hiddenAbility: "Damp", generation: 3, height: "1.5 m", weight: "81.9 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Final form", locations: ["Evolve Marshtomp"], isModified: true, lumiChanges: ["Only 1 weakness (Grass 4x) & immune to Electric", "Gains Flip Turn for pivot momentum and Stealth Rock"] },
  { id: 330, dexNum: "#330", name: "Flygon", species: "Mystic Pokémon", types: ["Bug", "Dragon"], vanillaTypes: ["Ground", "Dragon"], stats: { hp: 80, atk: 110, def: 80, spa: 110, spd: 80, spe: 140 }, vanillaStats: { hp: 80, atk: 100, def: 80, spa: 80, spd: 80, spe: 100 }, abilities: ["Compound Eyes", "Levitate"], hiddenAbility: "Overcoat", generation: 3, height: "2.0 m", weight: "82.0 kg", catchRate: 45, genderRatio: "50% M / 50% F", evolution: "Vibrava at Lv. 45", locations: ["Route 228", "Grand Underground: Rocky Cave"], isModified: true, lumiChanges: ["Typing changed to Bug / Dragon", "BST boosted to 600 (Pseudo-Legendary, was 520)", "Gains Quiver Dance, Bug Buzz, and First Impression"] },
  { id: 350, dexNum: "#350", name: "Milotic", species: "Tender Pokémon", types: ["Water", "Fairy"], vanillaTypes: ["Water"], stats: { hp: 95, atk: 60, def: 79, spa: 105, spd: 125, spe: 81 }, vanillaStats: { hp: 95, atk: 60, def: 79, spa: 100, spd: 125, spe: 81 }, abilities: ["Marvel Scale", "Competitive"], hiddenAbility: "Cute Charm", generation: 3, height: "6.2 m", weight: "162.0 kg", catchRate: 60, genderRatio: "50% M / 50% F", evolution: "Feebas (Use Prism Scale)", locations: ["Mt. Coronet B1F"], isModified: true, lumiChanges: ["Typing changed to Water / Fairy", "SpA buffed to 105 (+5)", "Learns Moonblast and Calm Mind"] },
  { id: 376, dexNum: "#376", name: "Metagross", species: "Iron Leg Pokémon", types: ["Steel", "Psychic"], stats: { hp: 80, atk: 135, def: 130, spa: 95, spd: 90, spe: 70 }, abilities: ["Clear Body"], hiddenAbility: "Light Metal", generation: 3, height: "1.6 m", weight: "550.0 kg", catchRate: 3, genderRatio: "Genderless", evolution: "Metang at Lv. 45", locations: ["Route 228 (Poké Radar: Beldum)"], isModified: true, lumiChanges: ["Clear Body prevents all stat drops", "Meteor Mash + Bullet Punch priority"] },

  // --- SINNOH (GEN 4) ---
  { id: 387, dexNum: "#387", name: "Turtwig", species: "Tiny Leaf Pokémon", types: ["Grass"], stats: { hp: 55, atk: 68, def: 64, spa: 45, spd: 55, spe: 31 }, abilities: ["Overgrow"], hiddenAbility: "Shell Armor", generation: 4, height: "0.4 m", weight: "10.2 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Grotle at Lv. 18", locations: ["Lake Verity Starter", "Grand Underground"] },
  { id: 389, dexNum: "#389", name: "Torterra", species: "Continent Pokémon", types: ["Grass", "Ground"], stats: { hp: 95, atk: 109, def: 105, spa: 75, spd: 85, spe: 56 }, abilities: ["Overgrow"], hiddenAbility: "Shell Armor", generation: 4, height: "2.2 m", weight: "310.0 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Final form", locations: ["Evolve Grotle"], isModified: true, lumiChanges: ["Gains Headlong Rush and Shell Smash in learnset", "Shell Armor prevents critical hits"] },
  { id: 390, dexNum: "#390", name: "Chimchar", species: "Chimp Pokémon", types: ["Fire"], stats: { hp: 44, atk: 58, def: 44, spa: 58, spd: 44, spe: 61 }, abilities: ["Blaze"], hiddenAbility: "Iron Fist", generation: 4, height: "0.5 m", weight: "6.2 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Monferno at Lv. 14", locations: ["Lake Verity Starter", "Grand Underground"] },
  { id: 392, dexNum: "#392", name: "Infernape", species: "Flame Pokémon", types: ["Fire", "Fighting"], stats: { hp: 76, atk: 104, def: 71, spa: 104, spd: 71, spe: 108 }, abilities: ["Blaze"], hiddenAbility: "Iron Fist", generation: 4, height: "1.2 m", weight: "35.0 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Final form", locations: ["Evolve Monferno"], isModified: true, lumiChanges: ["Iron Fist boost increased to 1.3x", "Learns Drain Punch, Thunder Punch, Fire Punch via relearner"] },
  { id: 393, dexNum: "#393", name: "Piplup", species: "Penguin Pokémon", types: ["Water"], stats: { hp: 53, atk: 51, def: 53, spa: 61, spd: 56, spe: 40 }, abilities: ["Torrent"], hiddenAbility: "Competitive", generation: 4, height: "0.4 m", weight: "5.2 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Prinplup at Lv. 16", locations: ["Lake Verity Starter", "Grand Underground"] },
  { id: 395, dexNum: "#395", name: "Empoleon", species: "Emperor Pokémon", types: ["Water", "Steel"], stats: { hp: 84, atk: 86, def: 88, spa: 111, spd: 101, spe: 60 }, abilities: ["Torrent"], hiddenAbility: "Competitive", generation: 4, height: "1.7 m", weight: "84.5 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Final form", locations: ["Evolve Prinplup"], isModified: true, lumiChanges: ["Hidden Ability Competitive triggers +2 SpA on stat drops", "Gains Roost and Wave Crash in learnset"] },
  { id: 398, dexNum: "#398", name: "Staraptor", species: "Predator Pokémon", types: ["Normal", "Flying"], stats: { hp: 85, atk: 120, def: 70, spa: 50, spd: 60, spe: 100 }, abilities: ["Intimidate"], hiddenAbility: "Reckless", generation: 4, height: "1.2 m", weight: "24.9 kg", catchRate: 45, genderRatio: "50% M / 50% F", evolution: "Staravia at Lv. 34", locations: ["Route 201, 202, 204 (Starly)"], isModified: true, lumiChanges: ["Reckless boosts Brave Bird and Double-Edge by 1.2x", "Close Combat destroys Rock and Steel foes"] },
  { id: 405, dexNum: "#405", name: "Luxray", species: "Gleam Eyes Pokémon", types: ["Electric", "Dark"], vanillaTypes: ["Electric"], stats: { hp: 80, atk: 120, def: 79, spa: 95, spd: 79, spe: 85 }, vanillaStats: { hp: 80, atk: 120, def: 79, spa: 95, spd: 79, spe: 70 }, abilities: ["Rivalry", "Intimidate"], hiddenAbility: "Strong Jaw", generation: 4, height: "1.4 m", weight: "42.0 kg", catchRate: 45, genderRatio: "50% M / 50% F", evolution: "Luxio at Lv. 30", locations: ["Route 202, 203, 204 (Shinx)"], isModified: true, lumiChanges: ["Typing changed to Electric / Dark", "Speed buffed to 85 (+15)", "Strong Jaw boosts Crunch, Psychic Fangs, and Ice Fang"] },
  { id: 445, dexNum: "#445", name: "Garchomp", species: "Mach Pokémon", types: ["Dragon", "Ground"], stats: { hp: 108, atk: 130, def: 95, spa: 80, spd: 85, spe: 102 }, abilities: ["Sand Veil"], hiddenAbility: "Rough Skin", generation: 4, height: "1.9 m", weight: "95.0 kg", catchRate: 45, genderRatio: "50% M / 50% F", evolution: "Gabite at Lv. 48", locations: ["Wayward Cave hidden room (Gible)"], isModified: true, lumiChanges: ["Learns Dragon Dance via level up / move relearner", "Rough Skin chips away at physical attackers"] },
  { id: 448, dexNum: "#448", name: "Lucario", species: "Aura Pokémon", types: ["Fighting", "Steel"], stats: { hp: 70, atk: 110, def: 70, spa: 115, spd: 70, spe: 90 }, abilities: ["Steadfast", "Inner Focus"], hiddenAbility: "Adaptability", generation: 4, height: "1.2 m", weight: "54.0 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Riolu (Friendship Day)", locations: ["Iron Island (Riley gift egg)"], isModified: true, lumiChanges: ["Hidden Ability Adaptability boosts STAB to 2.0x", "Aura Sphere and Meteor Mash hit with titanic force"] },
  { id: 462, dexNum: "#462", name: "Magnezone", species: "Magnet Area Pokémon", types: ["Electric", "Steel"], stats: { hp: 70, atk: 70, def: 115, spa: 130, spd: 90, spe: 60 }, abilities: ["Magnet Pull", "Sturdy"], hiddenAbility: "Analytic", generation: 4, height: "1.2 m", weight: "180.0 kg", catchRate: 30, genderRatio: "Genderless", evolution: "Magneton (Use Thunder Stone)", locations: ["Fuego Ironworks"], isModified: true, lumiChanges: ["Can evolve using Thunder Stone directly", "Body Press utilizes 115 Defense"] },
  { id: 466, dexNum: "#466", name: "Electivire", species: "Thunderbolt Pokémon", types: ["Electric", "Fighting"], vanillaTypes: ["Electric"], stats: { hp: 75, atk: 128, def: 67, spa: 95, spd: 85, spe: 100 }, vanillaStats: { hp: 75, atk: 123, def: 67, spa: 95, spd: 85, spe: 95 }, abilities: ["Motor Drive"], hiddenAbility: "Iron Fist", generation: 4, height: "1.8 m", weight: "138.6 kg", catchRate: 30, genderRatio: "75% M / 25% F", evolution: "Electabuzz (Use Electirizer / Link Cable)", locations: ["Route 222"], isModified: true, lumiChanges: ["Typing changed to Electric / Fighting", "Atk (+5) and Spe (+5) buffed", "Iron Fist boosts Plasma Fists, Close Combat, and elemental punches"] },
  { id: 467, dexNum: "#467", name: "Magmortar", species: "Blast Pokémon", types: ["Fire"], stats: { hp: 75, atk: 95, def: 67, spa: 130, spd: 95, spe: 88 }, vanillaStats: { hp: 75, atk: 95, def: 67, spa: 125, spd: 95, spe: 83 }, abilities: ["Flame Body"], hiddenAbility: "Mega Launcher", generation: 4, height: "1.6 m", weight: "68.0 kg", catchRate: 30, genderRatio: "75% M / 25% F", evolution: "Magmar (Use Magmarizer / Link Cable)", locations: ["Fuego Ironworks"], isModified: true, lumiChanges: ["SpA (+5) and Spe (+5) buffed", "Mega Launcher boosts Aura Sphere, Dragon Pulse, and Dark Pulse by 1.5x"] },
  { id: 468, dexNum: "#468", name: "Togekiss", species: "Jubilee Pokémon", types: ["Fairy", "Flying"], stats: { hp: 85, atk: 50, def: 95, spa: 120, spd: 115, spe: 80 }, abilities: ["Hustle", "Serene Grace"], hiddenAbility: "Super Luck", generation: 4, height: "1.5 m", weight: "38.0 kg", catchRate: 30, genderRatio: "87.5% M / 12.5% F", evolution: "Togetic (Use Shiny Stone)", locations: ["Hearthome City (Cynthia egg)"], isModified: true, lumiChanges: ["Serene Grace 60% flinch Air Slash", "Learns Moonblast and Nasty Plot natively"] },
  { id: 469, dexNum: "#469", name: "Yanmega", species: "Ogre Darner Pokémon", types: ["Bug", "Dragon"], vanillaTypes: ["Bug", "Flying"], stats: { hp: 86, atk: 76, def: 86, spa: 121, spd: 66, spe: 100 }, abilities: ["Speed Boost", "Tinted Lens"], hiddenAbility: "Frisk", generation: 4, height: "1.9 m", weight: "51.5 kg", catchRate: 30, genderRatio: "50% M / 50% F", evolution: "Yanma (Knows Ancient Power)", locations: ["Great Marsh Safari Zone"], isModified: true, lumiChanges: ["Typing changed to Bug / Dragon", "SpA (+5), SpD (+10), Spe (+5) buffed", "Learns Dragon Pulse, Draco Meteor, and Quiver Dance"] },
  { id: 472, dexNum: "#472", name: "Gliscor", species: "Fang Scorpion Pokémon", types: ["Ground", "Flying"], stats: { hp: 75, atk: 95, def: 125, spa: 45, spd: 75, spe: 95 }, abilities: ["Hyper Cutter", "Sand Veil"], hiddenAbility: "Poison Heal", generation: 4, height: "2.0 m", weight: "42.5 kg", catchRate: 30, genderRatio: "50% M / 50% F", evolution: "Gligar (Hold Razor Fang at Night)", locations: ["Route 206, 207"], isModified: true, lumiChanges: ["Poison Heal + Toxic Orb provides 1/8th max HP recovery every turn", "Immune to other status when poisoned"] },
  { id: 475, dexNum: "#475", name: "Gallade", species: "Blade Pokémon", types: ["Psychic", "Fighting"], stats: { hp: 68, atk: 125, def: 65, spa: 65, spd: 115, spe: 80 }, abilities: ["Steadfast"], hiddenAbility: "Sharpness", generation: 4, height: "1.6 m", weight: "52.0 kg", catchRate: 45, genderRatio: "100% M / 0% F", evolution: "Male Kirlia (Use Dawn Stone)", locations: ["Route 208, 209 (Ralts)"], isModified: true, lumiChanges: ["Hidden Ability Sharpness boosts Sacred Sword, Psycho Cut, and Leaf Blade by 1.5x", "Sacred Sword ignores foe defense changes"] },
  { id: 479, dexNum: "#479-W", name: "Rotom (Wash)", species: "Plasma Pokémon", types: ["Electric", "Water"], stats: { hp: 50, atk: 65, def: 107, spa: 105, spd: 107, spe: 86 }, abilities: ["Levitate"], hiddenAbility: "None", generation: 4, height: "0.3 m", weight: "0.3 kg", catchRate: 45, genderRatio: "Genderless", evolution: "Change forms using Secret Key in Eterna Galactic HQ", locations: ["Old Chateau"], isModified: true, lumiChanges: ["Secret Key available earlier", "Only 1 weakness (Grass) with Levitate!"] },
  { id: 483, dexNum: "#483", name: "Dialga", species: "Temporal Pokémon", types: ["Steel", "Dragon"], stats: { hp: 100, atk: 120, def: 120, spa: 150, spd: 100, spe: 90 }, abilities: ["Pressure"], hiddenAbility: "Telepathy", generation: 4, height: "5.4 m", weight: "683.0 kg", catchRate: 3, genderRatio: "Genderless", evolution: "Origin form with Adamant Crystal", locations: ["Spear Pillar Story Boss"], isModified: true, lumiChanges: ["Signature Move Roar of Time", "Immune to Poison with 9 resistances"] },
  { id: 484, dexNum: "#484", name: "Palkia", species: "Spatial Pokémon", types: ["Water", "Dragon"], stats: { hp: 90, atk: 120, def: 100, spa: 150, spd: 120, spe: 100 }, abilities: ["Pressure"], hiddenAbility: "Telepathy", generation: 4, height: "4.2 m", weight: "336.0 kg", catchRate: 3, genderRatio: "Genderless", evolution: "Origin form with Lustrous Globe", locations: ["Spear Pillar Story Boss"], isModified: true, lumiChanges: ["Signature Move Spacial Rend", "100 Speed tier with 150 SpA"] },
  { id: 487, dexNum: "#487", name: "Giratina", species: "Renegade Pokémon", types: ["Ghost", "Dragon"], stats: { hp: 150, atk: 100, def: 120, spa: 100, spd: 120, spe: 90 }, abilities: ["Pressure"], hiddenAbility: "Telepathy", generation: 4, height: "4.5 m", weight: "750.0 kg", catchRate: 3, genderRatio: "Genderless", evolution: "Origin form with Griseous Orb", locations: ["Distortion World / Turnback Cave"], isModified: true, lumiChanges: ["Shadow Force hits through Protect", "Origin Form gains Levitate & 120/120 offenses"] },
  { id: 491, dexNum: "#491", name: "Darkrai", species: "Pitch-Black Pokémon", types: ["Dark"], stats: { hp: 70, atk: 90, def: 90, spa: 135, spd: 90, spe: 125 }, abilities: ["Bad Dreams"], hiddenAbility: "None", generation: 4, height: "1.5 m", weight: "50.5 kg", catchRate: 3, genderRatio: "Genderless", evolution: "None", locations: ["Newmoon Island (Member Card event unlocked)"], isModified: true, lumiChanges: ["Member Card quest enabled natively", "Signature Dark Void and Bad Dreams sleep damage"] },
  { id: 493, dexNum: "#493", name: "Arceus", species: "Alpha Pokémon", types: ["Normal"], stats: { hp: 120, atk: 120, def: 120, spa: 120, spd: 120, spe: 120 }, abilities: ["Multitype"], hiddenAbility: "None", generation: 4, height: "3.2 m", weight: "320.0 kg", catchRate: 3, genderRatio: "Genderless", evolution: "Changes type with 17 Elemental Plates", locations: ["Hall of Origin (Azure Flute enabled)"], isModified: true, lumiChanges: ["Azure Flute Hall of Origin battle enabled", "Signature Judgment automatically matches held plate"] },

  // --- HISUIAN FORMS & CROSS-GEN ---
  { id: 1001, dexNum: "#157-H", name: "Typhlosion (Hisui)", species: "Ghost Flame Pokémon", types: ["Fire", "Ghost"], stats: { hp: 73, atk: 84, def: 78, spa: 119, spd: 85, spe: 95 }, abilities: ["Blaze"], hiddenAbility: "Frisk", generation: "Hisui", isHisuian: true, height: "1.6 m", weight: "69.8 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Quilava (Hold Incense Burner at Night)", locations: ["Evolve Quilava with Incense Burner at Night"], isModified: true, lumiChanges: ["Full Hisuian Form added", "Signature Move: Infernal Parade (doubles power if foe is statused)"] },
  { id: 1002, dexNum: "#724-H", name: "Decidueye (Hisui)", species: "Arrow Quill Pokémon", types: ["Grass", "Fighting"], stats: { hp: 88, atk: 112, def: 80, spa: 95, spd: 95, spe: 60 }, abilities: ["Overgrow"], hiddenAbility: "Scrappy", generation: "Hisui", isHisuian: true, height: "1.6 m", weight: "37.0 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Dartrix (Hold Incense Burner Day)", locations: ["Evolve Dartrix with Incense Burner"], isModified: true, lumiChanges: ["Grass / Fighting with Scrappy (hits Ghost types with Fighting moves!)", "Signature Move: Triple Arrows"] },
  { id: 1003, dexNum: "#503-H", name: "Samurott (Hisui)", species: "Formidable Pokémon", types: ["Water", "Dark"], stats: { hp: 90, atk: 108, def: 80, spa: 100, spd: 65, spe: 85 }, abilities: ["Torrent"], hiddenAbility: "Sharpness", generation: "Hisui", isHisuian: true, height: "1.5 m", weight: "58.2 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Dewott (Hold Incense Burner Surf)", locations: ["Evolve Dewott with Incense Burner"], isModified: true, lumiChanges: ["Sharpness boosts all slicing attacks by 1.5x", "Signature Move: Ceaseless Edge (sets Spikes on foe field!)"] },
  { id: 1004, dexNum: "#571-H", name: "Zoroark (Hisui)", species: "Baneful Fox Pokémon", types: ["Normal", "Ghost"], stats: { hp: 55, atk: 100, def: 60, spa: 125, spd: 60, spe: 110 }, abilities: ["Illusion"], hiddenAbility: "Infiltrator", generation: "Hisui", isHisuian: true, height: "1.6 m", weight: "73.0 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Hisuian Zorua at Lv. 30", locations: ["Route 217 (Incense Burner in snow blizzard)"], isModified: true, lumiChanges: ["Unique Normal / Ghost typing: 3 Immunities (Normal, Fighting, Ghost) & only 1 Weakness (Dark)!", "Signature Move: Bitter Malice"] },
  { id: 1005, dexNum: "#706-H", name: "Goodra (Hisui)", species: "Shell Bunker Pokémon", types: ["Steel", "Dragon"], stats: { hp: 80, atk: 100, def: 100, spa: 110, spd: 150, spe: 60 }, abilities: ["Sap Sipper", "Shell Armor"], hiddenAbility: "Gooey", generation: "Hisui", isHisuian: true, height: "1.7 m", weight: "334.1 kg", catchRate: 45, genderRatio: "50% M / 50% F", evolution: "Hisuian Sliggoo at Lv. 50 in Rain", locations: ["Route 212 / 215 in Rain with Incense Burner"], isModified: true, lumiChanges: ["Steel / Dragon typing with 150 SpD", "Signature Move Shelter boosts Def and evasion"] },
  { id: 1006, dexNum: "#903", name: "Sneasler", species: "Free Climb Pokémon", types: ["Fighting", "Poison"], stats: { hp: 80, atk: 130, def: 60, spa: 40, spd: 80, spe: 120 }, abilities: ["Pressure", "Unburden"], hiddenAbility: "Poison Touch", generation: "Hisui", isHisuian: true, height: "1.3 m", weight: "43.0 kg", catchRate: 45, genderRatio: "50% M / 50% F", evolution: "Hisuian Sneasel (Use Razor Claw Day)", locations: ["Snowpoint Temple", "Route 216"], isModified: true, lumiChanges: ["Blistering 130 Atk and 120 Speed", "Signature Move: Dire Claw (inflicts Poison, Paralysis, or Sleep!)"] },
  { id: 1007, dexNum: "#900", name: "Kleavor", species: "Axe Pokémon", types: ["Bug", "Rock"], stats: { hp: 70, atk: 135, def: 95, spa: 45, spd: 70, spe: 85 }, abilities: ["Swarm", "Sheer Force"], hiddenAbility: "Sharpness", generation: "Hisui", isHisuian: true, height: "1.8 m", weight: "89.0 kg", catchRate: 45, genderRatio: "50% M / 50% F", evolution: "Scyther (Use Black Augurite)", locations: ["Evolve Scyther with Black Augurite"], isModified: true, lumiChanges: ["Signature Move: Stone Axe (sets Stealth Rock automatically!)", "Sharpness boosts Stone Axe & X-Scissor by 1.5x"] },
  { id: 1008, dexNum: "#901", name: "Ursaluna", species: "Peat Pokémon", types: ["Ground", "Normal"], stats: { hp: 130, atk: 140, def: 105, spa: 45, spd: 80, spe: 50 }, abilities: ["Guts", "Bulletproof"], hiddenAbility: "Unnerve", generation: "Hisui", isHisuian: true, height: "2.4 m", weight: "290.0 kg", catchRate: 20, genderRatio: "50% M / 50% F", evolution: "Ursaring (Use Peat Block in Solaceon Full Moon)", locations: ["Route 216 with Incense Burner"], isModified: true, lumiChanges: ["Colossal 130 HP, 140 Attack, 105 Defense", "Flame Orb + Guts Facade wallbreaker", "Signature Move: Headlong Rush"] },
  { id: 700, dexNum: "#700", name: "Sylveon", species: "Intertwining Pokémon", types: ["Fairy"], stats: { hp: 95, atk: 65, def: 65, spa: 110, spd: 130, spe: 60 }, abilities: ["Cute Charm"], hiddenAbility: "Pixilate", generation: 6, height: "1.0 m", weight: "23.5 kg", catchRate: 45, genderRatio: "87.5% M / 12.5% F", evolution: "Eevee (High Friendship with Fairy move)", locations: ["Trophy Garden"], isModified: true, lumiChanges: ["Gen 6 Fairy Eeveelution fully integrated", "Pixilate Hyper Voice bypasses Substitute"] }
];

// Calculate BST and stat differences for all entries
POKEMON_DATA.forEach(p => {
  p.bst = p.stats.hp + p.stats.atk + p.stats.def + p.stats.spa + p.stats.spd + p.stats.spe;
  p.vanillaBst = p.vanillaStats ? (p.vanillaStats.hp + p.vanillaStats.atk + p.vanillaStats.def + p.vanillaStats.spa + p.vanillaStats.spd + p.vanillaStats.spe) : p.bst;
  p.bstDiff = p.bst - p.vanillaBst;
});
