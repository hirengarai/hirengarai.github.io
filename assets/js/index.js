// =================================================================
// MAIN INDEX PAGE JAVASCRIPT
// =================================================================
// This file handles all interactive features for the main homepage:
// - Dynamic multilingual greetings based on time of day
// - Tooltip systems for greeting, profile photo, and general elements
// - Name pronunciation audio playback
// - Section tab navigation with URL hash support
// - Theme toggle (light/dark mode)
// - Falling mathematical symbols background animation
// - Scroll position persistence across page reloads
// =================================================================

// -----------------------------------------------------------------
// DYNAMIC GREETING SYSTEM
// -----------------------------------------------------------------
// Generates time-appropriate greetings in multiple languages
// Changes based on hour (morning/afternoon/evening/night)
// Optionally adds day-specific flair (Monday/Friday/Weekend)
// -----------------------------------------------------------------
        function getGreeting() {
            // Get current hour (0-23) and day (0=Sunday, 1=Monday, etc.)
            const hour = new Date().getHours();
            const day = new Date().getDay();

            // Morning greetings (5 AM - 12 PM) in 10 languages
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

            // Afternoon greetings (12 PM - 5 PM) in 10 languages
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

            // Evening greetings (5 PM - 9 PM) in 10 languages
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

            // Night greetings (9 PM - 5 AM) - playful messages for late-night visitors
            const nightGreetings = [
                { text: "Night owl? 🦉", lang: "English", meaning: "Staying up late?" },
                { text: "Burning midnight oil?", lang: "English", meaning: "Working late into the night" },
                { text: "Late night coding?", lang: "English", meaning: "Coding at night?" },
                { text: "Raat ko jaag rahe ho?", lang: "Hindi", meaning: "Awake at night?" },
                { text: "Raate jagcho?", lang: "Bengali", meaning: "Awake at night?" },
                { text: "Still awake?", lang: "English", meaning: "Not sleeping yet?" },
                { text: "Noctámbulo?", lang: "Spanish", meaning: "Night wanderer?" }
            ];

            // Day-specific flair messages (50% chance of appearing)
            const mondayFlair = ["New week!", "Monday momentum!", "Let's go!"];
            const fridayFlair = ["TGIF!", "Weekend loading...", "Almost there!"];
            const weekendFlair = ["Weekend mode!", "Chill day?", "Rest day!"];

            // Select greeting array based on current hour
            let greetings;
            if (hour >= 5 && hour < 12) greetings = morningGreetings;
            else if (hour >= 12 && hour < 17) greetings = afternoonGreetings;
            else if (hour >= 17 && hour < 21) greetings = eveningGreetings;
            else greetings = nightGreetings;

            // Pick a random greeting from the selected time period
            const selected = greetings[Math.floor(Math.random() * greetings.length)];
            let greetingText = selected.text;
            let tooltipText = `${selected.lang} — ${selected.meaning}`;

            // 50% chance to add day-specific flair
            if (Math.random() > 0.5) {
                if (day === 1) greetingText += " " + mondayFlair[Math.floor(Math.random() * mondayFlair.length)];
                else if (day === 5) greetingText += " " + fridayFlair[Math.floor(Math.random() * fridayFlair.length)];
                else if (day === 0 || day === 6) greetingText += " " + weekendFlair[Math.floor(Math.random() * weekendFlair.length)];
            }

            // Return both the greeting text and tooltip explaining the language
            return { text: greetingText, tooltip: tooltipText };
        }

// Generate greeting on page load and update the DOM
const greetingData = getGreeting();
document.querySelector('.greeting').textContent = greetingData.text;
document.querySelector('#greeting-tooltip').textContent = greetingData.tooltip;

