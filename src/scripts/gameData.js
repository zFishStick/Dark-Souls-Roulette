import { Boss } from "./Boss.js";
import { Location } from "./Location.js";
import { Class } from "./Class.js";
import { Weapon } from "./Weapon.js";
import { TRAVEL_ACTIONS, BOSS_ACTIONS, WIN_ACTIONS, MINIBOSS_WIN_ACTIONS } from "./actions.js";
import { bosses, locations, minibosses } from "./data/BossesLocationsData.js";

const queelagFurysword    = new Weapon('Queelag\'s Furysword',    170, true, null, 0, 5);
const greatLordGreatsword = new Weapon('Great Lord Greatsword',   256, true, null, 0, 5);
const golemAxe            = new Weapon('Golem Axe',               170, true, null, 0, 5);
const broadsword          = new Weapon('Broadsword',  80,  false, greatLordGreatsword, 0, 15); //TODO: change from 1 to 15
const scimitar            = new Weapon('Scimitar',    82,  false, queelagFurysword, 0, 15);
const battleAxe           = new Weapon('Battle Axe',  95,  false, golemAxe, 0, 15);

export const classes = [
    new Class('KNIGHT',   14, 11, 10, 659, broadsword),
    new Class('WANDERER', 10, 10, 12, 573, scimitar),
    new Class('BANDIT',   12, 14, 11, 616, battleAxe),
];

const IMG_PATH = "../assets/img/bosses/";

export const winWheelSegments    = [WIN_ACTIONS.LEVEL_UP_3, WIN_ACTIONS.TITANITE_3, WIN_ACTIONS.ESTUS_FLASK, WIN_ACTIONS.UNIQUE_WEAPON]; //, WIN_ACTIONS.ADD_HELPER];
export const minibossWinWheelSegments = [MINIBOSS_WIN_ACTIONS.LEVEL_UP_1, MINIBOSS_WIN_ACTIONS.TITANITE_1, MINIBOSS_WIN_ACTIONS.ESTUS_FLASK];
export const travelWheelSegments = [TRAVEL_ACTIONS.GO_STRAIGHT, TRAVEL_ACTIONS.LEVEL_UP, TRAVEL_ACTIONS.TITANITE, TRAVEL_ACTIONS.GET_DAMAGED, TRAVEL_ACTIONS.INCREASE_ALL_STATS];
export const bossWheelSegments   = [BOSS_ACTIONS.GET_DAMAGED, BOSS_ACTIONS.ATTACK, BOSS_ACTIONS.CRITICAL_HIT];
export const classesWheelSegments = classes.map(c => c.name);


export const debugWheelSegments = [
    MINIBOSS_WIN_ACTIONS.ESTUS_FLASK
];