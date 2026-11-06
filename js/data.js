/**
 * Luminescent Platinum Pokédex Database
 * Accurate to https://luminescent.team/docs
 * Includes vanilla comparisons, Drayano/Lumi type & stat changes, Hisuian forms,
 * learnsets, encounter locations (Routes, Grand Underground, Incense Burner, Poké Radar), and abilities.
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

// Helper to calculate defense matchups for single/dual typing
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

const POKEMON_DATA = [
  // ==========================================
  // --- GEN 1 STARTERS (KANTO) ---
  // ==========================================
  {
    id: 1,
    dexNum: "#001",
    name: "Bulbasaur",
    species: "Seed Pokémon",
    types: ["Grass", "Poison"],
    stats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 },
    vanillaStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 },
    abilities: ["Overgrow"],
    hiddenAbility: "Chlorophyll",
    generation: 1,
    height: "0.7 m",
    weight: "6.9 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: ["Miracle Seed (5%)"],
    evolution: "Evolves into Ivysaur at Lv. 16",
    locations: [
      "Jubilife City Pokémon Center (Gift from Interviewer at top left after quiz & battle)",
      "Grand Underground: Grassland Cave, Riverbank Cave, Sunlit Cavern"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Tackle", type: "Normal", cat: "Physical", power: 40, acc: 100, pp: 35, desc: "A physical charge." },
      { lvl: 3, name: "Growl", type: "Normal", cat: "Status", power: 0, acc: 100, pp: 40, desc: "Lowers target Attack." },
      { lvl: 7, name: "Vine Whip", type: "Grass", cat: "Physical", power: 45, acc: 100, pp: 25, desc: "Slender vines strike foe." },
      { lvl: 9, name: "Leech Seed", type: "Grass", cat: "Status", power: 0, acc: 90, pp: 10, desc: "Drains HP from foe each turn." },
      { lvl: 13, name: "Poison Powder", type: "Poison", cat: "Status", power: 0, acc: 75, pp: 35, desc: "Poisons target." },
      { lvl: 13, name: "Sleep Powder", type: "Grass", cat: "Status", power: 0, acc: 75, pp: 15, desc: "Puts target to sleep." },
      { lvl: 15, name: "Take Down", type: "Normal", cat: "Physical", power: 90, acc: 85, pp: 20, desc: "Reckless charge with recoil." }
    ],
    tmMoves: ["TM06 Toxic", "TM09 Bullet Seed", "TM19 Giga Drain", "TM22 Solar Beam", "TM36 Sludge Bomb", "TM86 Grass Knot"],
    eggMoves: ["Giga Drain", "Ingrain", "Nature Power", "Amnesia", "Leaf Storm"]
  },
  {
    id: 2,
    dexNum: "#002",
    name: "Ivysaur",
    species: "Seed Pokémon",
    types: ["Grass", "Poison"],
    stats: { hp: 60, atk: 62, def: 63, spa: 80, spd: 80, spe: 60 },
    vanillaStats: { hp: 60, atk: 62, def: 63, spa: 80, spd: 80, spe: 60 },
    abilities: ["Overgrow"],
    hiddenAbility: "Chlorophyll",
    generation: 1,
    height: "1.0 m",
    weight: "13.0 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolves from Bulbasaur at Lv. 16, evolves into Venusaur at Lv. 32",
    locations: ["Evolve Bulbasaur", "Grand Underground: Grassland Cave, Sunlit Cavern"],
    levelUpMoves: [
      { lvl: 16, name: "Razor Leaf", type: "Grass", cat: "Physical", power: 55, acc: 95, pp: 25, desc: "High critical hit ratio." },
      { lvl: 20, name: "Sweet Scent", type: "Normal", cat: "Status", power: 0, acc: 100, pp: 20, desc: "Lowers foe evasion." },
      { lvl: 25, name: "Growth", type: "Normal", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Raises Atk and SpA (doubled in Sun)." },
      { lvl: 31, name: "Double-Edge", type: "Normal", cat: "Physical", power: 120, acc: 100, pp: 15, desc: "Massive tackle with recoil." }
    ],
    tmMoves: ["TM06 Toxic", "TM19 Giga Drain", "TM22 Solar Beam", "TM36 Sludge Bomb", "TM53 Energy Ball"],
    eggMoves: ["Giga Drain", "Leaf Storm", "Amnesia"]
  },
  {
    id: 3,
    dexNum: "#003",
    name: "Venusaur",
    species: "Seed Pokémon",
    types: ["Grass", "Poison"],
    stats: { hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80 },
    vanillaStats: { hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80 },
    abilities: ["Overgrow"],
    hiddenAbility: "Chlorophyll",
    generation: 1,
    height: "2.0 m",
    weight: "100.0 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Final form (evolves from Ivysaur at Lv. 32)",
    locations: ["Evolve Ivysaur", "Grand Underground: Sunlit Cavern (Postgame)"],
    isModified: true,
    lumiChanges: [
      "Gains Weather Ball and Earth Power in level-up / tutor learnset",
      "Chlorophyll doubles Speed in Sun for lethal sweep potential",
      "Enhanced recovery through boosted Synthesis and Giga Drain"
    ],
    levelUpMoves: [
      { lvl: 32, name: "Petal Dance", type: "Grass", cat: "Special", power: 120, acc: 100, pp: 10, desc: "Rampages with flower petals for 2-3 turns." },
      { lvl: 37, name: "Earth Power", type: "Ground", cat: "Special", power: 90, acc: 100, pp: 10, desc: "Ground coverage for Fire and Poison.", isBuffed: true },
      { lvl: 44, name: "Sludge Bomb", type: "Poison", cat: "Special", power: 90, acc: 100, pp: 10, desc: "STAB poison sludge; 30% poison chance." },
      { lvl: 53, name: "Synthesis", type: "Grass", cat: "Status", power: 0, acc: 0, pp: 5, desc: "Restores HP (up to 66% in Sunlight)." },
      { lvl: 60, name: "Solar Beam", type: "Grass", cat: "Special", power: 120, acc: 100, pp: 10, desc: "Instant devastating strike in Sun." }
    ],
    tmMoves: ["TM06 Toxic", "TM15 Hyper Beam", "TM19 Giga Drain", "TM22 Solar Beam", "TM26 Earthquake", "TM36 Sludge Bomb", "TM53 Energy Ball"],
    eggMoves: ["Giga Drain", "Leaf Storm", "Power Whip", "Knock Off"]
  },

  {
    id: 4,
    dexNum: "#004",
    name: "Charmander",
    species: "Lizard Pokémon",
    types: ["Fire"],
    stats: { hp: 39, atk: 52, def: 43, spa: 60, spd: 50, spe: 65 },
    vanillaStats: { hp: 39, atk: 52, def: 43, spa: 60, spd: 50, spe: 65 },
    abilities: ["Blaze"],
    hiddenAbility: "Solar Power",
    generation: 1,
    height: "0.6 m",
    weight: "8.5 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: ["Charcoal (5%)"],
    evolution: "Evolves into Charmeleon at Lv. 16",
    locations: [
      "Jubilife City Pokémon Center (Gift from Interviewer at top left after quiz & battle)",
      "Grand Underground: Volcanic Cave, Typhlo Cavern, Sandsear Cave"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Scratch", type: "Normal", cat: "Physical", power: 40, acc: 100, pp: 35, desc: "Claw scratch." },
      { lvl: 1, name: "Growl", type: "Normal", cat: "Status", power: 0, acc: 100, pp: 40, desc: "Lowers target Attack." },
      { lvl: 7, name: "Ember", type: "Fire", cat: "Special", power: 40, acc: 100, pp: 25, desc: "Small fire blast; 10% burn." },
      { lvl: 10, name: "Smokescreen", type: "Normal", cat: "Status", power: 0, acc: 100, pp: 20, desc: "Lowers target accuracy." },
      { lvl: 16, name: "Dragon Breath", type: "Dragon", cat: "Special", power: 60, acc: 100, pp: 20, desc: "30% chance to paralyze target." }
    ],
    tmMoves: ["TM02 Dragon Claw", "TM10 Hidden Power", "TM35 Flamethrower", "TM38 Fire Blast", "TM50 Overheat", "TM75 Swords Dance"],
    eggMoves: ["Dragon Dance", "Belly Drum", "Outrage", "Bite", "Counter"]
  },
  {
    id: 5,
    dexNum: "#005",
    name: "Charmeleon",
    species: "Flame Pokémon",
    types: ["Fire"],
    stats: { hp: 58, atk: 64, def: 58, spa: 80, spd: 65, spe: 80 },
    vanillaStats: { hp: 58, atk: 64, def: 58, spa: 80, spd: 65, spe: 80 },
    abilities: ["Blaze"],
    hiddenAbility: "Solar Power",
    generation: 1,
    height: "1.1 m",
    weight: "19.0 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolves from Charmander at Lv. 16, evolves into Charizard at Lv. 36",
    locations: ["Evolve Charmander", "Grand Underground: Volcanic Cave, Typhlo Cavern"],
    levelUpMoves: [
      { lvl: 17, name: "Fire Fang", type: "Fire", cat: "Physical", power: 65, acc: 95, pp: 15, desc: "May cause burn or flinch." },
      { lvl: 21, name: "Slash", type: "Normal", cat: "Physical", power: 70, acc: 100, pp: 20, desc: "High critical hit ratio." },
      { lvl: 28, name: "Flamethrower", type: "Fire", cat: "Special", power: 90, acc: 100, pp: 15, desc: "Intense blast of fire." },
      { lvl: 32, name: "Scary Face", type: "Normal", cat: "Status", power: 0, acc: 100, pp: 10, desc: "Harshly lowers target Speed." }
    ],
    tmMoves: ["TM02 Dragon Claw", "TM35 Flamethrower", "TM38 Fire Blast", "TM50 Overheat"],
    eggMoves: ["Dragon Dance", "Belly Drum", "Outrage"]
  },
  {
    id: 6,
    dexNum: "#006",
    name: "Charizard",
    species: "Flame Pokémon",
    types: ["Fire", "Flying"],
    stats: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 },
    vanillaStats: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 },
    abilities: ["Blaze"],
    hiddenAbility: "Solar Power",
    generation: 1,
    height: "1.7 m",
    weight: "90.5 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Final form (evolves from Charmeleon at Lv. 36)",
    locations: ["Evolve Charmeleon", "Grand Underground: Typhlo Cavern (Postgame)"],
    isModified: true,
    lumiChanges: [
      "Gains Scorching Sands and Hurricane in updated learnset",
      "Solar Power + Sun yields 1.5x Special Attack for titanic damage",
      "Air Slash and Roost available for fast special airborne pressure"
    ],
    levelUpMoves: [
      { lvl: 36, name: "Wing Attack", type: "Flying", cat: "Physical", power: 60, acc: 100, pp: 35, desc: "Strikes with wings." },
      { lvl: 41, name: "Air Slash", type: "Flying", cat: "Special", power: 75, acc: 95, pp: 15, desc: "Air blade with 30% flinch chance." },
      { lvl: 47, name: "Scorching Sands", type: "Ground", cat: "Special", power: 70, acc: 100, pp: 10, desc: "Ground coverage for Rock and Electric.", isBuffed: true },
      { lvl: 54, name: "Heat Wave", type: "Fire", cat: "Special", power: 95, acc: 90, pp: 10, desc: "Fiery hot exhale." },
      { lvl: 62, name: "Flare Blitz", type: "Fire", cat: "Physical", power: 120, acc: 100, pp: 15, desc: "Infernal tackle with recoil." },
      { lvl: 70, name: "Hurricane", type: "Flying", cat: "Special", power: 110, acc: 70, pp: 10, desc: "Vicious storm winds.", isBuffed: true }
    ],
    tmMoves: ["TM02 Dragon Claw", "TM26 Earthquake", "TM35 Flamethrower", "TM38 Fire Blast", "TM50 Overheat", "TM52 Focus Blast", "TM71 Stone Edge"],
    eggMoves: ["Dragon Dance", "Belly Drum", "Outrage", "Counter"]
  },

  {
    id: 7,
    dexNum: "#007",
    name: "Squirtle",
    species: "Tiny Turtle Pokémon",
    types: ["Water"],
    stats: { hp: 44, atk: 48, def: 65, spa: 50, spd: 64, spe: 43 },
    vanillaStats: { hp: 44, atk: 48, def: 65, spa: 50, spd: 64, spe: 43 },
    abilities: ["Torrent"],
    hiddenAbility: "Rain Dish",
    generation: 1,
    height: "0.5 m",
    weight: "9.0 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: ["Mystic Water (5%)"],
    evolution: "Evolves into Wartortle at Lv. 16",
    locations: [
      "Jubilife City Pokémon Center (Gift from Interviewer at top left after quiz & battle)",
      "Grand Underground: Fountainspring Cave, Riverbank Cave, Still-Water Cavern"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Tackle", type: "Normal", cat: "Physical", power: 40, acc: 100, pp: 35, desc: "Physical charge." },
      { lvl: 4, name: "Tail Whip", type: "Normal", cat: "Status", power: 0, acc: 100, pp: 30, desc: "Lowers foe Defense." },
      { lvl: 7, name: "Water Gun", type: "Water", cat: "Special", power: 40, acc: 100, pp: 25, desc: "Water squirt." },
      { lvl: 10, name: "Withdraw", type: "Water", cat: "Status", power: 0, acc: 0, pp: 40, desc: "Raises user Defense." },
      { lvl: 15, name: "Rapid Spin", type: "Normal", cat: "Physical", power: 50, acc: 100, pp: 40, desc: "Clears hazards and boosts Speed!", isBuffed: true }
    ],
    tmMoves: ["TM03 Water Pulse", "TM13 Ice Beam", "TM14 Blizzard", "TM28 Dig", "TM55 Brine"],
    eggMoves: ["Aqua Ring", "Mirror Coat", "Yawn", "Fake Out", "Aura Sphere"]
  },
  {
    id: 8,
    dexNum: "#008",
    name: "Wartortle",
    species: "Turtle Pokémon",
    types: ["Water"],
    stats: { hp: 59, atk: 63, def: 80, spa: 65, spd: 80, spe: 58 },
    vanillaStats: { hp: 59, atk: 63, def: 80, spa: 65, spd: 80, spe: 58 },
    abilities: ["Torrent"],
    hiddenAbility: "Rain Dish",
    generation: 1,
    height: "1.0 m",
    weight: "22.5 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolves from Squirtle at Lv. 16, evolves into Blastoise at Lv. 36",
    locations: ["Evolve Squirtle", "Grand Underground: Fountainspring Cave, Riverbank Cave"],
    levelUpMoves: [
      { lvl: 16, name: "Water Pulse", type: "Water", cat: "Special", power: 60, acc: 100, pp: 20, desc: "May confuse target." },
      { lvl: 21, name: "Bite", type: "Dark", cat: "Physical", power: 60, acc: 100, pp: 25, desc: "May flinch." },
      { lvl: 28, name: "Aqua Tail", type: "Water", cat: "Physical", power: 90, acc: 90, pp: 10, desc: "Heavy water tail swing." },
      { lvl: 32, name: "Iron Defense", type: "Steel", cat: "Status", power: 0, acc: 0, pp: 15, desc: "Sharply raises Defense." }
    ],
    tmMoves: ["TM03 Water Pulse", "TM13 Ice Beam", "TM14 Blizzard", "TM55 Brine"],
    eggMoves: ["Aqua Jet", "Yawn", "Fake Out"]
  },
  {
    id: 9,
    dexNum: "#009",
    name: "Blastoise",
    species: "Shellfish Pokémon",
    types: ["Water"],
    stats: { hp: 79, atk: 83, def: 100, spa: 85, spd: 105, spe: 78 },
    vanillaStats: { hp: 79, atk: 83, def: 100, spa: 85, spd: 105, spe: 78 },
    abilities: ["Torrent"],
    hiddenAbility: "Mega Launcher",
    generation: 1,
    height: "1.6 m",
    weight: "85.5 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Final form (evolves from Wartortle at Lv. 36)",
    locations: ["Evolve Wartortle", "Grand Underground: Fountainspring Cave (Postgame)"],
    isModified: true,
    lumiChanges: [
      "Hidden Ability changed to Mega Launcher (1.5x power on Aura Sphere, Dark Pulse, Dragon Pulse, Water Pulse!)",
      "Gains Shell Smash in learnset for game-winning sweeps!",
      "Aura Sphere, Dark Pulse, and Flash Cannon added to level-up learnset"
    ],
    levelUpMoves: [
      { lvl: 36, name: "Flash Cannon", type: "Steel", cat: "Special", power: 80, acc: 100, pp: 10, desc: "Light beam from water cannons." },
      { lvl: 40, name: "Aura Sphere", type: "Fighting", cat: "Special", power: 80, acc: 100, pp: 20, desc: "120 power with Mega Launcher! Never misses.", isBuffed: true },
      { lvl: 46, name: "Dark Pulse", type: "Dark", cat: "Special", power: 80, acc: 100, pp: 15, desc: "120 power with Mega Launcher! May flinch.", isBuffed: true },
      { lvl: 52, name: "Dragon Pulse", type: "Dragon", cat: "Special", power: 85, acc: 100, pp: 10, desc: "127.5 power with Mega Launcher!", isBuffed: true },
      { lvl: 58, name: "Hydro Pump", type: "Water", cat: "Special", power: 110, acc: 80, pp: 5, desc: "High pressure torrent." },
      { lvl: 65, name: "Shell Smash", type: "Normal", cat: "Status", power: 0, acc: 0, pp: 15, desc: "Lowers Def/SpD; sharply boosts Atk, SpA, and Speed!", isBuffed: true }
    ],
    tmMoves: ["TM03 Water Pulse", "TM13 Ice Beam", "TM14 Blizzard", "TM26 Earthquake", "TM52 Focus Blast", "TM91 Flash Cannon"],
    eggMoves: ["Fake Out", "Yawn", "Aqua Jet", "Mirror Coat"]
  },

  // ==========================================
  // --- GEN 3 STARTERS (HOENN) ---
  // ==========================================
  {
    id: 252,
    dexNum: "#252",
    name: "Treecko",
    species: "Wood Gecko Pokémon",
    types: ["Grass"],
    stats: { hp: 40, atk: 45, def: 35, spa: 65, spd: 55, spe: 70 },
    vanillaStats: { hp: 40, atk: 45, def: 35, spa: 65, spd: 55, spe: 70 },
    abilities: ["Overgrow"],
    hiddenAbility: "Unburden",
    generation: 3,
    height: "0.5 m",
    weight: "5.0 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: ["Miracle Seed (100% on Gift)"],
    evolution: "Evolves into Grovyle at Lv. 16",
    locations: [
      "Oreburgh City Pokémon Center (Gift from Interviewer at top left after quiz & battle)",
      "Grand Underground: Grassland Cave, Sunlit Cavern"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Pound", type: "Normal", cat: "Physical", power: 40, acc: 100, pp: 35, desc: "Pounds target." },
      { lvl: 1, name: "Leer", type: "Normal", cat: "Status", power: 0, acc: 100, pp: 30, desc: "Lowers target Defense." },
      { lvl: 6, name: "Absorb", type: "Grass", cat: "Special", power: 20, acc: 100, pp: 25, desc: "Drains HP." },
      { lvl: 11, name: "Quick Attack", type: "Normal", cat: "Physical", power: 40, acc: 100, pp: 30, desc: "Strikes first." },
      { lvl: 16, name: "Mega Drain", type: "Grass", cat: "Special", power: 40, acc: 100, pp: 15, desc: "Drains HP." }
    ],
    tmMoves: ["TM06 Toxic", "TM19 Giga Drain", "TM22 Solar Beam", "TM53 Energy Ball", "TM86 Grass Knot"],
    eggMoves: ["Leech Seed", "Dragon Breath", "Crush Claw", "Synthesis"]
  },
  {
    id: 253,
    dexNum: "#253",
    name: "Grovyle",
    species: "Wood Gecko Pokémon",
    types: ["Grass"],
    stats: { hp: 50, atk: 65, def: 45, spa: 85, spd: 65, spe: 95 },
    vanillaStats: { hp: 50, atk: 65, def: 45, spa: 85, spd: 65, spe: 95 },
    abilities: ["Overgrow"],
    hiddenAbility: "Unburden",
    generation: 3,
    height: "0.9 m",
    weight: "21.6 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolves from Treecko at Lv. 16, evolves into Sceptile at Lv. 36",
    locations: ["Evolve Treecko", "Grand Underground: Grassland Cave, Sunlit Cavern"],
    levelUpMoves: [
      { lvl: 16, name: "Fury Cutter", type: "Bug", cat: "Physical", power: 40, acc: 95, pp: 20, desc: "Power doubles on consecutive hits." },
      { lvl: 23, name: "Leaf Blade", type: "Grass", cat: "Physical", power: 90, acc: 100, pp: 15, desc: "Sharp leaf slash with high critical hit ratio." },
      { lvl: 29, name: "Agility", type: "Psychic", cat: "Status", power: 0, acc: 0, pp: 30, desc: "Sharply raises Speed." },
      { lvl: 35, name: "Giga Drain", type: "Grass", cat: "Special", power: 75, acc: 100, pp: 10, desc: "Recovers half damage dealt." }
    ],
    tmMoves: ["TM19 Giga Drain", "TM53 Energy Ball", "TM75 Swords Dance", "TM81 X-Scissor"],
    eggMoves: ["Leech Seed", "Synthesis", "Dragon Breath"]
  },
  {
    id: 254,
    dexNum: "#254",
    name: "Sceptile",
    species: "Forest Pokémon",
    types: ["Grass", "Dragon"],
    vanillaTypes: ["Grass"],
    stats: { hp: 70, atk: 85, def: 65, spa: 105, spd: 85, spe: 120 },
    vanillaStats: { hp: 70, atk: 85, def: 65, spa: 105, spd: 85, spe: 120 },
    abilities: ["Overgrow", "Technician"],
    hiddenAbility: "Unburden",
    generation: 3,
    height: "1.7 m",
    weight: "52.2 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Final form (evolves from Grovyle at Lv. 36)",
    locations: ["Evolve Grovyle", "Grand Underground: Sunlit Cavern (Postgame)"],
    isModified: true,
    lumiChanges: [
      "Typing changed to Grass / Dragon (Secondary Dragon added)",
      "Gained Technician ability (boosts Bullet Seed, Mega Drain, Dragon Breath, Scale Shot, Quick Attack)",
      "Learns Scale Shot, Draco Meteor, Dragon Pulse, and Focus Blast"
    ],
    levelUpMoves: [
      { lvl: 36, name: "Dual Chop", type: "Dragon", cat: "Physical", power: 40, acc: 90, pp: 15, desc: "Hits twice; boosted to 60 power each by Technician!", isBuffed: true },
      { lvl: 42, name: "Leaf Blade", type: "Grass", cat: "Physical", power: 90, acc: 100, pp: 15, desc: "High critical hit slash." },
      { lvl: 48, name: "Dragon Pulse", type: "Dragon", cat: "Special", power: 85, acc: 100, pp: 10, desc: "Dragon STAB attack.", isBuffed: true },
      { lvl: 55, name: "Scale Shot", type: "Dragon", cat: "Physical", power: 25, acc: 90, pp: 20, desc: "Hits 2-5 times; boosted by Technician & raises Speed!", isBuffed: true },
      { lvl: 63, name: "Leaf Storm", type: "Grass", cat: "Special", power: 130, acc: 90, pp: 5, desc: "Devastating leaf storm; lowers SpA by 2." },
      { lvl: 70, name: "Draco Meteor", type: "Dragon", cat: "Special", power: 130, acc: 90, pp: 5, desc: "Dragon meteor catastrophe.", isBuffed: true }
    ],
    tmMoves: ["TM02 Dragon Claw", "TM19 Giga Drain", "TM26 Earthquake", "TM52 Focus Blast", "TM53 Energy Ball", "TM75 Swords Dance", "TM81 X-Scissor"],
    eggMoves: ["Dragon Dance", "Leech Seed", "Synthesis"]
  },

  {
    id: 255,
    dexNum: "#255",
    name: "Torchic",
    species: "Chick Pokémon",
    types: ["Fire"],
    stats: { hp: 45, atk: 60, def: 40, spa: 70, spd: 50, spe: 45 },
    vanillaStats: { hp: 45, atk: 60, def: 40, spa: 70, spd: 50, spe: 45 },
    abilities: ["Blaze"],
    hiddenAbility: "Speed Boost",
    generation: 3,
    height: "0.4 m",
    weight: "2.5 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolves into Combusken at Lv. 16",
    locations: [
      "Oreburgh City Pokémon Center (Gift from Interviewer at top left after quiz & battle)",
      "Grand Underground: Volcanic Cave, Typhlo Cavern"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Scratch", type: "Normal", cat: "Physical", power: 40, acc: 100, pp: 35, desc: "Scratch with talons." },
      { lvl: 1, name: "Growl", type: "Normal", cat: "Status", power: 0, acc: 100, pp: 40, desc: "Lowers foe Attack." },
      { lvl: 6, name: "Ember", type: "Fire", cat: "Special", power: 40, acc: 100, pp: 25, desc: "Fire ember." },
      { lvl: 10, name: "Sand Attack", type: "Ground", cat: "Status", power: 0, acc: 100, pp: 15, desc: "Lowers foe accuracy." },
      { lvl: 14, name: "Peck", type: "Flying", cat: "Physical", power: 35, acc: 100, pp: 35, desc: "Jabs with beak." }
    ],
    tmMoves: ["TM10 Hidden Power", "TM35 Flamethrower", "TM38 Fire Blast", "TM50 Overheat", "TM75 Swords Dance"],
    eggMoves: ["Baton Pass", "Curse", "Feint", "Night Slash", "Agility"]
  },
  {
    id: 256,
    dexNum: "#256",
    name: "Combusken",
    species: "Young Fowl Pokémon",
    types: ["Fire", "Fighting"],
    stats: { hp: 60, atk: 85, def: 60, spa: 85, spd: 60, spe: 55 },
    vanillaStats: { hp: 60, atk: 85, def: 60, spa: 85, spd: 60, spe: 55 },
    abilities: ["Blaze"],
    hiddenAbility: "Speed Boost",
    generation: 3,
    height: "0.9 m",
    weight: "19.5 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolves from Torchic at Lv. 16, evolves into Blaziken at Lv. 36",
    locations: ["Evolve Torchic", "Grand Underground: Volcanic Cave, Typhlo Cavern"],
    levelUpMoves: [
      { lvl: 16, name: "Double Kick", type: "Fighting", cat: "Physical", power: 30, acc: 100, pp: 30, desc: "Hits twice with kicks." },
      { lvl: 21, name: "Flame Charge", type: "Fire", cat: "Physical", power: 50, acc: 100, pp: 20, desc: "Boosts Speed by 1 stage." },
      { lvl: 28, name: "Quick Attack", type: "Normal", cat: "Physical", power: 40, acc: 100, pp: 30, desc: "Priority strike." },
      { lvl: 32, name: "Bulk Up", type: "Fighting", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Raises Atk and Def." }
    ],
    tmMoves: ["TM31 Brick Break", "TM35 Flamethrower", "TM38 Fire Blast", "TM52 Focus Blast"],
    eggMoves: ["Baton Pass", "Night Slash", "Agility"]
  },
  {
    id: 257,
    dexNum: "#257",
    name: "Blaziken",
    species: "Blaze Pokémon",
    types: ["Fire", "Fighting"],
    stats: { hp: 80, atk: 120, def: 70, spa: 110, spd: 70, spe: 80 },
    vanillaStats: { hp: 80, atk: 120, def: 70, spa: 110, spd: 70, spe: 80 },
    abilities: ["Blaze"],
    hiddenAbility: "Speed Boost",
    generation: 3,
    height: "1.9 m",
    weight: "52.0 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Final form (evolves from Combusken at Lv. 36)",
    locations: ["Evolve Combusken", "Grand Underground: Typhlo Cavern (Postgame)"],
    isModified: true,
    lumiChanges: [
      "Speed Boost increases Speed by 1 stage every turn automatically",
      "Learns Close Combat, High Jump Kick, Flare Blitz, and Swords Dance",
      "Unrivaled late-game cleaner and wallbreaker"
    ],
    levelUpMoves: [
      { lvl: 36, name: "Blaze Kick", type: "Fire", cat: "Physical", power: 85, acc: 90, pp: 10, desc: "High critical hit fiery kick." },
      { lvl: 42, name: "Close Combat", type: "Fighting", cat: "Physical", power: 120, acc: 100, pp: 5, desc: "Devastating fighting strike.", isBuffed: true },
      { lvl: 50, name: "Flare Blitz", type: "Fire", cat: "Physical", power: 120, acc: 100, pp: 15, desc: "Fierce fire tackle with recoil." },
      { lvl: 57, name: "High Jump Kick", type: "Fighting", cat: "Physical", power: 130, acc: 90, pp: 10, desc: "Colossal jump kick." },
      { lvl: 65, name: "Swords Dance", type: "Normal", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Sharply raises Attack." }
    ],
    tmMoves: ["TM08 Bulk Up", "TM26 Earthquake", "TM31 Brick Break", "TM35 Flamethrower", "TM38 Fire Blast", "TM52 Focus Blast", "TM71 Stone Edge", "TM75 Swords Dance", "TM89 U-turn"],
    eggMoves: ["Baton Pass", "Night Slash", "Crush Claw", "Feint"]
  },

  {
    id: 258,
    dexNum: "#258",
    name: "Mudkip",
    species: "Mud Fish Pokémon",
    types: ["Water"],
    stats: { hp: 50, atk: 70, def: 50, spa: 50, spd: 50, spe: 40 },
    vanillaStats: { hp: 50, atk: 70, def: 50, spa: 50, spd: 50, spe: 40 },
    abilities: ["Torrent"],
    hiddenAbility: "Damp",
    generation: 3,
    height: "0.4 m",
    weight: "7.6 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolves into Marshtomp at Lv. 16",
    locations: [
      "Oreburgh City Pokémon Center (Gift from Interviewer at top left after quiz & battle)",
      "Grand Underground: Fountainspring Cave, Riverbank Cave"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Tackle", type: "Normal", cat: "Physical", power: 40, acc: 100, pp: 35, desc: "Physical charge." },
      { lvl: 1, name: "Growl", type: "Normal", cat: "Status", power: 0, acc: 100, pp: 40, desc: "Lowers foe Attack." },
      { lvl: 6, name: "Water Gun", type: "Water", cat: "Special", power: 40, acc: 100, pp: 25, desc: "Water squirt." },
      { lvl: 10, name: "Mud-Slap", type: "Ground", cat: "Special", power: 20, acc: 100, pp: 10, desc: "Lowers foe accuracy." },
      { lvl: 15, name: "Water Pulse", type: "Water", cat: "Special", power: 60, acc: 100, pp: 20, desc: "May confuse target." }
    ],
    tmMoves: ["TM03 Water Pulse", "TM13 Ice Beam", "TM14 Blizzard", "TM28 Dig", "TM55 Brine"],
    eggMoves: ["Ancient Power", "Curse", "Mirror Coat", "Yawn", "Sludge"]
  },
  {
    id: 259,
    dexNum: "#259",
    name: "Marshtomp",
    species: "Mud Fish Pokémon",
    types: ["Water", "Ground"],
    stats: { hp: 70, atk: 85, def: 70, spa: 60, spd: 70, spe: 50 },
    vanillaStats: { hp: 70, atk: 85, def: 70, spa: 60, spd: 70, spe: 50 },
    abilities: ["Torrent"],
    hiddenAbility: "Damp",
    generation: 3,
    height: "0.7 m",
    weight: "28.0 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolves from Mudkip at Lv. 16, evolves into Swampert at Lv. 36",
    locations: ["Evolve Mudkip", "Grand Underground: Fountainspring Cave, Riverbank Cave"],
    levelUpMoves: [
      { lvl: 16, name: "Mud Shot", type: "Ground", cat: "Special", power: 55, acc: 95, pp: 15, desc: "Lowers foe Speed." },
      { lvl: 22, name: "Rock Slide", type: "Rock", cat: "Physical", power: 75, acc: 90, pp: 10, desc: "May flinch foes." },
      { lvl: 28, name: "Muddy Water", type: "Water", cat: "Special", power: 90, acc: 85, pp: 10, desc: "May lower accuracy." },
      { lvl: 33, name: "Protect", type: "Normal", cat: "Status", power: 0, acc: 0, pp: 10, desc: "Evades all attacks." }
    ],
    tmMoves: ["TM03 Water Pulse", "TM13 Ice Beam", "TM26 Earthquake", "TM28 Dig"],
    eggMoves: ["Curse", "Yawn", "Ancient Power"]
  },
  {
    id: 260,
    dexNum: "#260",
    name: "Swampert",
    species: "Mud Fish Pokémon",
    types: ["Water", "Ground"],
    stats: { hp: 100, atk: 110, def: 90, spa: 85, spd: 90, spe: 60 },
    vanillaStats: { hp: 100, atk: 110, def: 90, spa: 85, spd: 90, spe: 60 },
    abilities: ["Torrent"],
    hiddenAbility: "Damp",
    generation: 3,
    height: "1.5 m",
    weight: "81.9 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Final form (evolves from Marshtomp at Lv. 36)",
    locations: ["Evolve Marshtomp", "Grand Underground: Fountainspring Cave (Postgame)"],
    isModified: true,
    lumiChanges: [
      "Only 1 weakness (Grass 4x) and immune to Electric!",
      "Gains Flip Turn for pivot momentum and Ice Spinner in learnset",
      "Stealth Rock, Earthquake, and Liquidation make it an elite tank"
    ],
    levelUpMoves: [
      { lvl: 36, name: "Earthquake", type: "Ground", cat: "Physical", power: 100, acc: 100, pp: 10, desc: "STAB ground quake." },
      { lvl: 41, name: "Flip Turn", type: "Water", cat: "Physical", power: 60, acc: 100, pp: 20, desc: "Attacks and immediately switches out!", isBuffed: true },
      { lvl: 47, name: "Liquidation", type: "Water", cat: "Physical", power: 85, acc: 100, pp: 10, desc: "Water slam with 20% Def drop." },
      { lvl: 53, name: "Stealth Rock", type: "Rock", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Scatters entry hazard rocks.", isBuffed: true },
      { lvl: 60, name: "Hammer Arm", type: "Fighting", cat: "Physical", power: 100, acc: 90, pp: 10, desc: "Heavy arm strike." },
      { lvl: 68, name: "Wave Crash", type: "Water", cat: "Physical", power: 120, acc: 100, pp: 10, desc: "Devastating water rush with recoil.", isBuffed: true }
    ],
    tmMoves: ["TM01 Focus Punch", "TM03 Water Pulse", "TM13 Ice Beam", "TM14 Blizzard", "TM26 Earthquake", "TM31 Brick Break", "TM71 Stone Edge", "TM72 Avalanche"],
    eggMoves: ["Curse", "Yawn", "Mirror Coat", "Wide Guard", "Ancient Power"]
  },

  // ==========================================
  // --- SINNOH ESSENTIALS & FAN FAVORITES ---
  // ==========================================
  {
    id: 396,
    dexNum: "#396",
    name: "Starly",
    species: "Starling Pokémon",
    types: ["Normal", "Flying"],
    stats: { hp: 40, atk: 55, def: 30, spa: 30, spd: 30, spe: 60 },
    vanillaStats: { hp: 40, atk: 55, def: 30, spa: 30, spd: 30, spe: 60 },
    abilities: ["Keen Eye"],
    hiddenAbility: "Reckless",
    generation: 4,
    height: "0.3 m",
    weight: "2.0 kg",
    catchRate: 255,
    genderRatio: "50% M / 50% F",
    heldItems: [],
    evolution: "Evolves into Staravia at Lv. 14",
    locations: ["Route 201, 202, 203, 204, Lake Verity (Everywhere early game)"],
    levelUpMoves: [
      { lvl: 1, name: "Tackle", type: "Normal", cat: "Physical", power: 40, acc: 100, pp: 35, desc: "Charge." },
      { lvl: 5, name: "Quick Attack", type: "Normal", cat: "Physical", power: 40, acc: 100, pp: 30, desc: "Priority strike." },
      { lvl: 9, name: "Wing Attack", type: "Flying", cat: "Physical", power: 60, acc: 100, pp: 35, desc: "Wing strike." }
    ],
    tmMoves: ["TM89 U-turn", "TM40 Aerial Ace"],
    eggMoves: ["Double-Edge", "Roost", "Steel Wing"]
  },
  {
    id: 398,
    dexNum: "#398",
    name: "Staraptor",
    species: "Predator Pokémon",
    types: ["Normal", "Flying"],
    stats: { hp: 85, atk: 120, def: 70, spa: 50, spd: 60, spe: 100 },
    vanillaStats: { hp: 85, atk: 120, def: 70, spa: 50, spd: 60, spe: 100 },
    abilities: ["Intimidate"],
    hiddenAbility: "Reckless",
    generation: 4,
    height: "1.2 m",
    weight: "24.9 kg",
    catchRate: 45,
    genderRatio: "50% M / 50% F",
    heldItems: [],
    evolution: "Final form (evolves from Staravia at Lv. 34)",
    locations: ["Evolve Staravia", "Route 209, 210, 212", "Sendoff Spring"],
    isModified: true,
    lumiChanges: [
      "Reckless boosts Brave Bird and Double-Edge by an incredible 1.2x!",
      "Intimidate softens opposing physical attackers upon entry",
      "Close Combat provides instant coverage against Rock, Steel, and Ice"
    ],
    levelUpMoves: [
      { lvl: 34, name: "Close Combat", type: "Fighting", cat: "Physical", power: 120, acc: 100, pp: 5, desc: "Brutal fighting strike." },
      { lvl: 41, name: "Brave Bird", type: "Flying", cat: "Physical", power: 120, acc: 100, pp: 15, desc: "144 power with Reckless! Recoil damage." },
      { lvl: 49, name: "Double-Edge", type: "Normal", cat: "Physical", power: 120, acc: 100, pp: 15, desc: "144 power with Reckless! Normal STAB." },
      { lvl: 57, name: "Roost", type: "Flying", cat: "Status", power: 0, acc: 0, pp: 10, desc: "Restores up to 50% max HP." },
      { lvl: 64, name: "Final Gambit", type: "Fighting", cat: "Special", power: 0, acc: 100, pp: 5, desc: "Inflicts damage equal to user's remaining HP and faints." }
    ],
    tmMoves: ["TM40 Aerial Ace", "TM51 Roost", "TM68 Giga Impact", "TM89 U-turn"],
    eggMoves: ["Double-Edge", "Steel Wing", "Feather Dance"]
  },

  {
    id: 130,
    dexNum: "#130",
    name: "Gyarados",
    species: "Atrocious Pokémon",
    types: ["Water", "Flying"],
    stats: { hp: 95, atk: 125, def: 79, spa: 60, spd: 100, spe: 81 },
    vanillaStats: { hp: 95, atk: 125, def: 79, spa: 60, spd: 100, spe: 81 },
    abilities: ["Intimidate"],
    hiddenAbility: "Moxie",
    generation: 1,
    height: "6.5 m",
    weight: "235.0 kg",
    catchRate: 45,
    genderRatio: "50% M / 50% F",
    heldItems: [],
    evolution: "Evolves from Magikarp at Lv. 20",
    locations: [
      "Fish with Old Rod / Good Rod in any body of water across Sinnoh",
      "Route 218, Pastoria City, Lake Verity, Lake Valor, Lake Acuity"
    ],
    isModified: true,
    lumiChanges: [
      "Hidden Ability Moxie raises Attack by 1 stage after each knockout!",
      "Dragon Dance setup makes it an unstoppable single-mon sweeper",
      "Learns Bounce, Ice Fang, Waterfall, and Earthquake"
    ],
    levelUpMoves: [
      { lvl: 20, name: "Bite", type: "Dark", cat: "Physical", power: 60, acc: 100, pp: 25, desc: "Dark bite with flinch chance." },
      { lvl: 27, name: "Ice Fang", type: "Ice", cat: "Physical", power: 65, acc: 95, pp: 15, desc: "Freezing bite; coverage against Grass/Dragon." },
      { lvl: 36, name: "Aqua Tail", type: "Water", cat: "Physical", power: 90, acc: 90, pp: 10, desc: "Water slam." },
      { lvl: 44, name: "Dragon Dance", type: "Dragon", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Raises Attack and Speed by 1 stage." },
      { lvl: 51, name: "Crunch", type: "Dark", cat: "Physical", power: 80, acc: 100, pp: 15, desc: "Dark crunch; may lower Def." }
    ],
    tmMoves: ["TM03 Water Pulse", "TM13 Ice Beam", "TM24 Thunderbolt", "TM25 Thunder", "TM26 Earthquake", "TM35 Flamethrower", "TM71 Stone Edge"],
    eggMoves: []
  },

  {
    id: 94,
    dexNum: "#094",
    name: "Gengar",
    species: "Shadow Pokémon",
    types: ["Ghost", "Poison"],
    stats: { hp: 60, atk: 65, def: 60, spa: 130, spd: 75, spe: 110 },
    vanillaStats: { hp: 60, atk: 65, def: 60, spa: 130, spd: 75, spe: 110 },
    abilities: ["Levitate"],
    hiddenAbility: "Cursed Body",
    generation: 1,
    height: "1.5 m",
    weight: "40.5 kg",
    catchRate: 45,
    genderRatio: "50% M / 50% F",
    heldItems: ["Spell Tag (5%)"],
    evolution: "Gastly (Lv. 25) -> Haunter (Use Link Cable / Trade) -> Gengar",
    locations: [
      "Lost Tower (Catch Gastly)",
      "Old Chateau (Catch Haunter / Gengar)",
      "Grand Underground: Dazzling Cave, Spooky Cave"
    ],
    isModified: true,
    lumiChanges: [
      "Levitate ability restored in Luminescent Platinum (Immune to Ground / Spikes / Toxic Spikes!)",
      "Can evolve with Link Cable item (no trading needed!)",
      "Blistering 130 Sp. Atk and 110 Speed"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Shadow Ball", type: "Ghost", cat: "Special", power: 80, acc: 100, pp: 15, desc: "Ghost STAB blast." },
      { lvl: 1, name: "Sludge Bomb", type: "Poison", cat: "Special", power: 90, acc: 100, pp: 10, desc: "Poison STAB with 30% poison chance." },
      { lvl: 40, name: "Dark Pulse", type: "Dark", cat: "Special", power: 80, acc: 100, pp: 15, desc: "Dark beam with flinch chance." },
      { lvl: 50, name: "Destiny Bond", type: "Ghost", cat: "Status", power: 0, acc: 0, pp: 5, desc: "Takes down attacker if user faints." },
      { lvl: 60, name: "Nasty Plot", type: "Dark", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Sharply raises Special Attack.", isBuffed: true }
    ],
    tmMoves: ["TM06 Toxic", "TM24 Thunderbolt", "TM30 Shadow Ball", "TM36 Sludge Bomb", "TM52 Focus Blast", "TM61 Will-O-Wisp", "TM85 Dream Eater"],
    eggMoves: ["Disable", "Perish Song", "Reflect Type", "Haze"]
  },

  {
    id: 65,
    dexNum: "#065",
    name: "Alakazam",
    species: "Psi Pokémon",
    types: ["Psychic"],
    stats: { hp: 55, atk: 50, def: 45, spa: 135, spd: 95, spe: 120 },
    vanillaStats: { hp: 55, atk: 50, def: 45, spa: 135, spd: 95, spe: 120 },
    abilities: ["Synchronize", "Inner Focus"],
    hiddenAbility: "Magic Guard",
    generation: 1,
    height: "1.5 m",
    weight: "48.0 kg",
    catchRate: 50,
    genderRatio: "75% M / 25% F",
    heldItems: ["Twisted Spoon (5%)"],
    evolution: "Abra (Lv. 16) -> Kadabra (Use Link Cable / Trade) -> Alakazam",
    locations: [
      "Route 203, 215 (Catch Abra early)",
      "Grand Underground: Dazzling Cave, Spacious Cave"
    ],
    isModified: true,
    lumiChanges: [
      "Magic Guard prevents all indirect/passive damage (Life Orb recoil, Stealth Rock, Poison, Burn, Hail)!",
      "Free Life Orb 1.3x boost with zero recoil",
      "Can evolve with Link Cable item"
    ],
    levelUpMoves: [
      { lvl: 16, name: "Psybeam", type: "Psychic", cat: "Special", power: 65, acc: 100, pp: 20, desc: "May confuse target." },
      { lvl: 30, name: "Recover", type: "Normal", cat: "Status", power: 0, acc: 0, pp: 10, desc: "Restores up to 50% max HP." },
      { lvl: 40, name: "Psychic", type: "Psychic", cat: "Special", power: 90, acc: 100, pp: 10, desc: "Signature telekinetic blast." },
      { lvl: 48, name: "Calm Mind", type: "Psychic", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Boosts SpA and SpD." }
    ],
    tmMoves: ["TM04 Calm Mind", "TM30 Shadow Ball", "TM52 Focus Blast", "TM53 Energy Ball", "TM73 Thunder Wave", "TM86 Grass Knot"],
    eggMoves: ["Encore", "Barrier", "Knock Off", "Guard Swap"]
  },

  {
    id: 133,
    dexNum: "#133",
    name: "Eevee",
    species: "Evolution Pokémon",
    types: ["Normal"],
    stats: { hp: 55, atk: 55, def: 50, spa: 45, spd: 65, spe: 55 },
    vanillaStats: { hp: 55, atk: 55, def: 50, spa: 45, spd: 65, spe: 55 },
    abilities: ["Run Away", "Adaptability"],
    hiddenAbility: "Anticipation",
    generation: 1,
    height: "0.3 m",
    weight: "6.5 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolves into 8 branches: Vaporeon (Water Stone), Jolteon (Thunder Stone), Flareon (Fire Stone), Espeon (Day Friendship), Umbreon (Night Friendship), Leafeon (Leaf Stone / Moss Rock), Glaceon (Ice Stone / Ice Rock), Sylveon (Fairy Move + Friendship)",
    locations: [
      "Hearthome City (Gift from Bebe after obtaining National Dex / talking to her)",
      "Trophy Garden (Daily special spawn)"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Tackle", type: "Normal", cat: "Physical", power: 40, acc: 100, pp: 35, desc: "Charge." },
      { lvl: 10, name: "Quick Attack", type: "Normal", cat: "Physical", power: 40, acc: 100, pp: 30, desc: "Priority strike." },
      { lvl: 15, name: "Baby-Doll Eyes", type: "Fairy", cat: "Status", power: 0, acc: 100, pp: 30, desc: "Priority Attack drop." },
      { lvl: 25, name: "Bite", type: "Dark", cat: "Physical", power: 60, acc: 100, pp: 25, desc: "Dark bite." }
    ],
    tmMoves: ["TM10 Hidden Power", "TM27 Return", "TM30 Shadow Ball", "TM86 Grass Knot"],
    eggMoves: ["Wish", "Yawn", "Curse", "Double-Edge", "Tickle"]
  },

  {
    id: 700,
    dexNum: "#700",
    name: "Sylveon",
    species: "Intertwining Pokémon",
    types: ["Fairy"],
    stats: { hp: 95, atk: 65, def: 65, spa: 110, spd: 130, spe: 60 },
    vanillaStats: { hp: 95, atk: 65, def: 65, spa: 110, spd: 130, spe: 60 },
    abilities: ["Cute Charm"],
    hiddenAbility: "Pixilate",
    generation: 6,
    height: "1.0 m",
    weight: "23.5 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolve Eevee with High Friendship knowing a Fairy-type move",
    locations: ["Evolve Eevee", "Trophy Garden (Rare spawn)"],
    isModified: true,
    lumiChanges: [
      "Full Gen 6 Fairy Eeveelution fully integrated into Luminescent Platinum!",
      "Pixilate turns Normal moves (Hyper Voice) into Fairy moves with a 1.2x boost!",
      "Tremendous 130 Special Defense special sponge"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Disarming Voice", type: "Fairy", cat: "Special", power: 40, acc: 100, pp: 15, desc: "Never misses." },
      { lvl: 25, name: "Draining Kiss", type: "Fairy", cat: "Special", power: 50, acc: 100, pp: 10, desc: "Recovers 75% HP." },
      { lvl: 35, name: "Moonblast", type: "Fairy", cat: "Special", power: 95, acc: 100, pp: 15, desc: "Signature moonblast STAB." },
      { lvl: 45, name: "Hyper Voice", type: "Normal", cat: "Special", power: 90, acc: 100, pp: 10, desc: "Becomes a 108 power Fairy move bypassing Substitute with Pixilate!", isBuffed: true }
    ],
    tmMoves: ["TM04 Calm Mind", "TM30 Shadow Ball", "TM33 Reflect", "TM16 Light Screen"],
    eggMoves: ["Wish", "Yawn", "Curse"]
  },

  {
    id: 212,
    dexNum: "#212",
    name: "Scizor",
    species: "Pincer Pokémon",
    types: ["Bug", "Steel"],
    stats: { hp: 70, atk: 130, def: 100, spa: 55, spd: 80, spe: 65 },
    vanillaStats: { hp: 70, atk: 130, def: 100, spa: 55, spd: 80, spe: 65 },
    abilities: ["Swarm", "Technician"],
    hiddenAbility: "Light Metal",
    generation: 2,
    height: "1.8 m",
    weight: "118.0 kg",
    catchRate: 25,
    genderRatio: "50% M / 50% F",
    heldItems: ["Metal Coat (5%)"],
    evolution: "Scyther (Use Metal Coat / Link Cable) -> Scizor",
    locations: [
      "Route 210, 215 (Catch Scyther)",
      "Grand Underground: Grassland Cave, Sunlit Cavern"
    ],
    isModified: true,
    lumiChanges: [
      "Can evolve with Metal Coat directly (no trade required)",
      "Technician Bullet Punch deals priority 90 power STAB!",
      "Only 1 weakness (Fire 4x) and 9 resistances + 1 immunity"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Bullet Punch", type: "Steel", cat: "Physical", power: 40, acc: 100, pp: 30, desc: "Priority STAB boosted to 90 power by Technician!" },
      { lvl: 37, name: "X-Scissor", type: "Bug", cat: "Physical", power: 80, acc: 100, pp: 15, desc: "Bug slice." },
      { lvl: 45, name: "Dual Wingbeat", type: "Flying", cat: "Physical", power: 40, acc: 90, pp: 10, desc: "Hits twice; boosted by Technician!", isBuffed: true },
      { lvl: 53, name: "Swords Dance", type: "Normal", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Doubles Attack." },
      { lvl: 61, name: "Roost", type: "Flying", cat: "Status", power: 0, acc: 0, pp: 10, desc: "Restores up to 50% max HP." }
    ],
    tmMoves: ["TM31 Brick Break", "TM40 Aerial Ace", "TM51 Roost", "TM75 Swords Dance", "TM81 X-Scissor", "TM89 U-turn"],
    eggMoves: ["Defog", "Counter", "Night Slash", "Baton Pass"]
  },

  {
    id: 149,
    dexNum: "#149",
    name: "Dragonite",
    species: "Dragon Pokémon",
    types: ["Dragon", "Flying"],
    stats: { hp: 91, atk: 134, def: 95, spa: 100, spd: 100, spe: 80 },
    vanillaStats: { hp: 91, atk: 134, def: 95, spa: 100, spd: 100, spe: 80 },
    abilities: ["Inner Focus"],
    hiddenAbility: "Multiscale",
    generation: 1,
    height: "2.2 m",
    weight: "210.0 kg",
    catchRate: 45,
    genderRatio: "50% M / 50% F",
    heldItems: ["Dragon Scale (5%)"],
    evolution: "Dratini (Lv. 30) -> Dragonair (Lv. 55) -> Dragonite",
    locations: [
      "Mt. Coronet 4F (Waterfall / Super Rod for Dratini)",
      "Grand Underground: Fountainspring Cave"
    ],
    isModified: true,
    lumiChanges: [
      "Multiscale halves all damage taken at full HP!",
      "Dragon Dance + Extreme Speed allows sweep past priority users",
      "Tremendous 600 BST pseudo-legendary"
    ],
    levelUpMoves: [
      { lvl: 55, name: "Outrage", type: "Dragon", cat: "Physical", power: 120, acc: 100, pp: 10, desc: "Rampaging dragon attack." },
      { lvl: 61, name: "Dragon Dance", type: "Dragon", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Raises Attack and Speed by 1 stage." },
      { lvl: 67, name: "Extreme Speed", type: "Normal", cat: "Physical", power: 80, acc: 100, pp: 5, desc: "+2 Priority physical strike.", isBuffed: true },
      { lvl: 75, name: "Roost", type: "Flying", cat: "Status", power: 0, acc: 0, pp: 10, desc: "Restores HP to reactivate Multiscale!", isBuffed: true }
    ],
    tmMoves: ["TM02 Dragon Claw", "TM13 Ice Beam", "TM24 Thunderbolt", "TM26 Earthquake", "TM35 Flamethrower", "TM38 Fire Blast", "TM52 Focus Blast"],
    eggMoves: ["Extreme Speed", "Dragon Dance", "Aqua Jet", "Iron Tail"]
  },

  {
    id: 248,
    dexNum: "#248",
    name: "Tyranitar",
    species: "Armor Pokémon",
    types: ["Rock", "Dark"],
    stats: { hp: 100, atk: 134, def: 110, spa: 95, spd: 100, spe: 61 },
    vanillaStats: { hp: 100, atk: 134, def: 110, spa: 95, spd: 100, spe: 61 },
    abilities: ["Sand Stream"],
    hiddenAbility: "Unnerve",
    generation: 2,
    height: "2.0 m",
    weight: "202.0 kg",
    catchRate: 45,
    genderRatio: "50% M / 50% F",
    heldItems: [],
    evolution: "Larvitar (Lv. 30) -> Pupitar (Lv. 55) -> Tyranitar",
    locations: [
      "Route 207 (Poké Radar: Larvitar)",
      "Grand Underground: Rocky Cave, Sandsear Cave, Big Bluff Cavern"
    ],
    isModified: true,
    lumiChanges: [
      "Sand Stream summons Sandstorm, boosting its Special Defense by 1.5x to 150!",
      "Stealth Rock, Dragon Dance, and Stone Edge in arsenal",
      "Monster 600 BST stats"
    ],
    levelUpMoves: [
      { lvl: 55, name: "Stone Edge", type: "Rock", cat: "Physical", power: 100, acc: 80, pp: 5, desc: "High critical hit rock strike." },
      { lvl: 62, name: "Crunch", type: "Dark", cat: "Physical", power: 80, acc: 100, pp: 15, desc: "Dark STAB with 20% Def drop." },
      { lvl: 70, name: "Earthquake", type: "Ground", cat: "Physical", power: 100, acc: 100, pp: 10, desc: "Ground quake." },
      { lvl: 78, name: "Dragon Dance", type: "Dragon", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Boosts Atk and Spe." }
    ],
    tmMoves: ["TM02 Dragon Claw", "TM13 Ice Beam", "TM24 Thunderbolt", "TM26 Earthquake", "TM35 Flamethrower", "TM71 Stone Edge", "TM75 Swords Dance"],
    eggMoves: ["Dragon Dance", "Stealth Rock", "Curse", "Iron Head"]
  },

  {
    id: 376,
    dexNum: "#376",
    name: "Metagross",
    species: "Iron Leg Pokémon",
    types: ["Steel", "Psychic"],
    stats: { hp: 80, atk: 135, def: 130, spa: 95, spd: 90, spe: 70 },
    vanillaStats: { hp: 80, atk: 135, def: 130, spa: 95, spd: 90, spe: 70 },
    abilities: ["Clear Body"],
    hiddenAbility: "Light Metal",
    generation: 3,
    height: "1.6 m",
    weight: "550.0 kg",
    catchRate: 3,
    genderRatio: "Genderless",
    heldItems: ["Metal Coat (5%)"],
    evolution: "Beldum (Lv. 20) -> Metang (Lv. 45) -> Metagross",
    locations: [
      "Route 228 (Poké Radar: Beldum)",
      "Grand Underground: Rocky Cave, Whiteout Cave"
    ],
    isModified: true,
    lumiChanges: [
      "Clear Body prevents all stat drops from Intimidate and debuffs",
      "Signature Move: Meteor Mash (100 Power Steel STAB, may boost Attack)",
      "Bullet Punch priority + Agility setup options"
    ],
    levelUpMoves: [
      { lvl: 45, name: "Meteor Mash", type: "Steel", cat: "Physical", power: 90, acc: 90, pp: 10, desc: "Heavy steel punch; may raise Attack." },
      { lvl: 52, name: "Zen Headbutt", type: "Psychic", cat: "Physical", power: 80, acc: 90, pp: 15, desc: "Psychic headbutt with flinch chance." },
      { lvl: 60, name: "Bullet Punch", type: "Steel", cat: "Physical", power: 40, acc: 100, pp: 30, desc: "Priority steel strike." },
      { lvl: 70, name: "Agility", type: "Psychic", cat: "Status", power: 0, acc: 0, pp: 30, desc: "Sharply raises Speed." }
    ],
    tmMoves: ["TM26 Earthquake", "TM31 Brick Break", "TM71 Stone Edge", "TM73 Thunder Wave", "TM91 Flash Cannon"],
    eggMoves: []
  },

  {
    id: 143,
    dexNum: "#143",
    name: "Snorlax",
    species: "Sleeping Pokémon",
    types: ["Normal"],
    stats: { hp: 160, atk: 110, def: 65, spa: 65, spd: 110, spe: 30 },
    vanillaStats: { hp: 160, atk: 110, def: 65, spa: 65, spd: 110, spe: 30 },
    abilities: ["Immunity", "Thick Fat"],
    hiddenAbility: "Gluttony",
    generation: 1,
    height: "2.1 m",
    weight: "460.0 kg",
    catchRate: 25,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: ["Leftovers (100%)"],
    evolution: "Munchlax (High Friendship) -> Snorlax",
    locations: [
      "Honey Trees across Sinnoh (Catch Munchlax)",
      "Grand Underground: Spacious Cave, Dazzling Cave"
    ],
    isModified: true,
    lumiChanges: [
      "Thick Fat halves Fire and Ice damage, adding to its massive 160 HP and 110 SpD",
      "Curse + Body Slam + Rest makes it an immortal wall",
      "Always comes with Leftovers attached"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Body Slam", type: "Normal", cat: "Physical", power: 85, acc: 100, pp: 15, desc: "Heavy slam with 30% paralysis chance." },
      { lvl: 25, name: "Belly Drum", type: "Normal", cat: "Status", power: 0, acc: 0, pp: 10, desc: "Maximizes Attack at cost of half HP." },
      { lvl: 35, name: "Rest", type: "Psychic", cat: "Status", power: 0, acc: 0, pp: 10, desc: "Sleeps for 2 turns and heals 100% HP." },
      { lvl: 35, name: "Sleep Talk", type: "Normal", cat: "Status", power: 0, acc: 0, pp: 10, desc: "Attacks randomly while asleep." },
      { lvl: 45, name: "Curse", type: "Ghost", cat: "Status", power: 0, acc: 0, pp: 10, desc: "Lowers Speed, raises Attack and Defense." }
    ],
    tmMoves: ["TM13 Ice Beam", "TM24 Thunderbolt", "TM26 Earthquake", "TM35 Flamethrower", "TM31 Brick Break"],
    eggMoves: ["Curse", "Double-Edge", "Whirlwind", "Counter"]
  },

  // ==========================================
  // --- SINNOH STARTERS & REWORKS ---
  // ==========================================
  {
    id: 387,
    dexNum: "#387",
    name: "Turtwig",
    species: "Tiny Leaf Pokémon",
    types: ["Grass"],
    stats: { hp: 55, atk: 68, def: 64, spa: 45, spd: 55, spe: 31 },
    vanillaStats: { hp: 55, atk: 68, def: 64, spa: 45, spd: 55, spe: 31 },
    abilities: ["Overgrow"],
    hiddenAbility: "Shell Armor",
    generation: 4,
    height: "0.4 m",
    weight: "10.2 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolves into Grotle at Lv. 18",
    locations: [
      "Starter choice from Professor Rowan at Lake Verity",
      "Grand Underground: Grassland Cave, Riverbank Cave, Sunlit Cavern"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Tackle", type: "Normal", cat: "Physical", power: 40, acc: 100, pp: 35, desc: "A physical charge." },
      { lvl: 5, name: "Withdraw", type: "Water", cat: "Status", power: 0, acc: 0, pp: 40, desc: "Raises Defense." },
      { lvl: 9, name: "Absorb", type: "Grass", cat: "Special", power: 20, acc: 100, pp: 25, desc: "Drains HP." },
      { lvl: 13, name: "Razor Leaf", type: "Grass", cat: "Physical", power: 55, acc: 95, pp: 25, desc: "High critical hit ratio." },
      { lvl: 17, name: "Curse", type: "Ghost", cat: "Status", power: 0, acc: 0, pp: 10, desc: "Boosts Atk and Def, lowers Speed." }
    ],
    tmMoves: ["TM06 Toxic", "TM19 Giga Drain", "TM22 Solar Beam", "TM86 Grass Knot"],
    eggMoves: ["Seed Bomb", "Body Slam", "Superpower", "Wide Guard"]
  },
  {
    id: 388,
    dexNum: "#388",
    name: "Grotle",
    species: "Grove Pokémon",
    types: ["Grass"],
    stats: { hp: 75, atk: 89, def: 85, spa: 55, spd: 65, spe: 36 },
    vanillaStats: { hp: 75, atk: 89, def: 85, spa: 55, spd: 65, spe: 36 },
    abilities: ["Overgrow"],
    hiddenAbility: "Shell Armor",
    generation: 4,
    height: "1.1 m",
    weight: "97.0 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolves from Turtwig at Lv. 18, evolves into Torterra at Lv. 32",
    locations: ["Evolve Turtwig", "Grand Underground: Grassland Cave, Sunlit Cavern"],
    levelUpMoves: [
      { lvl: 18, name: "Razor Leaf", type: "Grass", cat: "Physical", power: 55, acc: 95, pp: 25, desc: "High critical hit ratio." },
      { lvl: 22, name: "Curse", type: "Ghost", cat: "Status", power: 0, acc: 0, pp: 10, desc: "Boosts Atk and Def." },
      { lvl: 32, name: "Seed Bomb", type: "Grass", cat: "Physical", power: 80, acc: 100, pp: 15, desc: "Hard seed attack.", isBuffed: true }
    ],
    tmMoves: ["TM06 Toxic", "TM19 Giga Drain", "TM26 Earthquake", "TM86 Grass Knot"],
    eggMoves: ["Seed Bomb", "Earth Power"]
  },
  {
    id: 389,
    dexNum: "#389",
    name: "Torterra",
    species: "Continent Pokémon",
    types: ["Grass", "Ground"],
    stats: { hp: 95, atk: 109, def: 105, spa: 75, spd: 85, spe: 56 },
    vanillaStats: { hp: 95, atk: 109, def: 105, spa: 75, spd: 85, spe: 56 },
    abilities: ["Overgrow"],
    hiddenAbility: "Shell Armor",
    generation: 4,
    height: "2.2 m",
    weight: "310.0 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Final form (evolves from Grotle at Lv. 32)",
    locations: ["Evolve Grotle", "Grand Underground: Sunlit Cavern (Postgame)"],
    isModified: true,
    lumiChanges: [
      "Gains Headlong Rush and Shell Smash in learnset",
      "Wood Hammer and Earthquake boosted through updated move mechanics",
      "Shell Armor prevents critical hits in tough boss battles"
    ],
    levelUpMoves: [
      { lvl: 32, name: "Earthquake", type: "Ground", cat: "Physical", power: 100, acc: 100, pp: 10, desc: "Devastating ground shake." },
      { lvl: 39, name: "Synthesis", type: "Grass", cat: "Status", power: 0, acc: 0, pp: 5, desc: "Restores HP." },
      { lvl: 45, name: "Crunch", type: "Dark", cat: "Physical", power: 80, acc: 100, pp: 15, desc: "May lower Defense." },
      { lvl: 53, name: "Wood Hammer", type: "Grass", cat: "Physical", power: 120, acc: 100, pp: 15, desc: "Powerful attack with recoil." },
      { lvl: 60, name: "Headlong Rush", type: "Ground", cat: "Physical", power: 120, acc: 100, pp: 5, desc: "Massive charge; lowers Def/SpD.", isBuffed: true },
      { lvl: 65, name: "Shell Smash", type: "Normal", cat: "Status", power: 0, acc: 0, pp: 15, desc: "Drastically boosts Atk, SpA, and Spe.", isBuffed: true }
    ],
    tmMoves: ["TM26 Earthquake", "TM71 Stone Edge", "TM53 Energy Ball", "TM86 Grass Knot"],
    eggMoves: ["Seed Bomb", "Heavy Slam", "Superpower", "Wide Guard"]
  },

  {
    id: 390,
    dexNum: "#390",
    name: "Chimchar",
    species: "Chimp Pokémon",
    types: ["Fire"],
    stats: { hp: 44, atk: 58, def: 44, spa: 58, spd: 44, spe: 61 },
    vanillaStats: { hp: 44, atk: 58, def: 44, spa: 58, spd: 44, spe: 61 },
    abilities: ["Blaze"],
    hiddenAbility: "Iron Fist",
    generation: 4,
    height: "0.5 m",
    weight: "6.2 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolves into Monferno at Lv. 14",
    locations: [
      "Starter choice from Professor Rowan at Lake Verity",
      "Grand Underground: Volcanic Cave, Typhlo Cavern, Sandsear Cave"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Scratch", type: "Normal", cat: "Physical", power: 40, acc: 100, pp: 35, desc: "Claw attack." },
      { lvl: 7, name: "Ember", type: "Fire", cat: "Special", power: 40, acc: 100, pp: 25, desc: "May burn." },
      { lvl: 15, name: "Mach Punch", type: "Fighting", cat: "Physical", power: 40, acc: 100, pp: 30, desc: "Priority punch.", isBuffed: true }
    ],
    tmMoves: ["TM10 Hidden Power", "TM35 Flamethrower", "TM38 Fire Blast", "TM89 U-turn"],
    eggMoves: ["Thunder Punch", "Fire Punch", "Fake Out"]
  },
  {
    id: 391,
    dexNum: "#391",
    name: "Monferno",
    species: "Playful Pokémon",
    types: ["Fire", "Fighting"],
    stats: { hp: 64, atk: 78, def: 52, spa: 78, spd: 52, spe: 81 },
    vanillaStats: { hp: 64, atk: 78, def: 52, spa: 78, spd: 52, spe: 81 },
    abilities: ["Blaze"],
    hiddenAbility: "Iron Fist",
    generation: 4,
    height: "0.9 m",
    weight: "22.0 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolves from Chimchar at Lv. 14, evolves into Infernape at Lv. 36",
    locations: ["Evolve Chimchar", "Grand Underground: Volcanic Cave, Typhlo Cavern"],
    levelUpMoves: [
      { lvl: 14, name: "Mach Punch", type: "Fighting", cat: "Physical", power: 40, acc: 100, pp: 30, desc: "Priority punch." },
      { lvl: 19, name: "Flame Wheel", type: "Fire", cat: "Physical", power: 60, acc: 100, pp: 25, desc: "Fire charge." },
      { lvl: 36, name: "Close Combat", type: "Fighting", cat: "Physical", power: 120, acc: 100, pp: 5, desc: "Fighting combo." }
    ],
    tmMoves: ["TM35 Flamethrower", "TM38 Fire Blast", "TM52 Focus Blast", "TM89 U-turn"],
    eggMoves: ["Thunder Punch", "Fire Punch", "Fake Out"]
  },
  {
    id: 392,
    dexNum: "#392",
    name: "Infernape",
    species: "Flame Pokémon",
    types: ["Fire", "Fighting"],
    stats: { hp: 76, atk: 104, def: 71, spa: 104, spd: 71, spe: 108 },
    vanillaStats: { hp: 76, atk: 104, def: 71, spa: 104, spd: 71, spe: 108 },
    abilities: ["Blaze"],
    hiddenAbility: "Iron Fist",
    generation: 4,
    height: "1.2 m",
    weight: "35.0 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Final form (evolves from Monferno at Lv. 36)",
    locations: ["Evolve Monferno", "Grand Underground: Typhlo Cavern (Postgame)"],
    isModified: true,
    lumiChanges: [
      "Iron Fist boost increased from 1.2x to 1.3x punch damage",
      "Expanded learnset: Drain Punch, Thunder Punch, Fire Punch via move relearner",
      "High mixed offensive speed demon"
    ],
    levelUpMoves: [
      { lvl: 36, name: "Close Combat", type: "Fighting", cat: "Physical", power: 120, acc: 100, pp: 5, desc: "Massive blows; lowers user Def and SpD." },
      { lvl: 42, name: "Fire Punch", type: "Fire", cat: "Physical", power: 75, acc: 100, pp: 15, desc: "Fiery punch boosted by Iron Fist.", isBuffed: true },
      { lvl: 47, name: "Thunder Punch", type: "Electric", cat: "Physical", power: 75, acc: 100, pp: 15, desc: "Electric punch; coverage for Water and Flying.", isBuffed: true },
      { lvl: 53, name: "Flare Blitz", type: "Fire", cat: "Physical", power: 120, acc: 100, pp: 15, desc: "Infernal tackle with recoil." },
      { lvl: 58, name: "Mach Punch", type: "Fighting", cat: "Physical", power: 40, acc: 100, pp: 30, desc: "Priority strike boosted by Iron Fist." }
    ],
    tmMoves: ["TM35 Flamethrower", "TM38 Fire Blast", "TM52 Focus Blast", "TM71 Stone Edge", "TM89 U-turn"],
    eggMoves: ["Fake Out", "Thunder Punch", "Focus Punch", "Encore"]
  },

  {
    id: 393,
    dexNum: "#393",
    name: "Piplup",
    species: "Penguin Pokémon",
    types: ["Water"],
    stats: { hp: 53, atk: 51, def: 53, spa: 61, spd: 56, spe: 40 },
    vanillaStats: { hp: 53, atk: 51, def: 53, spa: 61, spd: 56, spe: 40 },
    abilities: ["Torrent"],
    hiddenAbility: "Competitive",
    generation: 4,
    height: "0.4 m",
    weight: "5.2 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolves into Prinplup at Lv. 16",
    locations: [
      "Starter choice from Professor Rowan at Lake Verity",
      "Grand Underground: Fountainspring Cave, Riverbank Cave, Still-Water Cavern"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Pound", type: "Normal", cat: "Physical", power: 40, acc: 100, pp: 35, desc: "Pounds target." },
      { lvl: 8, name: "Water Gun", type: "Water", cat: "Special", power: 40, acc: 100, pp: 25, desc: "Water squirt." },
      { lvl: 18, name: "Bubble Beam", type: "Water", cat: "Special", power: 65, acc: 100, pp: 20, desc: "May lower Speed." }
    ],
    tmMoves: ["TM03 Water Pulse", "TM13 Ice Beam", "TM14 Blizzard", "TM55 Brine"],
    eggMoves: ["Agility", "Aqua Ring", "Feather Dance", "Yawn"]
  },
  {
    id: 394,
    dexNum: "#394",
    name: "Prinplup",
    species: "Penguin Pokémon",
    types: ["Water"],
    stats: { hp: 64, atk: 66, def: 68, spa: 81, spd: 76, spe: 50 },
    vanillaStats: { hp: 64, atk: 66, def: 68, spa: 81, spd: 76, spe: 50 },
    abilities: ["Torrent"],
    hiddenAbility: "Competitive",
    generation: 4,
    height: "0.8 m",
    weight: "23.0 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolves from Piplup at Lv. 16, evolves into Empoleon at Lv. 36",
    locations: ["Evolve Piplup", "Grand Underground: Fountainspring Cave, Riverbank Cave"],
    levelUpMoves: [
      { lvl: 16, name: "Bubble Beam", type: "Water", cat: "Special", power: 65, acc: 100, pp: 20, desc: "May lower Speed." },
      { lvl: 33, name: "Brine", type: "Water", cat: "Special", power: 65, acc: 100, pp: 10, desc: "Double damage if foe < 50% HP." }
    ],
    tmMoves: ["TM03 Water Pulse", "TM13 Ice Beam", "TM55 Brine", "TM91 Flash Cannon"],
    eggMoves: ["Agility", "Yawn", "Icy Wind"]
  },
  {
    id: 395,
    dexNum: "#395",
    name: "Empoleon",
    species: "Emperor Pokémon",
    types: ["Water", "Steel"],
    stats: { hp: 84, atk: 86, def: 88, spa: 111, spd: 101, spe: 60 },
    vanillaStats: { hp: 84, atk: 86, def: 88, spa: 111, spd: 101, spe: 60 },
    abilities: ["Torrent"],
    hiddenAbility: "Competitive",
    generation: 4,
    height: "1.7 m",
    weight: "84.5 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Final form (evolves from Prinplup at Lv. 36)",
    locations: ["Evolve Prinplup", "Grand Underground: Fountainspring Cave (Postgame)"],
    isModified: true,
    lumiChanges: [
      "Hidden Ability changed to Competitive (Defiant in vanilla, useless for special attacker)",
      "Gains Roost in level-up learnset for reliable recovery",
      "Gains Wave Crash, Flash Cannon, and Ice Spinner"
    ],
    levelUpMoves: [
      { lvl: 36, name: "Flash Cannon", type: "Steel", cat: "Special", power: 80, acc: 100, pp: 10, desc: "Steel light beam. May lower SpD." },
      { lvl: 39, name: "Aqua Jet", type: "Water", cat: "Physical", power: 40, acc: 100, pp: 20, desc: "Priority water strike." },
      { lvl: 46, name: "Hydro Pump", type: "Water", cat: "Special", power: 110, acc: 80, pp: 5, desc: "Blasts water with huge volume." },
      { lvl: 52, name: "Roost", type: "Flying", cat: "Status", power: 0, acc: 0, pp: 10, desc: "Restores up to 50% max HP.", isBuffed: true },
      { lvl: 58, name: "Wave Crash", type: "Water", cat: "Physical", power: 120, acc: 100, pp: 10, desc: "Fierce water tackle with recoil.", isBuffed: true }
    ],
    tmMoves: ["TM13 Ice Beam", "TM14 Blizzard", "TM55 Brine", "TM91 Flash Cannon", "TM26 Earthquake"],
    eggMoves: ["Agility", "Yawn", "Feather Dance", "Mist"]
  },

  // ==========================================
  // --- DRAYANO / LUMI SIGNATURE REWORKS ---
  // ==========================================
  {
    id: 330,
    dexNum: "#330",
    name: "Flygon",
    species: "Mystic Pokémon",
    types: ["Bug", "Dragon"],
    vanillaTypes: ["Ground", "Dragon"],
    stats: { hp: 80, atk: 110, def: 80, spa: 110, spd: 80, spe: 140 },
    vanillaStats: { hp: 80, atk: 100, def: 80, spa: 80, spd: 80, spe: 100 },
    abilities: ["Compound Eyes", "Levitate"],
    hiddenAbility: "Overcoat",
    generation: 3,
    height: "2.0 m",
    weight: "82.0 kg",
    catchRate: 45,
    genderRatio: "50% M / 50% F",
    heldItems: ["Soft Sand (5%)"],
    evolution: "Trapinch (Lv. 35) -> Vibrava (Lv. 45) -> Flygon",
    locations: [
      "Route 228 (Walking: 20%)",
      "Grand Underground: Rocky Cave, Sandsear Cave, Big Bluff Cavern",
      "Poké Radar: Route 206 (Trapinch)"
    ],
    isModified: true,
    lumiChanges: [
      "Typing changed to Bug / Dragon (was Ground / Dragon)",
      "BST boosted to 600 (Pseudo-Legendary tier, was 520)",
      "Atk (+10), SpA (+30), Spe (+40)",
      "Gained Compound Eyes and Overcoat abilities",
      "Learns Quiver Dance, Bug Buzz, and First Impression!"
    ],
    levelUpMoves: [
      { lvl: 45, name: "Dragon Claw", type: "Dragon", cat: "Physical", power: 80, acc: 100, pp: 15, desc: "Sharp claws rend target." },
      { lvl: 47, name: "Bug Buzz", type: "Bug", cat: "Special", power: 90, acc: 100, pp: 10, desc: "Vibrates sound waves; may lower SpD.", isBuffed: true },
      { lvl: 52, name: "First Impression", type: "Bug", cat: "Physical", power: 90, acc: 100, pp: 10, desc: "High priority first turn only.", isBuffed: true },
      { lvl: 58, name: "Earth Power", type: "Ground", cat: "Special", power: 90, acc: 100, pp: 10, desc: "Ground erupts under foe." },
      { lvl: 63, name: "Quiver Dance", type: "Bug", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Boosts SpA, SpD, and Spe by 1 stage.", isBuffed: true },
      { lvl: 68, name: "Outrage", type: "Dragon", cat: "Physical", power: 120, acc: 100, pp: 10, desc: "Rampages for 2-3 turns then confounds." }
    ],
    tmMoves: ["TM02 Dragon Claw", "TM26 Earthquake", "TM35 Flamethrower", "TM38 Fire Blast", "TM89 U-turn"],
    eggMoves: ["First Impression", "Earth Power", "Quick Attack", "Bug Bite"]
  },

  {
    id: 405,
    dexNum: "#405",
    name: "Luxray",
    species: "Gleam Eyes Pokémon",
    types: ["Electric", "Dark"],
    vanillaTypes: ["Electric"],
    stats: { hp: 80, atk: 120, def: 79, spa: 95, spd: 79, spe: 85 },
    vanillaStats: { hp: 80, atk: 120, def: 79, spa: 95, spd: 79, spe: 70 },
    abilities: ["Rivalry", "Intimidate"],
    hiddenAbility: "Strong Jaw",
    generation: 4,
    height: "1.4 m",
    weight: "42.0 kg",
    catchRate: 45,
    genderRatio: "50% M / 50% F",
    heldItems: [],
    evolution: "Shinx (Lv. 15) -> Luxio (Lv. 30) -> Luxray",
    locations: [
      "Route 222 (Walking: 25%)",
      "Route 202, 203, 204 (Catch Shinx early)",
      "Grand Underground: Spacious Cave, Dazzling Cave, Grassland Cave"
    ],
    isModified: true,
    lumiChanges: [
      "Typing changed to Electric / Dark (Secondary Dark typing added)",
      "Speed buffed from 70 to 85 (+15 Spe)",
      "Hidden Ability changed to Strong Jaw (boosts Crunch, Psychic Fangs, Ice Fang, Fire Fang, Thunder Fang)",
      "Learns Sucker Punch, Psychic Fangs, and Play Rough"
    ],
    levelUpMoves: [
      { lvl: 30, name: "Thunder Fang", type: "Electric", cat: "Physical", power: 65, acc: 95, pp: 15, desc: "Electric bite. Boosted by Strong Jaw." },
      { lvl: 33, name: "Crunch", type: "Dark", cat: "Physical", power: 80, acc: 100, pp: 15, desc: "STAB bite boosted by Strong Jaw.", isBuffed: true },
      { lvl: 38, name: "Psychic Fangs", type: "Psychic", cat: "Physical", power: 85, acc: 100, pp: 10, desc: "Breaks screens; boosted by Strong Jaw.", isBuffed: true },
      { lvl: 44, name: "Wild Charge", type: "Electric", cat: "Physical", power: 90, acc: 100, pp: 15, desc: "Electrified tackle with recoil." },
      { lvl: 50, name: "Sucker Punch", type: "Dark", cat: "Physical", power: 70, acc: 100, pp: 5, desc: "High priority STAB dark strike.", isBuffed: true },
      { lvl: 56, name: "Volt Tackle", type: "Electric", cat: "Physical", power: 120, acc: 100, pp: 15, desc: "Devastating electric rush.", isBuffed: true }
    ],
    tmMoves: ["TM24 Thunderbolt", "TM25 Thunder", "TM89 U-turn", "TM46 Thief", "TM73 Thunder Wave"],
    eggMoves: ["Ice Fang", "Fire Fang", "Quick Attack", "Night Slash", "Play Rough"]
  },

  {
    id: 154,
    dexNum: "#154",
    name: "Meganium",
    species: "Herb Pokémon",
    types: ["Grass", "Fairy"],
    vanillaTypes: ["Grass"],
    stats: { hp: 90, atk: 82, def: 100, spa: 93, spd: 105, spe: 80 },
    vanillaStats: { hp: 80, atk: 82, def: 100, spa: 83, spd: 100, spe: 80 },
    abilities: ["Overgrow"],
    hiddenAbility: "Triage",
    generation: 2,
    height: "1.8 m",
    weight: "100.5 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Chikorita (Lv. 16) -> Bayleef (Lv. 32) -> Meganium",
    locations: [
      "Floaroma Meadow (Special Gift from NPC)",
      "Grand Underground: Grassland Cave, Sunlit Cavern"
    ],
    isModified: true,
    lumiChanges: [
      "Typing changed to Grass / Fairy",
      "BST buffed from 525 to 550 (+10 HP, +10 SpA, +5 SpD)",
      "Hidden Ability changed to Triage (Gives +3 Priority to healing moves: Giga Drain, Draining Kiss, Synthesis, Aromatherapy)",
      "Learns Moonblast, Draining Kiss, and Earth Power"
    ],
    levelUpMoves: [
      { lvl: 32, name: "Petal Dance", type: "Grass", cat: "Special", power: 120, acc: 100, pp: 10, desc: "Storm of petals for 2-3 turns." },
      { lvl: 36, name: "Draining Kiss", type: "Fairy", cat: "Special", power: 50, acc: 100, pp: 10, desc: "Recovers 75% HP. Priority with Triage!", isBuffed: true },
      { lvl: 42, name: "Giga Drain", type: "Grass", cat: "Special", power: 75, acc: 100, pp: 10, desc: "Recovers 50% HP. Priority with Triage!", isBuffed: true },
      { lvl: 48, name: "Moonblast", type: "Fairy", cat: "Special", power: 95, acc: 100, pp: 15, desc: "STAB fairy moon blast; may lower SpA.", isBuffed: true },
      { lvl: 54, name: "Earth Power", type: "Ground", cat: "Special", power: 90, acc: 100, pp: 10, desc: "Ground coverage for Poison & Fire.", isBuffed: true }
    ],
    tmMoves: ["TM19 Giga Drain", "TM53 Energy Ball", "TM86 Grass Knot", "TM33 Reflect", "TM16 Light Screen"],
    eggMoves: ["Leech Seed", "Ancient Power", "Counter", "Nature Power"]
  },

  {
    id: 157,
    dexNum: "#157",
    name: "Typhlosion",
    species: "Volcano Pokémon",
    types: ["Fire", "Ground"],
    vanillaTypes: ["Fire"],
    stats: { hp: 78, atk: 84, def: 78, spa: 119, spd: 85, spe: 100 },
    vanillaStats: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 },
    abilities: ["Blaze"],
    hiddenAbility: "Drought",
    generation: 2,
    height: "1.7 m",
    weight: "79.5 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Cyndaquil (Lv. 14) -> Quilava (Lv. 36) -> Typhlosion (or Hisuian Typhlosion via Incense Burner)",
    locations: [
      "Fuego Ironworks (Special Gift from NPC)",
      "Grand Underground: Volcanic Cave, Sandsear Cave, Typhlo Cavern"
    ],
    isModified: true,
    lumiChanges: [
      "Typing changed to Fire / Ground (Secondary Ground added)",
      "Sp. Atk buffed from 109 to 119 (+10 SpA)",
      "Hidden Ability changed to Drought (Sets Harsh Sunlight upon entering battle)",
      "Learns Earth Power, Scorching Sands, Solar Beam, and Eruption"
    ],
    levelUpMoves: [
      { lvl: 36, name: "Earth Power", type: "Ground", cat: "Special", power: 90, acc: 100, pp: 10, desc: "STAB earth attack.", isBuffed: true },
      { lvl: 42, name: "Flamethrower", type: "Fire", cat: "Special", power: 90, acc: 100, pp: 15, desc: "Boosted to 135 power under Drought." },
      { lvl: 48, name: "Scorching Sands", type: "Ground", cat: "Special", power: 70, acc: 100, pp: 10, desc: "May inflict a burn on target.", isBuffed: true },
      { lvl: 56, name: "Solar Beam", type: "Grass", cat: "Special", power: 120, acc: 100, pp: 10, desc: "Instant strike in Sunlight!", isBuffed: true },
      { lvl: 65, name: "Eruption", type: "Fire", cat: "Special", power: 150, acc: 100, pp: 5, desc: "Catastrophic sun-boosted burst at full HP." }
    ],
    tmMoves: ["TM35 Flamethrower", "TM38 Fire Blast", "TM50 Overheat", "TM22 Solar Beam", "TM52 Focus Blast"],
    eggMoves: ["Extrasensory", "Covet", "Howl", "Quick Attack"]
  },

  {
    id: 160,
    dexNum: "#160",
    name: "Feraligatr",
    species: "Big Jaw Pokémon",
    types: ["Water", "Dark"],
    vanillaTypes: ["Water"],
    stats: { hp: 85, atk: 110, def: 100, spa: 79, spd: 83, spe: 83 },
    vanillaStats: { hp: 85, atk: 105, def: 100, spa: 79, spd: 83, spe: 78 },
    abilities: ["Torrent"],
    hiddenAbility: "Strong Jaw",
    generation: 2,
    height: "2.3 m",
    weight: "88.8 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Totodile (Lv. 18) -> Croconaw (Lv. 30) -> Feraligatr",
    locations: [
      "Pastoria City (Special Gift from NPC)",
      "Grand Underground: Fountainspring Cave, Riverbank Cave"
    ],
    isModified: true,
    lumiChanges: [
      "Typing changed to Water / Dark",
      "Atk (+5) and Spe (+5) buffed",
      "Hidden Ability updated to Strong Jaw / Sheer Force synergy",
      "Learns Jaw Lock, Psychic Fangs, Ice Fang, and Dragon Dance"
    ],
    levelUpMoves: [
      { lvl: 30, name: "Crunch", type: "Dark", cat: "Physical", power: 80, acc: 100, pp: 15, desc: "Dark STAB boosted by Strong Jaw.", isBuffed: true },
      { lvl: 35, name: "Ice Fang", type: "Ice", cat: "Physical", power: 65, acc: 95, pp: 15, desc: "Freeze coverage; boosted by Strong Jaw." },
      { lvl: 42, name: "Jaw Lock", type: "Dark", cat: "Physical", power: 80, acc: 100, pp: 10, desc: "Traps both combatants; boosted by Strong Jaw.", isBuffed: true },
      { lvl: 48, name: "Liquidation", type: "Water", cat: "Physical", power: 85, acc: 100, pp: 10, desc: "Water STAB slamming attack." },
      { lvl: 55, name: "Dragon Dance", type: "Dragon", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Raises Atk and Spe by 1 stage." }
    ],
    tmMoves: ["TM01 Focus Punch", "TM02 Dragon Claw", "TM13 Ice Beam", "TM26 Earthquake", "TM31 Brick Break"],
    eggMoves: ["Dragon Dance", "Aqua Jet", "Ice Punch", "Crunch"]
  },

  {
    id: 466,
    dexNum: "#466",
    name: "Electivire",
    species: "Thunderbolt Pokémon",
    types: ["Electric", "Fighting"],
    vanillaTypes: ["Electric"],
    stats: { hp: 75, atk: 128, def: 67, spa: 95, spd: 85, spe: 100 },
    vanillaStats: { hp: 75, atk: 123, def: 67, spa: 95, spd: 85, spe: 95 },
    abilities: ["Motor Drive"],
    hiddenAbility: "Iron Fist",
    generation: 4,
    height: "1.8 m",
    weight: "138.6 kg",
    catchRate: 30,
    genderRatio: "75% M / 25% F",
    heldItems: ["Electirizer (5%)"],
    evolution: "Elekid (Lv. 30) -> Electabuzz (Use Electirizer / Link Cable) -> Electivire",
    locations: [
      "Route 222 (Catch Electabuzz holding Electirizer)",
      "Grand Underground: Dazzling Cave, Whiteout Cave"
    ],
    isModified: true,
    lumiChanges: [
      "Typing changed to Electric / Fighting (Secondary Fighting added)",
      "Atk buffed (+5) and Spe buffed to 100 (+5 Spe)",
      "Hidden Ability changed to Iron Fist (boosts all elemental punches & Mach Punch)",
      "Learns Mach Punch, Close Combat, and Plasma Fists!"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Mach Punch", type: "Fighting", cat: "Physical", power: 40, acc: 100, pp: 30, desc: "Priority fighting punch boosted by Iron Fist.", isBuffed: true },
      { lvl: 1, name: "Thunder Punch", type: "Electric", cat: "Physical", power: 75, acc: 100, pp: 15, desc: "Boosted by Iron Fist to 97.5 power." },
      { lvl: 1, name: "Fire Punch", type: "Fire", cat: "Physical", power: 75, acc: 100, pp: 15, desc: "Coverage punch boosted by Iron Fist." },
      { lvl: 1, name: "Ice Punch", type: "Ice", cat: "Physical", power: 75, acc: 100, pp: 15, desc: "Crucial Ground/Dragon coverage punch." },
      { lvl: 49, name: "Close Combat", type: "Fighting", cat: "Physical", power: 120, acc: 100, pp: 5, desc: "STAB Fighting nuke.", isBuffed: true },
      { lvl: 58, name: "Plasma Fists", type: "Electric", cat: "Physical", power: 100, acc: 100, pp: 15, desc: "Signature electrified punch attack.", isBuffed: true }
    ],
    tmMoves: ["TM24 Thunderbolt", "TM26 Earthquake", "TM31 Brick Break", "TM71 Stone Edge", "TM89 U-turn"],
    eggMoves: ["Cross Chop", "Feint", "Dynamic Punch", "Meditate"]
  },

  {
    id: 467,
    dexNum: "#467",
    name: "Magmortar",
    species: "Blast Pokémon",
    types: ["Fire"],
    stats: { hp: 75, atk: 95, def: 67, spa: 130, spd: 95, spe: 88 },
    vanillaStats: { hp: 75, atk: 95, def: 67, spa: 125, spd: 95, spe: 83 },
    abilities: ["Flame Body"],
    hiddenAbility: "Mega Launcher",
    generation: 4,
    height: "1.6 m",
    weight: "68.0 kg",
    catchRate: 30,
    genderRatio: "75% M / 25% F",
    heldItems: ["Magmarizer (5%)"],
    evolution: "Magby (Lv. 30) -> Magmar (Use Magmarizer / Link Cable) -> Magmortar",
    locations: [
      "Fuego Ironworks (Magmar holding Magmarizer)",
      "Grand Underground: Volcanic Cave, Typhlo Cavern"
    ],
    isModified: true,
    lumiChanges: [
      "Sp. Atk buffed to 130 (+5) and Speed buffed to 88 (+5)",
      "Hidden Ability changed to Mega Launcher (1.5x damage on pulse & aura moves)",
      "Learns Aura Sphere, Dragon Pulse, Dark Pulse, and Terrain Pulse!"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Aura Sphere", type: "Fighting", cat: "Special", power: 80, acc: 100, pp: 20, desc: "Never misses; boosted to 120 power by Mega Launcher!", isBuffed: true },
      { lvl: 1, name: "Dragon Pulse", type: "Dragon", cat: "Special", power: 85, acc: 100, pp: 10, desc: "Boosted to 127.5 power by Mega Launcher!", isBuffed: true },
      { lvl: 37, name: "Flamethrower", type: "Fire", cat: "Special", power: 90, acc: 100, pp: 15, desc: "High temperature fire blast." },
      { lvl: 45, name: "Dark Pulse", type: "Dark", cat: "Special", power: 80, acc: 100, pp: 15, desc: "Boosted to 120 power by Mega Launcher!", isBuffed: true }
    ],
    tmMoves: ["TM35 Flamethrower", "TM38 Fire Blast", "TM52 Focus Blast", "TM24 Thunderbolt", "TM22 Solar Beam"],
    eggMoves: ["Mach Punch", "Belly Drum", "Cross Chop", "Flare Blitz"]
  },

  {
    id: 469,
    dexNum: "#469",
    name: "Yanmega",
    species: "Ogre Darner Pokémon",
    types: ["Bug", "Dragon"],
    vanillaTypes: ["Bug", "Flying"],
    stats: { hp: 86, atk: 76, def: 86, spa: 121, spd: 66, spe: 100 },
    vanillaStats: { hp: 86, atk: 76, def: 86, spa: 116, spd: 56, spe: 95 },
    abilities: ["Speed Boost", "Tinted Lens"],
    hiddenAbility: "Frisk",
    generation: 4,
    height: "1.9 m",
    weight: "51.5 kg",
    catchRate: 30,
    genderRatio: "50% M / 50% F",
    heldItems: ["Wide Lens (5%)"],
    evolution: "Yanma (Level up knowing Ancient Power) -> Yanmega",
    locations: [
      "Great Marsh (Pastoria City Safari Zone)",
      "Grand Underground: Swampy Cave, Bogsunk Cavern"
    ],
    isModified: true,
    lumiChanges: [
      "Typing changed to Bug / Dragon (No 4x Stealth Rock weakness!)",
      "Sp. Atk (+5), Sp. Def (+10), and Speed (+5) buffed",
      "Learns Dragon Pulse, Draco Meteor, and Quiver Dance"
    ],
    levelUpMoves: [
      { lvl: 33, name: "Ancient Power", type: "Rock", cat: "Special", power: 60, acc: 100, pp: 5, desc: "May boost all stats." },
      { lvl: 38, name: "Bug Buzz", type: "Bug", cat: "Special", power: 90, acc: 100, pp: 10, desc: "Sound wave STAB attack." },
      { lvl: 43, name: "Dragon Pulse", type: "Dragon", cat: "Special", power: 85, acc: 100, pp: 10, desc: "Dragon STAB attack.", isBuffed: true },
      { lvl: 50, name: "Quiver Dance", type: "Bug", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Raises SpA, SpD, and Spe by 1 stage.", isBuffed: true },
      { lvl: 57, name: "Draco Meteor", type: "Dragon", cat: "Special", power: 130, acc: 90, pp: 5, desc: "Massive draconic comet.", isBuffed: true }
    ],
    tmMoves: ["TM19 Giga Drain", "TM22 Solar Beam", "TM68 Giga Impact", "TM89 U-turn", "TM53 Energy Ball"],
    eggMoves: ["Whirlwind", "Reversal", "Leech Life", "Signal Beam"]
  },

  {
    id: 350,
    dexNum: "#350",
    name: "Milotic",
    species: "Tender Pokémon",
    types: ["Water", "Fairy"],
    vanillaTypes: ["Water"],
    stats: { hp: 95, atk: 60, def: 79, spa: 105, spd: 125, spe: 81 },
    vanillaStats: { hp: 95, atk: 60, def: 79, spa: 100, spd: 125, spe: 81 },
    abilities: ["Marvel Scale", "Competitive"],
    hiddenAbility: "Cute Charm",
    generation: 3,
    height: "6.2 m",
    weight: "162.0 kg",
    catchRate: 60,
    genderRatio: "50% M / 50% F",
    heldItems: [],
    evolution: "Feebas (Trade with Prism Scale OR Max Beauty with Poffins) -> Milotic",
    locations: [
      "Mt. Coronet B1F (Fish with Super Rod on specific tiles)",
      "Grand Underground: Fountainspring Cave (Feebas)"
    ],
    isModified: true,
    lumiChanges: [
      "Typing changed to Water / Fairy",
      "Sp. Atk buffed from 100 to 105 (+5 SpA)",
      "Learns Moonblast, Draining Kiss, Life Dew, and Calm Mind"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Water Pulse", type: "Water", cat: "Special", power: 60, acc: 100, pp: 20, desc: "May confuse target." },
      { lvl: 25, name: "Recover", type: "Normal", cat: "Status", power: 0, acc: 0, pp: 10, desc: "Restores up to 50% max HP." },
      { lvl: 35, name: "Draining Kiss", type: "Fairy", cat: "Special", power: 50, acc: 100, pp: 10, desc: "Recovers 75% of damage dealt.", isBuffed: true },
      { lvl: 42, name: "Scald", type: "Water", cat: "Special", power: 80, acc: 100, pp: 15, desc: "30% chance to burn target." },
      { lvl: 50, name: "Moonblast", type: "Fairy", cat: "Special", power: 95, acc: 100, pp: 15, desc: "Powerful fairy STAB.", isBuffed: true }
    ],
    tmMoves: ["TM03 Water Pulse", "TM13 Ice Beam", "TM14 Blizzard", "TM55 Brine", "TM04 Calm Mind"],
    eggMoves: ["Haze", "Mirror Coat", "Hypnosis", "Dragon Breath"]
  },

  // ==========================================
  // --- HISUIAN FORMS (INCENSE BURNER) ---
  // ==========================================
  {
    id: 1001,
    dexNum: "#157-H",
    name: "Typhlosion (Hisui)",
    species: "Ghost Flame Pokémon",
    types: ["Fire", "Ghost"],
    stats: { hp: 73, atk: 84, def: 78, spa: 119, spd: 85, spe: 95 },
    vanillaStats: { hp: 73, atk: 84, def: 78, spa: 119, spd: 85, spe: 95 },
    abilities: ["Blaze"],
    hiddenAbility: "Frisk",
    generation: "Hisui",
    isHisuian: true,
    height: "1.6 m",
    weight: "69.8 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolve Quilava while holding the Incense Burner at Night",
    locations: [
      "Evolve Quilava holding Incense Burner at Night",
      "Turnback Cave / Sendoff Spring (Postgame Incense encounter)"
    ],
    isModified: true,
    lumiChanges: [
      "Full Legends: Arceus Hisuian form added via Incense Burner!",
      "Signature Move: Infernal Parade (Fire/Ghost moves that doubles power if target has a status condition)",
      "Fire / Ghost typing with immense special coverage"
    ],
    levelUpMoves: [
      { lvl: 36, name: "Infernal Parade", type: "Ghost", cat: "Special", power: 65, acc: 100, pp: 15, desc: "Ghost flame; doubles power if foe is burned or statused.", isBuffed: true },
      { lvl: 42, name: "Shadow Ball", type: "Ghost", cat: "Special", power: 80, acc: 100, pp: 15, desc: "STAB ghost ball; may lower SpD." },
      { lvl: 48, name: "Flamethrower", type: "Fire", cat: "Special", power: 90, acc: 100, pp: 15, desc: "Fiery stream of flames." },
      { lvl: 56, name: "Calm Mind", type: "Psychic", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Boosts SpA and SpD." }
    ],
    tmMoves: ["TM35 Flamethrower", "TM38 Fire Blast", "TM30 Shadow Ball", "TM52 Focus Blast", "TM22 Solar Beam"],
    eggMoves: ["Extrasensory", "Covet", "Howl"]
  },

  {
    id: 1002,
    dexNum: "#724-H",
    name: "Decidueye (Hisui)",
    species: "Arrow Quill Pokémon",
    types: ["Grass", "Fighting"],
    stats: { hp: 88, atk: 112, def: 80, spa: 95, spd: 95, spe: 60 },
    vanillaStats: { hp: 88, atk: 112, def: 80, spa: 95, spd: 95, spe: 60 },
    abilities: ["Overgrow"],
    hiddenAbility: "Scrappy",
    generation: "Hisui",
    isHisuian: true,
    height: "1.6 m",
    weight: "37.0 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolve Dartrix while holding the Incense Burner during the Day",
    locations: [
      "Evolve Dartrix holding Incense Burner during Day",
      "Eterna Forest (Incense Burner active)"
    ],
    isModified: true,
    lumiChanges: [
      "Full Hisuian Form added!",
      "Grass / Fighting typing with Scrappy ability (hits Ghost types with Fighting moves!)",
      "Signature Move: Triple Arrows (Fighting, high critical hit ratio, lowers target Def)"
    ],
    levelUpMoves: [
      { lvl: 36, name: "Triple Arrows", type: "Fighting", cat: "Physical", power: 90, acc: 100, pp: 15, desc: "Triple strike; boosts crit and lowers target Def.", isBuffed: true },
      { lvl: 42, name: "Leaf Blade", type: "Grass", cat: "Physical", power: 90, acc: 100, pp: 15, desc: "Sharp leaf slash with high crit." },
      { lvl: 48, name: "Close Combat", type: "Fighting", cat: "Physical", power: 120, acc: 100, pp: 5, desc: "Brutal fighting barrage." },
      { lvl: 55, name: "Brave Bird", type: "Flying", cat: "Physical", power: 120, acc: 100, pp: 15, desc: "High power dive with recoil." }
    ],
    tmMoves: ["TM06 Toxic", "TM19 Giga Drain", "TM31 Brick Break", "TM53 Energy Ball", "TM89 U-turn"],
    eggMoves: ["Defog", "Baton Pass", "Curse", "Haze"]
  },

  {
    id: 1003,
    dexNum: "#503-H",
    name: "Samurott (Hisui)",
    species: "Formidable Pokémon",
    types: ["Water", "Dark"],
    stats: { hp: 90, atk: 108, def: 80, spa: 100, spd: 65, spe: 85 },
    vanillaStats: { hp: 90, atk: 108, def: 80, spa: 100, spd: 65, spe: 85 },
    abilities: ["Torrent"],
    hiddenAbility: "Sharpness",
    generation: "Hisui",
    isHisuian: true,
    height: "1.5 m",
    weight: "58.2 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Evolve Dewott while holding the Incense Burner in Water / Surfing",
    locations: [
      "Evolve Dewott with Incense Burner",
      "Pastoria City / Route 213 (Incense Burner encounter)"
    ],
    isModified: true,
    lumiChanges: [
      "Full Hisuian Form added!",
      "Hidden Ability Sharpness boosts all slicing moves (Ceaseless Edge, Night Slash, Aqua Cutter, Sacred Sword) by 1.5x!",
      "Signature Move: Ceaseless Edge (Dark, sets Spikes on the opponent's field!)"
    ],
    levelUpMoves: [
      { lvl: 36, name: "Ceaseless Edge", type: "Dark", cat: "Physical", power: 65, acc: 90, pp: 15, desc: "Slices foe and sets Spikes on their field! Boosted by Sharpness.", isBuffed: true },
      { lvl: 42, name: "Aqua Cutter", type: "Water", cat: "Physical", power: 70, acc: 100, pp: 20, desc: "Slicing water blade; boosted to 105 power by Sharpness.", isBuffed: true },
      { lvl: 48, name: "Night Slash", type: "Dark", cat: "Physical", power: 70, acc: 100, pp: 15, desc: "High crit slice; boosted by Sharpness." },
      { lvl: 54, name: "Sacred Sword", type: "Fighting", cat: "Physical", power: 90, acc: 100, pp: 15, desc: "Ignores defense changes; boosted to 135 power by Sharpness!", isBuffed: true }
    ],
    tmMoves: ["TM03 Water Pulse", "TM13 Ice Beam", "TM55 Brine", "TM75 Swords Dance", "TM81 X-Scissor"],
    eggMoves: ["Night Slash", "Screech", "Trump Card"]
  },

  {
    id: 1004,
    dexNum: "#571-H",
    name: "Zoroark (Hisui)",
    species: "Baneful Fox Pokémon",
    types: ["Normal", "Ghost"],
    stats: { hp: 55, atk: 100, def: 60, spa: 125, spd: 60, spe: 110 },
    vanillaStats: { hp: 55, atk: 100, def: 60, spa: 125, spd: 60, spe: 110 },
    abilities: ["Illusion"],
    hiddenAbility: "Infiltrator",
    generation: "Hisui",
    isHisuian: true,
    height: "1.6 m",
    weight: "73.0 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Hisuian Zorua (Lv. 30 with Incense Burner) -> Hisuian Zoroark",
    locations: [
      "Route 217 / Acuity Lakefront (Snow blizzard with Incense Burner)",
      "Snowpoint Temple (Special Spawns)"
    ],
    isModified: true,
    lumiChanges: [
      "Full Hisuian Form added!",
      "Unique Normal / Ghost typing: 3 Immunities (Normal, Fighting, Ghost) and only 1 Weakness (Dark)!",
      "Signature Move: Bitter Malice (Frosty ghost blast that inflicts Frostbite/Attack drops)",
      "Nasty Plot special sweeper"
    ],
    levelUpMoves: [
      { lvl: 30, name: "Bitter Malice", type: "Ghost", cat: "Special", power: 75, acc: 100, pp: 10, desc: "Inflicts frostbite / lowers target Attack.", isBuffed: true },
      { lvl: 35, name: "Shadow Ball", type: "Ghost", cat: "Special", power: 80, acc: 100, pp: 15, desc: "STAB Ghost attack." },
      { lvl: 40, name: "Hyper Voice", type: "Normal", cat: "Special", power: 90, acc: 100, pp: 10, desc: "Sound-based Normal STAB." },
      { lvl: 48, name: "Nasty Plot", type: "Dark", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Sharply raises Special Attack." },
      { lvl: 56, name: "Focus Blast", type: "Fighting", cat: "Special", power: 120, acc: 70, pp: 5, desc: "Covers Dark type weakness." }
    ],
    tmMoves: ["TM30 Shadow Ball", "TM52 Focus Blast", "TM35 Flamethrower", "TM89 U-turn", "TM12 Taunt"],
    eggMoves: ["Extrasensory", "Snarl", "Counter", "Memento"]
  },

  {
    id: 1005,
    dexNum: "#706-H",
    name: "Goodra (Hisui)",
    species: "Shell Bunker Pokémon",
    types: ["Steel", "Dragon"],
    stats: { hp: 80, atk: 100, def: 100, spa: 110, spd: 150, spe: 60 },
    vanillaStats: { hp: 80, atk: 100, def: 100, spa: 110, spd: 150, spe: 60 },
    abilities: ["Sap Sipper", "Shell Armor"],
    hiddenAbility: "Gooey",
    generation: "Hisui",
    isHisuian: true,
    height: "1.7 m",
    weight: "334.1 kg",
    catchRate: 45,
    genderRatio: "50% M / 50% F",
    heldItems: [],
    evolution: "Hisuian Sliggoo (Lv. 50 in Rain with Incense Burner) -> Hisuian Goodra",
    locations: [
      "Route 212 / Route 215 (Evolve Sliggoo in Rain with Incense Burner)",
      "Great Marsh (Rare Incense encounter)"
    ],
    isModified: true,
    lumiChanges: [
      "Full Hisuian Form added!",
      "Steel / Dragon typing (10 resistances, 1 immunity, 2 weaknesses) paired with colossal 150 Sp. Def!",
      "Signature Move: Shelter (withdraws into shell, boosts Def and evasion)",
      "Learns Flash Cannon, Draco Meteor, and Hydro Pump"
    ],
    levelUpMoves: [
      { lvl: 50, name: "Shelter", type: "Steel", cat: "Status", power: 0, acc: 0, pp: 10, desc: "Raises Defense and makes incoming hits harder to land.", isBuffed: true },
      { lvl: 54, name: "Flash Cannon", type: "Steel", cat: "Special", power: 80, acc: 100, pp: 10, desc: "Steel STAB beam." },
      { lvl: 60, name: "Dragon Pulse", type: "Dragon", cat: "Special", power: 85, acc: 100, pp: 10, desc: "Dragon STAB attack." },
      { lvl: 67, name: "Hydro Pump", type: "Water", cat: "Special", power: 110, acc: 80, pp: 5, desc: "Water blast coverage." }
    ],
    tmMoves: ["TM13 Ice Beam", "TM24 Thunderbolt", "TM26 Earthquake", "TM35 Flamethrower", "TM91 Flash Cannon"],
    eggMoves: ["Acid Armor", "Curse", "Iron Tail"]
  },

  {
    id: 1006,
    dexNum: "#903",
    name: "Sneasler",
    species: "Free Climb Pokémon",
    types: ["Fighting", "Poison"],
    stats: { hp: 80, atk: 130, def: 60, spa: 40, spd: 80, spe: 120 },
    vanillaStats: { hp: 80, atk: 130, def: 60, spa: 40, spd: 80, spe: 120 },
    abilities: ["Pressure", "Unburden"],
    hiddenAbility: "Poison Touch",
    generation: "Hisui",
    isHisuian: true,
    height: "1.3 m",
    weight: "43.0 kg",
    catchRate: 45,
    genderRatio: "50% M / 50% F",
    heldItems: ["Razor Claw (5%)"],
    evolution: "Hisuian Sneasel (Use Razor Claw during Day) -> Sneasler",
    locations: [
      "Route 216 / Route 217 (Hisuian Sneasel via Incense Burner)",
      "Snowpoint Temple"
    ],
    isModified: true,
    lumiChanges: [
      "Full Legends: Arceus cross-evolution added!",
      "Blistering 130 Attack and 120 Speed",
      "Signature Move: Dire Claw (High critical hit ratio; can cause Poison, Paralysis, or Drowsy!)",
      "Unburden sweeper with White Herb or Seeds"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Dire Claw", type: "Poison", cat: "Physical", power: 80, acc: 100, pp: 15, desc: "Slashes target; 50% chance to inflict Poison, Paralysis, or Sleep!", isBuffed: true },
      { lvl: 35, name: "Close Combat", type: "Fighting", cat: "Physical", power: 120, acc: 100, pp: 5, desc: "Massive fighting strike." },
      { lvl: 42, name: "Poison Jab", type: "Poison", cat: "Physical", power: 80, acc: 100, pp: 20, desc: "30% chance to poison." },
      { lvl: 50, name: "Swords Dance", type: "Normal", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Sharply boosts Attack." }
    ],
    tmMoves: ["TM31 Brick Break", "TM84 Poison Jab", "TM75 Swords Dance", "TM89 U-turn", "TM02 Dragon Claw"],
    eggMoves: ["Fake Out", "Switcheroo", "Counter"]
  },

  {
    id: 1007,
    dexNum: "#900",
    name: "Kleavor",
    species: "Axe Pokémon",
    types: ["Bug", "Rock"],
    stats: { hp: 70, atk: 135, def: 95, spa: 45, spd: 70, spe: 85 },
    vanillaStats: { hp: 70, atk: 135, def: 95, spa: 45, spd: 70, spe: 85 },
    abilities: ["Swarm", "Sheer Force"],
    hiddenAbility: "Sharpness",
    generation: "Hisui",
    isHisuian: true,
    height: "1.8 m",
    weight: "89.0 kg",
    catchRate: 45,
    genderRatio: "50% M / 50% F",
    heldItems: ["Black Augurite (5%)"],
    evolution: "Scyther (Use Black Augurite / Incense Burner) -> Kleavor",
    locations: [
      "Evolve Scyther using Black Augurite (Grand Underground mining)",
      "Route 210 North (Rare Incense spawn)"
    ],
    isModified: true,
    lumiChanges: [
      "Full Legends: Arceus Scyther branch evolution added!",
      "Signature Move: Stone Axe (Rock slice that sets Stealth Rock automatically upon hitting!)",
      "Sharpness boosts Stone Axe, X-Scissor, Night Slash, and Psycho Cut by 1.5x"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Stone Axe", type: "Rock", cat: "Physical", power: 65, acc: 90, pp: 15, desc: "Axe strike that scatters Stealth Rock! Boosted by Sharpness.", isBuffed: true },
      { lvl: 36, name: "X-Scissor", type: "Bug", cat: "Physical", power: 80, acc: 100, pp: 15, desc: "Bug slice; boosted to 120 power by Sharpness.", isBuffed: true },
      { lvl: 42, name: "Stone Edge", type: "Rock", cat: "Physical", power: 100, acc: 80, pp: 5, desc: "High critical hit rock edge." }
    ],
    tmMoves: ["TM71 Stone Edge", "TM81 X-Scissor", "TM75 Swords Dance", "TM89 U-turn", "TM26 Earthquake"],
    eggMoves: ["Night Slash", "Feint", "Counter"]
  },

  {
    id: 1008,
    dexNum: "#901",
    name: "Ursaluna",
    species: "Peat Pokémon",
    types: ["Ground", "Normal"],
    stats: { hp: 130, atk: 140, def: 105, spa: 45, spd: 80, spe: 50 },
    vanillaStats: { hp: 130, atk: 140, def: 105, spa: 45, spd: 80, spe: 50 },
    abilities: ["Guts", "Bulletproof"],
    hiddenAbility: "Unnerve",
    generation: "Hisui",
    isHisuian: true,
    height: "2.4 m",
    weight: "290.0 kg",
    catchRate: 20,
    genderRatio: "50% M / 50% F",
    heldItems: ["Peat Block (5%)"],
    evolution: "Ursaring (Use Peat Block / Full Moon in Solaceon) -> Ursaluna",
    locations: [
      "Evolve Ursaring with Peat Block (Grand Underground mining)",
      "Route 216 / Route 217 (Incense Burner)"
    ],
    isModified: true,
    lumiChanges: [
      "Full Legends: Arceus Ursaring evolution added!",
      "Colossal 130 HP, 140 Attack, and 105 Defense",
      "Flame Orb + Guts makes it an unstoppable wallbreaker with Facade and Headlong Rush",
      "Signature Move: Headlong Rush (120 Ground physical nuke)"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Headlong Rush", type: "Ground", cat: "Physical", power: 120, acc: 100, pp: 5, desc: "Devastating ground charge.", isBuffed: true },
      { lvl: 35, name: "Facade", type: "Normal", cat: "Physical", power: 70, acc: 100, pp: 20, desc: "Power doubles to 140 when burned (Guts activates!)." },
      { lvl: 50, name: "Earthquake", type: "Ground", cat: "Physical", power: 100, acc: 100, pp: 10, desc: "Ground quake." }
    ],
    tmMoves: ["TM26 Earthquake", "TM71 Stone Edge", "TM01 Focus Punch", "TM31 Brick Break", "TM75 Swords Dance"],
    eggMoves: ["Close Combat", "Crunch", "Belly Drum", "Cross Chop"]
  },

  // ==========================================
  // --- SINNOH POWERHOUSES & BOSS ACES ---
  // ==========================================
  {
    id: 445,
    dexNum: "#445",
    name: "Garchomp",
    species: "Mach Pokémon",
    types: ["Dragon", "Ground"],
    stats: { hp: 108, atk: 130, def: 95, spa: 80, spd: 85, spe: 102 },
    vanillaStats: { hp: 108, atk: 130, def: 95, spa: 80, spd: 85, spe: 102 },
    abilities: ["Sand Veil"],
    hiddenAbility: "Rough Skin",
    generation: 4,
    height: "1.9 m",
    weight: "95.0 kg",
    catchRate: 45,
    genderRatio: "50% M / 50% F",
    heldItems: ["Haban Berry (5%)"],
    evolution: "Gible (Lv. 24) -> Gabite (Lv. 48) -> Garchomp",
    locations: [
      "Wayward Cave (Hidden entrance under Cycling Road - catch Gible)",
      "Grand Underground: Riverbank Cave, Fountainspring Cave (Post-Gym 7)"
    ],
    isModified: true,
    lumiChanges: [
      "Learns Dragon Dance via level up / move relearner!",
      "Scale Shot and Iron Head fully available in learnset",
      "Rough Skin chips away at physical attackers (Cynthia's terrifying ace!)"
    ],
    levelUpMoves: [
      { lvl: 48, name: "Dragon Claw", type: "Dragon", cat: "Physical", power: 80, acc: 100, pp: 15, desc: "Dragon STAB strike." },
      { lvl: 52, name: "Earthquake", type: "Ground", cat: "Physical", power: 100, acc: 100, pp: 10, desc: "Ground STAB earthquake." },
      { lvl: 58, name: "Dragon Dance", type: "Dragon", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Raises Attack and Speed by 1 stage.", isBuffed: true },
      { lvl: 65, name: "Scale Shot", type: "Dragon", cat: "Physical", power: 25, acc: 90, pp: 20, desc: "Hits 2-5 times; boosts Speed by 1 stage.", isBuffed: true },
      { lvl: 72, name: "Outrage", type: "Dragon", cat: "Physical", power: 120, acc: 100, pp: 10, desc: "Furious dragon rampage." }
    ],
    tmMoves: ["TM02 Dragon Claw", "TM26 Earthquake", "TM71 Stone Edge", "TM75 Swords Dance", "TM35 Flamethrower"],
    eggMoves: ["Iron Head", "Outrage", "Body Slam", "Double-Edge"]
  },

  {
    id: 448,
    dexNum: "#448",
    name: "Lucario",
    species: "Aura Pokémon",
    types: ["Fighting", "Steel"],
    stats: { hp: 70, atk: 110, def: 70, spa: 115, spd: 70, spe: 90 },
    vanillaStats: { hp: 70, atk: 110, def: 70, spa: 115, spd: 70, spe: 90 },
    abilities: ["Steadfast", "Inner Focus"],
    hiddenAbility: "Adaptability",
    generation: 4,
    height: "1.2 m",
    weight: "54.0 kg",
    catchRate: 45,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Riolu (High Friendship during Day) -> Lucario",
    locations: [
      "Iron Island (Egg gifted by Riley)",
      "Grand Underground: Dazzling Cave, Whiteout Cave (Riolu)"
    ],
    isModified: true,
    lumiChanges: [
      "Hidden Ability changed to Adaptability (Boosts STAB moves from 1.5x to 2.0x!)",
      "Aura Sphere, Meteor Mash, and Close Combat deal catastrophic Adaptability damage",
      "Learns Bullet Punch, Extreme Speed, and Nasty Plot"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Aura Sphere", type: "Fighting", cat: "Special", power: 80, acc: 100, pp: 20, desc: "Never misses. 160 power with Adaptability!", isBuffed: true },
      { lvl: 1, name: "Bullet Punch", type: "Steel", cat: "Physical", power: 40, acc: 100, pp: 30, desc: "Priority steel strike boosted by Adaptability." },
      { lvl: 42, name: "Meteor Mash", type: "Steel", cat: "Physical", power: 90, acc: 90, pp: 10, desc: "180 power with Adaptability! May boost Atk.", isBuffed: true },
      { lvl: 47, name: "Close Combat", type: "Fighting", cat: "Physical", power: 120, acc: 100, pp: 5, desc: "240 power with Adaptability!", isBuffed: true },
      { lvl: 53, name: "Extreme Speed", type: "Normal", cat: "Physical", power: 80, acc: 100, pp: 5, desc: "+2 Priority physical strike." }
    ],
    tmMoves: ["TM04 Calm Mind", "TM30 Shadow Ball", "TM31 Brick Break", "TM71 Stone Edge", "TM91 Flash Cannon"],
    eggMoves: ["Bullet Punch", "Cross Chop", "Vacuum Wave", "High Jump Kick"]
  },

  {
    id: 468,
    dexNum: "#468",
    name: "Togekiss",
    species: "Jubilee Pokémon",
    types: ["Fairy", "Flying"],
    stats: { hp: 85, atk: 50, def: 95, spa: 120, spd: 115, spe: 80 },
    vanillaStats: { hp: 85, atk: 50, def: 95, spa: 120, spd: 115, spe: 80 },
    abilities: ["Hustle", "Serene Grace"],
    hiddenAbility: "Super Luck",
    generation: 4,
    height: "1.5 m",
    weight: "38.0 kg",
    catchRate: 30,
    genderRatio: "87.5% M / 12.5% F",
    heldItems: [],
    evolution: "Togepi (Friendship) -> Togetic (Use Shiny Stone) -> Togekiss",
    locations: [
      "Hearthome City (Egg received from Cynthia)",
      "Route 229, 230 (Poké Radar: Togepi)",
      "Grand Underground: Dazzling Cave, Fountainspring Cave"
    ],
    isModified: true,
    lumiChanges: [
      "Fairy / Flying typing with notorious Serene Grace Air Slash (60% flinch rate!)",
      "Learns Moonblast, Roost, and Nasty Plot natively",
      "High natural bulk with 85/95/115 defensive profile"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Air Slash", type: "Flying", cat: "Special", power: 75, acc: 95, pp: 15, desc: "60% flinch rate with Serene Grace!" },
      { lvl: 1, name: "Aura Sphere", type: "Fighting", cat: "Special", power: 80, acc: 100, pp: 20, desc: "Never misses; covers Steel and Rock." },
      { lvl: 1, name: "Moonblast", type: "Fairy", cat: "Special", power: 95, acc: 100, pp: 15, desc: "Fairy STAB; 60% chance to lower SpA with Serene Grace!", isBuffed: true },
      { lvl: 35, name: "Roost", type: "Flying", cat: "Status", power: 0, acc: 0, pp: 10, desc: "Restores up to 50% max HP.", isBuffed: true }
    ],
    tmMoves: ["TM04 Calm Mind", "TM13 Ice Beam", "TM15 Hyper Beam", "TM22 Solar Beam", "TM38 Fire Blast", "TM89 U-turn"],
    eggMoves: ["Nasty Plot", "Morning Sun", "Psycho Shift"]
  },

  {
    id: 472,
    dexNum: "#472",
    name: "Gliscor",
    species: "Fang Scorpion Pokémon",
    types: ["Ground", "Flying"],
    stats: { hp: 75, atk: 95, def: 125, spa: 45, spd: 75, spe: 95 },
    vanillaStats: { hp: 75, atk: 95, def: 125, spa: 45, spd: 75, spe: 95 },
    abilities: ["Hyper Cutter", "Sand Veil"],
    hiddenAbility: "Poison Heal",
    generation: 4,
    height: "2.0 m",
    weight: "42.5 kg",
    catchRate: 30,
    genderRatio: "50% M / 50% F",
    heldItems: ["Razor Fang (5%)"],
    evolution: "Gligar (Hold Razor Fang at Night) -> Gliscor",
    locations: [
      "Route 206, 207 (Catch Gligar holding Razor Fang)",
      "Grand Underground: Rocky Cave, Sandsear Cave, Sunlit Cavern"
    ],
    isModified: true,
    lumiChanges: [
      "Poison Heal + Toxic Orb provides 1/8th max HP recovery every single turn!",
      "Immune to Status when poisoned by Toxic Orb",
      "Learns Roost, Toxic, Protect, Earthquake, and Defog"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Poison Jab", type: "Poison", cat: "Physical", power: 80, acc: 100, pp: 20, desc: "Poison coverage against Grass and Fairy." },
      { lvl: 34, name: "Earthquake", type: "Ground", cat: "Physical", power: 100, acc: 100, pp: 10, desc: "Main STAB ground offense." },
      { lvl: 42, name: "Roost", type: "Flying", cat: "Status", power: 0, acc: 0, pp: 10, desc: "Heals 50% HP; stacks with Poison Heal.", isBuffed: true },
      { lvl: 50, name: "Swords Dance", type: "Normal", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Sets up huge physical sweeps." }
    ],
    tmMoves: ["TM06 Toxic", "TM26 Earthquake", "TM71 Stone Edge", "TM75 Swords Dance", "TM89 U-turn"],
    eggMoves: ["Baton Pass", "Cross Poison", "Agility", "Feint"]
  },

  {
    id: 462,
    dexNum: "#462",
    name: "Magnezone",
    species: "Magnet Area Pokémon",
    types: ["Electric", "Steel"],
    stats: { hp: 70, atk: 70, def: 115, spa: 130, spd: 90, spe: 60 },
    vanillaStats: { hp: 70, atk: 70, def: 115, spa: 130, spd: 90, spe: 60 },
    abilities: ["Magnet Pull", "Sturdy"],
    hiddenAbility: "Analytic",
    generation: 4,
    height: "1.2 m",
    weight: "180.0 kg",
    catchRate: 30,
    genderRatio: "Genderless",
    heldItems: ["Metal Coat (5%)"],
    evolution: "Magnemite (Lv. 30) -> Magneton (Use Thunder Stone OR Level up in Mt. Coronet) -> Magnezone",
    locations: [
      "Fuego Ironworks (Catch Magnemite/Magneton)",
      "Mt. Coronet (Level up Magneton)",
      "Grand Underground: Spacious Cave, Whiteout Cave"
    ],
    isModified: true,
    lumiChanges: [
      "Can evolve using a Thunder Stone directly (no need to walk to Mt. Coronet)",
      "Magnet Pull traps opposing Steel Pokémon (Skarmory, Scizor, Steelix)",
      "Body Press added to take full advantage of its 115 Defense!"
    ],
    levelUpMoves: [
      { lvl: 34, name: "Flash Cannon", type: "Steel", cat: "Special", power: 80, acc: 100, pp: 10, desc: "Concentrated light beam." },
      { lvl: 40, name: "Thunderbolt", type: "Electric", cat: "Special", power: 90, acc: 100, pp: 15, desc: "Devastating electric bolt." },
      { lvl: 48, name: "Body Press", type: "Fighting", cat: "Physical", power: 80, acc: 100, pp: 10, desc: "Calculates damage using 115 Defense!", isBuffed: true }
    ],
    tmMoves: ["TM24 Thunderbolt", "TM25 Thunder", "TM91 Flash Cannon", "TM73 Thunder Wave"],
    eggMoves: []
  },

  {
    id: 475,
    dexNum: "#475",
    name: "Gallade",
    species: "Blade Pokémon",
    types: ["Psychic", "Fighting"],
    stats: { hp: 68, atk: 125, def: 65, spa: 65, spd: 115, spe: 80 },
    vanillaStats: { hp: 68, atk: 125, def: 65, spa: 65, spd: 115, spe: 80 },
    abilities: ["Steadfast"],
    hiddenAbility: "Sharpness",
    generation: 4,
    height: "1.6 m",
    weight: "52.0 kg",
    catchRate: 45,
    genderRatio: "100% M / 0% F",
    heldItems: [],
    evolution: "Male Kirlia (Use Dawn Stone) -> Gallade",
    locations: [
      "Route 208, 209 (Catch Ralts early)",
      "Route 212 / Mt. Coronet (Dawn Stone location)",
      "Grand Underground: Dazzling Cave"
    ],
    isModified: true,
    lumiChanges: [
      "Hidden Ability changed to Sharpness (1.5x damage on Sacred Sword, Psycho Cut, Leaf Blade, Night Slash, Aqua Cutter!)",
      "Sacred Sword and Aqua Cutter added to movepool",
      "Immense physical wallbreaker with 125 Attack"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Psycho Cut", type: "Psychic", cat: "Physical", power: 70, acc: 100, pp: 20, desc: "Boosted to 105 power by Sharpness! High crit.", isBuffed: true },
      { lvl: 1, name: "Sacred Sword", type: "Fighting", cat: "Physical", power: 90, acc: 100, pp: 15, desc: "Boosted to 135 power by Sharpness! Ignores foe stat changes.", isBuffed: true },
      { lvl: 35, name: "Aqua Cutter", type: "Water", cat: "Physical", power: 70, acc: 100, pp: 20, desc: "Boosted to 105 power by Sharpness!", isBuffed: true },
      { lvl: 42, name: "Leaf Blade", type: "Grass", cat: "Physical", power: 90, acc: 100, pp: 15, desc: "Boosted to 135 power by Sharpness!", isBuffed: true },
      { lvl: 50, name: "Close Combat", type: "Fighting", cat: "Physical", power: 120, acc: 100, pp: 5, desc: "Massive physical fighting nuke." }
    ],
    tmMoves: ["TM02 Dragon Claw", "TM31 Brick Break", "TM71 Stone Edge", "TM75 Swords Dance", "TM81 X-Scissor"],
    eggMoves: ["Shadow Sneak", "Destiny Bond", "Mean Look", "Disable"]
  },

  {
    id: 479,
    dexNum: "#479-W",
    name: "Rotom (Wash)",
    species: "Plasma Pokémon",
    types: ["Electric", "Water"],
    stats: { hp: 50, atk: 65, def: 107, spa: 105, spd: 107, spe: 86 },
    vanillaStats: { hp: 50, atk: 65, def: 107, spa: 105, spd: 107, spe: 86 },
    abilities: ["Levitate"],
    hiddenAbility: "None",
    generation: 4,
    height: "0.3 m",
    weight: "0.3 kg",
    catchRate: 45,
    genderRatio: "Genderless",
    heldItems: [],
    evolution: "Change forms freely using the Secret Key in the Galactic Eterna Building room",
    locations: [
      "Old Chateau (Interact with TV at Night after obtaining National Dex or Secret Key)",
      "Galactic Eterna Building (Rotom appliance room)"
    ],
    isModified: true,
    lumiChanges: [
      "Secret Key room available earlier in Eterna City!",
      "Electric / Water typing + Levitate gives it only 1 weakness (Grass)!",
      "Signature Move: Hydro Pump"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Hydro Pump", type: "Water", cat: "Special", power: 110, acc: 80, pp: 5, desc: "Signature form water blast." },
      { lvl: 29, name: "Volt Switch", type: "Electric", cat: "Special", power: 70, acc: 100, pp: 20, desc: "Attacks and retreats to hand." },
      { lvl: 36, name: "Will-O-Wisp", type: "Fire", cat: "Status", power: 0, acc: 85, pp: 15, desc: "Burns target, halving their physical damage." },
      { lvl: 43, name: "Thunderbolt", type: "Electric", cat: "Special", power: 90, acc: 100, pp: 15, desc: "Main electric STAB." }
    ],
    tmMoves: ["TM24 Thunderbolt", "TM73 Thunder Wave", "TM30 Shadow Ball"],
    eggMoves: []
  },

  // ==========================================
  // --- SINNOH LEGENDS & MYTHICALS ---
  // ==========================================
  {
    id: 483,
    dexNum: "#483",
    name: "Dialga",
    species: "Temporal Pokémon",
    types: ["Steel", "Dragon"],
    stats: { hp: 100, atk: 120, def: 120, spa: 150, spd: 100, spe: 90 },
    vanillaStats: { hp: 100, atk: 120, def: 120, spa: 150, spd: 100, spe: 90 },
    abilities: ["Pressure"],
    hiddenAbility: "Telepathy",
    generation: 4,
    height: "5.4 m",
    weight: "683.0 kg",
    catchRate: 3,
    genderRatio: "Genderless",
    heldItems: ["Adamant Orb (100%)"],
    evolution: "None (Legendary)",
    locations: ["Spear Pillar (Story boss battle)", "Mt. Coronet Summit"],
    isModified: true,
    lumiChanges: [
      "Can transform into Dialga (Origin Form) holding the Adamant Crystal!",
      "Signature Move: Roar of Time (150 Dragon Special)",
      "Immune to Poison; 9 resistances, neutral to Dragon"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Roar of Time", type: "Dragon", cat: "Special", power: 150, acc: 90, pp: 5, desc: "Distorts time with catastrophic force." },
      { lvl: 50, name: "Flash Cannon", type: "Steel", cat: "Special", power: 80, acc: 100, pp: 10, desc: "Concentrated steel ray." },
      { lvl: 60, name: "Earth Power", type: "Ground", cat: "Special", power: 90, acc: 100, pp: 10, desc: "Ground coverage." },
      { lvl: 70, name: "Aura Sphere", type: "Fighting", cat: "Special", power: 80, acc: 100, pp: 20, desc: "Unavoidable aura sphere." }
    ],
    tmMoves: ["TM13 Ice Beam", "TM24 Thunderbolt", "TM26 Earthquake", "TM35 Flamethrower", "TM91 Flash Cannon"],
    eggMoves: []
  },

  {
    id: 484,
    dexNum: "#484",
    name: "Palkia",
    species: "Spatial Pokémon",
    types: ["Water", "Dragon"],
    stats: { hp: 90, atk: 120, def: 100, spa: 150, spd: 120, spe: 100 },
    vanillaStats: { hp: 90, atk: 120, def: 100, spa: 150, spd: 120, spe: 100 },
    abilities: ["Pressure"],
    hiddenAbility: "Telepathy",
    generation: 4,
    height: "4.2 m",
    weight: "336.0 kg",
    catchRate: 3,
    genderRatio: "Genderless",
    heldItems: ["Lustrous Orb (100%)"],
    evolution: "None (Legendary)",
    locations: ["Spear Pillar (Story boss battle)", "Mt. Coronet Summit"],
    isModified: true,
    lumiChanges: [
      "Can transform into Palkia (Origin Form) holding the Lustrous Globe!",
      "Signature Move: Spacial Rend (100 Power Water/Dragon high crit)",
      "High 100 Speed tier with 150 Special Attack"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Spacial Rend", type: "Dragon", cat: "Special", power: 100, acc: 95, pp: 5, desc: "Tears space apart; high critical hit ratio." },
      { lvl: 50, name: "Hydro Pump", type: "Water", cat: "Special", power: 110, acc: 80, pp: 5, desc: "Massive water torrent." },
      { lvl: 60, name: "Aura Sphere", type: "Fighting", cat: "Special", power: 80, acc: 100, pp: 20, desc: "Never misses." }
    ],
    tmMoves: ["TM13 Ice Beam", "TM24 Thunderbolt", "TM26 Earthquake", "TM38 Fire Blast", "TM55 Brine"],
    eggMoves: []
  },

  {
    id: 487,
    dexNum: "#487",
    name: "Giratina",
    species: "Renegade Pokémon",
    types: ["Ghost", "Dragon"],
    stats: { hp: 150, atk: 100, def: 120, spa: 100, spd: 120, spe: 90 },
    vanillaStats: { hp: 150, atk: 100, def: 120, spa: 100, spd: 120, spe: 90 },
    abilities: ["Pressure"],
    hiddenAbility: "Telepathy",
    generation: 4,
    height: "4.5 m",
    weight: "750.0 kg",
    catchRate: 3,
    genderRatio: "Genderless",
    heldItems: ["Griseous Orb (100%)"],
    evolution: "Origin Form when holding Griseous Orb (Gains Levitate and 120/120 Offenses!)",
    locations: ["Distortion World / Turnback Cave (Postgame challenge)", "Sendoff Spring"],
    isModified: true,
    lumiChanges: [
      "Signature Move: Shadow Force (120 Ghost physical, bypasses Protect/Detect!)",
      "Switch between Altered Form (150/120/120 defense) and Origin Form (Levitate + 120/120 offenses) with Griseous Orb",
      "Immune to Normal and Fighting"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Shadow Force", type: "Ghost", cat: "Physical", power: 120, acc: 100, pp: 5, desc: "Vanishes into shadows on turn 1; bypasses Protect on turn 2!", isBuffed: true },
      { lvl: 50, name: "Dragon Claw", type: "Dragon", cat: "Physical", power: 80, acc: 100, pp: 15, desc: "Sharp claws." },
      { lvl: 60, name: "Shadow Ball", type: "Ghost", cat: "Special", power: 80, acc: 100, pp: 15, desc: "Ghost sphere." }
    ],
    tmMoves: ["TM04 Calm Mind", "TM13 Ice Beam", "TM24 Thunderbolt", "TM26 Earthquake", "TM30 Shadow Ball"],
    eggMoves: []
  },

  {
    id: 491,
    dexNum: "#491",
    name: "Darkrai",
    species: "Pitch-Black Pokémon",
    types: ["Dark"],
    stats: { hp: 70, atk: 90, def: 90, spa: 135, spd: 90, spe: 125 },
    vanillaStats: { hp: 70, atk: 90, def: 90, spa: 135, spd: 90, spe: 125 },
    abilities: ["Bad Dreams"],
    hiddenAbility: "None",
    generation: 4,
    height: "1.5 m",
    weight: "50.5 kg",
    catchRate: 3,
    genderRatio: "Genderless",
    heldItems: [],
    evolution: "None (Mythical)",
    locations: ["Newmoon Island (Member Card event unlocked in Luminescent Platinum!)", "Harbor Inn (Canalave City)"],
    isModified: true,
    lumiChanges: [
      "Full Member Card & Newmoon Island quest integrated seamlessly!",
      "Signature Move: Dark Void (Inflicts Sleep on targets)",
      "Bad Dreams depletes 1/8th max HP from sleeping foes each turn",
      "Learns Nasty Plot, Dark Pulse, and Sludge Bomb"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Dark Void", type: "Dark", cat: "Status", power: 0, acc: 80, pp: 10, desc: "Drags target into world of darkness, putting them to Sleep.", isBuffed: true },
      { lvl: 38, name: "Nasty Plot", type: "Dark", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Sharply raises Special Attack." },
      { lvl: 57, name: "Dark Pulse", type: "Dark", cat: "Special", power: 80, acc: 100, pp: 15, desc: "Main dark STAB with flinch chance." }
    ],
    tmMoves: ["TM13 Ice Beam", "TM24 Thunderbolt", "TM30 Shadow Ball", "TM36 Sludge Bomb", "TM52 Focus Blast"],
    eggMoves: []
  },

  {
    id: 493,
    dexNum: "#493",
    name: "Arceus",
    species: "Alpha Pokémon",
    types: ["Normal"],
    stats: { hp: 120, atk: 120, def: 120, spa: 120, spd: 120, spe: 120 },
    vanillaStats: { hp: 120, atk: 120, def: 120, spa: 120, spd: 120, spe: 120 },
    abilities: ["Multitype"],
    hiddenAbility: "None",
    generation: 4,
    height: "3.2 m",
    weight: "320.0 kg",
    catchRate: 3,
    genderRatio: "Genderless",
    heldItems: [],
    evolution: "Changes type and form when holding any of the 17 Elemental Plates",
    locations: [
      "Hall of Origin (Azure Flute event available in Spear Pillar after catching Dialga/Palkia/Giratina)"
    ],
    isModified: true,
    lumiChanges: [
      "Azure Flute Hall of Origin battle enabled!",
      "Signature Move: Judgment (100 Power, automatically changes type to match equipped Plate!)",
      "Unmatched 720 BST god of Pokémon"
    ],
    levelUpMoves: [
      { lvl: 1, name: "Judgment", type: "Normal", cat: "Special", power: 100, acc: 100, pp: 10, desc: "Fires countless light beams. Matches held plate type!", isBuffed: true },
      { lvl: 60, name: "Recover", type: "Normal", cat: "Status", power: 0, acc: 0, pp: 10, desc: "Restores up to 50% max HP." },
      { lvl: 70, name: "Calm Mind", type: "Psychic", cat: "Status", power: 0, acc: 0, pp: 20, desc: "Boosts SpA and SpD." },
      { lvl: 90, name: "Extreme Speed", type: "Normal", cat: "Physical", power: 80, acc: 100, pp: 5, desc: "+2 Priority physical strike." }
    ],
    tmMoves: ["Can learn almost every TM in the game including Calm Mind, Earthquake, Ice Beam, Thunderbolt, Fire Blast"],
    eggMoves: []
  }
];

// Calculate BST and stat differences for all entries
POKEMON_DATA.forEach(p => {
  p.bst = p.stats.hp + p.stats.atk + p.stats.def + p.stats.spa + p.stats.spd + p.stats.spe;
  p.vanillaBst = p.vanillaStats ? (p.vanillaStats.hp + p.vanillaStats.atk + p.vanillaStats.def + p.vanillaStats.spa + p.vanillaStats.spd + p.vanillaStats.spe) : p.bst;
  p.bstDiff = p.bst - p.vanillaBst;
});
