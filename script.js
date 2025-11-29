/* -------------------------------------------------
   script.js – Scroll‑ & Burger‑Logik (Version 1.4.30)
   ------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const nav        = document.querySelector('.nav');
    const navToggle  = document.querySelector('.nav-toggle');
    const hero       = document.querySelector('.hero');
    const info       = document.querySelector('.info');
    const footer     = document.querySelector('.site-footer');
    const trigger    = document.getElementById('scroll-trigger');
    const discordBtn = document.getElementById('discordBtn');

    /* ---------- Navbar‑Fade‑In (Scroll) ---------- */
    window.addEventListener('scroll', () => {
        nav.classList.toggle('active', window.scrollY > 150);
    });

    /* ---------- Burger‑Menü öffnen / schließen ---------- */
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open'); // true → geöffnet
            navToggle.setAttribute('aria-expanded', isOpen);
            // Das Kreuz‑/Burger‑Icon wechselt automatisch dank CSS‑Animation
        });
    }

    /* ---------- Hero ↔ Info ein‑/ausblenden (Scroll) ----------
       Auf Smartphones wird das Ausblenden deaktiviert, weil das
       Trigger‑Element sofort im Viewport liegt. */
    const heroInfoObserver = new IntersectionObserver(
        entries => {
            const entry = entries[0];
            const isMobile = window.innerWidth <= 480;
            if (!isMobile) {
                hero.classList.toggle('hide-hero', entry.isIntersecting);
                info.classList.toggle('show-info', entry.isIntersecting);
            }
        },
        { root: null, threshold: 0 }
    );
    if (trigger) heroInfoObserver.observe(trigger);

    /* ---------- Footer Fade‑In ---------- */
    const footerObserver = new IntersectionObserver(
        entries => {
            footer.classList.toggle('visible', entries[0].isIntersecting);
        },
        { root: null, threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );
    if (footer) footerObserver.observe(footer);

    /* ---------- Discord‑Button ---------- */
    const DISCORD_LINK = 'https://discord.gg/DEIN-EINLADUNGSCODE'; // ← anpassen
    if (discordBtn) {
        discordBtn.addEventListener('click', () => {
            window.open(DISCORD_LINK, '_blank');
        });
    }
});
