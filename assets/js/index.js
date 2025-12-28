        // Dynamic greeting
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

const greetingData = getGreeting();
document.querySelector('.greeting').textContent = greetingData.text;
document.querySelector('#greeting-tooltip').textContent = greetingData.tooltip;

// Greeting tooltip tap support for mobile
const greetingInfo = document.querySelector('.greeting-info');
const greetingTooltip = document.querySelector('#greeting-tooltip');
let greetingTimer = null;

function hideGreetingTooltip() {
    if (greetingTooltip) {
        greetingTooltip.classList.remove('tooltip-active');
    }
    if (greetingTimer) {
        clearTimeout(greetingTimer);
        greetingTimer = null;
    }
}

if (greetingInfo && greetingTooltip) {
    // Use touchend instead of click for better mobile response
    greetingInfo.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Toggle tooltip
        if (greetingTooltip.classList.contains('tooltip-active')) {
            hideGreetingTooltip();
        } else {
            greetingTooltip.classList.add('tooltip-active');
            if (greetingTimer) clearTimeout(greetingTimer);
            greetingTimer = setTimeout(hideGreetingTooltip, 1850);
        }
    });

    // Desktop hover support
    if (window.matchMedia('(pointer: fine)').matches) {
        greetingInfo.addEventListener('mouseenter', () => {
            greetingTooltip.classList.add('tooltip-active');
        });
        greetingInfo.addEventListener('mouseleave', () => {
            hideGreetingTooltip();
        });
    }
}

window.addEventListener('scroll', hideGreetingTooltip, { passive: true });
window.addEventListener('touchstart', (e) => {
    if (greetingInfo && !greetingInfo.contains(e.target)) {
        hideGreetingTooltip();
    }
}, { passive: true });

// Profile photo tooltip tap support
const profileFigure = document.querySelector('.profile-figure');
const profileTooltip = document.querySelector('#profile-tooltip');
let profileTimer = null;

function hideProfileTooltip() {
    if (profileTooltip) {
        profileTooltip.classList.remove('tooltip-active');
    }
    if (profileTimer) {
        clearTimeout(profileTimer);
        profileTimer = null;
    }
}

if (profileFigure && profileTooltip) {
    profileFigure.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (profileTooltip.classList.contains('tooltip-active')) {
            hideProfileTooltip();
        } else {
            profileTooltip.classList.add('tooltip-active');
            if (profileTimer) clearTimeout(profileTimer);
            profileTimer = setTimeout(hideProfileTooltip, 1850);
        }
    });
}

window.addEventListener('scroll', hideProfileTooltip, { passive: true });
window.addEventListener('touchstart', (e) => {
    if (profileFigure && !profileFigure.contains(e.target)) {
        hideProfileTooltip();
    }
}, { passive: true });

// Name pronunciation: play audio only
const nameTrigger = document.querySelector('.name-casual em');
const nameAudio = document.getElementById('pronounce');
if (nameTrigger && nameAudio) {
    nameTrigger.addEventListener('click', () => {
        nameAudio.currentTime = 0;
        nameAudio.play();
    });
}

// Fun link coming soon
const funLink = document.querySelector('.fun-link');
if (funLink) {
    funLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('might come someday !');
    });
}

