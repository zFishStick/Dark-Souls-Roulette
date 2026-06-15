

export class Objective {
    constructor(description) {
        this.description = description;
    }

    update() {
        let objectiveP = document.getElementById('objectiveP');
        objectiveP.innerText = `Objective: ${this.description}`;
    }
}
