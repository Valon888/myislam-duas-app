/**
 * Islamic Duas App
 * Complete Supplication Guide with Advanced Filtering
 */

// App State
const state = {
    allDuas: [],
    filteredDuas: [],
    currentFilter: 'all',
    currentSubcategory: 'all',
    currentLanguage: 'en',
    favorites: [],
    searchTerm: '',
    isDarkMode: false
};

// Category Mapping
const categories = {
    'all': 'All Duas',
    'by-source': {
        label: 'By Source',
        subcategories: ['Quranic Duas', 'Prophetic Duas', 'Personal Duas']
    },
    'by-time': {
        label: 'By Time',
        subcategories: ['Morning Adhkar', 'Evening Adhkar', 'After Prayer Duas', 'Sujood Duas', 'Before Sleep', 'After Waking Up', 'Accepted Times (Tahajjud)', 'Between Adhan & Iqamah']
    },
    'by-situation': {
        label: 'By Situation',
        subcategories: ['Travel Duas', 'Home Duas (enter/exit)', 'Eating & Drinking', 'Bathroom Duas', 'Fear & Anxiety', 'Illness & Healing', 'Hardship & Distress', 'Gratitude', 'Protection', 'Children', 'Marriage', 'Work & Rizq', 'Knowledge & Success']
    },
    'by-content': {
        label: 'By Content',
        subcategories: ['Istighfar (Forgiveness)', 'Shukr (Gratitude)', 'Protection (Ta\'awwudh)', 'Mercy (Rahmah)', 'Guidance (Hidayah)', 'Patience (Sabr)', 'Blessings (Barakah)']
    },
    'by-days': {
        label: 'By Days & Months',
        subcategories: ['Ramadan Duas', 'Laylatul Qadr Duas', 'Friday Duas', 'Hajj & Umrah Duas', 'Islamic Months Duas']
    },
    'by-emotional': {
        label: 'By Emotional State',
        subcategories: ['Sadness', 'Fear', 'Stress & Anxiety', 'Peace of Heart', 'Patience']
    }
};

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
    // Load data
    await loadDuas();
    
    // Initialize app
    initializeApp();
    
    // Load saved preferences
    loadPreferences();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initial render
    renderDuas();
    renderDuaOfDay();
});

/**
 * Load duas from JSON file
 */
async function loadDuas() {
    try {
        const response = await fetch('data/duas.json');
        const data = await response.json();
        state.allDuas = data.duas;
    } catch (error) {
        console.error('Error loading duas:', error);
        document.getElementById('duasGrid').innerHTML = '<p>Error loading duas. Please refresh the page.</p>';
    }
}

/**
 * Initialize app settings
 */
function initializeApp() {
    // Apply dark mode if saved
    if (state.isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Load language preference
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === state.currentLanguage) {
            btn.classList.add('active');
        }
    });
}

/**
 * Save user preferences to localStorage
 */
function savePreferences() {
    localStorage.setItem('duasAppPrefs', JSON.stringify({
        currentLanguage: state.currentLanguage,
        isDarkMode: state.isDarkMode,
        favorites: state.favorites
    }));
}

/**
 * Load user preferences from localStorage
 */
function loadPreferences() {
    const saved = localStorage.getItem('duasAppPrefs');
    if (saved) {
        const prefs = JSON.parse(saved);
        state.currentLanguage = prefs.currentLanguage || 'en';
        state.isDarkMode = prefs.isDarkMode || false;
        state.favorites = prefs.favorites || [];
    }
}

// ==========================================
// EVENT LISTENERS
// ==========================================

function setupEventListeners() {
    // Search input
    document.getElementById('searchInput').addEventListener('input', (e) => {
        state.searchTerm = e.target.value.toLowerCase();
        applyFilters();
    });

    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            state.currentFilter = tab.dataset.filter;
            state.currentSubcategory = 'all';
            updateSubcategoryFilter();
            applyFilters();
        });
    });

    // Language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentLanguage = btn.dataset.lang;
            renderDuas();
            renderDuaOfDay();
            savePreferences();
        });
    });

    // Dark mode toggle
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

    // Favorites toggle button (if implemented in future)
    document.getElementById('favoritesToggle').addEventListener('click', toggleFavoritesView);
}

