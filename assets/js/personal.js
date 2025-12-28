// =================================================================
// PERSONAL SECTION JAVASCRIPT
// =================================================================
// Handles interactive features for the personal section pages:
// - Theme toggle (dark mode by default)
// - Image lightbox for photo viewing
// - View more/less toggle buttons
// - Tag filtering for blog posts
// =================================================================

// -----------------------------------------------------------------
// THEME TOGGLE (Personal Section)
// -----------------------------------------------------------------
// Personal section defaults to dark theme (different aesthetic from main)
// Uses 'personal-theme' key in sessionStorage (separate from main page)
// Resets to dark when browser tab closes
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

// -----------------------------------------------------------------
// IMAGE LIGHTBOX (Full-screen Photo Viewer)
// -----------------------------------------------------------------
// Allows clicking on photos to view them in full-screen overlay
// Works with: .photo-frame img, .gallery-item img, .story-photo img
// Close methods: Click close button, click outside, press ESC key
// -----------------------------------------------------------------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

if (lightbox && lightboxImg) {
    // Find all clickable images on the page
    const images = document.querySelectorAll('.photo-frame img, .gallery-item img, .story-photo img');

    // Add click handler to each image
    images.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;                    // Set lightbox image source
            lightboxCaption.textContent = img.alt || '';  // Set caption from alt text
            lightbox.classList.add('active');             // Show lightbox
            document.body.style.overflow = 'hidden';      // Prevent background scrolling
        });
    });

    // Function to close lightbox and restore scrolling
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';  // Restore scrolling
    }

    // Close button handler
    if (lightboxClose) {
        lightboxClose.addEventListener('click', (e) => {
            e.stopPropagation();  // Don't trigger lightbox click
            closeLightbox();
        });
    }

    // Click outside image to close
    lightbox.addEventListener('click', closeLightbox);

    // Prevent closing when clicking the image itself
    lightboxImg.addEventListener('click', (e) => e.stopPropagation());

    // ESC key to close lightbox
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// -----------------------------------------------------------------
// VIEW MORE/LESS TOGGLE BUTTONS
// -----------------------------------------------------------------
// Expands/collapses content sections with "view more" buttons
// Uses data-target attribute to identify which element to toggle
// Tracks state with data-collapsed attribute
// -----------------------------------------------------------------
document.querySelectorAll('.view-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;              // ID of element to toggle
        const target = document.getElementById(targetId);
        const isCollapsed = btn.dataset.collapsed === 'true';

        if (isCollapsed) {
            // Expand content
            target.classList.remove('collapsed');
            btn.textContent = 'show less';
            btn.dataset.collapsed = 'false';
        } else {
            // Collapse content
            target.classList.add('collapsed');
            // Use different text based on target type
            btn.textContent = targetId.includes('links') ? 'read more' : 'view more';
            btn.dataset.collapsed = 'true';
        }
    });
});

// -----------------------------------------------------------------
// TAG FILTERING (Blog Posts)
// -----------------------------------------------------------------
// Filters blog entries by tag when clicking filter chips
// Shows/hides entries based on their data-tags attribute
// Filter options: 'all', 'vlog', 'math', 'notes', 'travel', etc.
// -----------------------------------------------------------------
const filterChips = document.querySelectorAll('.filter-chip');
const entries = document.querySelectorAll('.entry[data-tags]');

if (filterChips.length > 0 && entries.length > 0) {
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Update active state on chips
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            // Get selected filter
            const filter = chip.dataset.filter.toLowerCase();

            // Show/hide entries based on filter
            entries.forEach(entry => {
                const tags = entry.dataset.tags || '';
                // Show if "all" selected OR tag matches filter
                entry.style.display = (filter === 'all' || tags.includes(filter)) ? 'block' : 'none';
            });
        });
    });
}
