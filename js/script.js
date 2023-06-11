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
    for(let i = 0; i < number.length; i++){
        number[i].innerText = randomNumber(); 
    }
    
    // Timer di 30s
    let second = 1;
    timer.innerText = second;

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
            },1000);
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
    let resultValue = '';
    let point = '0';
    check.addEventListener('click', function(){
        for(let i = 0; i < number.length; i++){
            if(number[i].innerText === formControl[i].value){
                resultValue += `<div>${[i + 1]} Giusto </div>`
                point++;
            }else{
                resultValue += `<div>${[i + 1]} Sbagliato </div>`
            }
        }
    console.log(resultValue)
      // Risultato
      result.className = '';
      result.innerHTML = resultValue + `Hai totalizzato ${point} punti`;

        form.style.display = 'none';
    })

  

})

// Funzione numeri random da 0 a 99
function randomNumber(){
    const random = Math.floor(Math.random() * 99);
    return random;    
}