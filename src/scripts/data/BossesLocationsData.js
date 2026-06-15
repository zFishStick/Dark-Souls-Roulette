// darkSoulsData.js
// Dati dei boss / miniboss / location di Dark Souls (gioco base + DLC Artorias of the Abyss).
//
// NOTE SUI DATI:
// - health: HP a NG (New Game). Verificati per i boss chiave (Asylum 813, Gargoyles 999,
//   Capra 1176, Centipede 3432, Gaping Dragon 4660). Gli altri sono i valori NG standard
//   della community (FuturePress / wikidot).
// - damage: NON esiste un singolo "danno per boss" in DS. È una stima di design, scalata
//   sulla pericolosità reale del boss. Ritoccala pure liberamente.
// - winRate: parametro di gioco (probabilità che il player vinca). Più alto = più facile.
//   Tarato a occhio sulla difficoltà reputata del boss. Ho lasciato i tuoi ancoraggi
//   (Asylum 0.75, Gargoyles 0.65). Ho ABBASSATO Capra da 0.8 -> 0.55 perché è notoriamente
//   uno dei boss più ostici: cambialo se nel tuo design rappresenta altro.
// - Gli HP/danno dei MINIBOSS sono stime (il wiki non riporta valori precisi per tutti).

import { Boss } from '../Boss.js';
import { Location } from '../Location.js';

// Adatta questo percorso al tuo progetto (nel tuo codice IMG_PATH era già definito altrove).
const IMG_PATH = '../assets/img/bosses/';

/* ============================================================
   BOSS PRINCIPALI (Area Bosses)  —  health, damage, name, image, winRate
   ============================================================ */

// --- Prima Campana del Risveglio --- 813
const asylumDemon   = new Boss( 813, 150, 'Asylum Demon',          `${IMG_PATH}asylum_demon.jpg`,        0.75);
const taurusDemon   = new Boss( 856, 170, 'Taurus Demon',          `${IMG_PATH}taurus_demon.jpg`,        0.72);
const bellGargoyles = new Boss( 999, 140, 'Bell Gargoyles',        `${IMG_PATH}bell_gargoyles.jpg`,      0.65);

// --- Verso la Seconda Campana ---
const capraDemon    = new Boss(1176, 160, 'Capra Demon',           `${IMG_PATH}capra_demon.jpg`,         0.55); // opzionale (Lower Undead Burg)
const gapingDragon  = new Boss(4660, 220, 'Gaping Dragon',         `${IMG_PATH}gaping_dragon.jpg`,       0.62); // opzionale (Depths)
const quelaag       = new Boss(3431, 210, 'Chaos Witch Quelaag',   `${IMG_PATH}quelaag.jpg`,             0.60);

// --- Darkroot (opzionali ma sul percorso) ---
const moonlightButterfly = new Boss(1240, 130, 'Moonlight Butterfly', `${IMG_PATH}moonlight_butterfly.jpg`, 0.70); // opzionale
const sif                = new Boss(3505, 230, 'Sif, the Great Grey Wolf', `${IMG_PATH}sif.jpg`,           0.50); // opzionale

// --- Lordvessel ---
const ironGolem        = new Boss(3949, 240, 'Iron Golem',          `${IMG_PATH}iron_golem.jpg`,         0.60);
const ornsteinSmough   = new Boss(5371, 300, 'Ornstein & Smough',   `${IMG_PATH}ornstein_smough.jpg`,    0.40); // HP del superstite (Smough); l'altro guarisce al 100%

// --- Le quattro Anime dei Lord (in qualsiasi ordine) ---
const pinwheel    = new Boss( 411,  90, 'Pinwheel',                `${IMG_PATH}pinwheel.jpg`,            0.92); // The Catacombs (richiesto per Tomb of the Giants)
const nito        = new Boss(4537, 260, 'Gravelord Nito',          `${IMG_PATH}nito.jpg`,      0.55);
const bedOfChaos  = new Boss(   1, 250, 'The Bed of Chaos',        `${IMG_PATH}bed_of_chaos.jpg`,        0.40); // boss "gimmick": si distruggono i bulbi, non gli HP
const seath       = new Boss(5037, 280, 'Seath the Scaleless',     `${IMG_PATH}seath.jpg`,               0.52);
const fourKings   = new Boss(4000, 250, 'The Four Kings',          `${IMG_PATH}four_kings.jpg`,          0.45); // ~4000 HP CIASCUNO, compaiono in sequenza

