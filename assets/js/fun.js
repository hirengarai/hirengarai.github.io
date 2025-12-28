        // Theme toggle - dark by default for personal zone
        const themeToggle = document.getElementById('theme-toggle');
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');
        const html = document.documentElement;

        // Check for saved personal zone theme, default to dark
        const savedTheme = localStorage.getItem('personal-theme');
        if (savedTheme) {
            html.setAttribute('data-theme', savedTheme);
        }
        // If no saved theme, HTML already has data-theme="dark"

        function toggleTheme() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('personal-theme', newTheme);
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
                window.location.href = '/vault-5b2c9/personal.html';
            }, 300);
        });
