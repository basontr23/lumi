/**
 * Luminescent Platinum Companion & Pokédex Application Controller
 * Inspired by Radical Red Pokédex (ydarissep / sangvo1991)
 * Fully mobile-responsive and desktop dual-pane optimized.
 */

(function () {
  'use strict';

  // State
  const state = {
    currentSection: 'pokedex', // 'pokedex', 'items', 'routes', 'bosses', 'levelcaps'
    pokemon: [...POKEMON_DATA],
    filteredPokemon: [...POKEMON_DATA],
    selectedPokemon: POKEMON_DATA[0],
    viewMode: window.innerWidth <= 768 ? 'grid' : 'table', // default to grid on mobile
    searchQuery: '',
    type1: 'all',
    type2: 'all',
    gen: 'all',
    onlyLumi: false,
    onlyHisui: false,
    sortBy: 'dex',
    sortOrder: 'asc',
    isShiny: false,
    activeTab: 'level-up',
    team: JSON.parse(localStorage.getItem('lumi_team') || '[]'),
    
    // Items state
    itemCategory: 'all',
    itemSearch: '',

    // Routes state
    selectedRouteId: ROUTES_DATA[0].routeId
  };

  // DOM Elements
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const type1Filter = document.getElementById('filter-type1');
  const type2Filter = document.getElementById('filter-type2');
  const genFilter = document.getElementById('filter-gen');
  const sortSelect = document.getElementById('sort-select');
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
  function getSpriteUrl(pokemon, shiny = false) {
    if (!pokemon) return '';
    const rawName = pokemon.name.toLowerCase()
      .replace(' (hisui)', '-hisui')
      .replace(' (wash)', '-wash')
      .replace(/[^a-z0-9\-]/g, '');

    if (shiny) {
      return `https://play.pokemonshowdown.com/sprites/ani-shiny/${rawName}.gif`;
    }
    return `https://play.pokemonshowdown.com/sprites/ani/${rawName}.gif`;
  }

  function getFallbackSpriteUrl(pokemon) {
    if (!pokemon) return '';
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id <= 493 ? pokemon.id : 387}.png`;
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
    let result = [...POKEMON_DATA];

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

    tableBody.innerHTML = state.filteredPokemon.map(p => {
      const isSelected = state.selectedPokemon && state.selectedPokemon.id === p.id;
      const bstBadge = p.bstDiff !== 0
        ? `<span>${p.bst} <small style="color:${p.bstDiff > 0 ? '#4ade80' : '#f87171'}">(${p.bstDiff > 0 ? '+' : ''}${p.bstDiff})</small></span>`
        : `<span>${p.bst}</span>`;

      return `
        <tr class="dex-row ${isSelected ? 'selected' : ''}" data-id="${p.id}">
          <td class="dex-num-cell">${p.dexNum}</td>
          <td class="dex-sprite-cell">
            <img class="dex-sprite-img" src="${getSpriteUrl(p, false)}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='${getFallbackSpriteUrl(p)}'" />
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

    document.querySelectorAll('.dex-row').forEach(row => {
      row.addEventListener('click', () => {
        selectPokemon(parseInt(row.getAttribute('data-id'), 10));
      });
    });
  }

  function renderGridView() {
    tableContainer.style.display = 'none';
    gridContainer.style.display = 'grid';

    if (state.filteredPokemon.length === 0) {
      gridContainer.innerHTML = `<div class="no-results" style="grid-column:1/-1; text-align:center; padding:3rem 1rem;"><h3>No Pokémon found</h3></div>`;
      return;
    }

    gridContainer.innerHTML = state.filteredPokemon.map(p => {
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
            <img class="card-sprite" src="${getSpriteUrl(p, false)}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='${getFallbackSpriteUrl(p)}'" />
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

    document.querySelectorAll('.pkmn-card').forEach(card => {
      card.addEventListener('click', () => {
        selectPokemon(parseInt(card.getAttribute('data-id'), 10));
      });
    });
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
    const p = POKEMON_DATA.find(item => item.id === id);
    if (!p) return;
    state.selectedPokemon = p;

    document.querySelectorAll('.dex-row, .pkmn-card').forEach(el => {
      el.classList.toggle('selected', parseInt(el.getAttribute('data-id'), 10) === id);
    });

    renderDetailDrawer();

    // AUTO-RESET SCROLL TO TOP IMMEDIATELY (Solves the exhausting scroll issue!)
    detailDrawer.scrollTop = 0;

    if (openDrawer) {
      detailDrawer.classList.remove('collapsed');
    } else {
      if (window.innerWidth <= 900) {
        detailDrawer.classList.add('collapsed');
      } else {
        detailDrawer.classList.remove('collapsed');
      }
    }
  }

  // Render Detail Inspector
  function renderDetailDrawer() {
    const p = state.selectedPokemon;
    if (!p) return;

    const spriteUrl = getSpriteUrl(p, state.isShiny);
    const fallbackUrl = getFallbackSpriteUrl(p);

    let lumiAlertHtml = '';
    if (p.isModified || p.lumiChanges) {
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

    const moves = p.levelUpMoves || [
      { lvl: 1, name: "Tackle / Strike", type: p.types[0], cat: "Physical", power: 40, acc: 100 },
      { lvl: 15, name: "STAB Special Move", type: p.types[0], cat: "Special", power: 65, acc: 100 },
      { lvl: 32, name: "Signature Move", type: p.types[0], cat: "Special", power: 90, acc: 100 },
      { lvl: 50, name: "Ultimate Attack", type: p.types[1] || p.types[0], cat: "Physical", power: 120, acc: 90 }
    ];

    const movesHtml = moves.map(m => `
      <tr>
        <td style="font-family:monospace; font-weight:700; width:30px; color:var(--text-muted);">${m.lvl}</td>
        <td>
          <div style="display:flex; flex-direction:column;">
            <span class="move-title">${m.name} ${m.isBuffed ? '<small style="color:#4ade80;">(Buffed)</small>' : ''}</span>
            <span class="move-desc">${m.desc || ''}</span>
          </div>
        </td>
        <td style="width:50px;">${renderTypeBadges([m.type], 'sm')}</td>
        <td style="font-family:monospace; text-align:right; width:35px;">${m.power || '-'}</td>
        <td style="font-family:monospace; text-align:right; width:35px;">${m.acc ? m.acc + '%' : '-'}</td>
      </tr>`).join('');

    const locs = p.locations || ["Grand Underground / Roaming Wild"];
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
          <div class="section-title">Abilities & Info</div>
          <div class="stats-table">
            <div style="font-size:0.8rem;">
              <strong style="color:var(--text-secondary);">Abilities:</strong> 
              <span style="font-weight:700; color:var(--text-main);">${p.abilities.join(', ')}</span>
            </div>
            ${p.hiddenAbility && p.hiddenAbility !== 'None' ? `
              <div style="font-size:0.8rem;">
                <strong style="color:var(--text-secondary);">Hidden Ability:</strong> 
                <span style="font-weight:700; color:var(--accent-cyan);">${p.hiddenAbility}</span>
              </div>
            ` : ''}
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px; font-size:0.75rem; padding-top:4px; border-top:1px solid var(--border-color);">
              <div><strong style="color:var(--text-muted);">Height:</strong> ${p.height}</div>
              <div><strong style="color:var(--text-muted);">Weight:</strong> ${p.weight}</div>
              <div><strong style="color:var(--text-muted);">Catch Rate:</strong> ${p.catchRate}</div>
              <div><strong style="color:var(--text-muted);">Gender:</strong> ${p.genderRatio}</div>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">Evolution</div>
          <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:8px; padding:0.75rem; font-size:0.82rem; font-weight:700; text-align:center;">
            ${p.evolution || 'No known evolutions'}
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">Defensive Matchups</div>
          <div class="matchups-grid">${matchupsHtml}</div>
        </div>

        <div class="detail-section">
          <div class="drawer-tabs">
            <button class="tab-btn ${state.activeTab === 'level-up' ? 'active' : ''}" data-tab="level-up">Moves</button>
            <button class="tab-btn ${state.activeTab === 'locations' ? 'active' : ''}" data-tab="locations">Locations</button>
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
      <div style="margin-bottom:0.75rem; color:var(--text-secondary); font-size:0.85rem;">
        Detailed competitive rosters, levels, held items, abilities, and coverage movesets for every Gym Leader, Team Galactic Admin, and the Elite Four & Champion Cynthia.
      </div>
      ${BOSS_TEAMS_DATA.map(boss => `
        <div class="boss-card">
          <div class="boss-card-header">
            <div class="boss-title-wrapper">
              <span class="boss-icon">${boss.icon}</span>
              <div>
                <div class="boss-name">${boss.name} — <span style="color:var(--accent-cyan);">${boss.title}</span></div>
                <div class="boss-subtitle">${boss.badge} • Level Cap: <strong style="color:var(--accent-gold);">Lv. ${boss.levelCap}</strong></div>
              </div>
            </div>
          </div>
          <div class="boss-quote">"${boss.quote}"</div>
          <div class="boss-team-grid">
            ${boss.team.map(mon => `
              <div class="boss-mon-card">
                <div class="boss-mon-top">
                  <span class="boss-mon-name">${mon.name}</span>
                  <span class="boss-mon-lvl">Lv. ${mon.lvl}</span>
                </div>
                <div style="display:flex; gap:3px;">${renderTypeBadges(mon.types, 'sm')}</div>
                <div class="boss-meta-line">
                  <span><strong>Item:</strong> ${mon.item}</span>
                  <span><strong>Ability:</strong> ${mon.ability}</span>
                </div>
                <div class="boss-moves-list">
                  ${mon.moves.map(m => `<span class="boss-move-item" title="${m}">${m}</span>`).join('')}
                </div>
              </div>`).join('')}
          </div>
        </div>`).join('')}
    `;
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
        <div class="spawn-card">
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
    teamBtn.innerHTML = `★ Team (${state.team.length}/6)`;
    const mobileTeamBadge = document.querySelector('.mobile-nav-item[data-section="team"]');
    if (mobileTeamBadge) mobileTeamBadge.querySelector('span:last-child').textContent = `Team (${state.team.length})`;
  }

  function renderTeamModal() {
    const teamSlotsContainer = document.getElementById('team-slots');
    let teamHtml = '';
    const teamMembers = [];

    for (let i = 0; i < 6; i++) {
      const id = state.team[i];
      if (id) {
        const p = POKEMON_DATA.find(x => x.id === id);
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

    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
      applyFilters();
    });

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
      const randIdx = Math.floor(Math.random() * POKEMON_DATA.length);
      selectPokemon(POKEMON_DATA[randIdx].id);
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
    selectPokemon(POKEMON_DATA[0].id, window.innerWidth > 900);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
