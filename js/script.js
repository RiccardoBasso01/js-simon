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
        console.log(resultValue)
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