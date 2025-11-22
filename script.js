/* -------------------------------------------------
   script.js – Scroll‑Logik (IntersectionObserver)
   ------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    /* ---- Elemente holen ---- */
    const nav        = document.querySelector('.nav');
    const hero       = document.querySelector('.hero');
    const info       = document.querySelector('.info');
    const footer     = document.querySelector('.site-footer');
    const trigger    = document.getElementById('scroll‑trigger'); // Marker‑Div
    const discordBtn = document.getElementById('discordBtn');

    /* -------------------------------------------------
       1. Navbar‑Hintergrund (einfaches Scroll‑Check)
       ------------------------------------------------- */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });

    /* -------------------------------------------------
       2. Hero ↔ Info Umschaltung
          – Wenn der Marker‑Div sichtbar wird, sind wir im
          unteren Bereich → Hero ausblenden, Info einblenden.
          – Beim Verlassen des Viewports (nach oben scrollen)
          geschieht das Gegenteil.
       ------------------------------------------------- */
    const heroInfoObserver = new IntersectionObserver(
        entries => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                // Marker im Sichtfeld → unterer Teil aktiv
                hero.classList.add('hide-hero');
                info.classList.add('show-info');
            } else {
                // Marker nicht mehr sichtbar → zurück nach oben
                hero.classList.remove('hide-hero');
                info.classList.remove('show-info');
            }
        },
        {
            root: null,               // viewport
            threshold: 0,             // schon bei 1 px Sichtbarkeit
        }
    );
    heroInfoObserver.observe(trigger);

    /* -------------------------------------------------
       3. Footer (Impressum) einblenden
          – Sobald mindestens 10 % des Footers sichtbar sind,
            wird er eingeblendet.
       ------------------------------------------------- */
    const footerObserver = new IntersectionObserver(
        entries => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                footer.classList.add('visible');
            } else {
                footer.classList.remove('visible');
            }
        },
        {
            root: null,
            threshold: 0.1,          // 10 % sichtbar → einblenden
            rootMargin: '0px 0px -80px 0px' // 80 px bevor das Ende erreicht ist
        }
    );
    footerObserver.observe(footer);

    /* -------------------------------------------------
       4. Discord‑Button
       ------------------------------------------------- */
    const DISCORD_LINK = 'https://discord.gg/DEIN-EINLADUNGSCODE'; // ← anpassen
    if (discordBtn) {
        discordBtn.addEventListener('click', () => {
            window.open(DISCORD_LINK, '_blank');
        });
    }
});
