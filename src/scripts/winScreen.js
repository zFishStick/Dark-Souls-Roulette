
export function showWinScreen() {
    const winScreen = document.createElement('div');
    winScreen.classList.add('winScreen');

    const message = document.createElement('h2');
    message.classList.add('winMessage');
    message.innerText = 'You did it, Unchosen Undead.';
    winScreen.appendChild(message);

    const restartBtn = document.createElement('button');
    restartBtn.id = 'restartBtn';
    restartBtn.innerText = 'Restart';
    restartBtn.addEventListener('click', () => {
        location.reload();
    });
    winScreen.appendChild(restartBtn);
    document.body.appendChild(winScreen);
}
