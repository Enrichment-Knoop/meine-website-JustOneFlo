/* -------------------------------------------------
   script.js – Navbar‑Scroll‑Effekt, Discord‑Button,
                Hero‑Ein‑/Ausblenden, Info‑ & Footer‑Einblenden
   ------------------------------------------------- */

/* ---- Elemente holen ---- */
const nav    = document.querySelector('.nav');
const hero   = document.querySelector('.hero');
const info   = document.querySelector('.info');
const footer = document.querySelector('.site-footer');

/* ---- Scroll‑Position merken ---- */
let lastScrollY = window.scrollY;

/* ---- Hilfsfunktion: Footer fast sichtbar? ---- */
function shouldShowFooter() {
    const triggerOffset = 150;                     // px Abstand zum Seitenende
    const pageBottom    = document.documentElement.scrollHeight;
    const viewportBottom = window.scrollY + window.innerHeight;
    return viewportBottom + triggerOffset >= pageBottom;
}

/* ---- Scroll‑Handler ---- */
window.addEventListener('scroll', () => {
    /* ----- Navbar‑Hintergrund ----- */
    if (window.scrollY > 150) {
        nav.classList.add('active');
    } else {
        nav.classList.remove('active');
    }

    /* ----- Hero‑Ein‑/Ausblenden + Info‑Einblenden ----- */
    const currentY = window.scrollY;

    // Runter‑scrollen → Hero ausblenden, Info einblenden
    if (currentY > lastScrollY + 5) {
        hero.classList.add('hide-hero');
        info.classList.add('show-info');
    }
    // Hoch‑scrollen → Hero einblenden, Info ausblenden
    else if (currentY < lastScrollY - 5) {
        hero.classList.remove('hide-hero');
        info.classList.remove('show-info');
    }

    /* ----- Footer einblenden, wenn er fast im Viewport ist ----- */
    if (shouldShowFooter()) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }

    lastScrollY = currentY;
});

/* ---- Discord‑Button ---- */
const DISCORD_LINK = 'https://discord.gg/DEIN-EINLADUNGSCODE'; // ← hier anpassen
const discordBtn   = document.getElementById('discordBtn');

if (discordBtn) {
    discordBtn.addEventListener('click', () => {
        window.open(DISCORD_LINK, '_blank');
    });
}