// -----------------------------------------------------------------
// EMAIL OBFUSCATION
// -----------------------------------------------------------------
const emailLink = document.getElementById('email-link');
if (emailLink) {
    const codes = emailLink.getAttribute('data-addr-codes');
    if (codes) {
        const address = codes
            .split(',')
            .map((code) => String.fromCharCode(Number(code.trim())))
            .join('');
        setTimeout(() => {
            emailLink.href = `mailto:${address}`;
            emailLink.textContent = address;
            emailLink.setAttribute('aria-label', `Email ${address}`);
        }, 350);
    }
}

// -----------------------------------------------------------------
// UNIFIED CUSTOM TOOLTIP HANDLER (Mobile & Desktop Support)
// -----------------------------------------------------------------
// Handles special tooltips that need custom behavior (greeting, profile)
// Uses shared logic to avoid duplication
// Auto-hides after 1.85 seconds on mobile
// -----------------------------------------------------------------

// Generic tooltip handler factory
function createTooltipHandler(triggerElement, tooltipElement) {
    let timer = null;

    function hide() {
        if (tooltipElement) {
            tooltipElement.classList.remove('tooltip-active');
        }
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    function show() {
        tooltipElement.classList.add('tooltip-active');
        if (timer) clearTimeout(timer);
        timer = setTimeout(hide, 1850); // Auto-hide after 1.85s
    }

    if (triggerElement && tooltipElement) {
        // Mobile: Use touchend for better responsiveness (no 300ms delay)
        triggerElement.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (tooltipElement.classList.contains('tooltip-active')) {
                hide();
            } else {
                show();
            }
        });

        // Desktop: Show on hover (only for devices with fine pointer like mouse)
        if (window.matchMedia('(pointer: fine)').matches) {
            triggerElement.addEventListener('mouseenter', show);
            triggerElement.addEventListener('mouseleave', hide);
        }

        // Keyboard focus support
        triggerElement.addEventListener('focus', show);
        triggerElement.addEventListener('blur', hide);

        // Hide when scrolling or touching elsewhere
        window.addEventListener('scroll', hide, { passive: true });
        window.addEventListener('touchstart', (e) => {
            if (!triggerElement.contains(e.target)) {
                hide();
            }
        }, { passive: true });
    }

    return { hide, show };
}

// Initialize greeting tooltip
const greetingTooltipHandler = createTooltipHandler(
    document.querySelector('.greeting-info'),
    document.querySelector('#greeting-tooltip')
);

// Initialize profile photo tooltip
const profileTooltipHandler = createTooltipHandler(
    document.querySelector('.profile-figure'),
    document.querySelector('#profile-tooltip')
);

// -----------------------------------------------------------------
// NAME PRONUNCIATION AUDIO PLAYBACK
// -----------------------------------------------------------------
// Plays audio pronunciation of name when clicked
// Audio file: assets/audio/name.mp3
// -----------------------------------------------------------------
const nameTrigger = document.querySelector('.name-casual em');
const nameAudio = document.getElementById('pronounce');
const playNameAudio = () => {
    nameAudio.currentTime = 0;  // Reset to start
    nameAudio.play();            // Play audio
};
if (nameTrigger && nameAudio) {
    nameTrigger.addEventListener('click', playNameAudio);
    nameTrigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            playNameAudio();
        }
    });
}

// -----------------------------------------------------------------
// FUN LINK BLOCKER (Coming Soon)
// -----------------------------------------------------------------
// Blocks navigation to fun/personal sections until they're ready
// Shows "coming soon" message to visitors
// Remove this block when ready to publish those sections
// -----------------------------------------------------------------
const funLink = document.querySelector('.fun-link');
if (funLink) {
    funLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('might come someday !');
    });
}

