console.log('JS OK');

// Sezioni principali
const preGame = document.getElementById('pre-game');
const game = document.getElementById('game');
const form = document.getElementById('form');
const result = document.getElementById('result');


const play = document.getElementById('play');
const timer = document.getElementById('timer');
const progressValue = document.getElementById('progress-value');

const number = document.querySelectorAll('.number');
const formControl = document.querySelectorAll('.form-control');
const check = document.getElementById('check');



// Al click "INIZIA" 
play.addEventListener('click', function () {
    preGame.classList.add('d-none');
    game.classList.remove('d-none');

    // 5 numeri da indovinare
    for (let i = 0; i < number.length; i++) {
        number[i].innerText = randomNumber();
    }

    // Timer di 30s
    let second = 30;
    timer.innerText = second;
    timer.classList.remove('last-seconds');




    const time = setInterval(() => {
        timer.innerText = --second;
        if (second <= 10 && second > 0) {
            timer.classList.add('last-seconds');
        } else if (second <= 0) {
            clearInterval(time)
            setTimeout(() => {
                game.classList.add('d-none');
                form.classList.remove('d-none');
                form.style.display = 'flex';
            }, 1000);
        }
    }, 1000);

    // Progress bar
    progressValue.classList.add('d-none')
    setTimeout(() => {progressValue.classList.remove('d-none')}, 300); // Non lo faccio vedere per 300ms in modo da evitare l'effetto di ritorno da 100% a 0

    let progress = 0;
    const bar = setInterval(() => {
        progressValue.style.width = ++progress + '%';
        if (progress === 100) {
            clearInterval(bar);
        }
    }, 300);

    // Form
    for(let i = 0; i < formControl.length; i++){formControl[i].value = '';} // Reset numeri inseriti

    let resultValue = '';
    let point = '0';
    check.addEventListener('click', function () {
        for (let i = 0; i < number.length; i++) {
            if (number[i].innerText === formControl[i].value) {
                resultValue += `<div class="right">${[i + 1 + '°']} Giusto </div>`
                point++;
            } else {
                resultValue += `<div class="wrong">${[i + 1 + '°']} Sbagliato </div>`
            }
        }
        // Controllo punteggio massimo
        if(point === 5) firework();

        // Risultato
        result.classList.remove('d-none');
        result.innerHTML = resultValue + `<div class="result">Hai totalizzato ${point} punti </div><button id="restart">Ricomincia</button>`;
        form.style.display = 'none';
        const restart = document.getElementById('restart');
        
        restart.addEventListener('click', function () {
            preGame.classList.remove('d-none');
            result.classList.add('d-none');
        })
    })
    
})

// Funzione numeri random da 0 a 99
function randomNumber() {
    const random = Math.floor(Math.random() * 99);
    return random;
}


// Fuochi d'artificio se si fa il punteggio massimo
function firework() {

    let duration = 15 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    let interval = setInterval(function () {
        let timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        let particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}