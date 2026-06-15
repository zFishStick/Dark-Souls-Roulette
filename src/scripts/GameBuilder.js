import { Wheel } from "./Wheel.js";
import { player } from "./gameState.js";
import { Objective } from "./Objective.js";
import { createSettingsSection } from "./SettingsBuilder.js";
import { createPlayerSection, createBtnSection, createRouteSection} from "./SectionBuilder.js";
import { updateUI, updateBossUI, clearBossUI, showCanvas, hideCanvas, updateSpinCounter, switchIncreaseStatsBtn } from "./ui.js";
import { TRAVEL_ACTIONS, BOSS_ACTIONS, WIN_ACTIONS, MINIBOSS_WIN_ACTIONS } from "./actions.js";
import { classes, winWheelSegments, minibossWinWheelSegments, travelWheelSegments, bossWheelSegments, classesWheelSegments, debugWheelSegments } from "./gameData.js";
import { showDeathScreen } from "./deathScreen.js";
import { showEscapeButton, hideEscapeButton } from "./escapeButton.js";

import { bosses, minibosses, locations } from "./data/BossesLocationsData.js";
import { hpForVitality } from "./Player.js";


// // debug to show escape button for testing
// showEscapeButton();

// // wait 3 seconds before enabling the escape button
// setTimeout(() => {
//     hideEscapeButton();
// }, 3000);

let spinTimes = 5;
updateSpinCounter(spinTimes);

let currentLocationIndex = 0;
let location = locations[currentLocationIndex];
let currentLocationObjectiveIndex = 0;

function getCurrentObjectiveText() {
    const locObjs = location.objective || [];
    if (currentLocationObjectiveIndex < locObjs.length) {
        return locObjs[currentLocationObjectiveIndex];
    }
    if (location.boss) {
        return location.boss.objective;
    }
    return '';
}

const objective = new Objective(getCurrentObjectiveText());

function advanceObjective() {
    const locObjs = location.objective || [];
    if (currentLocationObjectiveIndex < locObjs.length) {
        currentLocationObjectiveIndex++;
    }
    objective.description = getCurrentObjectiveText();
    objective.update();
    console.log(`Current Objective: ${objective.description}`);
}

function updateLocation() {
    currentLocationIndex++;
    currentLocationObjectiveIndex = 0;
    if (currentLocationIndex < locations.length) {
        location = locations[currentLocationIndex];
        location.updateLocation();
        objective.description = getCurrentObjectiveText();
        objective.update();
    }
    console.log(`Current Location: ${location.name}`);
}

document.addEventListener('DOMContentLoaded', function() {
    createPlayerSection();
    createBtnSection();
    createRouteSection();
    createSettingsSection();
    startGame();
});

function startGame() {
    objective.update();
    location.updateLocation();

    chooseClass(() => {
        updateLocation();
        startTravel();
    });
}


function chooseClass(onComplete) {
    const classWheel = new Wheel({
        segments: classesWheelSegments,
        canvasId: 'canvas',
        onResult: (selectedClass) => {
            const classObj = classes.find(c => c.name === selectedClass);
            if (classObj) {
                player.setClass(classObj);
                updateUI(player);
                hideCanvas();
                if (onComplete) onComplete();
            }
        }
    }).create();
}

