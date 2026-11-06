/**
 * Luminescent Platinum Pokédex - Full Evolution Lines Database
 * Maps every single Pokémon in the roster to its complete evolutionary family line.
 */

var RAW_EVO_CHAINS = [
  // Gen 1 Starters
  { species: "Bulbasaur", evolvesTo: [{ species: "Ivysaur", trigger: "Lv 16", evolvesTo: [{ species: "Venusaur", trigger: "Lv 32" }] }] },
  { species: "Charmander", evolvesTo: [{ species: "Charmeleon", trigger: "Lv 16", evolvesTo: [{ species: "Charizard", trigger: "Lv 36" }] }] },
  { species: "Squirtle", evolvesTo: [{ species: "Wartortle", trigger: "Lv 16", evolvesTo: [{ species: "Blastoise", trigger: "Lv 36" }] }] },

  // Gen 1 Bugs / Birds / Mammals
  { species: "Caterpie", evolvesTo: [{ species: "Metapod", trigger: "Lv 7", evolvesTo: [{ species: "Butterfree", trigger: "Lv 10" }] }] },
  { species: "Weedle", evolvesTo: [{ species: "Kakuna", trigger: "Lv 7", evolvesTo: [{ species: "Beedrill", trigger: "Lv 10" }] }] },
  { species: "Pidgey", evolvesTo: [{ species: "Pidgeotto", trigger: "Lv 18", evolvesTo: [{ species: "Pidgeot", trigger: "Lv 36" }] }] },
  { species: "Rattata", evolvesTo: [{ species: "Raticate", trigger: "Lv 20" }] },
  { species: "Spearow", evolvesTo: [{ species: "Fearow", trigger: "Lv 20" }] },
  { species: "Ekans", evolvesTo: [{ species: "Arbok", trigger: "Lv 22" }] },
  { species: "Pichu", evolvesTo: [{ species: "Pikachu", trigger: "High Friendship", evolvesTo: [
    { species: "Raichu", trigger: "Thunder Stone" },
    { species: "Raichu (Alola)", trigger: "Sun Stone / Incense" }
  ] }] },
  { species: "Sandshrew", evolvesTo: [{ species: "Sandslash", trigger: "Lv 22" }] },
  { species: "Nidoran♀", evolvesTo: [{ species: "Nidorina", trigger: "Lv 16", evolvesTo: [{ species: "Nidoqueen", trigger: "Moon Stone" }] }] },
  { species: "Nidoran♂", evolvesTo: [{ species: "Nidorino", trigger: "Lv 16", evolvesTo: [{ species: "Nidoking", trigger: "Moon Stone" }] }] },
  { species: "Cleffa", evolvesTo: [{ species: "Clefairy", trigger: "High Friendship", evolvesTo: [{ species: "Clefable", trigger: "Moon Stone" }] }] },
  { species: "Vulpix", evolvesTo: [{ species: "Ninetales", trigger: "Fire Stone" }] },
  { species: "Igglybuff", evolvesTo: [{ species: "Jigglypuff", trigger: "High Friendship", evolvesTo: [{ species: "Wigglytuff", trigger: "Moon Stone" }] }] },
  { species: "Zubat", evolvesTo: [{ species: "Golbat", trigger: "Lv 22", evolvesTo: [{ species: "Crobat", trigger: "High Friendship" }] }] },
  { species: "Oddish", evolvesTo: [{ species: "Gloom", trigger: "Lv 21", evolvesTo: [
    { species: "Vileplume", trigger: "Leaf Stone" },
    { species: "Bellossom", trigger: "Sun Stone" }
  ] }] },
  { species: "Paras", evolvesTo: [{ species: "Parasect", trigger: "Lv 24" }] },
  { species: "Venonat", evolvesTo: [{ species: "Venomoth", trigger: "Lv 31" }] },
  { species: "Diglett", evolvesTo: [{ species: "Dugtrio", trigger: "Lv 26" }] },
  { species: "Meowth", evolvesTo: [{ species: "Persian", trigger: "Lv 28" }] },
  { species: "Psyduck", evolvesTo: [{ species: "Golduck", trigger: "Lv 33" }] },
  { species: "Mankey", evolvesTo: [{ species: "Primeape", trigger: "Lv 28" }] },
  { species: "Growlithe", evolvesTo: [
    { species: "Arcanine", trigger: "Fire Stone" },
    { species: "Arcanine (Hisui)", trigger: "Fire Stone + Incense Burner" }
  ] },
  { species: "Poliwag", evolvesTo: [{ species: "Poliwhirl", trigger: "Lv 25", evolvesTo: [
    { species: "Poliwrath", trigger: "Water Stone" },
    { species: "Politoed", trigger: "Link Cable / King's Rock" }
  ] }] },
  { species: "Abra", evolvesTo: [{ species: "Kadabra", trigger: "Lv 16", evolvesTo: [{ species: "Alakazam", trigger: "Link Cable / Trade" }] }] },
  { species: "Machop", evolvesTo: [{ species: "Machoke", trigger: "Lv 28", evolvesTo: [{ species: "Machamp", trigger: "Link Cable / Trade" }] }] },
  { species: "Bellsprout", evolvesTo: [{ species: "Weepinbell", trigger: "Lv 21", evolvesTo: [{ species: "Victreebel", trigger: "Leaf Stone" }] }] },
  { species: "Tentacool", evolvesTo: [{ species: "Tentacruel", trigger: "Lv 30" }] },
  { species: "Geodude", evolvesTo: [{ species: "Graveler", trigger: "Lv 25", evolvesTo: [{ species: "Golem", trigger: "Link Cable / Trade" }] }] },
  { species: "Ponyta", evolvesTo: [{ species: "Rapidash", trigger: "Lv 40" }] },
  { species: "Slowpoke", evolvesTo: [
    { species: "Slowbro", trigger: "Lv 37" },
    { species: "Slowking", trigger: "Link Cable / King's Rock" }
  ] },
  { species: "Magnemite", evolvesTo: [{ species: "Magneton", trigger: "Lv 30", evolvesTo: [{ species: "Magnezone", trigger: "Thunder Stone / Mt. Coronet" }] }] },
  { species: "Farfetch'd", evolvesTo: [] },
  { species: "Doduo", evolvesTo: [{ species: "Dodrio", trigger: "Lv 31" }] },
  { species: "Seel", evolvesTo: [{ species: "Dewgong", trigger: "Lv 34" }] },
  { species: "Grimer", evolvesTo: [{ species: "Muk", trigger: "Lv 38" }] },
  { species: "Shellder", evolvesTo: [{ species: "Cloyster", trigger: "Water Stone" }] },
  { species: "Gastly", evolvesTo: [{ species: "Haunter", trigger: "Lv 25", evolvesTo: [{ species: "Gengar", trigger: "Link Cable / Trade" }] }] },
  { species: "Onix", evolvesTo: [{ species: "Steelix", trigger: "Metal Coat + Link Cable" }] },
  { species: "Drowzee", evolvesTo: [{ species: "Hypno", trigger: "Lv 26" }] },
  { species: "Krabby", evolvesTo: [{ species: "Kingler", trigger: "Lv 28" }] },
  { species: "Voltorb", evolvesTo: [
    { species: "Electrode", trigger: "Lv 30" },
    { species: "Electrode (Hisui)", trigger: "Leaf Stone + Incense Burner" }
  ] },
  { species: "Exeggcute", evolvesTo: [
    { species: "Exeggutor", trigger: "Leaf Stone" },
    { species: "Exeggutor (Alola)", trigger: "Leaf Stone + Incense" }
  ] },
  { species: "Cubone", evolvesTo: [
    { species: "Marowak", trigger: "Lv 28" },
    { species: "Marowak (Alola)", trigger: "Lv 28 (Night) + Incense" }
  ] },
  { species: "Tyrogue", evolvesTo: [
    { species: "Hitmonlee", trigger: "Lv 20 (Atk > Def)" },
    { species: "Hitmonchan", trigger: "Lv 20 (Def > Atk)" },
    { species: "Hitmontop", trigger: "Lv 20 (Atk = Def)" }
  ] },
  { species: "Lickitung", evolvesTo: [{ species: "Lickilicky", trigger: "Learn Rollout" }] },
  { species: "Koffing", evolvesTo: [
    { species: "Weezing", trigger: "Lv 35" },
    { species: "Weezing (Galar)", trigger: "Lv 35 (knowing Strange Steam)" }
  ] },
  { species: "Rhyhorn", evolvesTo: [{ species: "Rhydon", trigger: "Lv 42", evolvesTo: [{ species: "Rhyperior", trigger: "Protector + Link Cable" }] }] },
  { species: "Happiny", evolvesTo: [{ species: "Chansey", trigger: "Oval Stone (Day)", evolvesTo: [{ species: "Blissey", trigger: "High Friendship" }] }] },
  { species: "Tangela", evolvesTo: [{ species: "Tangrowth", trigger: "Learn Ancient Power" }] },
  { species: "Kangaskhan", evolvesTo: [] },
  { species: "Horsea", evolvesTo: [{ species: "Seadra", trigger: "Lv 32", evolvesTo: [{ species: "Kingdra", trigger: "Dragon Scale + Link Cable" }] }] },
  { species: "Goldeen", evolvesTo: [{ species: "Seaking", trigger: "Lv 33" }] },
  { species: "Staryu", evolvesTo: [{ species: "Starmie", trigger: "Water Stone" }] },
  { species: "Mime Jr.", evolvesTo: [{ species: "Mr. Mime", trigger: "Learn Mimic" }] },
  { species: "Scyther", evolvesTo: [
    { species: "Scizor", trigger: "Metal Coat + Link Cable" },
    { species: "Kleavor", trigger: "Black Augurite" }
  ] },
  { species: "Smoochum", evolvesTo: [{ species: "Jynx", trigger: "Lv 30" }] },
  { species: "Elekid", evolvesTo: [{ species: "Electabuzz", trigger: "Lv 30", evolvesTo: [{ species: "Electivire", trigger: "Electirizer + Link Cable" }] }] },
  { species: "Magby", evolvesTo: [{ species: "Magmar", trigger: "Lv 30", evolvesTo: [{ species: "Magmortar", trigger: "Magmarizer + Link Cable" }] }] },
  { species: "Pinsir", evolvesTo: [] },
  { species: "Tauros", evolvesTo: [] },
  { species: "Magikarp", evolvesTo: [{ species: "Gyarados", trigger: "Lv 20" }] },
  { species: "Lapras", evolvesTo: [] },
  { species: "Ditto", evolvesTo: [] },
  { species: "Eevee", evolvesTo: [
    { species: "Vaporeon", trigger: "Water Stone" },
    { species: "Jolteon", trigger: "Thunder Stone" },
    { species: "Flareon", trigger: "Fire Stone" },
    { species: "Espeon", trigger: "High Friendship (Day)" },
    { species: "Umbreon", trigger: "High Friendship (Night)" },
    { species: "Leafeon", trigger: "Leaf Stone" },
    { species: "Glaceon", trigger: "Ice Stone" },
    { species: "Sylveon", trigger: "High Friendship + Fairy move" }
  ] },
  { species: "Porygon", evolvesTo: [{ species: "Porygon2", trigger: "Up-Grade + Link Cable", evolvesTo: [{ species: "Porygon-Z", trigger: "Dubious Disc + Link Cable" }] }] },
  { species: "Omanyte", evolvesTo: [{ species: "Omastar", trigger: "Lv 40" }] },
  { species: "Kabuto", evolvesTo: [{ species: "Kabutops", trigger: "Lv 40" }] },
  { species: "Aerodactyl", evolvesTo: [] },
  { species: "Munchlax", evolvesTo: [{ species: "Snorlax", trigger: "High Friendship" }] },
  { species: "Articuno", evolvesTo: [] },
  { species: "Zapdos", evolvesTo: [] },
  { species: "Moltres", evolvesTo: [] },
  { species: "Dratini", evolvesTo: [{ species: "Dragonair", trigger: "Lv 30", evolvesTo: [{ species: "Dragonite", trigger: "Lv 55" }] }] },
  { species: "Mewtwo", evolvesTo: [] },
  { species: "Mew", evolvesTo: [] },

  // Gen 2 Starters & Lines
  { species: "Chikorita", evolvesTo: [{ species: "Bayleef", trigger: "Lv 16", evolvesTo: [{ species: "Meganium", trigger: "Lv 32" }] }] },
  { species: "Cyndaquil", evolvesTo: [{ species: "Quilava", trigger: "Lv 14", evolvesTo: [
    { species: "Typhlosion", trigger: "Lv 36" },
    { species: "Typhlosion (Hisui)", trigger: "Lv 36 + Incense Burner" }
  ] }] },
  { species: "Totodile", evolvesTo: [{ species: "Croconaw", trigger: "Lv 18", evolvesTo: [{ species: "Feraligatr", trigger: "Lv 30" }] }] },
  { species: "Sentret", evolvesTo: [{ species: "Furret", trigger: "Lv 15" }] },
  { species: "Hoothoot", evolvesTo: [{ species: "Noctowl", trigger: "Lv 20" }] },
  { species: "Ledyba", evolvesTo: [{ species: "Ledian", trigger: "Lv 18" }] },
  { species: "Spinarak", evolvesTo: [{ species: "Ariados", trigger: "Lv 22" }] },
  { species: "Chinchou", evolvesTo: [{ species: "Lanturn", trigger: "Lv 27" }] },
  { species: "Togepi", evolvesTo: [{ species: "Togetic", trigger: "High Friendship", evolvesTo: [{ species: "Togekiss", trigger: "Shiny Stone" }] }] },
  { species: "Natu", evolvesTo: [{ species: "Xatu", trigger: "Lv 25" }] },
  { species: "Mareep", evolvesTo: [{ species: "Flaaffy", trigger: "Lv 15", evolvesTo: [{ species: "Ampharos", trigger: "Lv 30" }] }] },
  { species: "Bonsly", evolvesTo: [{ species: "Sudowoodo", trigger: "Learn Mimic" }] },
  { species: "Hoppip", evolvesTo: [{ species: "Skiploom", trigger: "Lv 18", evolvesTo: [{ species: "Jumpluff", trigger: "Lv 27" }] }] },
  { species: "Aipom", evolvesTo: [{ species: "Ambipom", trigger: "Learn Double Hit" }] },
  { species: "Sunkern", evolvesTo: [{ species: "Sunflora", trigger: "Sun Stone" }] },
  { species: "Yanma", evolvesTo: [{ species: "Yanmega", trigger: "Learn Ancient Power" }] },
  { species: "Wooper", evolvesTo: [{ species: "Quagsire", trigger: "Lv 20" }] },
  { species: "Murkrow", evolvesTo: [{ species: "Honchkrow", trigger: "Dusk Stone" }] },
  { species: "Misdreavus", evolvesTo: [{ species: "Mismagius", trigger: "Dusk Stone" }] },
  { species: "Unown", evolvesTo: [] },
  { species: "Wynaut", evolvesTo: [{ species: "Wobbuffet", trigger: "Lv 15" }] },
  { species: "Girafarig", evolvesTo: [] },
  { species: "Pineco", evolvesTo: [{ species: "Forretress", trigger: "Lv 31" }] },
  { species: "Dunsparce", evolvesTo: [] },
  { species: "Gligar", evolvesTo: [{ species: "Gliscor", trigger: "Razor Fang (Night)" }] },
  { species: "Snubbull", evolvesTo: [{ species: "Granbull", trigger: "Lv 23" }] },
  { species: "Qwilfish", evolvesTo: [{ species: "Overqwil", trigger: "Learn Barb Barrage" }] },
  { species: "Shuckle", evolvesTo: [] },
  { species: "Heracross", evolvesTo: [] },
  { species: "Sneasel", evolvesTo: [
    { species: "Weavile", trigger: "Razor Claw (Night)" },
    { species: "Sneasler", trigger: "Razor Claw (Day)" }
  ] },
  { species: "Teddiursa", evolvesTo: [{ species: "Ursaring", trigger: "Lv 30", evolvesTo: [{ species: "Ursaluna", trigger: "Peat Block (Full Moon)" }] }] },
  { species: "Slugma", evolvesTo: [{ species: "Magcargo", trigger: "Lv 38" }] },
  { species: "Swinub", evolvesTo: [{ species: "Piloswine", trigger: "Lv 33", evolvesTo: [{ species: "Mamoswine", trigger: "Learn Ancient Power" }] }] },
  { species: "Corsola", evolvesTo: [] },
  { species: "Remoraid", evolvesTo: [{ species: "Octillery", trigger: "Lv 25" }] },
  { species: "Delibird", evolvesTo: [] },
  { species: "Mantyke", evolvesTo: [{ species: "Mantine", trigger: "Level up with Remoraid" }] },
  { species: "Skarmory", evolvesTo: [] },
  { species: "Houndour", evolvesTo: [{ species: "Houndoom", trigger: "Lv 24" }] },
  { species: "Phanpy", evolvesTo: [{ species: "Donphan", trigger: "Lv 25" }] },
  { species: "Stantler", evolvesTo: [{ species: "Wyrdeer", trigger: "Learn Psyshield Bash" }] },
  { species: "Smeargle", evolvesTo: [] },
  { species: "Miltank", evolvesTo: [] },
  { species: "Raikou", evolvesTo: [] },
  { species: "Entei", evolvesTo: [] },
  { species: "Suicune", evolvesTo: [] },
  { species: "Larvitar", evolvesTo: [{ species: "Pupitar", trigger: "Lv 30", evolvesTo: [{ species: "Tyranitar", trigger: "Lv 55" }] }] },
  { species: "Lugia", evolvesTo: [] },
  { species: "Ho-Oh", evolvesTo: [] },
  { species: "Celebi", evolvesTo: [] },

  // Gen 3 Starters & Lines
  { species: "Treecko", evolvesTo: [{ species: "Grovyle", trigger: "Lv 16", evolvesTo: [{ species: "Sceptile", trigger: "Lv 36" }] }] },
  { species: "Torchic", evolvesTo: [{ species: "Combusken", trigger: "Lv 16", evolvesTo: [{ species: "Blaziken", trigger: "Lv 36" }] }] },
  { species: "Mudkip", evolvesTo: [{ species: "Marshtomp", trigger: "Lv 16", evolvesTo: [{ species: "Swampert", trigger: "Lv 36" }] }] },
  { species: "Poochyena", evolvesTo: [{ species: "Mightyena", trigger: "Lv 18" }] },
  { species: "Zigzagoon", evolvesTo: [{ species: "Linoone", trigger: "Lv 20" }] },
  { species: "Wurmple", evolvesTo: [
    { species: "Silcoon", trigger: "Lv 7 (Personality)", evolvesTo: [{ species: "Beautifly", trigger: "Lv 10" }] },
    { species: "Cascoon", trigger: "Lv 7 (Personality)", evolvesTo: [{ species: "Dustox", trigger: "Lv 10" }] }
  ] },
  { species: "Lotad", evolvesTo: [{ species: "Lombre", trigger: "Lv 14", evolvesTo: [{ species: "Ludicolo", trigger: "Water Stone" }] }] },
  { species: "Seedot", evolvesTo: [{ species: "Nuzleaf", trigger: "Lv 14", evolvesTo: [{ species: "Shiftry", trigger: "Leaf Stone" }] }] },
  { species: "Taillow", evolvesTo: [{ species: "Swellow", trigger: "Lv 22" }] },
  { species: "Wingull", evolvesTo: [{ species: "Pelipper", trigger: "Lv 25" }] },
  { species: "Ralts", evolvesTo: [{ species: "Kirlia", trigger: "Lv 20", evolvesTo: [
    { species: "Gardevoir", trigger: "Lv 30" },
    { species: "Gallade", trigger: "Dawn Stone (Male)" }
  ] }] },
  { species: "Surskit", evolvesTo: [{ species: "Masquerain", trigger: "Lv 22" }] },
  { species: "Shroomish", evolvesTo: [{ species: "Breloom", trigger: "Lv 23" }] },
  { species: "Slakoth", evolvesTo: [{ species: "Vigoroth", trigger: "Lv 18", evolvesTo: [{ species: "Slaking", trigger: "Lv 36" }] }] },
  { species: "Nincada", evolvesTo: [
    { species: "Ninjask", trigger: "Lv 20" },
    { species: "Shedinja", trigger: "Lv 20 (Empty Slot + Poké Ball)" }
  ] },
  { species: "Whismur", evolvesTo: [{ species: "Loudred", trigger: "Lv 20", evolvesTo: [{ species: "Exploud", trigger: "Lv 40" }] }] },
  { species: "Makuhita", evolvesTo: [{ species: "Hariyama", trigger: "Lv 24" }] },
  { species: "Azurill", evolvesTo: [{ species: "Marill", trigger: "High Friendship", evolvesTo: [{ species: "Azumarill", trigger: "Lv 18" }] }] },
  { species: "Nosepass", evolvesTo: [{ species: "Probopass", trigger: "Thunder Stone / Mt. Coronet" }] },
  { species: "Skitty", evolvesTo: [{ species: "Delcatty", trigger: "Moon Stone" }] },
  { species: "Sableye", evolvesTo: [] },
  { species: "Mawile", evolvesTo: [] },
  { species: "Aron", evolvesTo: [{ species: "Lairon", trigger: "Lv 32", evolvesTo: [{ species: "Aggron", trigger: "Lv 42" }] }] },
  { species: "Meditite", evolvesTo: [{ species: "Medicham", trigger: "Lv 37" }] },
  { species: "Electrike", evolvesTo: [{ species: "Manectric", trigger: "Lv 26" }] },
  { species: "Plusle", evolvesTo: [] },
  { species: "Minun", evolvesTo: [] },
  { species: "Volbeat", evolvesTo: [] },
  { species: "Illumise", evolvesTo: [] },
  { species: "Budew", evolvesTo: [{ species: "Roselia", trigger: "High Friendship (Day)", evolvesTo: [{ species: "Roserade", trigger: "Shiny Stone" }] }] },
  { species: "Gulpin", evolvesTo: [{ species: "Swalot", trigger: "Lv 26" }] },
  { species: "Carvanha", evolvesTo: [{ species: "Sharpedo", trigger: "Lv 30" }] },
  { species: "Wailmer", evolvesTo: [{ species: "Wailord", trigger: "Lv 40" }] },
  { species: "Numel", evolvesTo: [{ species: "Camerupt", trigger: "Lv 33" }] },
  { species: "Torkoal", evolvesTo: [] },
  { species: "Spoink", evolvesTo: [{ species: "Grumpig", trigger: "Lv 32" }] },
  { species: "Spinda", evolvesTo: [] },
  { species: "Trapinch", evolvesTo: [{ species: "Vibrava", trigger: "Lv 35", evolvesTo: [{ species: "Flygon", trigger: "Lv 45" }] }] },
  { species: "Cacnea", evolvesTo: [{ species: "Cacturne", trigger: "Lv 32" }] },
  { species: "Swablu", evolvesTo: [{ species: "Altaria", trigger: "Lv 35" }] },
  { species: "Zangoose", evolvesTo: [] },
  { species: "Seviper", evolvesTo: [] },
  { species: "Lunatone", evolvesTo: [] },
  { species: "Solrock", evolvesTo: [] },
  { species: "Barboach", evolvesTo: [{ species: "Whiscash", trigger: "Lv 30" }] },
  { species: "Corphish", evolvesTo: [{ species: "Crawdaunt", trigger: "Lv 30" }] },
  { species: "Baltoy", evolvesTo: [{ species: "Claydol", trigger: "Lv 36" }] },
  { species: "Lileep", evolvesTo: [{ species: "Cradily", trigger: "Lv 40" }] },
  { species: "Anorith", evolvesTo: [{ species: "Armaldo", trigger: "Lv 40" }] },
  { species: "Feebas", evolvesTo: [{ species: "Milotic", trigger: "Prism Scale / Max Beauty" }] },
  { species: "Castform", evolvesTo: [] },
  { species: "Kecleon", evolvesTo: [] },
  { species: "Shuppet", evolvesTo: [{ species: "Banette", trigger: "Lv 37" }] },
  { species: "Duskull", evolvesTo: [{ species: "Dusclops", trigger: "Lv 37", evolvesTo: [{ species: "Dusknoir", trigger: "Reaper Cloth + Link Cable" }] }] },
  { species: "Tropius", evolvesTo: [] },
  { species: "Chingling", evolvesTo: [{ species: "Chimecho", trigger: "High Friendship (Night)" }] },
  { species: "Absol", evolvesTo: [] },
  { species: "Snorunt", evolvesTo: [
    { species: "Glalie", trigger: "Lv 42" },
    { species: "Froslass", trigger: "Dawn Stone (Female)" }
  ] },
  { species: "Spheal", evolvesTo: [{ species: "Sealeo", trigger: "Lv 32", evolvesTo: [{ species: "Walrein", trigger: "Lv 44" }] }] },
  { species: "Clamperl", evolvesTo: [
    { species: "Huntail", trigger: "Deep Sea Tooth + Link Cable" },
    { species: "Gorebyss", trigger: "Deep Sea Scale + Link Cable" }
  ] },
  { species: "Relicanth", evolvesTo: [] },
  { species: "Luvdisc", evolvesTo: [] },
  { species: "Bagon", evolvesTo: [{ species: "Shelgon", trigger: "Lv 30", evolvesTo: [{ species: "Salamence", trigger: "Lv 50" }] }] },
  { species: "Beldum", evolvesTo: [{ species: "Metang", trigger: "Lv 20", evolvesTo: [{ species: "Metagross", trigger: "Lv 45" }] }] },
  { species: "Regirock", evolvesTo: [] },
  { species: "Regice", evolvesTo: [] },
  { species: "Registeel", evolvesTo: [] },
  { species: "Latias", evolvesTo: [] },
  { species: "Latios", evolvesTo: [] },
  { species: "Kyogre", evolvesTo: [] },
  { species: "Groudon", evolvesTo: [] },
  { species: "Rayquaza", evolvesTo: [] },
  { species: "Jirachi", evolvesTo: [] },
  { species: "Deoxys", evolvesTo: [] },

  // Gen 4 Starters & Lines
  { species: "Turtwig", evolvesTo: [{ species: "Grotle", trigger: "Lv 18", evolvesTo: [{ species: "Torterra", trigger: "Lv 32" }] }] },
  { species: "Chimchar", evolvesTo: [{ species: "Monferno", trigger: "Lv 14", evolvesTo: [{ species: "Infernape", trigger: "Lv 36" }] }] },
  { species: "Piplup", evolvesTo: [{ species: "Prinplup", trigger: "Lv 16", evolvesTo: [{ species: "Empoleon", trigger: "Lv 36" }] }] },
  { species: "Starly", evolvesTo: [{ species: "Staravia", trigger: "Lv 14", evolvesTo: [{ species: "Staraptor", trigger: "Lv 34" }] }] },
  { species: "Bidoof", evolvesTo: [{ species: "Bibarel", trigger: "Lv 15" }] },
  { species: "Kricketot", evolvesTo: [{ species: "Kricketune", trigger: "Lv 10" }] },
  { species: "Shinx", evolvesTo: [{ species: "Luxio", trigger: "Lv 15", evolvesTo: [{ species: "Luxray", trigger: "Lv 30" }] }] },
  { species: "Cranidos", evolvesTo: [{ species: "Rampardos", trigger: "Lv 30" }] },
  { species: "Shieldon", evolvesTo: [{ species: "Bastiodon", trigger: "Lv 30" }] },
  { species: "Burmy", evolvesTo: [
    { species: "Wormadam", trigger: "Lv 20 (Female)" },
    { species: "Mothim", trigger: "Lv 20 (Male)" }
  ] },
  { species: "Combee", evolvesTo: [{ species: "Vespiquen", trigger: "Lv 21 (Female)" }] },
  { species: "Pachirisu", evolvesTo: [] },
  { species: "Buizel", evolvesTo: [{ species: "Floatzel", trigger: "Lv 26" }] },
  { species: "Cherubi", evolvesTo: [{ species: "Cherrim", trigger: "Lv 25" }] },
  { species: "Shellos", evolvesTo: [{ species: "Gastrodon", trigger: "Lv 30" }] },
  { species: "Drifloon", evolvesTo: [{ species: "Drifblim", trigger: "Lv 28" }] },
  { species: "Buneary", evolvesTo: [{ species: "Lopunny", trigger: "High Friendship" }] },
  { species: "Glameow", evolvesTo: [{ species: "Purugly", trigger: "Lv 38" }] },
  { species: "Stunky", evolvesTo: [{ species: "Skuntank", trigger: "Lv 34" }] },
  { species: "Bronzor", evolvesTo: [{ species: "Bronzong", trigger: "Lv 33" }] },
  { species: "Chatot", evolvesTo: [] },
  { species: "Spiritomb", evolvesTo: [] },
  { species: "Gible", evolvesTo: [{ species: "Gabite", trigger: "Lv 24", evolvesTo: [{ species: "Garchomp", trigger: "Lv 48" }] }] },
  { species: "Riolu", evolvesTo: [{ species: "Lucario", trigger: "High Friendship (Day)" }] },
  { species: "Hippopotas", evolvesTo: [{ species: "Hippowdon", trigger: "Lv 34" }] },
  { species: "Skorupi", evolvesTo: [{ species: "Drapion", trigger: "Lv 40" }] },
  { species: "Croagunk", evolvesTo: [{ species: "Toxicroak", trigger: "Lv 37" }] },
  { species: "Carnivine", evolvesTo: [] },
  { species: "Finneon", evolvesTo: [{ species: "Lumineon", trigger: "Lv 31" }] },
  { species: "Snover", evolvesTo: [{ species: "Abomasnow", trigger: "Lv 40" }] },
  { species: "Rotom", evolvesTo: [] },
  { species: "Uxie", evolvesTo: [] },
  { species: "Mesprit", evolvesTo: [] },
  { species: "Azelf", evolvesTo: [] },
  { species: "Dialga", evolvesTo: [] },
  { species: "Palkia", evolvesTo: [] },
  { species: "Heatran", evolvesTo: [] },
  { species: "Regigigas", evolvesTo: [] },
  { species: "Giratina", evolvesTo: [] },
  { species: "Cresselia", evolvesTo: [] },
  { species: "Phione", evolvesTo: [] },
  { species: "Manaphy", evolvesTo: [] },
  { species: "Darkrai", evolvesTo: [] },
  { species: "Shaymin", evolvesTo: [] },
  { species: "Arceus", evolvesTo: [] },

  // Hisuian Cross-Gen Additions
  { species: "Rowlet", evolvesTo: [{ species: "Dartrix", trigger: "Lv 17", evolvesTo: [
    { species: "Decidueye", trigger: "Lv 34" },
    { species: "Decidueye (Hisui)", trigger: "Lv 34 + Incense Burner" }
  ] }] },
  { species: "Oshawott", evolvesTo: [{ species: "Dewott", trigger: "Lv 17", evolvesTo: [
    { species: "Samurott", trigger: "Lv 36" },
    { species: "Samurott (Hisui)", trigger: "Lv 36 + Incense Burner" }
  ] }] },
  { species: "Basculin", evolvesTo: [{ species: "Basculegion", trigger: "Recoil Damage in Battle" }] },

  // Regional Chains (Alolan & Galarian)
  { species: "Rattata (Alola)", evolvesTo: [{ species: "Raticate (Alola)", trigger: "Lv 20 (Night)" }] },
  { species: "Sandshrew (Alola)", evolvesTo: [{ species: "Sandslash (Alola)", trigger: "Ice Stone" }] },
  { species: "Vulpix (Alola)", evolvesTo: [{ species: "Ninetales (Alola)", trigger: "Ice Stone" }] },
  { species: "Diglett (Alola)", evolvesTo: [{ species: "Dugtrio (Alola)", trigger: "Lv 26" }] },
  { species: "Meowth (Alola)", evolvesTo: [{ species: "Persian (Alola)", trigger: "High Friendship / Lv 28" }] },
  { species: "Meowth (Galar)", evolvesTo: [{ species: "Perrserker", trigger: "Lv 28" }] },
  { species: "Geodude (Alola)", evolvesTo: [{ species: "Graveler (Alola)", trigger: "Lv 25", evolvesTo: [{ species: "Golem (Alola)", trigger: "Link Cable" }] }] },
  { species: "Grimer (Alola)", evolvesTo: [{ species: "Muk (Alola)", trigger: "Lv 38" }] },
  { species: "Ponyta (Galar)", evolvesTo: [{ species: "Rapidash (Galar)", trigger: "Lv 40" }] },
  { species: "Slowpoke (Galar)", evolvesTo: [
    { species: "Slowbro (Galar)", trigger: "King's Rock" },
    { species: "Slowking (Galar)", trigger: "King's Rock" }
  ] },
  { species: "Farfetch'd (Galar)", evolvesTo: [{ species: "Sirfetch'd", trigger: "3 Crits in 1 Battle" }] },
  { species: "Mr. Mime (Galar)", evolvesTo: [{ species: "Mr. Rime", trigger: "Lv 42" }] },
  { species: "Corsola (Galar)", evolvesTo: [{ species: "Cursola", trigger: "Lv 38" }] },
  { species: "Zigzagoon (Galar)", evolvesTo: [{ species: "Linoone (Galar)", trigger: "Lv 20", evolvesTo: [{ species: "Obstagoon", trigger: "Lv 35 (Night)" }] }] }
];

