/* -------------------------------------------------
   script.js – Scroll- & Burger-Logik (Version 1.4.38)
   ------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // Elemente
    const nav        = document.querySelector('.nav');
    const navToggle  = document.querySelector('.nav-toggle');
    const hero       = document.querySelector('.hero');
    const info       = document.querySelector('.info');
    const footer     = document.querySelector('.site-footer');
    const trigger    = document.getElementById('scroll-trigger'); // Desktop-Trigger
    const discordBtn = document.getElementById('discordBtn');

    // Header: dauerhaft schwarz – kein Scroll-Handler nötig

    // Burger-Menü öffnen/schließen (Icon -> weißes Kreuz via CSS .nav.open)
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const opened = nav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', opened);
        });
    }

    // Gerätespezifische Logik (Desktop unverändert, Mobile stabil)
    const isMobile = window.matchMedia('(max-width: 480px)').matches;

    if (!isMobile) {
        // DESKTOP: Original-Verhalten (wie in der funktionierenden v1.4.32)
        const heroInfoObserver = new IntersectionObserver(
            entries => {
                const entry = entries[0];
                if (hero) hero.classList.toggle('hide-hero', entry.isIntersecting);
                if (info) info.classList.toggle('show-info', entry.isIntersecting);
            },
            { root: null, threshold: 0 }
        );
        if (trigger) heroInfoObserver.observe(trigger);

    } else {
        // MOBILE: Stabiler Scroll-Handler (unabhängig von Chrome-Adressleiste)
        let infoShown = false;
        let heroHeight = 0;

        const recalc = () => {
            heroHeight = hero ? hero.getBoundingClientRect().height : 0;
        };
        recalc();

        // Schwellenwerte für Mobilgeräte
        const MOBILE_HERO_HIDE_RATIO    = 0.45; // Hero ausblenden nach ~45% seiner Höhe
        const MOBILE_INFO_SHOW_RATIO    = 0.70; // Info zeigen ab ~70% der Hero-Höhe gescrollt
        const MOBILE_INFO_VIEW_FRACTION = 0.60; // Alternative: Info-Top < 60% der Viewport-Höhe

        const onScrollMobile = () => {
            const y = window.scrollY || document.documentElement.scrollTop;

            // 1) Hero ausblenden, sobald ~45% des Hero-Bereichs gescrollt sind
            if (hero) {
                const hide = y > (heroHeight * MOBILE_HERO_HIDE_RATIO);
                hero.classList.toggle('hide-hero', hide);
            }

            // 2) Info einblenden – erst im unteren Bereich, dann dauerhaft sichtbar
            if (info && !infoShown) {
                const infoTop = info.getBoundingClientRect().top;

                // Variante A: basierend auf Scrollweg relativ zur Hero-Höhe
                const conditionByScroll = y >= (heroHeight * MOBILE_INFO_SHOW_RATIO);
                // Variante B: basierend auf Position des Info-Top im Viewport
                const conditionByViewport = infoTop < (window.innerHeight * MOBILE_INFO_VIEW_FRACTION);

                if (conditionByScroll || conditionByViewport) {
                    info.classList.add('show-info');
                    infoShown = true; // nicht wieder entfernen -> kein Flackern
                }
            }
        };

        // Initial prüfen und Events setzen
        onScrollMobile();
        window.addEventListener('scroll', onScrollMobile, { passive: true });
        window.addEventListener('resize', () => { recalc(); onScrollMobile(); });
        window.addEventListener('orientationchange', () => { recalc(); onScrollMobile(); });
    }

    // Footer Fade-In (beide Geräte)
    if (footer) {
        const footerObserver = new IntersectionObserver(
            entries => {
                footer.classList.toggle('visible', entries[0].isIntersecting);
            },
            { root: null, threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
        );
        footerObserver.observe(footer);
    }

    // Discord-Button
    const DISCORD_LINK = 'https://discord.gg/DEIN-EINLADUNGSCODE'; // ← anpassen
    if (discordBtn) {
        discordBtn.addEventListener('click', () => {
            window.open(DISCORD_LINK, '_blank');
        });
    }
});