function startTravel() {

    switchIncreaseStatsBtn(false, player);
    const hasMinibosses = location.minibosses && location.minibosses.length > 0;
    let activeSegments = travelWheelSegments;

    if (hasMinibosses) {
        activeSegments = [...travelWheelSegments, TRAVEL_ACTIONS.FIGHT_MINIBOSS];
    }

    if (player.weapon.level == player.weapon.maxLevel) {
        activeSegments = activeSegments.filter(s => s !== TRAVEL_ACTIONS.TITANITE);
    }

    showCanvas();
    if (spinTimes > 0) {
        let currentWheel;

        const handleWeaponUpgraded = () => {
            if (player.weapon.level === player.weapon.maxLevel && activeSegments.includes(TRAVEL_ACTIONS.TITANITE)) {
                activeSegments = activeSegments.filter(s => s !== TRAVEL_ACTIONS.TITANITE);
                currentWheel.updateSegments(activeSegments);

            }
        };
        document.addEventListener('weaponUpgraded', handleWeaponUpgraded);

        currentWheel = new Wheel({
            segments: activeSegments,
            // TODO: cambiare i segmenti
            // segments: debugWheelSegments,
            canvasId: 'canvas',
            repeat: 2,
            type: 'travel',
            onResult: (action) => {
                spinTimes--;
                updateSpinCounter(spinTimes);
                doWheelAction(action);
                if (action === TRAVEL_ACTIONS.FIGHT_MINIBOSS) {
                    document.removeEventListener('weaponUpgraded', handleWeaponUpgraded);
                }
                if (spinTimes <= 0 && action !== TRAVEL_ACTIONS.FIGHT_MINIBOSS) {
                    document.removeEventListener('weaponUpgraded', handleWeaponUpgraded);
                    clearBossUI();
                    if (location.boss) {
                        setTimeout(() => startBossFight(location.boss), 0);
                    } else {
                        updateLocation();
                        spinTimes = 5;
                        updateSpinCounter(spinTimes);
                        setTimeout(startTravel, 0);
                    }
                }
            }
        }).create();
    } else {
        if (location.boss) {
            setTimeout(() => startBossFight(location.boss), 0);
        } else {
            updateLocation();
            spinTimes = 5;
            updateSpinCounter(spinTimes);
            setTimeout(startTravel, 0);
        }
    }
}


function doWheelAction(action) {
    switch(action) {
        case TRAVEL_ACTIONS.LEVEL_UP:
            player.levelUp();
            break;
        case TRAVEL_ACTIONS.TITANITE:
            player.items.addTitanite();
            break;
        case TRAVEL_ACTIONS.INCREASE_ALL_STATS:
            player.vitality += 1;
            player.strength += 1;
            player.resistance += 1;
            player.maxHealth = hpForVitality(player.vitality);
            player.health = player.maxHealth;
            break;
        case TRAVEL_ACTIONS.GET_DAMAGED:
            player.getDamage(50);
            break;
        case TRAVEL_ACTIONS.GO_STRAIGHT:
            // no effect
            break;
        case TRAVEL_ACTIONS.FIGHT_MINIBOSS:
            startBossFight(location.getRandomMiniboss(), true);
            break;
        
        // debug
        // case WIN_ACTIONS.ESTUS_FLASK:
        //     player.items.upgradeEstusFlask();
        //     break;
    }
    updateUI(player);
}


function startBossFight(boss, isMiniboss = false) {
    
    boss.health = boss.maxHealth;
    boss.isDefeated = false;
    let activeSegments = bossWheelSegments;

    if (!isMiniboss) {
        objective.description = boss.objective;
        objective.update();
    } else {
        showEscapeButton();
    }

    updateBossUI(boss);
    updateUI(player, boss);
    console.log(`Boss Fight: ${boss.name}`);
    switchIncreaseStatsBtn(true, player);
    new Wheel({
        segments: activeSegments,
        canvasId: 'canvas',
        winRate: boss.winRate,
        repeat: 2,
        type: 'boss',
        onResult: (action) => {
            const applyAttack = (multiplier = 1) => {
                const damageDealt = player.getAttackDamage() * multiplier;
                boss.health -= damageDealt;
                updateBossUI(boss);
                if (boss.health <= 0) {
                    boss.isDefeated = true;
                    player.restoreHealth();
                    player.items.restoreEstusFlask();
                    clearBossUI();
                    updateUI(player, boss);
                    hideEscapeButton();
                    if (isMiniboss) {
                        const idx = location.minibosses.findIndex(b => b.name === boss.name);
                        if (idx !== -1) location.minibosses.splice(idx, 1);
                        showWinWheel(() => {
                            if (spinTimes > 0) {
                                setTimeout(startTravel, 0);
                            } else if (location.boss) {
                                setTimeout(() => startBossFight(location.boss), 0);
                            } else {
                                updateLocation();
                                spinTimes = 5;
                                updateSpinCounter(spinTimes);
                                setTimeout(startTravel, 0);
                            }
                        }, isMiniboss);
                    } else {
                        const idx = bosses.findIndex(b => b.name === boss.name);
                        if (idx !== -1) bosses.splice(idx, 1);
                        updateLocation();
                        spinTimes = 5;
                        updateSpinCounter(spinTimes);
                        showWinWheel(() => setTimeout(startTravel, 0));
                    }
                    if (boss.name == "Gwyn, Lord of Cinder") {
                        alert('Congratulations! You have defeated Gwyn and completed the game!');
                    }
                }
            };

            switch(action) {
                case BOSS_ACTIONS.GET_DAMAGED:
                    player.getDamage(boss.damage);
                    updateUI(player, boss);
                    if (player.health <= 0) {
                        showDeathScreen();
                    }
                    break;
                case BOSS_ACTIONS.ATTACK:
                    applyAttack();
                    break;
                case BOSS_ACTIONS.CRITICAL_HIT:
                    applyAttack(2);
                    break;
            }
        }
    }).create();
}