// Build bidirectional name index
var EVO_LOOKUP = {};

function indexEvoNode(node, root) {
  if (!node || !node.species) return;
  var name = node.species.toLowerCase().trim();
  EVO_LOOKUP[name] = root;
  if (name.includes(' (alola)')) {
    EVO_LOOKUP['alolan ' + name.replace(' (alola)', '')] = root;
    EVO_LOOKUP['alola-' + name.replace(' (alola)', '')] = root;
  }
  if (name.includes(' (galar)')) {
    EVO_LOOKUP['galarian ' + name.replace(' (galar)', '')] = root;
    EVO_LOOKUP['galar-' + name.replace(' (galar)', '')] = root;
  }
  if (name.includes(' (hisui)')) {
    EVO_LOOKUP['hisuian ' + name.replace(' (hisui)', '')] = root;
    EVO_LOOKUP['hisui-' + name.replace(' (hisui)', '')] = root;
  }
  if (node.evolvesTo && Array.isArray(node.evolvesTo)) {
    node.evolvesTo.forEach(child => indexEvoNode(child, root));
  }
}

RAW_EVO_CHAINS.forEach(root => indexEvoNode(root, root));

function getEvolutionTree(speciesName) {
  if (!speciesName) return null;
  var key = speciesName.toLowerCase().trim();
  return EVO_LOOKUP[key] || { species: speciesName, evolvesTo: [] };
}

