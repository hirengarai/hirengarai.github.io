// ===========================================
// THEME - Theme toggle and persistence
// ===========================================

(function() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Determine which storage key to use
    const isPersonalZone = document.body.classList.contains('personal-zone');
    const storageKey = isPersonalZone ? 'personal-theme' : 'theme';
    
    // Get saved theme
    const savedTheme = localStorage.getItem(storageKey);
    
    if (isPersonalZone) {
        // Personal zone: dark by default
        if (savedTheme) {
            html.setAttribute('data-theme', savedTheme);
        }
        // If no saved theme, keep the default dark from HTML
    } else {
        // Main site: follow system preference
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            html.setAttribute('data-theme', savedTheme);
        } else {
            html.setAttribute('data-theme', systemDark ? 'dark' : 'light');
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(storageKey)) {
                html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    }
    
    // Toggle button click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem(storageKey, newTheme);
        });
    }
})();

// ===========================================
// SCROLL PERSISTENCE
// ===========================================

(function() {
    // Save scroll position before unload
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('scrollPosition', window.scrollY);
    });

    // Restore scroll position on load
    window.addEventListener('load', () => {
        const savedScroll = sessionStorage.getItem('scrollPosition');
        if (savedScroll) {
            window.scrollTo(0, parseInt(savedScroll));
        }
    });
})();