/**
 * Toggle dark mode
 */
function toggleDarkMode() {
    state.isDarkMode = !state.isDarkMode;
    document.body.classList.toggle('dark-mode');
    savePreferences();
}

/**
 * Toggle favorites view (future feature)
 */
function toggleFavoritesView() {
    // Can be expanded in future
    console.log('Favorites:', state.favorites);
}

/**
 * Update subcategory filter buttons
 */
function updateSubcategoryFilter() {
    const container = document.getElementById('subcategoryButtons');
    container.innerHTML = '';
    
    const filterSection = document.getElementById('subcategoryFilter');
    
    if (state.currentFilter === 'all') {
        filterSection.style.display = 'none';
        return;
    }
    
    filterSection.style.display = 'block';
    const categoryData = categories[state.currentFilter];
    
    if (!categoryData || !categoryData.subcategories) {
        filterSection.style.display = 'none';
        return;
    }
    
    // Add "All" button
    const allBtn = document.createElement('button');
    allBtn.className = 'subcategory-btn active';
    allBtn.textContent = 'All ' + categoryData.label;
    allBtn.addEventListener('click', () => {
        state.currentSubcategory = 'all';
        updateSubcategoryButtons();
        applyFilters();
    });
    container.appendChild(allBtn);
    
    // Add subcategory buttons
    categoryData.subcategories.forEach(sub => {
        const btn = document.createElement('button');
        btn.className = 'subcategory-btn';
        btn.textContent = sub;
        btn.addEventListener('click', () => {
            state.currentSubcategory = sub;
            updateSubcategoryButtons();
            applyFilters();
        });
        container.appendChild(btn);
    });
}

/**
 * Update active state of subcategory buttons
 */
function updateSubcategoryButtons() {
    document.querySelectorAll('.subcategory-btn').forEach(btn => {
        if (state.currentSubcategory === 'all') {
            btn.classList.toggle('active', btn.textContent.includes('All'));
        } else {
            btn.classList.toggle('active', btn.textContent === state.currentSubcategory);
        }
    });
}

// ==========================================
// FILTERING & SEARCH
// ==========================================

/**
 * Apply all filters and search
 */
function applyFilters() {
    let filtered = [...state.allDuas];
    
    // Apply category filter
    if (state.currentFilter !== 'all') {
        const mainCategoryKey = state.currentFilter.replace('by-', '');
        const categoryField = 'category_main';
        
        filtered = filtered.filter(dua => {
            if (mainCategoryKey === 'source') {
                return dua.category_main === 'By Source';
            } else if (mainCategoryKey === 'time') {
                return dua.category_main === 'By Time';
            } else if (mainCategoryKey === 'situation') {
                return dua.category_main === 'By Situation';
            } else if (mainCategoryKey === 'content') {
                return dua.category_main === 'By Content';
            } else if (mainCategoryKey === 'days') {
                return dua.category_main === 'By Days & Months';
            } else if (mainCategoryKey === 'emotional') {
                return dua.category_main === 'By Emotional State';
            }
            return true;
        });
    }
    
    // Apply subcategory filter
    if (state.currentSubcategory !== 'all' && state.currentFilter !== 'all') {
        filtered = filtered.filter(dua => dua.category_sub === state.currentSubcategory);
    }
    
    // Apply search
    if (state.searchTerm) {
        filtered = filtered.filter(dua => {
            const searchableText = `
                ${dua.title}
                ${dua[`translation_${state.currentLanguage}`]}
                ${dua.category_main}
                ${dua.category_sub}
                ${dua.tags.join(' ')}
                ${dua.source}
            `.toLowerCase();
            return searchableText.includes(state.searchTerm);
        });
    }
    
    state.filteredDuas = filtered;
    renderDuas();
}

// ==========================================
// RENDERING
// ==========================================

