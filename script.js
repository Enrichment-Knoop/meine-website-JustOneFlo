/* -------------------------------------------------
   script.js – Scroll‑Logik (IntersectionObserver)
   ------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const nav        = document.querySelector('.nav');
    const hero       = document.querySelector('.hero');
    const info       = document.querySelector('.info');
    const footer     = document.querySelector('.site-footer');
    const trigger    = document.getElementById('scroll-trigger');
    const discordBtn = document.getElementById('discordBtn');

    /* Navbar‑Fade‑In */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });

    /* Hero ↔ Info Umschaltung */
    const heroInfoObserver = new IntersectionObserver(
        entries => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                hero.classList.add('hide-hero');
                info.classList.add('show-info');
            } else {
                hero.classList.remove('hide-hero');
                info.classList.remove('show-info');
            }
        },
        { root: null, threshold: 0 }
    );
    heroInfoObserver.observe(trigger);

    /* Footer‑Fade‑In */
    const footerObserver = new IntersectionObserver(
        entries => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                footer.classList.add('visible');
            } else {
                footer.classList.remove('visible');
            }
        },
        { root: null, threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );
    footerObserver.observe(footer);

    /* Discord‑Button */
    const DISCORD_LINK = 'https://discord.gg/DEIN-EINLADUNGSCODE'; // ← anpassen
    if (discordBtn) {
        discordBtn.addEventListener('click', () => {
            window.open(DISCORD_LINK, '_blank');
        });
    }
});
