        // Archive section defaults to dark (different world aesthetic)
        const themeToggle = document.getElementById('theme-toggle');
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');
        const html = document.documentElement;

        // Use sessionStorage so it resets to dark when tab is closed
        const savedTheme = sessionStorage.getItem('personal-theme');
        const theme = (savedTheme === 'dark' || savedTheme === 'light')
            ? savedTheme
            : 'dark'; // Default to dark mode
        html.setAttribute('data-theme', theme);

        function toggleTheme() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            sessionStorage.setItem('personal-theme', newTheme);
        }

        themeToggle.addEventListener('click', toggleTheme);
        themeToggleMobile.addEventListener('click', toggleTheme);

        // Door icon animation on click
        const posterLink = document.getElementById('poster-link');
        const doorIcon = document.getElementById('door-icon');

        posterLink.addEventListener('click', (e) => {
            e.preventDefault();
            doorIcon.textContent = 'door_open';
            doorIcon.style.color = 'var(--glow)';
            
            setTimeout(() => {
                window.location.href = '/archive/personal.html';
            }, 300);
        });