// -----------------------------------------------------------------
// SECTION TAB NAVIGATION SYSTEM
// -----------------------------------------------------------------
// Handles switching between Work/Research/Teaching/Academic sections
// Supports URL hashes (#work, #research, etc.) for direct linking
// Updates browser history when switching tabs
// -----------------------------------------------------------------
const sectionTabs = document.querySelectorAll('.section-tab');
const sections = document.querySelectorAll('.content-section');

        // Activates a section by ID, deactivating all others
        function activateSection(sectionId) {
            // Update active classes and ARIA states
            sectionTabs.forEach(t => {
                const isActive = t.dataset.section === sectionId;
                t.classList.toggle('active', isActive);
                t.setAttribute('aria-selected', isActive ? 'true' : 'false');
                t.setAttribute('tabindex', isActive ? '0' : '-1');
            });
            sections.forEach(s => {
                const isActive = s.id === sectionId;
                s.classList.toggle('active', isActive);
                s.setAttribute('aria-hidden', isActive ? 'false' : 'true');
            });
        }

        // Handles URL hash changes (e.g., #work, #research)
        function handleHash() {
            const hash = window.location.hash.slice(1); // Remove # symbol
            if (hash && document.getElementById(hash)) {
                activateSection(hash);
                return;
            }

            const defaultTab = document.querySelector('.section-tab.active') || sectionTabs[0];
            const defaultSection = defaultTab ? defaultTab.dataset.section : (sections[0] && sections[0].id);
            if (defaultSection) {
                activateSection(defaultSection);
            }
        }

        // Activate section from URL hash on page load
        handleHash();

        // Listen for browser back/forward button (hashchange event)
        window.addEventListener('hashchange', handleHash);

        // Handle tab clicks - update active section and URL
        sectionTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = tab.dataset.section;
                activateSection(sectionId);
                // Update URL without page reload
                history.pushState(null, null, `#${sectionId}`);
            });
        });

// -----------------------------------------------------------------
// RESOURCES SECTION TAB SYSTEM
// -----------------------------------------------------------------
// Independent tab set inside Resources (Books/URLs/Videos/Others)
// Avoids changing the URL hash so the main tabs keep working
// -----------------------------------------------------------------
const resourceTabs = document.querySelectorAll('#resources .resources-tab');
const resourcePanels = document.querySelectorAll('#resources .resources-panel');

function activateResourcePanel(panelKey) {
    resourceTabs.forEach((tab) => {
        const isActive = tab.dataset.resource === panelKey;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    resourcePanels.forEach((panel) => {
        const isActive = panel.id === `resources-panel-${panelKey}`;
        panel.classList.toggle('active', isActive);
        panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
}

if (resourceTabs.length && resourcePanels.length) {
    const defaultResourceTab = document.querySelector('#resources .resources-tab.active') || resourceTabs[0];
    if (defaultResourceTab) {
        activateResourcePanel(defaultResourceTab.dataset.resource);
    }

    resourceTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            activateResourcePanel(tab.dataset.resource);
        });
    });
}

// -----------------------------------------------------------------
// THEME TOGGLE (Light/Dark Mode)
// -----------------------------------------------------------------
// Follows system preference by default (prefers-color-scheme)
// User choice persists in sessionStorage (resets when tab closes)
// Syncs with system preference changes if user hasn't set preference
// -----------------------------------------------------------------
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;

        // Validate saved theme - only accept 'dark' or 'light'
        const savedTheme = sessionStorage.getItem('theme');
        if (savedTheme !== 'dark' && savedTheme !== 'light') {
            sessionStorage.removeItem('theme');
        }

        // Listen for system theme changes (Settings → Appearance)
        const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        systemThemeQuery.addEventListener('change', (e) => {
            // Only update if user hasn't manually set a preference
            if (!sessionStorage.getItem('theme')) {
                html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });

        // Handle theme toggle button click
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            sessionStorage.setItem('theme', newTheme);  // Save user preference
        });

