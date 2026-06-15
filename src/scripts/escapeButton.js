
import { skipBossFight } from "./GameBuilder.js";

export function showEscapeButton() {
    const wheelButtonsDiv = document.getElementById('wheelButtonsDiv');

    const escapeBtn = document.createElement('button');
    escapeBtn.id = 'escapeBtn';
    escapeBtn.textContent = 'ESCAPE';
    escapeBtn.addEventListener('click', () => {
        skipBossFight();
    });


    if (wheelButtonsDiv) {
        wheelButtonsDiv.appendChild(escapeBtn);
        wheelButtonsDiv.style.marginLeft = '40px';
    }

    wheelButtonsDiv.appendChild(escapeBtn);
    
}

export function hideEscapeButton() {
    const escapeBtn = document.getElementById('escapeBtn');
    if (escapeBtn) escapeBtn.remove();

    const wheelButtonsDiv = document.getElementById('wheelButtonsDiv');
    if (wheelButtonsDiv) wheelButtonsDiv.style.marginLeft = '0px';
}