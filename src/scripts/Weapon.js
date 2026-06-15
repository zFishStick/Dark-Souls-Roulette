export class Weapon {
    constructor(name, damage, isUnique = false, uniqueVariant = null, level = 0, maxLevel = 15) {
        this.level = level;
        this.name = name;
        this.damage = damage;
        this.baseDamage = damage;
        this.isUnique = isUnique;
        this.maxLevel = maxLevel;
        this.uniqueVariant = uniqueVariant;
    }

    turnToUniqueWeapon() {
            if (this.isUnique || !this.uniqueVariant) return;
            this.name = this.uniqueVariant.name;
            
            this.baseDamage = this.uniqueVariant.damage;
            this.damage = this.uniqueVariant.damage;
            
            this.level = 0;
            this.maxLevel = this.uniqueVariant.maxLevel;
            this.isUnique = true;
        }

    upgrade() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.damage = this.baseDamage * (1 + (0.1 * this.level));
        }
    }
}