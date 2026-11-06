/**
 * Luminescent Platinum Pokédex Application Controller
 * Inspired by Radical Red Pokédex (ydarissep / sangvo1991)
 */

(function () {
  'use strict';

  // State
  const state = {
    pokemon: [...POKEMON_DATA],
    filteredPokemon: [...POKEMON_DATA],
    selectedPokemon: POKEMON_DATA[0],
    viewMode: 'table', // 'table' or 'grid'
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
    team: JSON.parse(localStorage.getItem('lumi_team') || '[]')
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
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const randomBtn = document.getElementById('random-btn');
  const teamBtn = document.getElementById('team-btn');
  const teamModal = document.getElementById('team-modal');
  const closeTeamModal = document.getElementById('close-team-modal');

  // Sprite URL helper
  function getSpriteUrl(pokemon, shiny = false) {
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
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id <= 493 ? pokemon.id : 387}.png`;
  }

  // Stat color helper
  function getStatColor(val) {
    if (val < 60) return '#ef4444'; // Red
    if (val < 80) return '#f97316'; // Orange
    if (val < 100) return '#eab308'; // Yellow
    if (val < 120) return '#22c55e'; // Green
    if (val < 140) return '#06b6d4'; // Cyan
    return '#a855f7'; // Purple / Elite
  }

  // Type badge HTML generator
  function renderTypeBadges(types, size = '') {
    return types.map(t => `<span class="type-badge type-${t.toLowerCase()} ${size}">${t}</span>`).join(' ');
  }

  // Filter & Sort Logic
  function applyFilters() {
    let result = [...POKEMON_DATA];

    // Search query
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase().trim();
      result = result.filter(p => {
        const matchName = p.name.toLowerCase().includes(q);
        const matchDex = p.dexNum.toLowerCase().includes(q);
        const matchType = p.types.some(t => t.toLowerCase().includes(q));
        const matchAbility = (p.abilities.concat(p.hiddenAbility || [])).some(a => a.toLowerCase().includes(q));
        const matchMove = p.levelUpMoves && p.levelUpMoves.some(m => m.name.toLowerCase().includes(q));
        const matchLoc = p.locations && p.locations.some(loc => loc.toLowerCase().includes(q));
        return matchName || matchDex || matchType || matchAbility || matchMove || matchLoc;
      });
    }

    // Type 1
    if (state.type1 !== 'all') {
      result = result.filter(p => p.types[0] === state.type1 || p.types[1] === state.type1);
    }

    // Type 2
    if (state.type2 !== 'all') {
      result = result.filter(p => p.types[1] === state.type2 || (p.types.length === 1 && state.type2 === 'None'));
    }

    // Generation
    if (state.gen !== 'all') {
      if (state.gen === 'Hisui') {
        result = result.filter(p => p.isHisuian || p.generation === 'Hisui');
      } else {
        result = result.filter(p => p.generation === parseInt(state.gen, 10));
      }
    }

    // Lumi Changes Only
    if (state.onlyLumi) {
      result = result.filter(p => p.isModified);
    }

    // Hisui Only
    if (state.onlyHisui) {
      result = result.filter(p => p.isHisuian);
    }

    // Sorting
    result.sort((a, b) => {
      let valA, valB;
      switch (state.sortBy) {
        case 'name':
          valA = a.name;
          valB = b.name;
          return state.sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        case 'bst':
          valA = a.bst;
          valB = b.bst;
          break;
        case 'hp':
          valA = a.stats.hp;
          valB = b.stats.hp;
          break;
        case 'atk':
          valA = a.stats.atk;
          valB = b.stats.atk;
          break;
        case 'def':
          valA = a.stats.def;
          valB = b.stats.def;
          break;
        case 'spa':
          valA = a.stats.spa;
          valB = b.stats.spa;
          break;
        case 'spd':
          valA = a.stats.spd;
          valB = b.stats.spd;
          break;
        case 'spe':
          valA = a.stats.spe;
          valB = b.stats.spe;
          break;
        case 'dex':
        default:
          valA = a.id;
          valB = b.id;
          break;
      }
      return state.sortOrder === 'asc' ? valA - valB : valB - valA;
    });

    state.filteredPokemon = result;
    resultsCount.textContent = `${result.length} Pokémon found`;

    renderList();
  }

  // Render Table View (YdaDex / Radical Red layout)
  function renderTableView() {
    tableContainer.style.display = 'block';
    gridContainer.style.display = 'none';

    if (state.filteredPokemon.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="12" class="no-results">
            <div class="no-results-icon">🔍</div>
            <h3>No Pokémon matching your search criteria</h3>
            <p style="margin-top: 4px; font-size: 0.85rem;">Try resetting your filters or clearing the search bar.</p>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = state.filteredPokemon.map(p => {
      const isSelected = state.selectedPokemon && state.selectedPokemon.id === p.id;
      const spriteUrl = getSpriteUrl(p, false);
      const fallbackUrl = getFallbackSpriteUrl(p);

      const bstBadge = p.bstDiff !== 0
        ? `<span title="Lumi Change: ${p.bstDiff > 0 ? '+' : ''}${p.bstDiff} BST">${p.bst} <small style="color:${p.bstDiff > 0 ? '#4ade80' : '#f87171'}">(${p.bstDiff > 0 ? '+' : ''}${p.bstDiff})</small></span>`
        : `<span>${p.bst}</span>`;

      return `
        <tr class="dex-row ${isSelected ? 'selected' : ''}" data-id="${p.id}">
          <td class="dex-num-cell">${p.dexNum}</td>
          <td class="dex-sprite-cell">
            <img class="dex-sprite-img" src="${spriteUrl}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackUrl}'" />
          </td>
          <td class="dex-name-cell">
            <div class="dex-name-wrapper">
              <span>${p.name}</span>
              ${p.isHisuian ? '<span class="badge-tag hisui">Hisui</span>' : ''}
              ${p.isModified && !p.isHisuian ? '<span class="badge-tag lumi">Lumi</span>' : ''}
            </div>
          </td>
          <td>
            <div class="dex-types-cell">
              ${renderTypeBadges(p.types, 'sm')}
            </div>
          </td>
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
        </tr>
      `;
    }).join('');

    // Attach click events to rows
    document.querySelectorAll('.dex-row').forEach(row => {
      row.addEventListener('click', () => {
        const id = parseInt(row.getAttribute('data-id'), 10);
        selectPokemon(id);
      });
    });
  }

  // Render Grid View
  function renderGridView() {
    tableContainer.style.display = 'none';
    gridContainer.style.display = 'grid';

    if (state.filteredPokemon.length === 0) {
      gridContainer.innerHTML = `
        <div class="no-results" style="grid-column: 1 / -1;">
          <div class="no-results-icon">🔍</div>
          <h3>No Pokémon matching your search criteria</h3>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = state.filteredPokemon.map(p => {
      const isSelected = state.selectedPokemon && state.selectedPokemon.id === p.id;
      const spriteUrl = getSpriteUrl(p, false);
      const fallbackUrl = getFallbackSpriteUrl(p);

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
            <img class="card-sprite" src="${spriteUrl}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackUrl}'" />
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
        </div>
      `;
    }).join('');

    document.querySelectorAll('.pkmn-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.getAttribute('data-id'), 10);
        selectPokemon(id);
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

  // Select Pokemon & Render Details
  function selectPokemon(id) {
    const p = POKEMON_DATA.find(item => item.id === id);
    if (!p) return;
    state.selectedPokemon = p;

    // Highlight row / card
    document.querySelectorAll('.dex-row, .pkmn-card').forEach(el => {
      el.classList.toggle('selected', parseInt(el.getAttribute('data-id'), 10) === id);
    });

    renderDetailDrawer();
    detailDrawer.classList.remove('collapsed');
  }

  // Render Detail Drawer Inspector
  function renderDetailDrawer() {
    const p = state.selectedPokemon;
    if (!p) return;

    const spriteUrl = getSpriteUrl(p, state.isShiny);
    const fallbackUrl = getFallbackSpriteUrl(p);

    // Luminescent Alert Box
    let lumiAlertHtml = '';
    if (p.isModified || p.lumiChanges) {
      const changesList = p.lumiChanges || [];
      lumiAlertHtml = `
        <div class="lumi-alert-box">
          <div class="lumi-alert-title">
            <span>✨ Luminescent Platinum Balance Changes</span>
          </div>
          <ul class="lumi-alert-list">
            ${changesList.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // Base Stats table
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
      if (diff > 0) {
        diffBadge = `<span class="stat-diff positive">+${diff}</span>`;
      } else if (diff < 0) {
        diffBadge = `<span class="stat-diff negative">${diff}</span>`;
      }

      const percent = Math.min(100, (currentVal / 180) * 100);
      const color = getStatColor(currentVal);

      return `
        <div class="stat-item">
          <span class="stat-name">${s.label}</span>
          <span class="stat-num">${currentVal}</span>
          ${diffBadge}
          <div class="stat-meter-track">
            <div class="stat-meter-fill" style="width: ${percent}%; background: ${color};"></div>
          </div>
        </div>
      `;
    }).join('');

    // Type Matchups
    const matchups = calculateMatchups(p.types);
    const matchupKeys = Object.keys(matchups);
    const matchupsHtml = matchupKeys.map(t => {
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
        </div>
      `;
    }).join('');

    // Learnsets
    const moves = p.levelUpMoves || [];
    const movesHtml = moves.map(m => `
      <tr>
        <td style="font-family:monospace; font-weight:700; width:35px; color:var(--text-muted);">${m.lvl}</td>
        <td>
          <div class="move-name-wrapper">
            <span class="move-title">${m.name} ${m.isBuffed ? '<small style="color:#4ade80;">(Buffed)</small>' : ''}</span>
            <span class="move-desc">${m.desc || ''}</span>
          </div>
        </td>
        <td style="width:55px;">${renderTypeBadges([m.type], 'sm')}</td>
        <td style="width:65px;"><span class="cat-badge cat-${m.cat.toLowerCase()}">${m.cat}</span></td>
        <td style="font-family:monospace; text-align:right; width:38px;">${m.power || '-'}</td>
        <td style="font-family:monospace; text-align:right; width:38px;">${m.acc ? m.acc + '%' : '-'}</td>
      </tr>
    `).join('');

    // TM Moves
    const tmMoves = p.tmMoves || [];
    const tmMovesHtml = tmMoves.map(tm => {
      if (typeof tm === 'string') {
        return `<tr><td colspan="4" style="color:var(--text-main); font-weight:600;">${tm}</td></tr>`;
      }
      return `
        <tr>
          <td style="font-family:monospace; font-weight:700; color:var(--accent-cyan); width:50px;">${tm.tm}</td>
          <td><span class="move-title">${tm.name}</span></td>
          <td style="width:55px;">${renderTypeBadges([tm.type], 'sm')}</td>
          <td style="font-family:monospace; text-align:right; width:38px;">${tm.power || '-'}</td>
        </tr>
      `;
    }).join('');

    // Encounter Locations
    const locs = p.locations || ["Available in Grand Underground / Trade"];
    const locsHtml = locs.map(loc => `
      <div class="location-item">
        <span class="loc-icon">📍</span>
        <div class="loc-text">
          <div class="loc-area">${loc}</div>
        </div>
      </div>
    `).join('');

    // Check if in team
    const inTeam = state.team.includes(p.id);

    detailDrawer.innerHTML = `
      <div class="drawer-header">
        <div style="display:flex; align-items:center; gap:8px;">
          <button class="header-btn ${inTeam ? 'active' : ''}" id="add-to-team-btn">
            ${inTeam ? '✓ In Team' : '+ Add to Team'}
          </button>
        </div>
        <button class="drawer-close-btn" id="drawer-close-btn" title="Close Panel">✕</button>
      </div>

      <div class="drawer-body">
        <!-- Profile Header -->
        <div class="detail-profile">
          <div class="profile-sprite-col">
            <img class="detail-sprite-img" id="detail-sprite" src="${spriteUrl}" alt="${p.name}" onerror="this.onerror=null;this.src='${fallbackUrl}'" />
            <button class="shiny-toggle-btn ${state.isShiny ? 'active' : ''}" id="shiny-toggle">
              ✨ Shiny
            </button>
          </div>
          <div class="profile-meta-col">
            <span class="profile-num">${p.dexNum}</span>
            <div class="profile-name">
              ${p.name}
              ${p.isHisuian ? '<span class="badge-tag hisui">Hisui</span>' : ''}
              ${p.isModified && !p.isHisuian ? '<span class="badge-tag lumi">Lumi</span>' : ''}
            </div>
            <span class="profile-species">${p.species}</span>
            <div class="profile-types">${renderTypeBadges(p.types, 'lg')}</div>
          </div>
        </div>

        ${lumiAlertHtml}

        <!-- Base Stats -->
        <div class="detail-section">
          <div class="section-title">
            <span>Base Stats</span>
            <span style="font-family:monospace; font-size:0.75rem; color:var(--accent-cyan);">
              BST: ${p.bst} ${p.bstDiff !== 0 ? `(${p.bstDiff > 0 ? '+' : ''}${p.bstDiff})` : ''}
            </span>
          </div>
          <div class="stats-table">
            ${statsHtml}
            <div class="bst-row">
              <span style="color:var(--text-muted); font-family:monospace;">TOTAL</span>
              <span style="color:var(--accent-cyan); font-family:monospace; font-size:1.05rem;">${p.bst}</span>
            </div>
          </div>
        </div>

        <!-- Abilities & Info -->
        <div class="detail-section">
          <div class="section-title">Abilities & Info</div>
          <div class="stats-table" style="gap:10px;">
            <div style="font-size:0.82rem; display:flex; flex-direction:column; gap:4px;">
              <strong style="color:var(--text-secondary);">Primary Abilities:</strong>
              <div style="color:var(--text-main); font-weight:600;">${p.abilities.join(', ')}</div>
            </div>
            ${p.hiddenAbility && p.hiddenAbility !== 'None' ? `
              <div style="font-size:0.82rem; display:flex; flex-direction:column; gap:4px;">
                <strong style="color:var(--text-secondary);">Hidden Ability:</strong>
                <div style="color:var(--accent-cyan); font-weight:600;">${p.hiddenAbility}</div>
              </div>
            ` : ''}
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; font-size:0.78rem; padding-top:4px; border-top:1px solid var(--border-color);">
              <div><strong style="color:var(--text-muted);">Height:</strong> ${p.height}</div>
              <div><strong style="color:var(--text-muted);">Weight:</strong> ${p.weight}</div>
              <div><strong style="color:var(--text-muted);">Catch Rate:</strong> ${p.catchRate}</div>
              <div><strong style="color:var(--text-muted);">Gender:</strong> ${p.genderRatio}</div>
            </div>
          </div>
        </div>

        <!-- Evolution -->
        <div class="detail-section">
          <div class="section-title">Evolution</div>
          <div class="evo-chain">
            <div style="font-size:0.82rem; color:var(--text-main); font-weight:600; text-align:center;">
              ${p.evolution}
            </div>
          </div>
        </div>

        <!-- Type Defenses -->
        <div class="detail-section">
          <div class="section-title">Defensive Matchups</div>
          <div class="matchups-grid">
            ${matchupsHtml}
          </div>
        </div>

        <!-- Tabs: Learnset & Locations -->
        <div class="detail-section">
          <div class="drawer-tabs">
            <button class="tab-btn ${state.activeTab === 'level-up' ? 'active' : ''}" data-tab="level-up">Level Up</button>
            <button class="tab-btn ${state.activeTab === 'tm' ? 'active' : ''}" data-tab="tm">TMs</button>
            <button class="tab-btn ${state.activeTab === 'locations' ? 'active' : ''}" data-tab="locations">Locations</button>
          </div>

          <div class="tab-content ${state.activeTab === 'level-up' ? 'active' : ''}" id="tab-level-up">
            <table class="moves-table">
              <thead>
                <tr>
                  <th>Lvl</th>
                  <th>Move</th>
                  <th>Type</th>
                  <th>Cat</th>
                  <th style="text-align:right;">Pwr</th>
                  <th style="text-align:right;">Acc</th>
                </tr>
              </thead>
              <tbody>
                ${movesHtml}
              </tbody>
            </table>
          </div>

          <div class="tab-content ${state.activeTab === 'tm' ? 'active' : ''}" id="tab-tm">
            <table class="moves-table">
              <thead>
                <tr>
                  <th>TM</th>
                  <th>Move</th>
                  <th>Type</th>
                  <th style="text-align:right;">Pwr</th>
                </tr>
              </thead>
              <tbody>
                ${tmMovesHtml}
              </tbody>
            </table>
          </div>

          <div class="tab-content ${state.activeTab === 'locations' ? 'active' : ''}" id="tab-locations">
            <div class="locations-list">
              ${locsHtml}
            </div>
          </div>
        </div>
      </div>
    `;

    // Event listeners inside drawer
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

  // Team Management
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
  }

  function renderTeamModal() {
    const teamSlotsContainer = document.getElementById('team-slots');
    let teamHtml = '';

    for (let i = 0; i < 6; i++) {
      const id = state.team[i];
      if (id) {
        const p = POKEMON_DATA.find(x => x.id === id);
        if (p) {
          teamHtml += `
            <div class="team-slot filled">
              <button class="team-slot-remove" data-id="${p.id}" title="Remove">✕</button>
              <img src="${getSpriteUrl(p, false)}" alt="${p.name}" style="width:48px; height:48px; object-fit:contain;" />
              <div style="font-weight:700; font-size:0.75rem; text-align:center;">${p.name}</div>
              <div>${renderTypeBadges(p.types, 'sm')}</div>
            </div>
          `;
          continue;
        }
      }
      teamHtml += `
        <div class="team-slot">
          <span style="color:var(--text-muted); font-size:1.5rem;">+</span>
          <span style="font-size:0.7rem; color:var(--text-muted);">Empty Slot</span>
        </div>
      `;
    }

    teamSlotsContainer.innerHTML = teamHtml;

    // Attach remove handlers
    document.querySelectorAll('.team-slot-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'), 10);
        toggleTeamMember(id);
        renderTeamModal();
      });
    });
  }

  // Event Listeners Setup
  function initEvents() {
    // Search input
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

    // Filters
    type1Filter.addEventListener('change', (e) => {
      state.type1 = e.target.value;
      applyFilters();
    });

    type2Filter.addEventListener('change', (e) => {
      state.type2 = e.target.value;
      applyFilters();
    });

    genFilter.addEventListener('change', (e) => {
      state.gen = e.target.value;
      applyFilters();
    });

    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      applyFilters();
    });

    // Chips
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

    // View toggle
    viewToggleBtn.addEventListener('click', () => {
      state.viewMode = state.viewMode === 'table' ? 'grid' : 'table';
      viewToggleBtn.innerHTML = state.viewMode === 'table' ? '⊞ Grid View' : '☰ Table View';
      renderList();
    });

    // Random Pokémon
    randomBtn.addEventListener('click', () => {
      const randIdx = Math.floor(Math.random() * POKEMON_DATA.length);
      const randPkmn = POKEMON_DATA[randIdx];
      selectPokemon(randPkmn.id);
    });

    // Team modal toggle
    teamBtn.addEventListener('click', () => {
      renderTeamModal();
      teamModal.classList.add('open');
    });

    closeTeamModal.addEventListener('click', () => {
      teamModal.classList.remove('open');
    });

    teamModal.addEventListener('click', (e) => {
      if (e.target === teamModal) teamModal.classList.remove('open');
    });

    // Keyboard navigation
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

    // Header sort clicks
    document.querySelectorAll('.dex-table th[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        const sortKey = th.getAttribute('data-sort');
        if (state.sortBy === sortKey) {
          state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
          state.sortBy = sortKey;
          state.sortOrder = sortKey === 'dex' || sortKey === 'name' ? 'asc' : 'desc';
        }
        sortSelect.value = sortKey;
        applyFilters();
      });
    });
  }

  // Populate filter dropdowns
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

  // Init
  function init() {
    populateFilters();
    initEvents();
    updateTeamBtnBadge();
    applyFilters();
    selectPokemon(POKEMON_DATA[0].id);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
