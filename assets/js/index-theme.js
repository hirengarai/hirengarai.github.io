// =================================================================
// MAIN PAGE THEME INITIALIZATION
// =================================================================
// Runs immediately to prevent flash of unstyled content (FOUC)
// Uses sessionStorage so theme resets when tab closes
// Falls back to system preference (prefers-color-scheme)
// =================================================================

(function () {
    try {
        const savedTheme = sessionStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Use saved theme if valid, otherwise use system preference
        const theme = (savedTheme === 'dark' || savedTheme === 'light')
            ? savedTheme
            : (systemDark ? 'dark' : 'light');

        document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
        // Fallback to light theme if any error occurs
        document.documentElement.setAttribute('data-theme', 'light');
    }
})();