export function skipBossFight() {
    alert('You have chosen to skip the miniboss fight. You will not receive any rewards for this fight.');
    hideEscapeButton();
    clearBossUI();
    if (spinTimes > 0) {
        setTimeout(startTravel, 0);
    } else if (location.boss) {
        setTimeout(() => startBossFight(location.boss), 0);
    } else {
        updateLocation();
        spinTimes = 5;
        updateSpinCounter(spinTimes);
        setTimeout(startTravel, 0);
    }
}

function showWinWheel(onComplete, isMiniboss = false) {

    let activeSegments = removeWinWheelSegments(winWheelSegments, isMiniboss);

    const winWheel = new Wheel({
        segments: activeSegments,
        canvasId: 'canvas',
        repeat: 2,
        type: 'win',
        onResult: (reward) => {
            switch(reward) {
                case WIN_ACTIONS.LEVEL_UP_3:
                    player.levelUp(3);
                    break;
                case WIN_ACTIONS.TITANITE_3:
                    player.items.addTitanite(3);
                    break;
                case MINIBOSS_WIN_ACTIONS.LEVEL_UP_1:
                    player.levelUp(1);
                    break;
                case MINIBOSS_WIN_ACTIONS.TITANITE_1:
                    player.items.addTitanite(1);
                    break;
                case WIN_ACTIONS.ESTUS_FLASK:
                case MINIBOSS_WIN_ACTIONS.ESTUS_FLASK:
                    player.items.upgradeEstusFlask();
                    break;
                case WIN_ACTIONS.UNIQUE_WEAPON:
                    player.weapon.turnToUniqueWeapon();
                    break;
            }
            updateUI(player);
            if (onComplete) onComplete();
        }
    }).create();
}

function removeWinWheelSegments(activeSegments, isMiniboss) {

    if (isMiniboss) {
        activeSegments = minibossWinWheelSegments;

        if (player.items.estusFlaskLevel == 3) { // max level reached
            activeSegments = activeSegments.filter(s => s !== MINIBOSS_WIN_ACTIONS.ESTUS_FLASK);
        }

        if (player.weapon.level == player.weapon.maxLevel) {
            activeSegments = activeSegments.filter(s => s !== MINIBOSS_WIN_ACTIONS.TITANITE_1);
        }

        return activeSegments;
    }

    if (player.weapon.level == player.weapon.maxLevel) {
        activeSegments = activeSegments.filter(s => s !== WIN_ACTIONS.TITANITE_3);
    }

    if (player.items.estusFlaskLevel == 3) { // max level reached
        activeSegments = activeSegments.filter(s => s !== WIN_ACTIONS.ESTUS_FLASK);
    }

    if (player.weapon.isUnique) {
        activeSegments = activeSegments.filter(s => s !== WIN_ACTIONS.UNIQUE_WEAPON);
    }
    
    return activeSegments;
}