// -----------------------------------------------------------------
// GENERAL TOOLTIP SYSTEM (Auto-positioning)
// -----------------------------------------------------------------
// Creates a global tooltip that appears on elements with [data-tip] attribute
// Automatically positions tooltip to fit in viewport
// Supports preferred positions: 'above', 'below', 'left', 'right'
// Disabled on touch devices (pointer: coarse)
// -----------------------------------------------------------------
        // Create a single global tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-bubble';
        tooltip.setAttribute('role', 'tooltip');
        document.body.appendChild(tooltip);

        // Shows tooltip with intelligent auto-positioning
        function showTooltip(el) {
            // Don't show tooltips on touch devices (mobile/tablets)
            if (window.matchMedia('(pointer: coarse)').matches) {
                return;
            }

            const text = el.getAttribute('data-tip');
            if (!text) return;  // Exit if no tooltip text

            tooltip.textContent = text;
            tooltip.classList.add('visible');

            // Get element and tooltip dimensions
            const rect = el.getBoundingClientRect();
            const tipRect = tooltip.getBoundingClientRect();
            const gap = 8;  // Pixels between tooltip and element

            // Check for preferred position (data-tip-position attribute)
            const pref = el.getAttribute('data-tip-position');
            let top = rect.top - tipRect.height - gap;  // Default: above
            let left = rect.left + rect.width / 2 - tipRect.width / 2;  // Centered
            let placed = false;

            // Try preferred position first
            if (pref === 'right') {
                top = rect.top + rect.height / 2 - tipRect.height / 2;
                left = rect.right + gap;
                placed = true;
            } else if (pref === 'left') {
                top = rect.top + rect.height / 2 - tipRect.height / 2;
                left = rect.left - tipRect.width - gap;
                placed = true;
            } else if (pref === 'above') {
                top = rect.top - tipRect.height - gap;
                left = rect.left + rect.width / 2 - tipRect.width / 2;
                placed = true;
            } else if (pref === 'below') {
                top = rect.bottom + gap;
                left = rect.left + rect.width / 2 - tipRect.width / 2;
                placed = true;
            } else {
                // AUTO-POSITION: Try positions in order until one fits
                // 1. Try above first (default)
                if (top >= gap && top + tipRect.height <= window.innerHeight - gap) {
                    placed = true;
                }
                // 2. Try below if above doesn't fit
                else if (rect.bottom + tipRect.height + gap <= window.innerHeight - gap) {
                    top = rect.bottom + gap;
                    placed = true;
                }
                // 3. Try right if vertical doesn't work
                else if (window.innerWidth - rect.right >= tipRect.width + gap) {
                    top = rect.top + rect.height / 2 - tipRect.height / 2;
                    left = rect.right + gap;
                    placed = true;
                }
                // 4. Try left as last resort
                else if (rect.left >= tipRect.width + gap) {
                    top = rect.top + rect.height / 2 - tipRect.height / 2;
                    left = rect.left - tipRect.width - gap;
                    placed = true;
                }
            }

            // Fallback: Place below if nothing else worked
            if (!placed) {
                top = rect.bottom + gap;
                left = rect.left + rect.width / 2 - tipRect.width / 2;
            }

            // Clamp position to stay within viewport boundaries
            const clampedLeft = Math.max(gap, Math.min(left, window.innerWidth - tipRect.width - gap));
            const clampedTop = Math.max(gap, Math.min(top, window.innerHeight - tipRect.height - gap));

            // Apply final position
            tooltip.style.left = `${clampedLeft}px`;
            tooltip.style.top = `${clampedTop}px`;
        }

        // Hides the tooltip
        function hideTooltip() {
            tooltip.classList.remove('visible');
        }

        // Attach tooltip to all elements with [data-tip] attribute
        document.querySelectorAll('[data-tip]').forEach(el => {
            el.addEventListener('mouseenter', () => showTooltip(el));  // Show on hover
            el.addEventListener('mouseleave', hideTooltip);             // Hide when leaving
            el.addEventListener('focus', () => showTooltip(el));        // Show on keyboard focus
            el.addEventListener('blur', hideTooltip);                   // Hide on blur
            el.addEventListener('click', hideTooltip);                  // Hide on click
        });

        // Hide tooltips when user scrolls or touches screen
        window.addEventListener('scroll', hideTooltip, { passive: true });
        window.addEventListener('touchstart', hideTooltip, { passive: true });