/**
 * Render all duas
 */
function renderDuas() {
    const grid = document.getElementById('duasGrid');
    const noResults = document.getElementById('noResults');
    
    if (state.filteredDuas.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    grid.innerHTML = state.filteredDuas.map(dua => createDuaCard(dua)).join('');
    
    // Add event listeners to favorite buttons
    grid.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const duaId = parseInt(btn.dataset.id);
            toggleFavorite(duaId, btn);
        });
    });
}

/**
 * Create a dua card HTML
 */
function createDuaCard(dua) {
    const isFavorited = state.favorites.includes(dua.id);
    const translation = dua[`translation_${state.currentLanguage}`];
    
    return `
        <div class="dua-card">
            <div class="dua-card-header">
                <div class="dua-badges">
                    <span class="badge">${dua.category_sub}</span>
                </div>
                <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" data-id="${dua.id}" title="Add to favorites">
                    ${isFavorited ? '❤️' : '🤍'}
                </button>
            </div>
            
            <div class="dua-arabic">${dua.arabic}</div>
            
            <div class="dua-transliteration">${dua.transliteration}</div>
            
            <p class="dua-translation">${translation}</p>
            
            <div class="dua-footer">
                <span class="dua-source">📖 ${dua.source}</span>
                <div class="dua-actions">
                    <button class="btn-small" onclick="copyToClipboard('${dua.arabic.replace(/'/g, "\\'")}')">Copy</button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Render dua of the day
 */
function renderDuaOfDay() {
    // Get dua based on day of year for consistent daily rotation
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const duaIndex = dayOfYear % state.allDuas.length;
    const dua = state.allDuas[duaIndex];
    
    if (!dua) return;
    
    const translation = dua[`translation_${state.currentLanguage}`];
    const container = document.getElementById('duaOfDay');
    
    container.innerHTML = `
        <div class="dua-arabic">${dua.arabic}</div>
        <p><strong>Transliteration:</strong></p>
        <p style="font-style: italic; color: #6b6b6b; margin-bottom: 1.2rem;">${dua.transliteration}</p>
        <p><strong>Translation:</strong></p>
        <p class="dua-translation">${translation}</p>
        <p style="font-size: 0.9rem; opacity: 0.8; margin-top: 1.2rem;">
            <strong>Source:</strong> ${dua.source}<br>
            <strong>Category:</strong> ${dua.category_sub}
        </p>
        <button class="btn-small" style="margin-top: 1rem; background: var(--accent-gold); color: var(--primary-green);" onclick="copyToClipboard('${dua.arabic.replace(/'/g, "\\'")}')">
            Copy Dua
        </button>
    `;
}

// ==========================================
// FAVORITES
// ==========================================

/**
 * Toggle favorite status
 */
function toggleFavorite(duaId, btn) {
    const index = state.favorites.indexOf(duaId);
    
    if (index > -1) {
        state.favorites.splice(index, 1);
        btn.classList.remove('favorited');
        btn.textContent = '🤍';
    } else {
        state.favorites.push(duaId);
        btn.classList.add('favorited');
        btn.textContent = '❤️';
    }
    
    savePreferences();
}

// ==========================================
// UTILITIES
// ==========================================

/**
 * Copy text to clipboard
 */
function copyToClipboard(text) {
    // Decode HTML entities if needed
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    const unescapedText = textarea.value;
    
    navigator.clipboard.writeText(unescapedText).then(() => {
        alert('Dua copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

/**
 * Search duas by keyword
 */
function searchDuas(keyword) {
    state.searchTerm = keyword.toLowerCase();
    applyFilters();
}

/**
 * Get statistics about duas
 */
function getDuasStats() {
    return {
        total: state.allDuas.length,
        byCategoryMain: countByProperty('category_main'),
        bySource: countByProperty('category_sub'),
        favorites: state.favorites.length
    };
}

function countByProperty(property) {
    return state.allDuas.reduce((acc, dua) => {
        const key = dua[property];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
}

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Ctrl/Cmd + D for dark mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleDarkMode();
    }
});
