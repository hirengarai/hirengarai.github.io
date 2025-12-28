// ===========================================
// PERSONAL HUB (personal.html) SCRIPTS
// ===========================================

// Theme toggle - dark by default for personal zone
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const html = document.documentElement;

// Check for saved personal zone theme, default to dark
const savedTheme = localStorage.getItem('personal-theme');
html.setAttribute('data-theme', savedTheme || 'dark');

function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('personal-theme', newTheme);
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
