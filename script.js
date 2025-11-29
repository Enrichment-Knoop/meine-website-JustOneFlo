/* -------------------------------------------------
   script.js – Scroll‑ & Burger‑Logik (Version 1.4.32)
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
            const isOpen = nav.classList.toggle('open');   // true → geöffnet
            navToggle.setAttribute('aria-expanded', isOpen);
            // Das weiße Kreuz wird ausschließlich über CSS‑Animation gesteuert.
        });
    }

    /* ---------- Hero ↔ Info ein‑/ausblenden (Scroll) ----------
       Unterschiedliche Konfiguration für Desktop und Mobile */
    const createObserver = (options) => {
        return new IntersectionObserver(
            entries => {
                const entry = entries[0];
                hero.classList.toggle('hide-hero', entry.isIntersecting);
                info.classList.toggle('show-info', entry.isIntersecting);
            },
            options
        );
    };

    // Desktop (Breite > 480 px) – exakt wie vorher, kein rootMargin
    const desktopObserver = createObserver({ root: null, threshold: 0 });

    // Mobile (≤ 480 px) – mit rootMargin, damit das Trigger‑Element erst
    // wirksam wird, wenn es aus dem Viewport nach unten geschoben wird.
    const mobileObserver = createObserver({
        root: null,
        threshold: 0,
        rootMargin: '0px 0px -80% 0px'
    });

    // Entscheide beim Laden, welchen Observer wir benutzen.
    const observer = (window.innerWidth > 480) ? desktopObserver : mobileObserver;
    if (trigger) observer.observe(trigger);

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