// --- Finale ---
const gwyn        = new Boss(4327, 320, 'Gwyn, Lord of Cinder',    `${IMG_PATH}gwyn.jpg`,                0.50);

/* --- Boss OPZIONALI / secondari --- */
const gwyndolin       = new Boss(2399, 150, 'Dark Sun Gwyndolin',  `${IMG_PATH}gwyndolin.jpg`,           0.66); // Anor Londo (opzionale)
const priscilla       = new Boss(2118, 180, 'Crossbreed Priscilla',`${IMG_PATH}priscilla.jpg`,           0.70); // Painted World (opzionale)
const centipedeDemon  = new Boss(3432, 230, 'Centipede Demon',     `${IMG_PATH}centipede_demon.jpg`,     0.55); // Demon Ruins
const demonFiresage   = new Boss(3565, 250, 'Demon Firesage',      `${IMG_PATH}demon_firesage.jpg`,      0.56); // Demon Ruins
const ceaselessDischarge = new Boss(3739, 270, 'Ceaseless Discharge', `${IMG_PATH}ceaseless_discharge.jpg`, 0.55); // Demon Ruins
const strayDemon      = new Boss(2459, 220, 'Stray Demon',         `${IMG_PATH}stray_demon.jpg`,         0.55); // Asylum (ritorno)

/* --- DLC: Artorias of the Abyss (HP stimati/community) --- */
// const sanctuaryGuardian = new Boss(2536, 250, 'Sanctuary Guardian',      `${IMG_PATH}sanctuary_guardian.jpg`, 0.50);
// const artorias          = new Boss(3367, 300, 'Knight Artorias',         `${IMG_PATH}artorias.jpg`,           0.40);
// const manus             = new Boss(5430, 330, 'Manus, Father of the Abyss', `${IMG_PATH}manus.jpg`,           0.35);
// const kalameet          = new Boss(6587, 340, 'Black Dragon Kalameet',  `${IMG_PATH}kalameet.jpg`,           0.32);

export const bosses = [
    asylumDemon, taurusDemon, bellGargoyles, capraDemon, gapingDragon, quelaag,
    moonlightButterfly, sif, ironGolem, ornsteinSmough, pinwheel, nito, bedOfChaos,
    seath, fourKings, gwyn, gwyndolin, priscilla, centipedeDemon, demonFiresage,
    ceaselessDischarge, strayDemon,
    // DLC:
    // sanctuaryGuardian, artorias, manus, kalameet,
];

/* ============================================================
   MINIBOSS  (stime — il wiki non riporta valori precisi per tutti)
   ============================================================ */

const hydra              = new Boss(1349, 110, 'Hydra',                 `${IMG_PATH}hydra.jpg`,               0.60); // Darkroot Basin / Ash Lake
const armoredTusk        = new Boss( 948, 130, 'Armored Tusk',          `${IMG_PATH}armored_tusk.jpg`,        0.72); // il "cinghiale di ferro" (Undead Parish)
const blackKnight        = new Boss( 407, 150, 'Black Knight',          `${IMG_PATH}black_knight.jpg`,        0.60);
const butcher            = new Boss( 600, 120, 'Butcher',               `${IMG_PATH}butcher.jpg`,             0.70); // Depths
const havelTheRock       = new Boss(1200, 280, 'Havel the Rock',        `${IMG_PATH}havel.jpg`,               0.50); // Undead Burg (torre)
const hellkiteDragon     = new Boss(1500, 250, 'Hellkite Dragon',       `${IMG_PATH}hellkite_dragon.jpg`,     0.50); // il drago sul ponte Undead Burg
const giantUndeadRat     = new Boss( 350,  80, 'Giant Undead Rat',      `${IMG_PATH}giant_undead_rat.jpg`,    0.85); // Depths
const parasiticWallHugger= new Boss( 500, 100, 'Parasitic Wall Hugger', `${IMG_PATH}parasitic_wall_hugger.jpg`,0.85);// Blighttown
const prowlingDemon      = new Boss( 800, 150, 'Prowling Demon',        `${IMG_PATH}prowling_demon.jpg`,      0.60); // Sen's Fortress / Catacombs / ecc.
const undeadDragon       = new Boss(1000, 170, 'Undead Dragon',         `${IMG_PATH}undead_dragon.jpg`,       0.60); // Valley of Drakes / Painted World
const undeadPrinceRicard = new Boss( 500, 120, 'Undead Prince Ricard',  `${IMG_PATH}ricard.jpg`,              0.70); // Sen's Fortress
const goldenCrystalGolem = new Boss( 700, 110, 'Golden Crystal Golem',  `${IMG_PATH}golden_crystal_golem.jpg`,0.70); // Darkroot Basin / Duke's Archives

