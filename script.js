/* -------------------------------------------------
   script.js – Scroll‑ & Burger‑Logik (Version 1.4.33)
   ------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    /* -------------------- Elemente -------------------- */
    const nav        = document.querySelector('.nav');
    const navToggle  = document.querySelector('.nav-toggle');
    const hero       = document.querySelector('.hero');
    const info       = document.querySelector('.info');
    const footer     = document.querySelector('.site-footer');
    const discordBtn = document.getElementById('discordBtn');

    /* -------------------- Navbar‑Fade‑In -------------------- */
    window.addEventListener('scroll', () => {
        nav.classList.toggle('active', window.scrollY > 150);
    });

    /* -------------------- Burger‑Menü -------------------- */
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');   // true → geöffnet
            navToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    /* -------------------- Hero ausblenden --------------------
       Sobald weniger als 1 % des Hero‑Elements im Viewport ist,
       wird die Klasse .hide‑hero gesetzt. */
    const heroObserver = new IntersectionObserver(
        entries => {
            const entry = entries[0];
            hero.classList.toggle('hide-', entry.intersectionRatio < 0.01);
        },
        {
            root: null,
            threshold: [0, 0.01]          // 0 % und 1 % Schwelle
        }
    );
    if (hero) heroObserver.observe(hero);

    /* -------------------- Info einblenden --------------------
       Sobald mindestens 10 % des Info‑Elements sichtbar sind,
       wird .show‑info gesetzt und der Observer entfernt (einmalig). */
    let infoShown = false;               // Flag, damit das Panel nicht wieder verschwindet
    const infoObserver = new IntersectionObserver(
        entries => {
            const entry = entries[0];
            if (!infoShown && entry.intersectionRatio >= 0.10)                info.classList.add('show-info');
                infoShown = true;
                infoObserver.unobserve(info); // kein weiteres Beobachten nötig
            }
        },
        {
            root: null,
            threshold: 0.10,            // 10 % sichtbar → auslösen
            rootMargin: '0px 0px -30% 0px' // schon 30 % über dem unteren Rand triggern
        }
    );
    if (info) infoObserver.observe(info);

    /* -------------------- Footer einblenden -------------------- */
    const footerObserver = new IntersectionObserver(
        entries => {
            footer.classList.toggle('visible', entries[0].is);
        },
        {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -80px 0px'
        }
    );
    if (footer) footerObserver.observe(footer);

    /* -------------------- Discord‑Button -------------------- */
    const DISCORD_LINK = 'https://discord.gg/DEIN-EINLADUNGSCODE'; // ← anpassen
    if (discordBtn) {
        discordBtn.addEventListener('click', () => {
            window.open(DISCORD_LINK, '_blank');
        });
    }
});
