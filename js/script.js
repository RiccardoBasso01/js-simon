console.log('JS OK');

const game = document.getElementById('game');
const preGame = document.getElementById('pre-game');

const play = document.getElementById('play');
const timer = document.getElementById('timer');

const number = document.querySelectorAll('.number');
const progressValue = document.getElementById('progress-value');

const form = document.getElementById('form');

// Al click "INIZIA" 
play.addEventListener('click', function () {
    preGame.classList.add('d-none');
    game.classList.remove('d-none');

    // 5 numeri da indovinare
    for(let i = 0; i < number.length; i++){
        number[i].innerText = randomNumber(); 
    }
    
    // Timer di 30s
    let second = 30;
    timer.innerText = second;

    const time = setInterval(() => {
        timer.innerText = --second;
        if (second <= 10 && second > 0) {
            timer.classList.add('last-seconds');
        } else if (second <= 0) {
            clearInterval(time)
            setTimeout(() => {game.classList.add('d-none');},1000);
        }
    }, 1000);

    // Progress bar
    let progress = 0;
    const bar = setInterval(() => {
        progressValue.style.width = ++progress + '%';
        if(progress === 100){
            clearInterval(bar);
        }
    }, 300);

    // Form


})

// Funzione numeri random da 0 a 99
function randomNumber(){
    const random = Math.floor(Math.random() * 99);
    return random;    
}