// Section tab switching with URL hash support
const sectionTabs = document.querySelectorAll('.section-tab');
const sections = document.querySelectorAll('.content-section');

        function activateSection(sectionId) {
            sectionTabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            const tab = document.querySelector(`.section-tab[data-section="${sectionId}"]`);
            const section = document.getElementById(sectionId);

            if (tab && section) {
                tab.classList.add('active');
                section.classList.add('active');
            }
        }

        // Check URL hash on load
        function handleHash() {
            const hash = window.location.hash.slice(1); // Remove #
            if (hash && document.getElementById(hash)) {
                activateSection(hash);
            }
        }

        // Handle hash on page load
        handleHash();

        // Handle hash changes (back/forward buttons)
        window.addEventListener('hashchange', handleHash);

        // Tab click handlers
        sectionTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = tab.dataset.section;
                activateSection(sectionId);
                history.pushState(null, null, `#${sectionId}`);
            });
        });

        // Theme toggle (follows system preference by default)
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;

        // Use sessionStorage so theme resets when tab is closed
        const savedTheme = sessionStorage.getItem('theme');
        if (savedTheme !== 'dark' && savedTheme !== 'light') {
            sessionStorage.removeItem('theme');
        }

        const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        systemThemeQuery.addEventListener('change', (e) => {
            if (!sessionStorage.getItem('theme')) {
                html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            sessionStorage.setItem('theme', newTheme);
        });

        // Tooltip auto-placement
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-bubble';
        tooltip.setAttribute('role', 'tooltip');
        document.body.appendChild(tooltip);

        function showTooltip(el) {
            if (window.matchMedia('(pointer: coarse)').matches) {
                return;
            }
            const text = el.getAttribute('data-tip');
            if (!text) return;
            tooltip.textContent = text;
            tooltip.classList.add('visible');

            const rect = el.getBoundingClientRect();
            const tipRect = tooltip.getBoundingClientRect();
            const gap = 8;

            const pref = el.getAttribute('data-tip-position');
            let top = rect.top - tipRect.height - gap;
            let left = rect.left + rect.width / 2 - tipRect.width / 2;
            let placed = false;

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
                // Try above first
                if (top >= gap && top + tipRect.height <= window.innerHeight - gap) {
                    placed = true;
                }
                // Try below if above doesn't work
                else if (rect.bottom + tipRect.height + gap <= window.innerHeight - gap) {
                    top = rect.bottom + gap;
                    placed = true;
                }
                // Try right if vertical doesn't work
                else if (window.innerWidth - rect.right >= tipRect.width + gap) {
                    top = rect.top + rect.height / 2 - tipRect.height / 2;
                    left = rect.right + gap;
                    placed = true;
                }
                // Try left if right doesn't work
                else if (rect.left >= tipRect.width + gap) {
                    top = rect.top + rect.height / 2 - tipRect.height / 2;
                    left = rect.left - tipRect.width - gap;
                    placed = true;
                }
            }

            if (!placed) {
                top = rect.bottom + gap;
                left = rect.left + rect.width / 2 - tipRect.width / 2;
            }

            const clampedLeft = Math.max(gap, Math.min(left, window.innerWidth - tipRect.width - gap));
            const clampedTop = Math.max(gap, Math.min(top, window.innerHeight - tipRect.height - gap));

            tooltip.style.left = `${clampedLeft}px`;
            tooltip.style.top = `${clampedTop}px`;
        }

        function hideTooltip() {
            tooltip.classList.remove('visible');
        }

        document.querySelectorAll('[data-tip]').forEach(el => {
            el.addEventListener('mouseenter', () => showTooltip(el));
            el.addEventListener('mouseleave', hideTooltip);
            el.addEventListener('focus', () => showTooltip(el));
            el.addEventListener('blur', hideTooltip);
            el.addEventListener('click', hideTooltip);
        });

        window.addEventListener('scroll', hideTooltip, { passive: true });
        window.addEventListener('touchstart', hideTooltip, { passive: true });

        // Pronunciation tooltip tap support + hide on scroll/touch
        const pronunciation = document.querySelectorAll('.name-casual em[data-tooltip]');
        let pronunciationTimer = null;

        function hidePronunciation() {
            pronunciation.forEach(el => el.classList.remove('tooltip-active'));
            if (pronunciationTimer) {
                clearTimeout(pronunciationTimer);
                pronunciationTimer = null;
            }
        }

        pronunciation.forEach(el => {
            el.addEventListener('click', (e) => {
                if (window.matchMedia('(pointer: coarse)').matches) {
                    return;
                }
                e.preventDefault();
                hidePronunciation();
                el.classList.add('tooltip-active');
                pronunciationTimer = setTimeout(hidePronunciation, 1850);
            });
        });

        window.addEventListener('scroll', hidePronunciation, { passive: true });
        window.addEventListener('touchstart', hidePronunciation, { passive: true });

        // Falling characters
        const container = document.getElementById('falling-container');
        if (container) {
            const symbols = ['\u2295', '<<<', '>>>', '\u2200', 'RSA', 'Markov', '\u2202', '\u2203', '\u2205', 'Key-recovery', '\u221B', '\u221E', '\u222C', '\u222D', '\u222E', 'FFT', '\u229E', '\u229F', '\u2A27', '\u2230', 'SPECK', '\u2234', '\u2235', ' T\u2080', 'T\u2081', 'T\u2082', '\u2208', 'Bernstein', '\u2208', '\u2211', 'Shamir', '\u2243', '\u2208', '\u8747', 'bias', 'φ', '\u227A', 'correlation', '\u2227', '\u2228', '[', ']', '\u{1D53D}\u2082', '\u221A', '0', '1', 'f', 'div', 'F', 'curl', 'π', '\u03B3', '\u0393', 'ζ', '{', '}', 'Pr', 'AES', 'ChaCha', 'Salsa', 'Gauss', 'Euler', 'Urysohn', 'e', '+'];

            const MAX_SYMBOLS = 10;
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

                container.appendChild(char);
                activeSymbols++;

                char.addEventListener('animationend', () => {
                    char.remove();
                    activeSymbols--;
                });
            }

            setInterval(createChar, 3000);
            for (let i = 0; i < 4; i++) {
                setTimeout(createChar, i * 2500);
            }
        }

        // Scroll position persistence (only if scrolled down)
            window.addEventListener('beforeunload', () => {
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
            document.documentElement.classList.add('loaded');
