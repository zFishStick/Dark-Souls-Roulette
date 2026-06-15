export function updateUI(player, boss = null) {
    const estusText = document.getElementById('estusFlasksText');
    const titaniteText = document.getElementById('titaniteText');
    const levelText = document.getElementById('levelText');
    const healthText = document.getElementById('healthText');
    const increaseStatsText = document.getElementById('increaseStatsBtn');
    const classText = document.getElementById('classText');

    // Weapon UI
    const weaponText = document.getElementById('weaponText');
    const weaponDamageText = document.getElementById('weaponDamageText');
    const weaponLevelText = document.getElementById('weaponLevelText');

    if (weaponText) weaponText.innerText = `Weapon: ${player.class && player.class.weapon ? player.class.weapon.name : '-'}`;
    if (weaponDamageText) weaponDamageText.innerText = `Damage: ${player.getAttackDamage().toFixed(2)}`;
    if (weaponLevelText) weaponLevelText.innerText = `Level: ${player.class && player.class.weapon ? player.class.weapon.level : '-'}`;
    
    if (increaseStatsText) {
        if (player.upgradeLevel > 0) {
            increaseStatsText.classList.add('upgradeAvailable');
        } else {
            increaseStatsText.classList.remove('upgradeAvailable');
        }

        increaseStatsText.innerText = `Increase stats (${player.upgradeLevel})`;
    }

    if (healthText) {
        healthText.innerText = `Health: ${player.health}`;
        if (boss && boss.damage > player.health) {
            healthText.classList.add('danger');
        } else {
            healthText.classList.remove('danger');
        }
    }

    if (levelText) levelText.innerText = `Level: ${player.level}`;
    if (estusText) estusText.innerText = `Estus Flasks: ${player.items.estusFlasks}`;


    if (titaniteText) titaniteText.innerText = `Titanite: ${player.items.titanite}`;

    if (classText) classText.innerText = `Class: ${player.class ? player.class.name : '-'}`;

    for (const stat of ['vitality', 'strength', 'resistance']) {
        const el = document.getElementById(`stat_${stat}`);
        if (el) el.innerText = `${stat.charAt(0).toUpperCase() + stat.slice(1)}: ${player[stat]}`;
    }
}

export function updateBossUI(Boss) {
    const bossNameText = document.getElementById('bossText');
    if (bossNameText) bossNameText.innerText = `Boss: ${Boss.name}`;

    const bossImage = document.getElementById('bossImage');
    if (bossImage) bossImage.src = Boss.image;
            
    const bossHealthText = document.getElementById('bossHealthText');
    if (bossHealthText) bossHealthText.innerText = `Boss Health: ${Boss.health}`;

    const bossDamageText = document.getElementById('bossDamageText');
    if (bossDamageText) bossDamageText.innerText = `Boss Damage: ${Boss.damage}`;
}

export function clearBossUI() {
    const bossNameText = document.getElementById('bossText');
    if (bossNameText) bossNameText.innerText = 'Boss: -';

    const bossImage = document.getElementById('bossImage');
    if (bossImage) bossImage.src = '';
    if (bossImage) bossImage.className = '';

    const bossHealthText = document.getElementById('bossHealthText');
    if (bossHealthText) bossHealthText.innerText = 'Boss Health: -';

    const bossDamageText = document.getElementById('bossDamageText');
    if (bossDamageText) bossDamageText.innerText = 'Boss Damage: -';
}

export function showCanvas() {
    document.getElementById('canvas').style.display = 'block';
}

export function hideCanvas() {
    document.getElementById('canvas').style.display = 'none';
    // document.getElementById('spinBtn').style.display = 'none';
}

export function updateSpinCounter(n) {
    document.getElementById('wheelTimes').innerText = `Wheel Spins Left: ${n}`;
    if (n === 1) {
        document.getElementById('warningMsg').style.display = 'block';
    } else {
        document.getElementById('warningMsg').style.display = 'none';
    }
}

export function switchIncreaseStatsBtn(disable, player) {
    const increaseStatsBtn = document.getElementById('increaseStatsBtn');
    const titaniteBtn = document.getElementById('useTitaniteBtn');

    if (increaseStatsBtn) increaseStatsBtn.disabled = disable;

    if (titaniteBtn) {
        if (player.weapon.level == player.weapon.maxLevel) {
            titaniteBtn.disabled = true;
        } else {
            titaniteBtn.disabled = disable;
        }
    }
}

export function disableTitaniteBtn() {
    const titaniteBtn = document.getElementById('useTitaniteBtn');
    if (titaniteBtn) titaniteBtn.disabled = true;
}

// export function showEscapeButton() {
//     const escapeBtn = document.createElement('button');


//     const escapeBtn = document.getElementById('escapeBtn');
//     if (escapeBtn) escapeBtn.style.display = 'block';

//     const wheelButtonsDiv = document.getElementById('wheelButtonsDiv');
//     if (wheelButtonsDiv) wheelButtonsDiv.style.marginLeft = '40px'
// }

// export function hideEscapeButton() {
//     const escapeBtn = document.getElementById('escapeBtn');
//     if (escapeBtn) escapeBtn.style.display = 'none';

//     const wheelButtonsDiv = document.getElementById('wheelButtonsDiv');
//     if (wheelButtonsDiv) wheelButtonsDiv.style.marginLeft = '0px'
// }