// ===========================================
// PERSONAL - Door animation, etc.
// ===========================================

// -----------------------------------------
// Door Icon Animation (Fun page)
// -----------------------------------------
const posterLink = document.getElementById('poster-link');
const doorIcon = document.getElementById('door-icon');

if (posterLink && doorIcon) {
    posterLink.addEventListener('click', (e) => {
        e.preventDefault();
        doorIcon.textContent = 'door_open';
        doorIcon.style.color = 'var(--glow)';
        
        setTimeout(() => {
            window.location.href = posterLink.href;
        }, 300);
    });
}
