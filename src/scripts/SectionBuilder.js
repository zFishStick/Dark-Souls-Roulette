import { player } from './gameState.js';
import { updateUI } from './ui.js';
import { hpForVitality } from './Player.js';

export function createPlayerSection() {

    let playerSection = document.getElementById('playerSection');

    let levelH2 = document.createElement('h2');
    levelH2.innerText = `Level: ${player.level}`;
    levelH2.id = 'levelText';
    playerSection.appendChild(levelH2);

    let classP = document.createElement('p');
    classP.id = 'classText';
    classP.innerText = `Class: ${player.class ? player.class.name : '-'}`;
    playerSection.appendChild(classP);

    let statsDiv = document.createElement('div');
    statsDiv.classList.add('statsDiv');

    for (const stat of ['vitality', 'strength', 'resistance']) {
        let statDiv = document.createElement('div');
        statDiv.classList.add('statDiv');
        let statText = document.createElement('p');
        statText.id = `stat_${stat}`;
        statText.innerText = `${stat.charAt(0).toUpperCase() + stat.slice(1)}: ${player[stat]}`;
        statDiv.appendChild(statText);
        statsDiv.appendChild(statDiv);
    }

    let playerItems = document.createElement('div');
    playerItems.classList.add('playerItems');


    playerItems.appendChild(createHealthDiv());
    playerItems.appendChild(createEstusFlaskDiv());
    playerItems.appendChild(createTitaniteDiv());
    playerItems.appendChild(createWeaponDiv());

    playerSection.appendChild(statsDiv);
    playerSection.appendChild(playerItems);

}

function createHealthDiv() {
    let healthDiv = document.createElement('div');
    let healthText = document.createElement('p');
    healthText.id = 'healthText';
    healthText.innerText = `Health: ${player.health}`;
    healthDiv.appendChild(healthText);
    return healthDiv;
}


function createEstusFlaskDiv() {
    let estusFlasksDiv = document.createElement('div');
    estusFlasksDiv.classList.add('estusFlasksDiv');

    let estusFlasksText = document.createElement('p');
    estusFlasksText.id = 'estusFlasksText';
    estusFlasksText.innerText = `Estus Flasks: ${player.items.estusFlasks}`;
    estusFlasksDiv.appendChild(estusFlasksText);

    let useEstusBtn = document.createElement('button');
    useEstusBtn.id = 'useEstusBtn';
    useEstusBtn.innerText = 'Use';
    useEstusBtn.addEventListener('click', function() {
        if (player.items.estusFlasks > 0 && player.health < player.maxHealth) {
            player.items.restorePlayerHealth(player);
            updateUI(player);
        }
    });
    estusFlasksDiv.appendChild(useEstusBtn);
    return estusFlasksDiv;
}

function createTitaniteDiv() {
    let titaniteDiv = document.createElement('div');
    titaniteDiv.classList.add('titaniteDiv');

    let titaniteText = document.createElement('p');
    titaniteText.id = 'titaniteText';
    titaniteText.innerText = `Titanite: ${player.items.titanite}`;
    titaniteDiv.appendChild(titaniteText);

    let useTitaniteBtn = document.createElement('button');
    useTitaniteBtn.id = 'useTitaniteBtn';
    useTitaniteBtn.innerText = 'Use';
    useTitaniteBtn.addEventListener('click', function() {
        if (player.items.titanite > 0 && player.weapon && player.weapon.level < player.weapon.maxLevel) {
            player.items.titanite--;
            player.weapon.upgrade();
            updateUI(player);
            document.dispatchEvent(new CustomEvent('weaponUpgraded'));
            if (player.weapon.level === player.weapon.maxLevel) {
                useTitaniteBtn.disabled = true;
            }
        }
    });
    titaniteDiv.appendChild(useTitaniteBtn);

    return titaniteDiv;
}

export function switchButtons(bool, type) {
    document.getElementById('useEstusBtn').disabled = bool;
}

function createWeaponDiv() {
    let weaponDiv = document.createElement('div');
    weaponDiv.classList.add('weaponDiv');

    let weaponStatsDiv = document.createElement('div');
    weaponStatsDiv.classList.add('weaponStatsDiv');

    let weaponText = document.createElement('p');
    weaponText.id = 'weaponText';

    weaponText.innerText = `Weapon: ${player.weapon ? player.weapon.name : '-'}`;

    let weaponDamageText = document.createElement('p');
    weaponDamageText.id = 'weaponDamageText';

    let weaponLevelText = document.createElement('p');
    weaponLevelText.id = 'weaponLevelText';

    weaponDamageText.innerText = `DMG: ${player.weapon ? player.weapon.damage : '-'}`;
    weaponLevelText.innerText = `Level: ${player.weapon ? player.weapon.level : '-'}`;

    weaponStatsDiv.appendChild(weaponDamageText);
    weaponStatsDiv.appendChild(weaponLevelText);

    weaponDiv.appendChild(weaponText);
    weaponDiv.appendChild(weaponStatsDiv);
    return weaponDiv;
}

export function createBtnSection() {
    let btnSection = document.getElementById('btnSection');
    btnSection.classList.add('btnSection');

    let increaseStatsBtn = document.createElement('button');
    increaseStatsBtn.innerText = `Increase stats (${player.upgradeLevel})`;
    increaseStatsBtn.id = 'increaseStatsBtn';
    increaseStatsBtn.addEventListener('click', function() {
        openStatsCard(player, this);
    });

    btnSection.appendChild(increaseStatsBtn);
}

