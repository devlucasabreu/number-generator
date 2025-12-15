const minInput = document.getElementById('minInput');
const maxInput = document.getElementById('maxInput');
const sortearBtn = document.getElementById('sortearBtn');
const result = document.getElementById('result');
const resultNumber = document.getElementById('resultNumber');
const error = document.getElementById('error');

function showError(message) {
    error.textContent = message;
    error.classList.add('show');
    setTimeout(() => {
        error.classList.remove('show');
    }, 3000);
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.background = ['#aec346', '#8ea635', '#fff'][Math.floor(Math.random() * 3)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

function sortear() {
    const min = parseInt(minInput.value);
    const max = parseInt(maxInput.value);

    if (isNaN(min) || isNaN(max)) {
        showError('Por favor, preencha ambos os campos');
        return;
    }

    if (min >= max) {
        showError('O valor mínimo deve ser menor que o máximo');
        return;
    }

    sortearBtn.disabled = true;
    sortearBtn.textContent = 'Sorteando...';

    let counter = 0;
    const interval = setInterval(() => {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        resultNumber.textContent = randomNum;
        result.classList.add('show');
        counter++;

        if (counter >= 15) {
            clearInterval(interval);
            const finalNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            resultNumber.textContent = finalNumber;
            sortearBtn.disabled = false;
            sortearBtn.textContent = 'Sortear Número';
            createConfetti();
        }
    }, 100);
}

sortearBtn.addEventListener('click', sortear);

[minInput, maxInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sortear();
        }
    });
});