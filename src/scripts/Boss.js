
export class Boss {
    constructor(health, damage, name, image, winRate, objective) {
        this.maxHealth = health;
        this.health = health;
        this.damage = damage;
        this.name = name;
        this.image = image;
        this.winRate = winRate;
        this.isDefeated = false;
        this.objective = objective ?? `Defeat ${name}`;
    }

    getDamage(damage) {
        this.health -= Math.round(damage * 100) / 100;
        if (this.health <= 0) {
            this.health = 0;
            this.isDefeated = true;
        }
    }

    attack(player) {
        player.getDamage(this.damage);
    }
}

