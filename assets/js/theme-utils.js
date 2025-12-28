// =================================================================
// SHARED THEME UTILITIES
// =================================================================
// Reusable theme functions to eliminate code duplication
// Used across main page and personal sections
// =================================================================

/**
 * Toggles between light and dark theme
 * @param {HTMLElement} html - The document root element
 * @param {string} storageKey - The sessionStorage key ('theme' or 'personal-theme')
 */
function toggleTheme(html, storageKey = 'theme') {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    sessionStorage.setItem(storageKey, newTheme);
}

/**
 * Initializes theme from storage or system preference
 * @param {string} storageKey - The sessionStorage key to check
 * @param {string} defaultTheme - Default theme if no preference ('light' or 'dark')
 * @returns {string} The theme to apply ('light' or 'dark')
 */
function initTheme(storageKey = 'theme', defaultTheme = null) {
    const savedTheme = sessionStorage.getItem(storageKey);

    // If valid saved theme exists, use it
    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
    }

    // If default theme specified, use it
    if (defaultTheme === 'dark' || defaultTheme === 'light') {
        return defaultTheme;
    }

    // Otherwise, use system preference
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemDark ? 'dark' : 'light';
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { toggleTheme, initTheme };
}
