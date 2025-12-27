// ===========================================
// HOME - Greeting, tabs, falling characters
// ===========================================

// -----------------------------------------
// Dynamic Greeting
// -----------------------------------------
function getGreeting() {
    const hour = new Date().getHours();
    const day = new Date().getDay();

    const morningGreetings = [
        { text: "Good morning!", lang: "English", meaning: "Good morning" },
        { text: "Suprabhat!", lang: "Hindi", meaning: "Good morning" },
        { text: "Shuprabhaat!", lang: "Bengali", meaning: "Good morning" },
        { text: "Ohayō!", lang: "Japanese", meaning: "Good morning" },
        { text: "Zǎo ān!", lang: "Mandarin", meaning: "Good morning" },
        { text: "Bonjour!", lang: "French", meaning: "Good day / Good morning" },
        { text: "Buenos días!", lang: "Spanish", meaning: "Good morning" },
        { text: "Subah bakhair!", lang: "Urdu", meaning: "Good morning" },
        { text: "Günaydın!", lang: "Turkish", meaning: "Good morning" },
        { text: "Guten Morgen!", lang: "German", meaning: "Good morning" }
    ];

    const afternoonGreetings = [
        { text: "Good afternoon!", lang: "English", meaning: "Good afternoon" },
        { text: "Namaskar!", lang: "Hindi", meaning: "Respectful greeting" },
        { text: "Shubho dupur!", lang: "Bengali", meaning: "Good afternoon" },
        { text: "Konnichiwa!", lang: "Japanese", meaning: "Good afternoon" },
        { text: "Xiàwǔ hǎo!", lang: "Mandarin", meaning: "Good afternoon" },
        { text: "Bon après-midi!", lang: "French", meaning: "Good afternoon" },
        { text: "Buenas tardes!", lang: "Spanish", meaning: "Good afternoon" },
        { text: "Assalamu alaikum!", lang: "Urdu/Arabic", meaning: "Peace be upon you" },
        { text: "Tünaydın!", lang: "Turkish", meaning: "Good afternoon" },
        { text: "Guten Tag!", lang: "German", meaning: "Good day" }
    ];

    const eveningGreetings = [
        { text: "Good evening!", lang: "English", meaning: "Good evening" },
        { text: "Shubh sandhya!", lang: "Hindi", meaning: "Good evening" },
        { text: "Shubho shondhya!", lang: "Bengali", meaning: "Good evening" },
        { text: "Konbanwa!", lang: "Japanese", meaning: "Good evening" },
        { text: "Wǎnshàng hǎo!", lang: "Mandarin", meaning: "Good evening" },
        { text: "Bonsoir!", lang: "French", meaning: "Good evening" },
        { text: "Buenas noches!", lang: "Spanish", meaning: "Good evening" },
        { text: "Shaam bakhair!", lang: "Urdu", meaning: "Good evening" },
        { text: "İyi akşamlar!", lang: "Turkish", meaning: "Good evening" },
        { text: "Guten Abend!", lang: "German", meaning: "Good evening" }
    ];

    const nightGreetings = [
        { text: "Night owl? 🦉", lang: "English", meaning: "Staying up late?" },
        { text: "Burning midnight oil?", lang: "English", meaning: "Working late into the night" },
        { text: "Late night coding?", lang: "English", meaning: "Coding at night?" },
        { text: "Raat ko jaag rahe ho?", lang: "Hindi", meaning: "Awake at night?" },
        { text: "Raate jagcho?", lang: "Bengali", meaning: "Awake at night?" },
        { text: "Still awake?", lang: "English", meaning: "Not sleeping yet?" },
        { text: "Noctámbulo?", lang: "Spanish", meaning: "Night wanderer?" }
    ];

    const mondayFlair = ["New week!", "Monday momentum!", "Let's go!"];
    const fridayFlair = ["TGIF!", "Weekend loading...", "Almost there!"];
    const weekendFlair = ["Weekend mode!", "Chill day?", "Rest day!"];

    let greetings;
    if (hour >= 5 && hour < 12) greetings = morningGreetings;
    else if (hour >= 12 && hour < 17) greetings = afternoonGreetings;
    else if (hour >= 17 && hour < 21) greetings = eveningGreetings;
    else greetings = nightGreetings;

    const selected = greetings[Math.floor(Math.random() * greetings.length)];
    let greetingText = selected.text;
    let tooltipText = `${selected.lang} — ${selected.meaning}`;

    if (Math.random() > 0.5) {
        if (day === 1) greetingText += " " + mondayFlair[Math.floor(Math.random() * mondayFlair.length)];
        else if (day === 5) greetingText += " " + fridayFlair[Math.floor(Math.random() * fridayFlair.length)];
        else if (day === 0 || day === 6) greetingText += " " + weekendFlair[Math.floor(Math.random() * weekendFlair.length)];
    }

    return { text: greetingText, tooltip: tooltipText };
}