function openStatsCard(player, button) {
    const mainSection = document.getElementById('mainSection');
    let upgradeLevel = player.upgradeLevel;
    let previousHealth = player.health;

    if (upgradeLevel > 0) {
        let background = document.createElement('div');
        background.classList.add('background');
        background.addEventListener('click', function(e) {
            if (e.target === background) {
                mainSection.removeChild(background);
            }
        });

        let statsCard = document.createElement('div');
        statsCard.classList.add('statsCard');

        let statsHeader = document.createElement('h2');
        statsHeader.innerText = 'Which Stat to Increase?';
        statsCard.appendChild(statsHeader);

        let statsCount = document.createElement('p');
        statsCount.id = 'statsCount';
        statsCount.classList.add("statsCountP")
        statsCount.innerText = `Levels available: ${upgradeLevel}`;
        statsCard.appendChild(statsCount);

        const pendingUpgrades = {vitality: 0, strength: 0, resistance: 0 };

        for (const stat of ['vitality', 'strength', 'resistance']) {
            let statContent = document.createElement('div');
            statContent.classList.add('statContent');

            let statItem = document.createElement('div');
            statItem.classList.add('statItem');
            statItem.innerText = stat.charAt(0).toUpperCase() + stat.slice(1);

            let lessBtn = document.createElement('button');
            lessBtn.id = `less_${stat}`;
            lessBtn.innerText = '-';
            lessBtn.disabled = true;

            let statValue = document.createElement('p');
            statValue.id = `statValue_${stat}`;
            statValue.innerText = `${player[stat]}`;

            let moreBtn = document.createElement('button');
            moreBtn.id = `more_${stat}`;
            moreBtn.innerText = '+';
            moreBtn.onclick = () => setStat(player, stat, statValue, statsCount, pendingUpgrades, lessBtn, previousHealth);
            lessBtn.onclick = () => unsetStat(player, stat, statValue, statsCount, pendingUpgrades, lessBtn, previousHealth);

            statContent.appendChild(statItem);
            statContent.appendChild(lessBtn);
            statContent.appendChild(statValue);
            statContent.appendChild(moreBtn);

            statsCard.appendChild(statContent);
        }

        background.appendChild(statsCard);
        mainSection.appendChild(background);

    } else {
        button.classList.add('error');
        setTimeout(() => {
            button.classList.remove('error');
        }, 2000);
    }
}

const STAT_POINTS_PER_LEVEL = 1;

function setStat(player, stat, statValue, statsCount, pendingUpgrades, lessBtn) {
    if (player.upgradeLevel === 0) return;

    player[stat] += STAT_POINTS_PER_LEVEL;
    pendingUpgrades[stat]++;
    player.upgradeLevel--;

    if (stat === 'vitality') {
        const oldMax = player.maxHealth;
        player.maxHealth = hpForVitality(player.vitality);
        player.health += player.maxHealth - oldMax;
    }

    statValue.innerText = player[stat];
    statsCount.innerText = `Levels available: ${player.upgradeLevel}`;
    lessBtn.disabled = false;
    updateUI(player);
}

function unsetStat(player, stat, statValue, statsCount, pendingUpgrades, lessBtn) {
    if (pendingUpgrades[stat] === 0) return;

    player[stat] -= STAT_POINTS_PER_LEVEL;
    pendingUpgrades[stat]--;
    player.upgradeLevel++;

    if (stat === 'vitality') {
        const oldMax = player.maxHealth;
        player.maxHealth = hpForVitality(player.vitality);
        player.health += player.maxHealth - oldMax;
    }

    statValue.innerText = player[stat];
    statsCount.innerText = `Levels available: ${player.upgradeLevel}`;
    if (pendingUpgrades[stat] === 0) lessBtn.disabled = true;
    updateUI(player);
}

export function createRouteSection() {
    let routeSection = document.getElementById('routeSection');

    let routeDiv = document.getElementById('routeDiv');
    routeDiv.classList.add('routeDiv');

    let objectiveHeader = document.createElement('div');
    objectiveHeader.id = 'objectiveHeader';
    objectiveHeader.classList.add('objectiveHeader');

    let locationH2 = document.createElement('h2');
    locationH2.id = 'locationText';

    let objectiveP = document.createElement('p');
    objectiveP.id = 'objectiveP';

    objectiveHeader.appendChild(locationH2);
    objectiveHeader.appendChild(objectiveP);

    routeDiv.appendChild(objectiveHeader);

    routeSection.appendChild(routeDiv);
    routeSection.appendChild(createBossSection());

}

export function createBossSection() {
    let bossDiv = document.getElementById('bossDiv');

    let bossHeader = document.createElement('h2');
    bossHeader.id = 'bossText';
    bossHeader.innerText = 'Boss: -';
    bossDiv.appendChild(bossHeader);
    
    let bossImage = document.createElement('img');
    bossImage.id = 'bossImage';
    bossImage.src = '';

    bossDiv.appendChild(bossImage);

    let bossStatsDiv = document.createElement('div');
    bossStatsDiv.id = 'bossStatsDiv';
    bossStatsDiv.classList.add('bossStatsDiv');
    bossDiv.appendChild(bossStatsDiv);

    let bossHealthText = document.createElement('p');
    bossHealthText.id = 'bossHealthText';
    bossHealthText.innerText = `Boss Health: -`;

    let bossDamageText = document.createElement('p');
    bossDamageText.id = 'bossDamageText';
    bossDamageText.innerText = `Boss Damage: -`;
    
    bossStatsDiv.appendChild(bossHealthText);
    bossStatsDiv.appendChild(bossDamageText);

    bossDiv.appendChild(bossStatsDiv);

    return bossDiv;

}



