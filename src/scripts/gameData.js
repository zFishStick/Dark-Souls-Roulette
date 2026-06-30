import { Boss } from "./Boss.js";
import { Location } from "./Location.js";
import { Class } from "./Class.js";
import { Weapon } from "./Weapon.js";
import { TRAVEL_ACTIONS, BOSS_ACTIONS, WIN_ACTIONS, MINIBOSS_WIN_ACTIONS } from "./actions.js";
import { bosses, locations, minibosses } from "./data/BossesLocationsData.js";


// Unique weapons
const queelagFurysword     = new Weapon('Queelag\'s Furysword',    170, true, null, 0, 5);
const greatLordGreatsword  = new Weapon('Great Lord Greatsword',   256, true, null, 0, 5);
const golemAxe             = new Weapon('Golem Axe',               170, true, null, 0, 5);
const blackKnightSword     = new Weapon('Black Knight Sword',       220, true, null, 0, 5);
// const darkSilverTracer     = new Weapon('Dark Silver Tracer',        75, true, null, 0, 5);
// const dragonslayerGreatbow = new Weapon('Dragonslayer Greatbow',    90, true, null, 0, 5);
const moonlightGreatsword  = new Weapon('Moonlight Greatsword',     132, true, null, 0, 5);
const chaosBlade           = new Weapon('Chaos Blade',              144, true, null, 0, 5);
const grant                = new Weapon('Grant',                    260, true, null, 0, 5);
const dragonTooth          = new Weapon('Dragon Tooth',             290, true, null, 0, 5);

// Base weapons
const broadsword    = new Weapon('Broadsword',  80,  false, greatLordGreatsword, 0, 15); //TODO: change from 1 to 15
const scimitar      = new Weapon('Scimitar',    82,  false, queelagFurysword, 0, 15);
const battleAxe     = new Weapon('Battle Axe',  95,  false, golemAxe, 0, 15);
const longsword     = new Weapon('Longsword',      80, false, blackKnightSword,     0, 15);
// const banditsKnife  = new Weapon("Bandit's Knife", 63, false, darkSilverTracer,     0, 15);
// const shortBow      = new Weapon('Short Bow',      60, false, dragonslayerGreatbow, 0, 15);
const dagger        = new Weapon('Dagger',         56, false, moonlightGreatsword,  0, 15);
const handAxe       = new Weapon('Hand Axe',       78, false, chaosBlade,           0, 15);
const mace          = new Weapon('Mace',           91, false, grant,                0, 15);
const club          = new Weapon('Club',           80, false, dragonTooth,          0, 15);

export const classes = [
    new Class('KNIGHT',     14, 11, 10, 659, broadsword),
    new Class('WANDERER',   10, 10, 12, 573, scimitar),
    new Class('BANDIT',     12, 14, 11, 616, battleAxe),
    new Class('WARRIOR',    11, 13, 11, 594, longsword),
    // new Class('THIEF',       9,  9, 10, 552, banditsKnife),
    // new Class('HUNTER',     11, 12, 11, 594, shortBow),
    new Class('SORCERER',    8,  9,  8, 531, dagger),
    new Class('PYROMANCER', 10, 12, 12, 573, handAxe),
    new Class('CLERIC',     11, 12, 11, 594, mace),
    new Class('DEPRIVED',   11, 11, 11, 594, club),
];

const IMG_PATH = "../assets/img/bosses/";

export const winWheelSegments    = [WIN_ACTIONS.LEVEL_UP_3, WIN_ACTIONS.TITANITE_3, WIN_ACTIONS.ESTUS_FLASK, WIN_ACTIONS.UNIQUE_WEAPON]; //, WIN_ACTIONS.ADD_HELPER];
export const minibossWinWheelSegments = [MINIBOSS_WIN_ACTIONS.LEVEL_UP_1, MINIBOSS_WIN_ACTIONS.TITANITE_1, MINIBOSS_WIN_ACTIONS.ESTUS_FLASK];
export const travelWheelSegments = [TRAVEL_ACTIONS.GO_STRAIGHT, TRAVEL_ACTIONS.LEVEL_UP, TRAVEL_ACTIONS.TITANITE, TRAVEL_ACTIONS.GET_DAMAGED, TRAVEL_ACTIONS.INCREASE_ALL_STATS];

export const bossWheelSegments   = [
    { text: BOSS_ACTIONS.GET_DAMAGED },
    { text: BOSS_ACTIONS.ATTACK,       weight: 0.8 },
    { text: BOSS_ACTIONS.CRITICAL_HIT, weight: 0.2 },
];
export const classesWheelSegments = classes.map(c => c.name);


export const debugWheelSegments = [
    MINIBOSS_WIN_ACTIONS.ESTUS_FLASK
];