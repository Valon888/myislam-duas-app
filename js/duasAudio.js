/**
 * Islamic Duas Audio Library
 * Audio player functionality with Albanian translations
 */

// Audio Library Data
const duasAudioLibrary = [
    {
        id: 1,
        titleEn: "Morning Adhkar",
        titleSq: "Zikri i Mëngjesit",
        category: "morning",
        emoji: "🌅",
        audioFile: "./audio/Duaasformorningandevening.mp3",
        description: "Morning remembrance and supplications"
    },
    {
        id: 2,
        titleEn: "Evening Adhkar",
        titleSq: "Zikri i Mbrëmjes",
        category: "evening",
        emoji: "🌙",
        audioFile: "./audio/Duaasformorningandevening.mp3",
        description: "Evening remembrance and supplications"
    },
    {
        id: 3,
        titleEn: "Dua for Entering Home",
        titleSq: "Dua për Hyrje në Shtëpi",
        category: "protection",
        emoji: "🏠",
        audioFile: "./audio/Duaasforenteringandleavingthehouse.mp3",
        description: "Supplication when entering home"
    },
    {
        id: 4,
        titleEn: "Dua for Leaving Home",
        titleSq: "Dua për Dalje nga Shtëpia",
        category: "protection",
        emoji: "🚪",
        audioFile: "./audio/Duaasforenteringandleavingthehouse.mp3",
        description: "Supplication when leaving home"
    },
    {
        id: 5,
        titleEn: "Dua Before Eating",
        titleSq: "Dua para Ngrënies",
        category: "other",
        emoji: "🍽️",
        audioFile: "./audio/DuaasfromtheQuran.mp3",
        description: "Supplication before eating"
    },
    {
        id: 6,
        titleEn: "Dua After Eating",
        titleSq: "Dua pas Ngrënies",
        category: "other",
        emoji: "🍽️",
        audioFile: "./audio/DuaasfromtheQuran.mp3",
        description: "Supplication after eating"
    },
    {
        id: 7,
        titleEn: "Dua for Forgiveness",
        titleSq: "Dua për Falje",
        category: "forgiveness",
        emoji: "🙏",
        audioFile: "./audio/DuaasfromtheQuran.mp3",
        description: "Seeking forgiveness from Allah"
    },
    {
        id: 8,
        titleEn: "Dua for Protection",
        titleSq: "Dua për Mbrojtje",
        category: "protection",
        emoji: "🛡️",
        audioFile: "./audio/Duaasforenteringandleavingthehouse.mp3",
        description: "Seeking protection from evil"
    },
    {
        id: 9,
        titleEn: "Dua for Guidance",
        titleSq: "Dua për Udhëzim",
        category: "other",
        emoji: "🧭",
        audioFile: "./audio/DuaasfromtheQuran.mp3",
        description: "Seeking guidance from Allah"
    },
    {
        id: 10,
        titleEn: "Dua for Patience",
        titleSq: "Dua për Durim",
        category: "other",
        emoji: "⏳",
        audioFile: "./audio/DuaasfromtheQuran.mp3",
        description: "Seeking patience in difficulties"
    },
    {
        id: 11,
        titleEn: "Dua for Rizq (Sustenance)",
        titleSq: "Dua për Rizk (Mjete Jete)",
        category: "other",
        emoji: "💰",
        audioFile: "./audio/DuaasfromtheQuran.mp3",
        description: "Seeking sustenance and blessings"
    },
    {
        id: 12,
        titleEn: "Dua for Children",
        titleSq: "Dua për Fëmijë",
        category: "other",
        emoji: "👶",
        audioFile: "./audio/DuaasfromtheQuran.mp3",
        description: "Supplication for children"
    },
    {
        id: 13,
        titleEn: "Dua for Marriage",
        titleSq: "Dua për Martesë",
        category: "other",
        emoji: "💍",
        audioFile: "./audio/DuaasfromtheQuran.mp3",
        description: "Supplication for marriage"
    },
    {
        id: 14,
        titleEn: "Dua for Travel",
        titleSq: "Dua për Udhëtim",
        category: "other",
        emoji: "✈️",
        audioFile: "./audio/DuaasfromtheQuran.mp3",
        description: "Supplication for safe travel"
    },
    {
        id: 15,
        titleEn: "Dua for Illness",
        titleSq: "Dua për Sëmundje",
        category: "other",
        emoji: "🏥",
        audioFile: "./audio/Ruqyaf(forthecureofBlackmagic,jinnsandalltypesofsickness.mp3",
        description: "Supplication for healing"
    },
    {
        id: 16,
        titleEn: "Dua for Stress & Anxiety",
        titleSq: "Dua për Stres & Ankth",
        category: "other",
        emoji: "😌",
        audioFile: "./audio/DuaasfromtheQuran.mp3",
        description: "Seeking relief from stress and anxiety"
    },
    {
        id: 17,
        titleEn: "Dua for Rising from Ruku",
        titleSq: "Dua për Ngritje nga Ruku",
        category: "prayer",
        emoji: "🕌",
        audioFile: "./audio/DuaasforrisingfromtheRuku.mp3",
        description: "Supplication when rising from ruku in prayer"
    },
    {
        id: 18,
        titleEn: "Dua for Istikharah",
        titleSq: "Dua për Istikharah",
        category: "other",
        emoji: "🤲",
        audioFile: "./audio/DuaforIstikharah(seekingAllah'sCounsel).mp3",
        description: "Seeking Allah's counsel in decision making"
    }
];

