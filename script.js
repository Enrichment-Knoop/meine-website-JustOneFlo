/* -------------------------------------------------
   script.js – Scroll- & Burger-Logik (Version 1.4.36)
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

    // Navbar abdunkeln bei Scroll
    window.addEventListener('scroll', () => {
        nav.classList.toggle('active', window.scrollY > 150);
    }, { passive: true });

    // Burger-Menü öffnen/schließen (Icon -> weißes Kreuz via CSS)
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const opened = nav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', opened);
        });
    }

    // Gerätespezifische Logik
    const isMobile = window.matchMedia('(max-width: 480px)').matches;

    if (!isMobile) {
        // DESKTOP: Original-Verhalten wie die funktionierende v1.4.32
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

        const onScrollMobile = () => {
            const y = window.scrollY || document.documentElement.scrollTop;

            // Hero früher ausblenden (ca. nach 35% der Hero-Höhe)
            if (hero) {
                const hide = y > heroHeight * 0.35;
                hero.classList.toggle('hide-hero', hide);
            }

            // Info früh zeigen und sichtbar lassen
            if (info && !infoShown) {
                const infoTop = info.getBoundingClientRect().top;
                if (infoTop < window.innerHeight - 60) {
                    info.classList.add('show-info');
                    infoShown = true; // bleibt sichtbar
                }
            }
        };

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
