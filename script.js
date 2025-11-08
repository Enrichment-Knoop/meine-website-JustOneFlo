/* -------------------------------------------------
   script.js – Öffnet den Discord‑Einladungslink
   ------------------------------------------------- */

// Platzhalter‑URL – später durch deinen echten Einladungslink ersetzen
const DISCORD_LINK = 'https://discord.gg/DEIN-EINLADUNGSCODE';

// Button-Element holen
const btn = document.getElementById('discordBtn');

// Klick‑Handler registrieren
if (btn) {
    btn.addEventListener('click', () => {
        // Öffnet den Link in einem neuen Tab
        window.open(DISCORD_LINK, '_blank');
    });
}