// Current audio state
let currentAudio = null;
let currentAudioCard = null;

// ==========================================
// AUDIO LIBRARY FUNCTIONS
// ==========================================

/**
 * Initialize audio section
 */
function initializeAudioSection() {
    renderAudioCards();
    setupAudioFilterButtons();
}

/**
 * Render audio cards based on current filter
 */
function renderAudioCards(filter = 'all') {
    const audioGrid = document.getElementById('audioGrid');
    if (!audioGrid) return;

    const filteredAudios = filter === 'all' 
        ? duasAudioLibrary 
        : duasAudioLibrary.filter(audio => audio.category === filter);

    audioGrid.innerHTML = filteredAudios.map(audio => createAudioCard(audio)).join('');
}

/**
 * Create HTML for audio card
 */
function createAudioCard(audio) {
    const title = state.currentLanguage === 'sq' ? audio.titleSq : audio.titleEn;
    
    return `
        <div class="audio-card" data-id="${audio.id}">
            <div class="audio-header">
                <div class="audio-icon">${audio.emoji}</div>
                <h4 class="audio-title">${title}</h4>
            </div>
            <p class="audio-description">${audio.description}</p>
            <div class="audio-controls">
                <button class="audio-play-btn" onclick="playAudio('${audio.audioFile}', this)">
                    <span class="play-icon">▶️</span>
                    <span class="play-text">Play</span>
                </button>
                <button class="audio-download-btn" onclick="downloadAudio('${audio.audioFile}', '${title}')">
                    <span class="download-icon">⬇️</span>
                </button>
                <button class="audio-share-btn" onclick="shareAudio('${title}', '${audio.audioFile}')">
                    <span class="share-icon">📤</span>
                </button>
            </div>
        </div>
    `;
}

/**
 * Set up audio filter buttons
 */
function setupAudioFilterButtons() {
    const filterButtons = document.querySelectorAll('.audio-filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter audio cards
            const category = button.dataset.category;
            renderAudioCards(category);
        });
    });
}

/**
 * Play audio file
 */
function playAudio(audioFile, buttonElement) {
    const card = buttonElement.closest('.audio-card');
    
    // Stop current audio if playing
    if (currentAudio && currentAudioCard !== card) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudioCard.querySelector('.play-text').textContent = 'Play';
        currentAudioCard.querySelector('.play-icon').textContent = '▶️';
        currentAudioCard.classList.remove('playing');
    }
    
    // If same card, toggle play/pause
    if (currentAudio && currentAudioCard === card) {
        if (currentAudio.paused) {
            currentAudio.play();
            buttonElement.querySelector('.play-text').textContent = 'Pause';
            buttonElement.querySelector('.play-icon').textContent = '⏸️';
            card.classList.add('playing');
        } else {
            currentAudio.pause();
            buttonElement.querySelector('.play-text').textContent = 'Play';
            buttonElement.querySelector('.play-icon').textContent = '▶️';
            card.classList.remove('playing');
        }
        return;
    }
    
    // Play new audio
    currentAudio = new Audio(audioFile);
    currentAudioCard = card;
    
    currentAudio.addEventListener('ended', () => {
        buttonElement.querySelector('.play-text').textContent = 'Play';
        buttonElement.querySelector('.play-icon').textContent = '▶️';
        card.classList.remove('playing');
        currentAudio = null;
        currentAudioCard = null;
    });
    
    currentAudio.play();
    buttonElement.querySelector('.play-text').textContent = 'Pause';
    buttonElement.querySelector('.play-icon').textContent = '⏸️';
    card.classList.add('playing');
}

/**
 * Download audio file
 */
function downloadAudio(audioFile, title) {
    const link = document.createElement('a');
    link.href = audioFile;
    link.download = `${title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Share audio
 */
function shareAudio(title, audioFile) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: `Listen to: ${title}`,
            url: window.location.href
        });
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}

// Initialize audio section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeAudioSection();
});