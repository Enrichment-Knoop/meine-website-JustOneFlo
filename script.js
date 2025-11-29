/* -------------------------------------------------
   script.js – Scroll‑ & Burger‑Logik (Version 1.4.34)
   ------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    /* -------------------------------------------------
       0. Grundelemente
       ------------------------------------------------- */
    const nav        = document.querySelector('.nav');
    const navToggle  = document.querySelector('.nav-toggle');
    const hero       = document.querySelector('.hero');
    const info       = document.querySelector('.info');
    const footer     = document.querySelector('.site-footer');
    const trigger    = document.getElementById('scroll-trigger'); // nur für Desktop
    const discordBtn = document.getElementById('discordBtn');

    /* -------------------------------------------------
       1. Navbar‑Fade‑In (bei jedem Scroll)
       ------------------------------------------------- */
    window.addEventListener('scroll', () => {
        nav.classList.toggle('active', window.scrollY > 150);
    });

    /* -------------------------------------------------
       2. Burger‑Menü öffnen / schließen
       ------------------------------------------------- */
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const opened = nav.classList.toggle('open');   // true = Menü offen
            navToggle.setAttribute('aria-expanded', opened);
            /* Das weiße Kreuz wird ausschließlich über CSS‑Animation
               (Klasse .open) gesteuert – hier nichts weiter nötig. */
        });
    }

    /* -------------------------------------------------
       3. Scroll‑Logik – Desktop vs. Mobile
       ------------------------------------------------- */
    const isMobile = window.innerWidth <= 480;   // Schwelle für „Smartphone“

    /* ---------- 3.1 Desktop (wie in Version 1.4.32) ---------- */
    if (!isMobile) {
        /* ---- Hero ausblenden (wenn Trigger im Viewport ist) ---- */
        const heroObserver = new IntersectionObserver(
            entries => {
                const entry = entries[0];
                hero.classList.toggle('hide-hero', entry.isIntersecting);
            },
            { root: null, threshold: 0 }               // sofort auslösen
        );
        if (trigger) heroObserver.observe(trigger);

        /* ---- Info einblenden (wenn Trigger im Viewport ist) ---- */
        const infoObserver = new IntersectionObserver(
            entries => {
                const entry = entries[0];
                info.classList.toggle('show-info', entry.isIntersecting);
            },
            { root: null, threshold: 0 }
        );
        if (trigger) infoObserver.observe(trigger);
    }

    /* ---------- 3.2 Mobile (reines Scroll‑Event) ---------- */
    if (isMobile) {
        let infoShown = false;                     // verhindert mehrfaches Ausblenden
        const heroHeight = hero ? hero.offsetHeight : 0;

        const onScrollMobile = () => {
            const scrollY = window.scrollY;

            /* ---- 3.2.1 Hero ausblenden (nach 50 % seiner Höhe) ---- */
            if (hero) {
                const hideHero = scrollY > heroHeight * 0.5;   // 50 % des Hero‑Bereichs
                hero.classList.toggle('hide-hero', hideHero);
            }

            /* ---- 3.2.2 Info einblenden (früh genug) ---- */
            if (info && !infoShown) {
                const infoTop = info.getBoundingClientRect().top; // Abstand zum Viewport‑Oben
                const viewportHeight = window.innerHeight;

                // Sobald das Info‑Element höchstens 30 px unter dem unteren Viewport‑Rand liegt
                if (infoTop < viewportHeight - 30) {
                    info.classList.add('show-info');
                    infoShown = true;               // nie wieder entfernen
                }
            }
        };

        // Direkt beim Laden prüfen (falls die Seite bereits gescrollt ist)
        onScrollMobile();

        // Scroll‑ und Resize‑Events (Resize ist wichtig, weil die Chrome‑Bar die Viewport‑Höhe ändert)
        window.addEventListener('scroll', onScrollMobile);
        window.addEventListener('resize', onScrollMobile);
    }

    /* -------------------------------------------------
       4. Footer‑Fade‑In (gemeinsam für beide Varianten)
       ------------------------------------------------- */
    const footerObserver = new IntersectionObserver(
        entries => {
            footer.classList.toggle('visible', entries[0].isIntersecting);
        },
        { root: null, threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );
    if (footer) footerObserver.observe(footer);

    /* -------------------------------------------------
       5. Discord‑Button
       ------------------------------------------------- */
    const DISCORD_LINK = 'https://discord.gg/DEIN-EINLADUNGSCODE'; // ← anpassen
    if (discordBtn) {
        discordBtn.addEventListener('click', () => {
            window.open(DISCORD_LINK, '_blank');
        });
    }
});