export const minibosses = [
    hydra, armoredTusk, blackKnight, butcher, havelTheRock, hellkiteDragon,
    giantUndeadRat, parasiticWallHugger, prowlingDemon, undeadDragon,
    undeadPrinceRicard, goldenCrystalGolem,
];
  
export const locations = [
    new Location('Creation Hub',                    null,               [], ["Select your class"]),

    // --- Prima Campana ---  //TODO: rimuovere havel dal Northen...
    new Location('Northern Undead Asylum',          asylumDemon,        [], ["Cross the Northern Undead Asylum"]),
    // new Location('Firelink Shrine',                 null,               [], []), // hub
    new Location('Undead Burg',                     taurusDemon,        [havelTheRock, hellkiteDragon],     ["Reach the top of Undead Burg"]),
    new Location('Lower Undead Burg',               capraDemon,         [],                                 ["Navigate the Lower Undead Burg"]), // opzionale
    new Location('Undead Parish',                   bellGargoyles,      [armoredTusk, blackKnight],         ["Ring the first Bell of Awakening"]),

    // --- Seconda Campana ---
    new Location('The Depths',                      gapingDragon,       [butcher, giantUndeadRat],          ["Descend into the Depths"]),
    new Location('Blighttown',                      quelaag,            [parasiticWallHugger],              ["Survive Blighttown"]),

    // --- Lordvessel ---
    new Location('Senʼs Fortress',                  ironGolem,          [undeadPrinceRicard, prowlingDemon],["Cross Sen’s Fortress"]),
    new Location('Anor Londo',                      ornsteinSmough,     [],                                 ["Reach the Cathedral of Anor Londo"]),
    new Location('Anor Londo — Darkmoon Tomb',      gwyndolin,          [],                                 ["Find the Darkmoon Tomb"]), // opzionale

    // --- Aree opzionali ---
    // new Location('Painted World of Ariamis',        priscilla,          [undeadDragon],                  ["Explore the Painted World"]), // opzionale

    // --- Le quattro Anime dei Lord ---
    new Location('The Catacombs',                   pinwheel,           [prowlingDemon],                    ["Navigate the Catacombs"]),
    new Location('Tomb of the Giants',              nito,               [],                                 ["Descend into the Tomb of the Giants"]),
    new Location('The Dukeʼs Archives',             seath,              [goldenCrystalGolem],               ["Infiltrate the Duke’s Archives"]),
    new Location('Demon Ruins',                     ceaselessDischarge, [],                                 ["Survive the Demon Ruins"]),
    new Location('Demon Ruins — Firesage',          demonFiresage,      [],                                 ["Reach the Demon Firesage"]),
    new Location('Demon Ruins — Centipede',         centipedeDemon,     [],                                 ["Find the Centipede Demon"]),
    new Location('Lost Izalith',                    bedOfChaos,         [],                                 ["Traverse Lost Izalith"]),

    // --- Darkroot ---
    new Location('Darkroot Garden',                 moonlightButterfly, [blackKnight],                      ["Explore Darkroot Garden"]),
    new Location('Darkroot Garden — Grave of Artorias', sif,            [],                                 ["Find the Grave of Artorias"]),
    // new Location('Darkroot Basin',                  null,               [hydra, goldenCrystalGolem],      ["Explore Darkroot Basin"]),
    new Location('The Abyss (New Londo Ruins)',     fourKings,          [],                                 ["Descend into the Abyss"]),

    // --- Finale ---
    new Location('Kiln of the First Flame',         gwyn,               [],                                 ["Enter the Kiln of the First Flame"]),

    // --- Ritorno opzionale ---
    // new Location('Northern Undead Asylum (Revisited)', strayDemon,      [],                              ["Return to the Asylum"]),

    // --- DLC: Artorias of the Abyss ---
    // new Location('Sanctuary Garden',                sanctuaryGuardian,  [],                              ["Enter the Sanctuary Garden"]),
    // new Location('Royal Wood',                      artorias,           [],                              ["Explore the Royal Wood"]),
    // new Location('Chasm of the Abyss',              manus,              [],                              ["Descend into the Chasm"]),
    // new Location('Royal Wood — Kalameet',           kalameet,           [],                              ["Hunt the Black Dragon"]),
];