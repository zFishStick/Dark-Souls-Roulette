
export class Location {
    constructor(name, boss, minibosses = [], objective = []) {
        this.name = name;
        this.boss = boss;
        this.minibosses = minibosses;
        this.objective = objective;
    }

    updateLocation() {
        let locationH2 = document.getElementById('locationText');
        locationH2.innerText = `Location: ${this.name}`;
    }

    getRandomMiniboss() {
        if (this.minibosses.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.minibosses.length);
        return this.minibosses[randomIndex];
    }

    getObjective() {
        if (this.objective.length === 0) return null;
        return this.objective;
    }
}
