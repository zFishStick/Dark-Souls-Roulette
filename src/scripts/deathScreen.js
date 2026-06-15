
export function showDeathScreen() {
    const deathScreen = document.createElement('div');
    deathScreen.classList.add('deathScreen');

    const message = document.createElement('h2');
    message.innerText = 'You Died';
    deathScreen.appendChild(message);

    const restartBtn = document.createElement('button');
    restartBtn.id = 'restartBtn';
    restartBtn.innerText = 'Restart';
    restartBtn.addEventListener('click', () => {
        location.reload();
    });
    deathScreen.appendChild(restartBtn);
    document.body.appendChild(deathScreen);
}