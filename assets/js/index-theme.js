(function () {
    try {
        // Use sessionStorage so theme resets when tab is closed
        const savedTheme = sessionStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = (savedTheme === 'dark' || savedTheme === 'light')
            ? savedTheme
            : (systemDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
        document.documentElement.setAttribute('data-theme', 'light');
    }
})();
