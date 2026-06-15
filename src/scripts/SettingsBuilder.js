
import { audio } from "./Wheel.js";

export let isMuted = false;

export function createSettingsSection() {
    const settingsSection = document.getElementById('settingsDiv');
    settingsSection.classList.add('settings-section');

    const muteDiv = document.createElement('div');
    muteDiv.id = 'muteDiv';
    muteDiv.classList.add('mute-div');

    const muteBtnImage = document.createElement('img');
    muteBtnImage.classList.add('mute-img');
    muteBtnImage.src = '../assets/img/icons/mute.png';
    muteBtnImage.alt = 'Mute';

    muteBtnImage.onclick = () => {
        if (audio.muted) {
            audio.muted = false;
            muteBtnImage.classList.remove('muted');
            isMuted = false;
        } else {
            audio.muted = true;
            muteBtnImage.classList.add('muted');
            isMuted = true;
        }
    };

    muteDiv.appendChild(muteBtnImage);
    muteDiv.appendChild(createBuyMeACoffeeButton());

    settingsSection.appendChild(muteDiv);
}

function createBuyMeACoffeeButton() {
    const link = document.createElement('a');
    link.href = 'https://www.buymeacoffee.com/gabripesce';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.classList.add('bmc-btn');

    const img = document.createElement('img');
    img.classList.add('bmc-btn-img');
    img.src = 'https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg';
    img.alt = 'Buy me a coffee';

    link.appendChild(img);

    return link;
}
