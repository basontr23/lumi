/**
 * Luminescent Platinum Companion & Pokédex Application Controller
 * Inspired by Radical Red Pokédex (ydarissep / sangvo1991)
 * Fully mobile-responsive and desktop dual-pane optimized.
 */

(function () {
  'use strict';

  // Boss Icon Map
  const BOSS_ICONS = {
    roark: '🪨',
    gardenia: '🌿',
    maylene: '🥊',
    fantina: '👻',
    'crasher-wake': '🌊',
    byron: '🛡️',
    candice: '❄️',
    volkner: '⚡',
    mars: '🪐',
    jupiter: '☄️',
    saturn: '🌌',
    cyrus: '🌑',
    aaron: '🐛',
    bertha: '🏜️',
    flint: '🔥',
    lucian: '🔮',
    cynthia: '👑'
  };

  function getRoster() {
    if (typeof window !== 'undefined' && window.POKEMON_DATA && window.POKEMON_DATA.length > 0) return window.POKEMON_DATA;
    if (typeof POKEMON_DATA !== 'undefined' && Array.isArray(POKEMON_DATA) && POKEMON_DATA.length > 0) return POKEMON_DATA;
    if (typeof window !== 'undefined' && window.POKEMON_PART1) {
      return (window.POKEMON_PART1 || []).concat(window.POKEMON_PART2 || []);
    }
    return [];
  }

  const initialRoster = getRoster();

  // State
  const state = {
    currentSection: 'pokedex', // 'pokedex', 'items', 'routes', 'bosses', 'levelcaps'
    pokemon: [...initialRoster],
    filteredPokemon: [...initialRoster],
    selectedPokemon: initialRoster[0] || null,
    viewMode: window.innerWidth <= 768 ? 'grid' : 'table', // default to grid on mobile
    searchQuery: '',
    type1: 'all',
    type2: 'all',
    gen: 'all',
    locationFilter: 'all',
    onlyLumi: false,
    onlyHisui: false,
    sortBy: 'dex',
    sortOrder: 'asc',
    isShiny: false,
    activeTab: 'level-up',
    team: JSON.parse(localStorage.getItem('lumi_team') || '[]'),
    renderLimit: 50,

    // Items state
    itemCategory: 'all',
    itemSearch: '',

    // Bosses state
    bossCategory: 'all',

    // Routes state
    selectedRouteId: ROUTES_DATA && ROUTES_DATA[0] ? ROUTES_DATA[0].routeId : 'route-201'
  };

  // DOM Elements
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const type1Filter = document.getElementById('filter-type1');
  const type2Filter = document.getElementById('filter-type2');
  const genFilter = document.getElementById('filter-gen');
  const sortSelect = document.getElementById('sort-select');
  const filterLocation = document.getElementById('filter-location');
  const chipLumi = document.getElementById('chip-lumi');
  const chipHisui = document.getElementById('chip-hisui');
  const viewToggleBtn = document.getElementById('view-toggle-btn');
  const resultsCount = document.getElementById('results-count');
  const tableContainer = document.getElementById('table-container');
  const tableBody = document.getElementById('table-body');
  const gridContainer = document.getElementById('grid-container');
  const detailDrawer = document.getElementById('detail-drawer');
  const randomBtn = document.getElementById('random-btn');
  const teamBtn = document.getElementById('team-btn');
  const teamModal = document.getElementById('team-modal');
  const closeTeamModal = document.getElementById('close-team-modal');

  // Sprite URL helper
  function getSpriteUrl(pokemonOrName, shiny = false) {
    if (!pokemonOrName) return '';
    const nameStr = typeof pokemonOrName === 'string' ? pokemonOrName : (pokemonOrName.name || '');
    const rawName = nameStr.toLowerCase()
      .replace(' (hisui)', '-hisui')
      .replace(' (wash)', '-wash')
      .replace(' (heat)', '-heat')
      .replace(' (frost)', '-frost')
      .replace(' (fan)', '-fan')
      .replace(' (mow)', '-mow')
      .replace(' (origin)', '-origin')
      .replace(/[^a-z0-9\-]/g, '');

    if (shiny) {
      return `https://play.pokemonshowdown.com/sprites/ani-shiny/${rawName}.gif`;
    }
    return `https://play.pokemonshowdown.com/sprites/ani/${rawName}.gif`;
  }

  function getFallbackSpriteUrl(pokemonOrName) {
    if (!pokemonOrName) return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png';
    if (typeof pokemonOrName === 'object' && pokemonOrName.id) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonOrName.id <= 493 ? pokemonOrName.id : 387}.png`;
    }
    const nameStr = typeof pokemonOrName === 'string' ? pokemonOrName : (pokemonOrName.name || '');
    const found = getRoster().find(p => p.name.toLowerCase() === nameStr.toLowerCase() || p.name.toLowerCase().startsWith(nameStr.toLowerCase()));
    if (found) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${found.id <= 493 ? found.id : 387}.png`;
    }
    return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png';
  }

  function getListSpriteUrl(p) {
    if (!p) return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png';
    const id = p.id <= 493 ? p.id : 387;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  function getStatColor(val) {
    if (val < 60) return '#ef4444';
    if (val < 80) return '#f97316';
    if (val < 100) return '#eab308';
    if (val < 120) return '#22c55e';
    if (val < 140) return '#06b6d4';
    return '#a855f7';
  }

  function renderTypeBadges(types, size = '') {
    if (!types || !Array.isArray(types)) return '';
    return types.map(t => `<span class="type-badge type-${t.toLowerCase()} ${size}">${t}</span>`).join(' ');
  }

  // Section Switcher
  function switchSection(sectionId) {
    state.currentSection = sectionId;

    // Close detail drawer when switching away from Dex or on mobile
    if (detailDrawer && (sectionId !== 'pokedex' || window.innerWidth <= 900)) {
      detailDrawer.classList.add('collapsed');
    }

    // Update Top Nav and Mobile Bottom Nav
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-section') === sectionId);
    });
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-section') === sectionId);
    });

    // Toggle Section visibility
    document.querySelectorAll('.app-section').forEach(sec => {
      sec.classList.toggle('active', sec.id === `section-${sectionId}`);
    });

    // Render section content
    if (sectionId === 'items') {
      renderItemsSection();
    } else if (sectionId === 'bosses') {
      renderBossesSection();
    } else if (sectionId === 'routes') {
      renderRoutesSection();
    } else if (sectionId === 'levelcaps') {
      renderLevelCapsSection();
    }
  }

  // Filter & Sort Logic for Pokédex
  function applyFilters() {
    let result = [...getRoster()];

    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase().trim();
      result = result.filter(p => {
        const matchName = p.name.toLowerCase().includes(q);
        const matchDex = p.dexNum.toLowerCase().includes(q);
        const matchType = p.types.some(t => t.toLowerCase().includes(q));
        const matchAbility = (p.abilities.concat(p.hiddenAbility || [])).some(a => a.toLowerCase().includes(q));
        const matchLoc = p.locations && p.locations.some(loc => loc.toLowerCase().includes(q));
        return matchName || matchDex || matchType || matchAbility || matchLoc;
      });
    }

    if (state.type1 !== 'all') {
      result = result.filter(p => p.types[0] === state.type1 || p.types[1] === state.type1);
    }
    if (state.type2 !== 'all') {
      result = result.filter(p => p.types[1] === state.type2 || (p.types.length === 1 && state.type2 === 'None'));
    }
    if (state.gen !== 'all') {
      if (state.gen === 'Hisui') {
        result = result.filter(p => p.isHisuian || p.generation === 'Hisui');
      } else {
        result = result.filter(p => p.generation === parseInt(state.gen, 10));
      }
    }
    if (state.locationFilter && state.locationFilter !== 'all') {
      const qLoc = state.locationFilter.toLowerCase();
      result = result.filter(p => p.locations && p.locations.some(loc => loc.toLowerCase().includes(qLoc)));
    }
    if (state.onlyLumi) {
      result = result.filter(p => p.isModified);
    }
    if (state.onlyHisui) {
      result = result.filter(p => p.isHisuian);
    }

    result.sort((a, b) => {
      let valA, valB;
      switch (state.sortBy) {
        case 'name':
          return state.sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        case 'bst': valA = a.bst; valB = b.bst; break;
        case 'hp': valA = a.stats.hp; valB = b.stats.hp; break;
        case 'atk': valA = a.stats.atk; valB = b.stats.atk; break;
        case 'def': valA = a.stats.def; valB = b.stats.def; break;
        case 'spa': valA = a.stats.spa; valB = b.stats.spa; break;
        case 'spd': valA = a.stats.spd; valB = b.stats.spd; break;
        case 'spe': valA = a.stats.spe; valB = b.stats.spe; break;
        case 'dex':
        default:
          valA = a.id; valB = b.id; break;
      }
      return state.sortOrder === 'asc' ? valA - valB : valB - valA;
    });

    state.filteredPokemon = result;
    state.renderLimit = 50;
    resultsCount.textContent = `${result.length} Pokémon found`;

    renderList();
  }

  function renderTableView() {
    tableContainer.style.display = 'block';
    gridContainer.style.display = 'none';

    if (state.filteredPokemon.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="12" class="no-results" style="text-align:center; padding:3rem 1rem;">
            <h3>No Pokémon matching your search</h3>
          </td>
        </tr>`;
      return;
    }

    const visible = state.filteredPokemon.slice(0, state.renderLimit);
    let html = visible.map(p => {
      const isSelected = state.selectedPokemon && state.selectedPokemon.id === p.id;
      const bstBadge = p.bstDiff && p.bstDiff !== 0
        ? `<span>${p.bst} <small style="color:${p.bstDiff > 0 ? '#4ade80' : '#f87171'}">(${p.bstDiff > 0 ? '+' : ''}${p.bstDiff})</small></span>`
        : `<span>${p.bst}</span>`;

      return `
        <tr class="dex-row ${isSelected ? 'selected' : ''}" data-id="${p.id}">
          <td class="dex-num-cell">${p.dexNum}</td>
          <td class="dex-sprite-cell">
            <img class="dex-sprite-img" src="${getListSpriteUrl(p)}" alt="${p.name}" loading="lazy" decoding="async" />
          </td>
          <td class="dex-name-cell">
            <div class="dex-name-wrapper">
              <span>${p.name}</span>
              ${p.isHisuian ? '<span class="badge-tag hisui">Hisui</span>' : ''}
              ${p.isModified && !p.isHisuian ? '<span class="badge-tag lumi">Lumi</span>' : ''}
            </div>
          </td>
          <td><div class="dex-types-cell">${renderTypeBadges(p.types, 'sm')}</div></td>
          <td>
            <div class="dex-abilities-cell">
              ${p.abilities.map(a => `<span class="ability-span">${a}</span>`).join('')}
              ${p.hiddenAbility && p.hiddenAbility !== 'None' ? `<span class="ability-span hidden-ability">${p.hiddenAbility} (H)</span>` : ''}
            </div>
          </td>
          <td class="stat-cell" style="color:${getStatColor(p.stats.hp)}">${p.stats.hp}</td>
          <td class="stat-cell" style="color:${getStatColor(p.stats.atk)}">${p.stats.atk}</td>
          <td class="stat-cell" style="color:${getStatColor(p.stats.def)}">${p.stats.def}</td>
          <td class="stat-cell" style="color:${getStatColor(p.stats.spa)}">${p.stats.spa}</td>
          <td class="stat-cell" style="color:${getStatColor(p.stats.spd)}">${p.stats.spd}</td>
          <td class="stat-cell" style="color:${getStatColor(p.stats.spe)}">${p.stats.spe}</td>
          <td class="bst-cell">${bstBadge}</td>
        </tr>`;
    }).join('');

    if (state.renderLimit < state.filteredPokemon.length) {
      html += `
        <tr id="load-more-row">
          <td colspan="12" style="text-align:center; padding:1.25rem;">
            <button id="load-more-btn" class="header-btn" style="padding:8px 24px; font-size:0.85rem; margin:0 auto; cursor:pointer;">
              Load More (${visible.length} of ${state.filteredPokemon.length})
            </button>
          </td>
        </tr>`;
    }

    tableBody.innerHTML = html;

    tableBody.querySelectorAll('.dex-row').forEach(row => {
      row.addEventListener('click', () => {
        selectPokemon(parseInt(row.getAttribute('data-id'), 10));
      });
    });

    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        state.renderLimit += 50;
        renderTableView();
      });
    }
  }

  function renderGridView() {
    tableContainer.style.display = 'none';
    gridContainer.style.display = 'grid';

    if (state.filteredPokemon.length === 0) {
      gridContainer.innerHTML = `<div class="no-results" style="grid-column:1/-1; text-align:center; padding:3rem 1rem;"><h3>No Pokémon found</h3></div>`;
      return;
    }

    const visible = state.filteredPokemon.slice(0, state.renderLimit);
    let html = visible.map(p => {
      const isSelected = state.selectedPokemon && state.selectedPokemon.id === p.id;
      return `
        <div class="pkmn-card ${isSelected ? 'selected' : ''}" data-id="${p.id}">
          <div class="card-top">
            <span class="card-number">${p.dexNum}</span>
            <div class="card-badges">
              ${p.isHisuian ? '<span class="badge-tag hisui">Hisui</span>' : ''}
              ${p.isModified && !p.isHisuian ? '<span class="badge-tag lumi">Lumi</span>' : ''}
            </div>
          </div>
          <div class="card-center">
            <img class="card-sprite" src="${getListSpriteUrl(p)}" alt="${p.name}" loading="lazy" decoding="async" />
            <div class="card-info">
              <div class="card-name">${p.name}</div>
              <div class="card-types">${renderTypeBadges(p.types, 'sm')}</div>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">BST: <strong style="color:var(--accent-cyan);">${p.bst}</strong></div>
            </div>
          </div>
          <div class="card-stats-preview">
            <div class="stat-row-preview">
              <span class="stat-label-preview">HP</span>
              <div class="stat-bar-track"><div class="stat-bar-fill" style="width:${Math.min(100, (p.stats.hp/160)*100)}%; background:${getStatColor(p.stats.hp)};"></div></div>
              <span class="stat-val-preview">${p.stats.hp}</span>
            </div>
            <div class="stat-row-preview">
              <span class="stat-label-preview">ATK</span>
              <div class="stat-bar-track"><div class="stat-bar-fill" style="width:${Math.min(100, (p.stats.atk/160)*100)}%; background:${getStatColor(p.stats.atk)};"></div></div>
              <span class="stat-val-preview">${p.stats.atk}</span>
            </div>
            <div class="stat-row-preview">
              <span class="stat-label-preview">SPE</span>
              <div class="stat-bar-track"><div class="stat-bar-fill" style="width:${Math.min(100, (p.stats.spe/160)*100)}%; background:${getStatColor(p.stats.spe)};"></div></div>
              <span class="stat-val-preview">${p.stats.spe}</span>
            </div>
          </div>
        </div>`;
    }).join('');

    if (state.renderLimit < state.filteredPokemon.length) {
      html += `
        <div id="load-more-grid" style="grid-column:1/-1; text-align:center; padding:1.25rem;">
          <button id="load-more-btn-grid" class="header-btn" style="padding:8px 24px; font-size:0.85rem; margin:0 auto; cursor:pointer;">
            Load More (${visible.length} of ${state.filteredPokemon.length})
          </button>
        </div>`;
    }

    gridContainer.innerHTML = html;

    gridContainer.querySelectorAll('.pkmn-card').forEach(card => {
      card.addEventListener('click', () => {
        selectPokemon(parseInt(card.getAttribute('data-id'), 10));
      });
    });

    const loadMoreGrid = document.getElementById('load-more-btn-grid');
    if (loadMoreGrid) {
      loadMoreGrid.addEventListener('click', () => {
        state.renderLimit += 50;
        renderGridView();
      });
    }
  }

  function renderList() {
    if (state.viewMode === 'table') {
      renderTableView();
    } else {
      renderGridView();
    }
  }

  // Select Pokemon & Auto-Reset Scroll to Top
  function selectPokemon(id, openDrawer = true) {
    const p = getRoster().find(item => item.id === id);
    if (!p) return;
    state.selectedPokemon = p;

    document.querySelectorAll('.dex-row, .pkmn-card').forEach(el => {
      el.classList.toggle('selected', parseInt(el.getAttribute('data-id'), 10) === id);
    });

    renderDetailDrawer();

    // AUTO-RESET SCROLL TO TOP IMMEDIATELY (Fixes the exhausting scroll issue!)
    if (detailDrawer) {
      detailDrawer.scrollTop = 0;
    }

    if (openDrawer && detailDrawer) {
      detailDrawer.classList.remove('collapsed');
      // If mobile view, also scroll window top to make sure drawer is fully in viewport
      if (window.innerWidth <= 900) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else if (detailDrawer) {
      if (window.innerWidth <= 900) {
        detailDrawer.classList.add('collapsed');
      } else {
        detailDrawer.classList.remove('collapsed');
      }
    }
  }

  // Helper: jump directly to a Pokémon in Dex from Boss / Routes / Team
  function goToPokemonInDex(name) {
    if (!name) return;
    const clean = name.toLowerCase().trim();
    const found = getRoster().find(p => p.name.toLowerCase() === clean || p.name.toLowerCase().startsWith(clean));
    if (found) {
      switchSection('pokedex');
      selectPokemon(found.id, true);
    }
  }

  // Render Detail Inspector
  function renderDetailDrawer() {
    const p = state.selectedPokemon;
    if (!p || !detailDrawer) return;

    const spriteUrl = getSpriteUrl(p, state.isShiny);
    const fallbackUrl = getFallbackSpriteUrl(p);

    let lumiAlertHtml = '';
    if (p.isModified || (p.lumiChanges && p.lumiChanges.length > 0)) {
      const changesList = p.lumiChanges || [];
      lumiAlertHtml = `
        <div class="lumi-alert-box">
          <div class="lumi-alert-title">✨ Luminescent Platinum Balance Changes</div>
          <ul class="lumi-alert-list">
            ${changesList.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>`;
    }

    const statKeys = [
      { key: 'hp', label: 'HP' },
      { key: 'atk', label: 'Attack' },
      { key: 'def', label: 'Defense' },
      { key: 'spa', label: 'Sp. Atk' },
      { key: 'spd', label: 'Sp. Def' },
      { key: 'spe', label: 'Speed' }
    ];

    const statsHtml = statKeys.map(s => {
      const currentVal = p.stats[s.key];
      const vanillaVal = p.vanillaStats ? p.vanillaStats[s.key] : currentVal;
      const diff = currentVal - vanillaVal;
      let diffBadge = '<span class="stat-diff"></span>';
      if (diff > 0) diffBadge = `<span class="stat-diff positive">+${diff}</span>`;
      else if (diff < 0) diffBadge = `<span class="stat-diff negative">${diff}</span>`;

      return `
        <div class="stat-item">
          <span class="stat-name">${s.label}</span>
          <span class="stat-num">${currentVal}</span>
          ${diffBadge}
          <div class="stat-meter-track">
            <div class="stat-meter-fill" style="width: ${Math.min(100, (currentVal / 180) * 100)}%; background: ${getStatColor(currentVal)};"></div>
          </div>
        </div>`;
    }).join('');

    const matchups = calculateMatchups(p.types);
    const matchupsHtml = Object.keys(matchups).map(t => {
      const mult = matchups[t];
      let multClass = '';
      let multLabel = `${mult}×`;
      if (mult === 4) multClass = 'mult-4x';
      else if (mult === 2) multClass = 'mult-2x';
      else if (mult === 0.5) { multClass = 'mult-05x'; multLabel = '½×'; }
      else if (mult === 0.25) { multClass = 'mult-025x'; multLabel = '¼×'; }
      else if (mult === 0) { multClass = 'mult-0x'; multLabel = '0×'; }
      else multLabel = '1×';

      return `
        <div class="matchup-card">
          <span class="type-badge type-${t.toLowerCase()} sm">${t}</span>
          <span class="matchup-mult ${multClass}">${multLabel}</span>
        </div>`;
    }).join('');

    // Detailed Abilities from ABILITIES_DB
    const abilitiesHtml = (p.abilities || []).map(a => {
      const aKey = a.toLowerCase().replace(/[^a-z0-9]/g, '');
      const abInfo = (typeof ABILITIES_DB !== 'undefined' && ABILITIES_DB[aKey]) ? ABILITIES_DB[aKey] : null;
      const desc = abInfo ? abInfo.desc : 'Provides unique combat mechanics and passive battle benefits.';
      return `
        <div class="ability-card-box">
          <div class="ability-header-row">
            <span class="ability-name-bold">${a}</span>
            <span class="ability-tag-pill">Ability</span>
          </div>
          <div class="ability-desc-body">${desc}</div>
        </div>`;
    }).join('');

    let hiddenAbilityHtml = '';
    if (p.hiddenAbility && p.hiddenAbility !== 'None') {
      const haKey = p.hiddenAbility.toLowerCase().replace(/[^a-z0-9]/g, '');
      const haInfo = (typeof ABILITIES_DB !== 'undefined' && ABILITIES_DB[haKey]) ? ABILITIES_DB[haKey] : null;
      const haDesc = haInfo ? haInfo.desc : 'Special competitive ability unlocked via ability patch or rare encounters.';
      hiddenAbilityHtml = `
        <div class="ability-card-box ha-card">
          <div class="ability-header-row">
            <span class="ability-name-bold" style="color:var(--accent-gold);">${p.hiddenAbility}</span>
            <span class="ability-tag-pill ha-pill">Hidden Ability (H)</span>
          </div>
          <div class="ability-desc-body">${haDesc}</div>
        </div>`;
    }

    // Detailed Level-up Moves sorted by Level
    const rawMoves = [...(p.levelUpMoves || [])].sort((a, b) => (a.lvl || 0) - (b.lvl || 0));
    const movesHtml = rawMoves.map(m => {
      const mKey = (m.moveId || m.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const moveData = (typeof MOVES_DB !== 'undefined' && MOVES_DB[mKey]) ? MOVES_DB[mKey] : m;

      let catPill = '';
      if (moveData.cat === 'Physical') catPill = '<span class="cat-pill cat-physical">💥 Phys</span>';
      else if (moveData.cat === 'Special') catPill = '<span class="cat-pill cat-special">🌀 Spec</span>';
      else if (moveData.cat === 'Status') catPill = '<span class="cat-pill cat-status">⚪ Stat</span>';

      let extras = [];
      if (moveData.priority && moveData.priority !== 0) extras.push(`${moveData.priority > 0 ? '+' : ''}${moveData.priority} Priority`);
      if (moveData.contact) extras.push('Contact');
      const extraInfo = extras.length > 0 ? ` <strong style="color:var(--accent-cyan); font-size:0.65rem;">[${extras.join(' • ')}]</strong>` : '';

      const moveName = moveData.name || m.name || m.moveId;
      const lvlLabel = m.lvl === 0 ? 'Evo' : (m.lvl === 1 ? '1' : m.lvl);

      return `
        <tr>
          <td class="move-lvl-td">${lvlLabel}</td>
          <td>
            <div style="display:flex; flex-direction:column; gap:2px;">
              <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap;">
                <span class="move-title">${moveName}</span>
                ${catPill}
                ${moveData.isBuffed ? '<span class="badge-tag lumi" style="font-size:0.6rem; padding:1px 4px;">BUFFED</span>' : ''}
              </div>
              <span class="move-desc-sub">${moveData.desc || ''}${extraInfo}</span>
            </div>
          </td>
          <td style="width:50px;">${renderTypeBadges([moveData.type || p.types[0]], 'sm')}</td>
          <td style="font-family:monospace; text-align:right; font-weight:700; width:38px;">${moveData.power || '—'}</td>
          <td style="font-family:monospace; text-align:right; width:38px;">${moveData.acc ? moveData.acc + '%' : '—'}</td>
          <td style="font-family:monospace; text-align:right; color:var(--text-muted); width:35px; font-size:0.75rem;">${moveData.pp ? moveData.pp : '—'}</td>
        </tr>`;
    }).join('');

    const locs = p.locations && p.locations.length > 0 ? p.locations : ["Grand Underground / Roaming Wild"];
    const locsHtml = locs.map(loc => `
      <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:6px; padding:7px 9px; font-size:0.78rem; display:flex; align-items:center; gap:8px;">
        <span style="color:var(--accent-cyan);">📍</span>
        <span>${loc}</span>
      </div>`).join('');

    const inTeam = state.team.includes(p.id);

    detailDrawer.innerHTML = `
      <div class="drawer-header">
        <button class="header-btn ${inTeam ? 'active' : ''}" id="add-to-team-btn">
          ${inTeam ? '✓ In Team' : '+ Add to Team'}
        </button>
        <button class="drawer-close-btn" id="drawer-close-btn" title="Close Panel">✕ Close</button>
      </div>

      <div class="drawer-body">
        <div class="detail-profile">
          <div class="profile-sprite-col">
            <img class="detail-sprite-img" src="${spriteUrl}" alt="${p.name}" onerror="this.onerror=null;this.src='${fallbackUrl}'" />
            <button class="shiny-toggle-btn ${state.isShiny ? 'active' : ''}" id="shiny-toggle">✨ Shiny</button>
          </div>
          <div class="profile-meta-col">
            <span class="profile-num">${p.dexNum}</span>
            <div class="profile-name">
              ${p.name}
              ${p.isHisuian ? '<span class="badge-tag hisui">Hisui</span>' : ''}
              ${p.isModified && !p.isHisuian ? '<span class="badge-tag lumi">Lumi</span>' : ''}
            </div>
            <span class="profile-species">${p.species || 'Pokémon'}</span>
            <div style="display:flex; gap:4px; margin-top:2px;">${renderTypeBadges(p.types, 'sm')}</div>
          </div>
        </div>

        ${lumiAlertHtml}

        <div class="detail-section">
          <div class="section-title">
            <span>Base Stats</span>
            <span style="font-family:monospace; font-size:0.75rem; color:var(--accent-cyan);">BST: ${p.bst}</span>
          </div>
          <div class="stats-table">
            ${statsHtml}
            <div class="bst-row">
              <span style="color:var(--text-muted); font-family:monospace;">TOTAL</span>
              <span style="color:var(--accent-cyan); font-family:monospace; font-size:1.05rem;">${p.bst}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">Abilities & Mechanics</div>
          <div style="display:flex; flex-direction:column; gap:4px;">
            ${abilitiesHtml}
            ${hiddenAbilityHtml}
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; font-size:0.75rem; margin-top:8px; padding-top:8px; border-top:1px solid var(--border-color);">
              <div><strong style="color:var(--text-muted);">Height:</strong> ${p.height || '—'}</div>
              <div><strong style="color:var(--text-muted);">Weight:</strong> ${p.weight || '—'}</div>
              <div><strong style="color:var(--text-muted);">Catch Rate:</strong> ${p.catchRate || '—'}</div>
              <div><strong style="color:var(--text-muted);">Gender:</strong> ${p.genderRatio || '—'}</div>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">Evolution</div>
          <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:8px; padding:0.75rem; font-size:0.82rem; font-weight:700; text-align:center; color:var(--accent-cyan);">
            ${p.evolution || 'No known evolutions'}
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">Defensive Matchups</div>
          <div class="matchups-grid">${matchupsHtml}</div>
        </div>

        <div class="detail-section">
          <div class="drawer-tabs">
            <button class="tab-btn ${state.activeTab === 'level-up' ? 'active' : ''}" data-tab="level-up">Moves (${rawMoves.length})</button>
            <button class="tab-btn ${state.activeTab === 'locations' ? 'active' : ''}" data-tab="locations">Locations (${locs.length})</button>
          </div>

          <div class="tab-content ${state.activeTab === 'level-up' ? 'active' : ''}" id="tab-level-up">
            <table class="moves-table">
              <thead>
                <tr>
                  <th>Lvl</th>
                  <th>Move</th>
                  <th>Type</th>
                  <th style="text-align:right;">Pwr</th>
                  <th style="text-align:right;">Acc</th>
                  <th style="text-align:right;">PP</th>
                </tr>
              </thead>
              <tbody>${movesHtml}</tbody>
            </table>
          </div>

          <div class="tab-content ${state.activeTab === 'locations' ? 'active' : ''}" id="tab-locations">
            <div style="display:flex; flex-direction:column; gap:6px;">${locsHtml}</div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('drawer-close-btn').addEventListener('click', () => {
      detailDrawer.classList.add('collapsed');
    });

    document.getElementById('shiny-toggle').addEventListener('click', () => {
      state.isShiny = !state.isShiny;
      renderDetailDrawer();
    });

    document.getElementById('add-to-team-btn').addEventListener('click', () => {
      toggleTeamMember(p.id);
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeTab = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b === btn));
        document.querySelectorAll('.tab-content').forEach(tc => {
          tc.classList.toggle('active', tc.id === `tab-${state.activeTab}`);
        });
      });
    });
  }

  // ==========================================
  // --- ITEMS SECTION RENDERER ---
  // ==========================================
  function renderItemsSection() {
    const container = document.getElementById('items-content');
    if (!container) return;

    let controls = container.querySelector('.items-controls');
    if (!controls) {
      container.innerHTML = `
        <div class="items-controls" style="display:flex; flex-wrap:wrap; gap:0.5rem; align-items:center; justify-content:space-between; margin-bottom:0.75rem;">
          <input type="text" id="item-search-input" class="search-input" placeholder="Search items or locations..." style="max-width:320px;" />
          <div class="items-category-chips" style="display:flex; gap:0.35rem; flex-wrap:wrap;">
            <button class="chip-btn active" data-cat="all">All Items</button>
            <button class="chip-btn" data-cat="Evolution">Evolution Items</button>
            <button class="chip-btn" data-cat="Key Mod Item">Key / Mod Items</button>
            <button class="chip-btn" data-cat="Battle Item">Battle & Competitive</button>
          </div>
        </div>
        <div id="items-cards-grid" class="items-grid"></div>
      `;

      const input = document.getElementById('item-search-input');
      input.addEventListener('input', (e) => {
        state.itemSearch = e.target.value;
        renderItemsCards();
      });

      container.querySelectorAll('.items-category-chips .chip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          state.itemCategory = btn.getAttribute('data-cat');
          container.querySelectorAll('.items-category-chips .chip-btn').forEach(b => b.classList.toggle('active', b === btn));
          renderItemsCards();
        });
      });
    }

    renderItemsCards();
  }

  function renderItemsCards() {
    const grid = document.getElementById('items-cards-grid');
    if (!grid) return;

    let items = [...ITEMS_DATA];
    if (state.itemCategory !== 'all') {
      items = items.filter(it => it.category === state.itemCategory);
    }
    if (state.itemSearch.trim()) {
      const q = state.itemSearch.toLowerCase().trim();
      items = items.filter(it => it.name.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q) || (it.locations && it.locations.some(l => l.toLowerCase().includes(q))));
    }

    if (items.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem 1rem; color:var(--text-muted);"><h3>No items matching your search</h3></div>`;
      return;
    }

    grid.innerHTML = items.map(it => `
      <div class="item-card">
        <div class="item-card-top">
          <span class="item-icon">${it.icon}</span>
          <div style="display:flex; flex-direction:column; gap:2px;">
            <span class="item-name">${it.name}</span>
            <span class="badge-tag lumi" style="width:fit-content;">${it.category}</span>
          </div>
        </div>
        <p class="item-desc">${it.desc}</p>
        <div class="item-locations-box">
          <span class="item-loc-label">📍 Where to Find in Sinnoh:</span>
          ${it.locations.map(loc => `<span>• ${loc}</span>`).join('')}
        </div>
      </div>`).join('');
  }

  // ==========================================
  // --- BOSSES SECTION RENDERER ---
  // ==========================================
  function renderBossesSection() {
    const container = document.getElementById('bosses-content');
    if (!container) return;

    container.innerHTML = `
      <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:0.75rem; margin-bottom:1rem;">
        <div style="color:var(--text-secondary); font-size:0.85rem; max-width:650px;">
          Detailed competitive rosters, levels, held items, abilities, and coverage movesets for every Gym Leader, Team Galactic Admin, and the Elite Four & Champion Cynthia. Click any Pokémon to view full Pokédex entry.
        </div>
        <div class="boss-category-tabs" style="display:flex; gap:0.4rem; flex-wrap:wrap;">
          <button class="chip-btn ${state.bossCategory === 'all' ? 'active' : ''}" data-boss-cat="all">All Battles (17)</button>
          <button class="chip-btn ${state.bossCategory === 'gym' ? 'active' : ''}" data-boss-cat="gym">Gym Leaders (8)</button>
          <button class="chip-btn ${state.bossCategory === 'galactic' ? 'active' : ''}" data-boss-cat="galactic">Team Galactic (4)</button>
          <button class="chip-btn ${state.bossCategory === 'e4' ? 'active' : ''}" data-boss-cat="e4">Elite Four & Cynthia (5)</button>
        </div>
      </div>
      <div id="boss-cards-container" style="display:flex; flex-direction:column; gap:1.25rem;"></div>
    `;

    container.querySelectorAll('.boss-category-tabs .chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.bossCategory = btn.getAttribute('data-boss-cat');
        container.querySelectorAll('.boss-category-tabs .chip-btn').forEach(b => b.classList.toggle('active', b === btn));
        renderBossCards();
      });
    });

    renderBossCards();
  }

  function renderBossCards() {
    const cardsContainer = document.getElementById('boss-cards-container');
    if (!cardsContainer) return;

    let bosses = [...BOSS_TEAMS_DATA];
    if (state.bossCategory !== 'all') {
      bosses = bosses.filter(b => b.category === state.bossCategory);
    }

    cardsContainer.innerHTML = bosses.map(boss => {
      const icon = BOSS_ICONS[boss.bossId] || '⚔️';
      return `
        <div class="boss-card">
          <div class="boss-card-header">
            <div class="boss-title-wrapper">
              <span class="boss-icon">${icon}</span>
              <div>
                <div class="boss-name">${boss.name} — <span style="color:var(--accent-cyan);">${boss.title}</span></div>
                <div class="boss-subtitle">${boss.badge} • Level Cap: <strong style="color:var(--accent-gold);">Lv. ${boss.levelCap}</strong></div>
              </div>
            </div>
            <span class="badge-tag lumi" style="text-transform:uppercase; font-size:0.7rem; font-weight:700;">
              ${boss.category === 'gym' ? 'Gym Leader' : (boss.category === 'galactic' ? 'Team Galactic' : 'Pokémon League')}
            </span>
          </div>
          <div class="boss-quote">"${boss.quote}"</div>
          <div class="boss-team-grid">
            ${boss.team.map(mon => {
              const spriteUrl = getSpriteUrl(mon.name);
              const fallbackUrl = getFallbackSpriteUrl(mon.name);
              return `
                <div class="boss-mon-card" data-mon-name="${mon.name}">
                  <div class="boss-mon-header">
                    <img class="boss-mon-sprite" src="${spriteUrl}" alt="${mon.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackUrl}'" />
                    <div class="boss-mon-title">
                      <div class="boss-mon-top">
                        <span class="boss-mon-name" title="${mon.name}">${mon.name}</span>
                        <span class="boss-mon-lvl">Lv. ${mon.lvl}</span>
                      </div>
                      <div style="display:flex; gap:3px;">${renderTypeBadges(mon.types, 'sm')}</div>
                    </div>
                  </div>

                  <div class="boss-meta-line">
                    <span class="boss-item-badge" title="Held Item">🎒 ${mon.item}</span>
                    <span class="boss-ability-badge" title="Ability">⚡ ${mon.ability}</span>
                  </div>

                  <div class="boss-moves-list">
                    ${mon.moves.map(m => {
                      const mKey = m.toLowerCase().replace(/[^a-z0-9]/g, '');
                      const mData = typeof MOVES_DB !== 'undefined' && MOVES_DB[mKey] ? MOVES_DB[mKey] : null;
                      const catIcon = mData ? (mData.cat === 'Physical' ? '💥' : (mData.cat === 'Special' ? '🌀' : '⚪')) : '•';
                      const moveType = mData ? mData.type : '';
                      return `<span class="boss-move-item" title="${m} (${mData ? mData.cat + ', ' + moveType : 'Move'})">
                        <span style="font-size:0.65rem;">${catIcon}</span>
                        <span>${m}</span>
                      </span>`;
                    }).join('')}
                  </div>

                  <button class="boss-view-dex-btn" data-target-name="${mon.name}">
                    🔍 View in Pokédex
                  </button>
                </div>`;
            }).join('')}
          </div>
        </div>`;
    }).join('');

    cardsContainer.querySelectorAll('.boss-mon-card').forEach(card => {
      card.addEventListener('click', () => {
        const monName = card.getAttribute('data-mon-name');
        goToPokemonInDex(monName);
      });
    });
  }

  // ==========================================
  // --- ROUTE EXPLORER SECTION RENDERER ---
  // ==========================================
  function renderRoutesSection() {
    const container = document.getElementById('routes-content');
    if (!container) return;

    let controls = container.querySelector('.routes-controls-wrapper');
    if (!controls) {
      container.innerHTML = `
        <div class="routes-controls-wrapper">
          <div class="route-selector-box">
            <label style="font-weight:700; font-size:0.85rem;">Select Location:</label>
            <select id="route-select" class="select-filter" style="font-size:0.85rem; padding:6px 12px;">
              ${ROUTES_DATA.map(r => `<option value="${r.routeId}">${r.name} (${r.region})</option>`).join('')}
            </select>
            <span id="route-type-badge" class="badge-tag lumi">${ROUTES_DATA[0].type}</span>
          </div>
          <div id="route-heading" style="margin-top:0.75rem; font-weight:800; font-size:0.95rem; color:var(--text-main);">
            Wild Pokémon Encounters on ${ROUTES_DATA[0].name}:
          </div>
        </div>
        <div id="route-spawns-container" class="route-spawns-grid"></div>
      `;

      document.getElementById('route-select').addEventListener('change', (e) => {
        state.selectedRouteId = e.target.value;
        renderRouteSpawns();
      });
    }

    renderRouteSpawns();
  }

  function renderRouteSpawns() {
    const currentRoute = ROUTES_DATA.find(r => r.routeId === state.selectedRouteId) || ROUTES_DATA[0];
    const badge = document.getElementById('route-type-badge');
    const heading = document.getElementById('route-heading');
    const spawnsGrid = document.getElementById('route-spawns-container');

    if (badge) badge.textContent = currentRoute.type;
    if (heading) heading.textContent = `Wild Pokémon Encounters on ${currentRoute.name}:`;

    if (spawnsGrid) {
      spawnsGrid.innerHTML = currentRoute.encounters.map(sp => `
        <div class="spawn-card" style="cursor:pointer;" data-spawn-name="${sp.name}">
          <div class="spawn-info">
            <div class="spawn-name">${sp.name}</div>
            <div style="display:flex; gap:3px; margin:2px 0;">${renderTypeBadges(sp.types, 'sm')}</div>
            <div style="display:flex; justify-content:space-between; font-size:0.72rem; color:var(--text-muted); margin-top:2px;">
              <span><strong>Method:</strong> ${sp.method}</span>
              <span><strong>Levels:</strong> ${sp.lvls}</span>
            </div>
          </div>
          <div class="spawn-rate">${sp.rate}</div>
        </div>`).join('');

      spawnsGrid.querySelectorAll('.spawn-card').forEach(card => {
        card.addEventListener('click', () => {
          goToPokemonInDex(card.getAttribute('data-spawn-name'));
        });
      });
    }
  }

  // ==========================================
  // --- LEVEL CAPS SECTION RENDERER ---
  // ==========================================
  function renderLevelCapsSection() {
    const container = document.getElementById('levelcaps-content');
    if (!container) return;

    container.innerHTML = `
      <div style="text-align:center; max-width:650px; margin:0 auto 0.75rem; color:var(--text-secondary); font-size:0.85rem;">
        Keep your team within these limits to maintain maximum challenge and avoid Pokémon disobeying during boss battles.
      </div>
      <div class="cap-timeline">
        ${LEVEL_CAPS_DATA.map(cap => `
          <div class="cap-card">
            <div class="cap-badge-col">
              <div class="cap-num-circle">Lv.${cap.cap}</div>
              <div class="cap-details">
                <div class="cap-name">${cap.name} — <span style="color:var(--accent-cyan);">${cap.leader}</span></div>
                <div class="cap-location">📍 ${cap.city} • Ace: <strong>${cap.ace}</strong></div>
                <div class="cap-notes">${cap.notes}</div>
              </div>
            </div>
            <span class="type-badge type-${cap.type.toLowerCase()} sm">${cap.type}</span>
          </div>`).join('')}
      </div>
    `;
  }

  // ==========================================
  // --- TEAM PLANNER & SYNERGY MATRIX ---
  // ==========================================
  function toggleTeamMember(id) {
    const idx = state.team.indexOf(id);
    if (idx > -1) {
      state.team.splice(idx, 1);
    } else {
      if (state.team.length >= 6) {
        alert('Your team already has the maximum of 6 Pokémon!');
        return;
      }
      state.team.push(id);
    }
    localStorage.setItem('lumi_team', JSON.stringify(state.team));
    renderDetailDrawer();
    updateTeamBtnBadge();
  }

  function updateTeamBtnBadge() {
    if (teamBtn) {
      teamBtn.innerHTML = `★ Team (${state.team.length}/6)`;
    }
    const mobileTeamBadge = document.querySelector('.mobile-nav-item[data-section="team"]');
    if (mobileTeamBadge) {
      mobileTeamBadge.querySelector('span:last-child').textContent = `Team (${state.team.length})`;
    }
  }

  function renderTeamModal() {
    const teamSlotsContainer = document.getElementById('team-slots');
    let teamHtml = '';
    const teamMembers = [];

    for (let i = 0; i < 6; i++) {
      const id = state.team[i];
      if (id) {
        const p = getRoster().find(x => x.id === id);
        if (p) {
          teamMembers.push(p);
          teamHtml += `
            <div class="team-slot filled">
              <button class="team-slot-remove" data-id="${p.id}" title="Remove">✕</button>
              <img src="${getSpriteUrl(p, false)}" alt="${p.name}" style="width:44px; height:44px; object-fit:contain;" />
              <div style="font-weight:700; font-size:0.75rem; text-align:center;">${p.name}</div>
              <div>${renderTypeBadges(p.types, 'sm')}</div>
            </div>`;
          continue;
        }
      }
      teamHtml += `
        <div class="team-slot">
          <span style="color:var(--text-muted); font-size:1.5rem;">+</span>
          <span style="font-size:0.7rem; color:var(--text-muted);">Empty</span>
        </div>`;
    }

    teamSlotsContainer.innerHTML = teamHtml;

    // Calculate Defensive Weakness Synergy
    const synergyContainer = document.getElementById('team-synergy-matrix');
    if (synergyContainer) {
      const weaknesses = {};
      ALL_TYPES.forEach(t => { weaknesses[t] = 0; });

      teamMembers.forEach(mon => {
        const matchups = calculateMatchups(mon.types);
        ALL_TYPES.forEach(t => {
          if (matchups[t] > 1) weaknesses[t] += 1;
        });
      });

      synergyContainer.innerHTML = `
        <div style="font-weight:700; font-size:0.85rem; color:var(--text-main); margin-bottom:4px;">
          Team-Wide Defensive Vulnerabilities:
        </div>
        <div class="synergy-grid">
          ${ALL_TYPES.map(t => {
            const count = weaknesses[t];
            let countStyle = 'color:var(--text-muted);';
            if (count >= 3) countStyle = 'color:#ef4444; font-weight:800;';
            else if (count >= 1) countStyle = 'color:#f97316; font-weight:700;';
            return `
              <div class="synergy-cell">
                <span class="type-badge type-${t.toLowerCase()} sm">${t}</span>
                <span style="${countStyle}">${count} weak</span>
              </div>`;
          }).join('')}
        </div>
      `;
    }

    document.querySelectorAll('.team-slot-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleTeamMember(parseInt(btn.getAttribute('data-id'), 10));
        renderTeamModal();
      });
    });
  }

  // Setup Event Listeners
  function initEvents() {
    // Navigation (Desktop Top Nav & Mobile Bottom Nav)
    document.querySelectorAll('.nav-tab-btn, .mobile-nav-item').forEach(el => {
      el.addEventListener('click', () => {
        const sec = el.getAttribute('data-section');
        if (sec === 'team') {
          renderTeamModal();
          teamModal.classList.add('open');
        } else {
          switchSection(sec);
        }
      });
    });

    let searchTimeout = null;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      state.searchQuery = e.target.value;
      clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
      searchTimeout = setTimeout(() => {
        applyFilters();
      }, 120);
    });

    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.addEventListener('scroll', () => {
        if (state.currentSection === 'pokedex' && state.renderLimit < state.filteredPokemon.length) {
          if (mainContent.scrollTop + mainContent.clientHeight >= mainContent.scrollHeight - 400) {
            state.renderLimit += 40;
            renderList();
          }
        }
      });
    }

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      state.searchQuery = '';
      clearSearchBtn.style.display = 'none';
      applyFilters();
      searchInput.focus();
    });

    type1Filter.addEventListener('change', (e) => { state.type1 = e.target.value; applyFilters(); });
    type2Filter.addEventListener('change', (e) => { state.type2 = e.target.value; applyFilters(); });
    genFilter.addEventListener('change', (e) => { state.gen = e.target.value; applyFilters(); });
    sortSelect.addEventListener('change', (e) => { state.sortBy = e.target.value; applyFilters(); });

    if (filterLocation) {
      filterLocation.addEventListener('change', (e) => {
        state.locationFilter = e.target.value;
        applyFilters();
      });
    }

    chipLumi.addEventListener('click', () => {
      state.onlyLumi = !state.onlyLumi;
      chipLumi.classList.toggle('active', state.onlyLumi);
      applyFilters();
    });

    chipHisui.addEventListener('click', () => {
      state.onlyHisui = !state.onlyHisui;
      chipHisui.classList.toggle('active-gold', state.onlyHisui);
      applyFilters();
    });

    viewToggleBtn.addEventListener('click', () => {
      state.viewMode = state.viewMode === 'table' ? 'grid' : 'table';
      viewToggleBtn.innerHTML = state.viewMode === 'table' ? '⊞ Grid View' : '☰ Table View';
      renderList();
    });

    randomBtn.addEventListener('click', () => {
      const roster = getRoster();
      if (roster.length > 0) {
        const randIdx = Math.floor(Math.random() * roster.length);
        selectPokemon(roster[randIdx].id);
      }
    });

    teamBtn.addEventListener('click', () => {
      renderTeamModal();
      teamModal.classList.add('open');
    });

    closeTeamModal.addEventListener('click', () => { teamModal.classList.remove('open'); });
    teamModal.addEventListener('click', (e) => {
      if (e.target === teamModal) teamModal.classList.remove('open');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
      if (e.key === 'Escape') {
        teamModal.classList.remove('open');
        if (!detailDrawer.classList.contains('collapsed')) {
          detailDrawer.classList.add('collapsed');
        }
      }
    });

    // Column header sort clicks
    document.querySelectorAll('.dex-table th[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        const sortKey = th.getAttribute('data-sort');
        if (state.sortBy === sortKey) {
          state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
          state.sortBy = sortKey;
          state.sortOrder = (sortKey === 'dex' || sortKey === 'name') ? 'asc' : 'desc';
        }
        sortSelect.value = sortKey;
        applyFilters();
      });
    });
  }

  function populateFilters() {
    ALL_TYPES.forEach(t => {
      const opt1 = document.createElement('option');
      opt1.value = t;
      opt1.textContent = t;
      type1Filter.appendChild(opt1);

      const opt2 = document.createElement('option');
      opt2.value = t;
      opt2.textContent = t;
      type2Filter.appendChild(opt2);
    });
  }

  function init() {
    if (!state.pokemon || state.pokemon.length === 0) {
      const roster = getRoster();
      state.pokemon = [...roster];
      state.filteredPokemon = [...roster];
      state.selectedPokemon = roster[0] || null;
    }
    if (state.viewMode === 'grid') {
      viewToggleBtn.innerHTML = '☰ Table View';
    } else {
      viewToggleBtn.innerHTML = '⊞ Grid View';
    }
    populateFilters();
    initEvents();
    updateTeamBtnBadge();
    applyFilters();
    // Select first Pokémon; only auto-open drawer if on desktop (> 900px)
    if (state.pokemon && state.pokemon.length > 0) {
      selectPokemon(state.pokemon[0].id, window.innerWidth > 900);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