// -----------------------------------------------------------------
// FALLING CHARACTERS BACKGROUND ANIMATION
// -----------------------------------------------------------------
// Creates cryptography/math-related symbols that fall down the screen
// Limits to 10 concurrent symbols for performance
// Symbols include: mathematical operators, crypto terms, etc.
// -----------------------------------------------------------------
        const container = document.getElementById('falling-container');
        if (container) {
            // Array of cryptography and mathematics related symbols
            // Includes: Unicode math symbols, crypto algorithm names, famous mathematicians
            const symbols = ['\u2295', '<<<', '>>>', '\u2200', 'RSA', 'Markov', '\u2202', '\u2203', '\u2205', 'Key-recovery', '\u221B', '\u221E', '\u222C', '\u222D', '\u222E', 'FFT', '\u229E', '\u229F', '\u2A27', '\u2230', 'SPECK', '\u2234', '\u2235', ' T\u2080', 'T\u2081', 'T\u2082', '\u2208', 'Bernstein', '\u2208', '\u2211', 'Shamir', '\u2243', '\u2208', '\u8747', 'bias', 'φ', '\u227A', 'correlation', '\u2227', '\u2228', '[', ']', '\u{1D53D}\u2082', '\u221A', '0', '1', 'f', 'div', 'F', 'curl', 'π', '\u03B3', '\u0393', 'ζ', '{', '}', 'Pr', 'AES', 'ChaCha', 'Salsa', 'Gauss', 'Euler', 'Urysohn', 'e', '+'];

            const MAX_SYMBOLS = 10;  // Maximum concurrent falling symbols (performance limit)
            let activeSymbols = 0;   // Current count of active symbols

            // Creates and animates a single falling character
            function createChar() {
                if (activeSymbols >= MAX_SYMBOLS) return;  // Don't exceed limit

                const char = document.createElement('span');
                char.className = 'falling-char';
                char.innerText = symbols[Math.floor(Math.random() * symbols.length)];

                // Random horizontal position (5% to 95%)
                const left = Math.random() * 90 + 5;
                // Random fall duration (25-40 seconds)
                const duration = Math.random() * 15 + 25;
                // Random font size (12-18px)
                const fontSize = Math.random() * 6 + 12;

                char.style.left = `${left}%`;
                char.style.fontSize = `${fontSize}px`;
                char.style.animation = `fall ${duration}s linear forwards`;

                container.appendChild(char);
                activeSymbols++;

                // Remove element when animation completes
                char.addEventListener('animationend', () => {
                    char.remove();
                    activeSymbols--;
                });
            }

            // Create a new character every 3 seconds
            setInterval(createChar, 3000);

            // Initialize with 4 characters at startup (staggered)
            for (let i = 0; i < 4; i++) {
                setTimeout(createChar, i * 2500);
            }
        }

// -----------------------------------------------------------------
// SCROLL POSITION PERSISTENCE
// -----------------------------------------------------------------
// Saves scroll position in sessionStorage when leaving page
// Restores position on return (only if scrolled past 50px)
// Prevents jarring jump on pages loaded at top
// -----------------------------------------------------------------
            window.addEventListener('beforeunload', () => {
                // Only save if user has scrolled significantly
                if (window.scrollY > 50) {
                    sessionStorage.setItem('scrollPosition', window.scrollY);
                } else {
                    sessionStorage.removeItem('scrollPosition');
                }
            });

            window.addEventListener('load', () => {
                const savedScroll = sessionStorage.getItem('scrollPosition');
                if (savedScroll && parseInt(savedScroll) > 50) {
                    window.scrollTo(0, parseInt(savedScroll));
                }
            });

            // Remove loading opacity fade-in effect
            document.documentElement.classList.add('loaded');