// Initialize greeting
const greetingEl = document.querySelector('.greeting');
const tooltipEl = document.querySelector('#greeting-tooltip');

if (greetingEl && tooltipEl) {
    const greetingData = getGreeting();
    greetingEl.textContent = greetingData.text;
    tooltipEl.textContent = greetingData.tooltip;
}

// -----------------------------------------
// Section Tab Switching
// -----------------------------------------
const sectionTabs = document.querySelectorAll('.section-tab');
const sections = document.querySelectorAll('.content-section');

if (sectionTabs.length > 0) {
    // Restore active tab from session
    const savedTab = sessionStorage.getItem('activeTab');
    if (savedTab) {
        sectionTabs.forEach(t => t.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        const tabToActivate = document.querySelector(`.section-tab[data-section="${savedTab}"]`);
        if (tabToActivate) {
            tabToActivate.classList.add('active');
            document.getElementById(savedTab)?.classList.add('active');
        }
    }

    // Tab click handlers
    sectionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            sectionTabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.section)?.classList.add('active');
            sessionStorage.setItem('activeTab', tab.dataset.section);
        });
    });
}

// -----------------------------------------
// Falling Characters Animation
// -----------------------------------------
const fallingContainer = document.getElementById('falling-container');

if (fallingContainer) {
    const symbols = [
        '⊕', '⊖', '<<<', '>>>', '⊻', 'bias', 'T₀', 'T₁', 'φ', '∫', '∂', '×',
        '𝔽₂', '∧', '∨', '√', '∀', '0', '1', 'f', 'F', 'π', 'γ', 'ζ', '(', ')',
        'Pr', 'AES', 'ChaCha', 'Salsa', 'Gauss', 'Euler', 'Urysohn', 'e', '+', 'T₂'
    ];

    const MAX_SYMBOLS = 6;
    let activeSymbols = 0;

    function createChar() {
        if (activeSymbols >= MAX_SYMBOLS) return;

        const char = document.createElement('span');
        char.className = 'falling-char';
        char.innerText = symbols[Math.floor(Math.random() * symbols.length)];

        const left = Math.random() * 90 + 5;
        const duration = Math.random() * 15 + 25;
        const fontSize = Math.random() * 6 + 12;

        char.style.left = `${left}%`;
        char.style.fontSize = `${fontSize}px`;
        char.style.animation = `fall ${duration}s linear forwards`;

        fallingContainer.appendChild(char);
        activeSymbols++;

        char.addEventListener('animationend', () => {
            char.remove();
            activeSymbols--;
        });
    }

    // Start animation
    setInterval(createChar, 3000);
    for (let i = 0; i < 4; i++) {
        setTimeout(createChar, i * 2500);
    }
}

// -----------------------------------------
// Name Audio Playback
// -----------------------------------------
const nameEl = document.querySelector('.name-casual em[data-tooltip]');
const audioEl = document.getElementById('pronounce');

if (nameEl && audioEl) {
    nameEl.addEventListener('click', () => {
        audioEl.play();
    });
}