function findPokemonByName(name) {
  var roster = (typeof getRoster === 'function') ? getRoster() : (window.POKEMON_DATA || []);
  var target = (name || '').toLowerCase().trim();
  return roster.find(p => p.name.toLowerCase().trim() === target || p.name.toLowerCase().startsWith(target));
}

function getEvoSprite(speciesName) {
  var p = findPokemonByName(speciesName);
  if (p) {
    if (p.sprite) return p.sprite;
    var num = p.id <= 493 ? p.id : 387;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`;
  }
  return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
}

function renderEvoNodeHtml(speciesName, currentPokemonName) {
  var p = findPokemonByName(speciesName);
  var isCurrent = (speciesName.toLowerCase().trim() === (currentPokemonName || '').toLowerCase().trim());
  var dexNum = p ? p.dexNum : '';
  var types = p ? p.types : [];
  var spriteUrl = getEvoSprite(speciesName);
  var id = p ? p.id : 0;

  return `
    <div class="evo-node ${isCurrent ? 'current' : ''}" onclick="window.selectPokemonByName && window.selectPokemonByName('${speciesName}')" title="Click to view ${speciesName}">
      <img class="evo-sprite" src="${spriteUrl}" alt="${speciesName}" loading="lazy" />
      <span class="evo-name">${speciesName}</span>
      <span class="evo-dex">${dexNum}</span>
    </div>
  `;
}

function renderEvolutionLine(pokemon) {
  if (!pokemon) return '';
  var tree = getEvolutionTree(pokemon.name);
  if (!tree) return '<div style="color:var(--text-muted); font-size:0.8rem;">No evolution line data.</div>';

  if (!tree.evolvesTo || tree.evolvesTo.length === 0) {
    return `
      <div class="evo-line-container">
        ${renderEvoNodeHtml(tree.species, pokemon.name)}
        <div style="font-size:0.8rem; color:var(--text-muted); margin-left:0.5rem; font-style:italic;">Does not evolve</div>
      </div>
    `;
  }

  // Linear chain or branching
  var html = '<div class="evo-line-container">';
  html += renderEvoNodeHtml(tree.species, pokemon.name);

  if (tree.evolvesTo.length === 1 && (!tree.evolvesTo[0].evolvesTo || tree.evolvesTo[0].evolvesTo.length <= 1)) {
    // 2-stage or 3-stage single linear line
    var stage2 = tree.evolvesTo[0];
    html += `
      <div class="evo-arrow">
        <span class="evo-trigger">${stage2.trigger || '➔'}</span>
        <span class="evo-arrow-icon">➔</span>
      </div>
    `;
    html += renderEvoNodeHtml(stage2.species, pokemon.name);

    if (stage2.evolvesTo && stage2.evolvesTo.length > 0) {
      if (stage2.evolvesTo.length === 1) {
        var stage3 = stage2.evolvesTo[0];
        html += `
          <div class="evo-arrow">
            <span class="evo-trigger">${stage3.trigger || '➔'}</span>
            <span class="evo-arrow-icon">➔</span>
          </div>
        `;
        html += renderEvoNodeHtml(stage3.species, pokemon.name);
      } else {
        // Stage 3 branches (e.g. Gloom -> Vileplume/Bellossom, Poliwhirl -> Poliwrath/Politoed)
        html += '<div class="evo-branches" style="display:flex; flex-direction:column; gap:0.4rem; margin-left:0.5rem;">';
        stage2.evolvesTo.forEach(s3 => {
          html += `
            <div style="display:flex; align-items:center; gap:0.4rem;">
              <div class="evo-arrow" style="min-width:70px;">
                <span class="evo-trigger">${s3.trigger}</span>
                <span class="evo-arrow-icon">➔</span>
              </div>
              ${renderEvoNodeHtml(s3.species, pokemon.name)}
            </div>
          `;
        });
        html += '</div>';
      }
    }
  } else {
    // Stage 1 branching (Eevee, Tyrogue, Wurmple, Scyther, Slowpoke, Burmy, etc.)
    html += '<div class="evo-branches" style="display:flex; flex-direction:column; gap:0.4rem; margin-left:0.5rem;">';
    tree.evolvesTo.forEach(branch => {
      html += `
        <div style="display:flex; align-items:center; gap:0.4rem;">
          <div class="evo-arrow" style="min-width:75px;">
            <span class="evo-trigger">${branch.trigger}</span>
            <span class="evo-arrow-icon">➔</span>
          </div>
          ${renderEvoNodeHtml(branch.species, pokemon.name)}
      `;
      if (branch.evolvesTo && branch.evolvesTo.length > 0) {
        branch.evolvesTo.forEach(b3 => {
          html += `
            <div class="evo-arrow" style="min-width:75px;">
              <span class="evo-trigger">${b3.trigger}</span>
              <span class="evo-arrow-icon">➔</span>
            </div>
            ${renderEvoNodeHtml(b3.species, pokemon.name)}
          `;
        });
      }
      html += '</div>';
    });
    html += '</div>';
  }

  html += '</div>';
  return html;
}

window.RAW_EVO_CHAINS = RAW_EVO_CHAINS;
window.getEvolutionTree = getEvolutionTree;
window.renderEvolutionLine = renderEvolutionLine;
