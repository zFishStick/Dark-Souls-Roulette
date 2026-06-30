export function hpForVitality(v) {
    if (v <= 1)  return 400;
    if (v <= 15) return Math.floor(400  + 282 * Math.pow((v - 1)  / 14, 1.1));
    if (v <= 30) return Math.floor(682  + 418 * Math.pow((v - 15) / 15, 1.2));
    if (v <= 50) return Math.floor(1500 - 400 * Math.pow((50 - v) / 20, 1.2));
    return Math.floor(1500 + 400 * ((v - 50) / 49));
}

export class Player {
    constructor() {
        this.sex = 'male';
        this.level = 1;
        this.health = 0;
        this.maxHealth = 0;
        this.items = new Items();
        this.weapon = null;
        this.upgradeLevel = 0; //TODO set to 0
        this.class = null;
        this.vitality = 0;
        this.strength = 0;
        this.resistance = 0;
    }

    levelUp(numLevels = 1) {
        this.level += numLevels;
        this.upgradeLevel += numLevels;
    }

    getDamage(damage) {
        this.health -= damage;
    }

    getAttackDamage() {
        if (!this.weapon) return 0;
        return this.weapon.damage * (1 + this.strength / 100);
    }

    restoreHealth() {
        this.health = this.maxHealth;
    }

    setClass(classObj) {
        this.class = classObj;
        this.vitality = classObj.vitality;
        this.strength = classObj.strength;
        this.resistance = classObj.resistance;
        this.health = classObj.health;
        this.maxHealth = classObj.health;
        this.weapon = classObj.weapon;
    }
}

export class Items {
    constructor() {
        this.estusFlasks = 5;
        this.estusFlaskLevel = 0;
        this.titanite = 0;
    }

    restorePlayerHealth(player) {
        switch (this.estusFlaskLevel) {
            case 0:
                player.health = Math.min(player.health + 300, player.maxHealth);
                break;
            case 1:
                player.health = Math.min(player.health + 400, player.maxHealth);
                break;
            case 2:
                player.health = Math.min(player.health + 500, player.maxHealth);
                break;
            case 3:
                player.health = Math.min(player.health + 650, player.maxHealth);
                break;
            default:
                player.health = Math.min(player.health + 700, player.maxHealth);
        }
        this.estusFlasks--;
    }

    getEstusFlasks() {
        return this.restoreEstusFlask();
    }

    upgradeEstusFlask() {
        if (this.estusFlasks < 20) {
            this.estusFlasks = Math.min(this.estusFlasks + 5, 20);
            this.estusFlaskLevel++;
        }
    }

    restoreEstusFlask() {
        const amounts = [5, 10, 15, 20];
        this.estusFlasks = amounts[this.estusFlaskLevel] ?? 5;
    }

    addTitanite(n = 1) {
        this.titanite += n;
    }
}
