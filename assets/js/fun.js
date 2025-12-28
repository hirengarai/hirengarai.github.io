// =================================================================
// FUN SECTION PAGE JAVASCRIPT
// =================================================================
// Handles the fun section page (archive/fun.html)
// Features:
// - Theme toggle (dark mode by default)
// - Door icon animation when navigating to personal section
// =================================================================

// -----------------------------------------------------------------
// THEME INITIALIZATION (Fun Section)
// -----------------------------------------------------------------
// Fun section defaults to dark theme (matches personal aesthetic)
// Uses 'personal-theme' key to sync with other personal pages
// -----------------------------------------------------------------
        const themeToggle = document.getElementById('theme-toggle');
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');
        const html = document.documentElement;

        // Initialize theme from storage or default to dark
        const savedTheme = sessionStorage.getItem('personal-theme');
        const theme = (savedTheme === 'dark' || savedTheme === 'light')
            ? savedTheme
            : 'dark'; // Default to dark mode
        html.setAttribute('data-theme', theme);

        // Toggle between light and dark theme
        function toggleTheme() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            sessionStorage.setItem('personal-theme', newTheme);
        }

        // Attach toggle handlers to both desktop and mobile buttons
        themeToggle.addEventListener('click', toggleTheme);
        themeToggleMobile.addEventListener('click', toggleTheme);

// -----------------------------------------------------------------
// DOOR ICON ANIMATION
// -----------------------------------------------------------------
// Animates door icon when clicking link to personal section
// Changes from closed door to open door with color change
// Navigates after 300ms animation delay
// -----------------------------------------------------------------
        const posterLink = document.getElementById('poster-link');
        const doorIcon = document.getElementById('door-icon');

        posterLink.addEventListener('click', (e) => {
            e.preventDefault();
            doorIcon.textContent = 'door_open';         // Change icon to open door
            doorIcon.style.color = 'var(--glow)';       // Change color

            // Navigate after animation completes
            setTimeout(() => {
                window.location.href = '/archive/personal.html';
            }, 300);
        });
