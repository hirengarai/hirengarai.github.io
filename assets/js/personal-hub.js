// =================================================================
// PERSONAL HUB PAGE JAVASCRIPT
// =================================================================
// Handles the personal section landing page (archive/personal.html)
// Features:
// - Theme toggle (dark mode by default)
// - Card-based navigation to different personal sections
// =================================================================

// -----------------------------------------------------------------
// THEME TOGGLE (Personal Hub)
// -----------------------------------------------------------------
// Archive section defaults to dark theme (separate world aesthetic)
// Uses 'personal-theme' key in sessionStorage
// Syncs with other personal section pages
// -----------------------------------------------------------------
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const html = document.documentElement;

// Toggle between light and dark theme
function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    // Use sessionStorage so it resets to dark when tab is closed
    sessionStorage.setItem('personal-theme', newTheme);
}

// Attach toggle handlers to both desktop and mobile buttons
if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
