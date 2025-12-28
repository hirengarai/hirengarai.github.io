// ===========================================
// PERSONAL SECTION SCRIPTS
// ===========================================

// Personal section defaults to dark (different world aesthetic)
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

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

if (lightbox && lightboxImg) {
    const images = document.querySelectorAll('.photo-frame img, .gallery-item img, .story-photo img');
    images.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxCaption.textContent = img.alt || '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });
    }
    
    lightbox.addEventListener('click', closeLightbox);
    lightboxImg.addEventListener('click', (e) => e.stopPropagation());
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// View more toggle
document.querySelectorAll('.view-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const target = document.getElementById(targetId);
        const isCollapsed = btn.dataset.collapsed === 'true';
        
        if (isCollapsed) {
            target.classList.remove('collapsed');
            btn.textContent = 'show less';
            btn.dataset.collapsed = 'false';
        } else {
            target.classList.add('collapsed');
            btn.textContent = targetId.includes('links') ? 'read more' : 'view more';
            btn.dataset.collapsed = 'true';
        }
    });
});

// Filter chips
const filterChips = document.querySelectorAll('.filter-chip');
const entries = document.querySelectorAll('.entry[data-tags]');

if (filterChips.length > 0 && entries.length > 0) {
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            const filter = chip.dataset.filter.toLowerCase();
            entries.forEach(entry => {
                const tags = entry.dataset.tags || '';
                entry.style.display = (filter === 'all' || tags.includes(filter)) ? 'block' : 'none';
            });
        });
    });
}
