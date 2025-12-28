// ===========================================
// PERSONAL HUB (personal.html) SCRIPTS
// ===========================================

// Archive section defaults to dark (different world aesthetic)
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const html = document.documentElement;

function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    // Use sessionStorage so it resets to dark when tab is closed
    sessionStorage.setItem('personal-theme', newTheme);
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
