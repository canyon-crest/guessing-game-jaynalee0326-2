// add javascript here
let guess = 0;
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let range = 0;
let timeStart = 0;
let elapsedTime = 0;
let endTime = 0;
document.getElementById("test").style.display = "none";


let userName = prompt("Enter your name")
function titleCase(word) {
  let first = word.charAt(0).toUpperCase();
  let rest = word.slice(1).toLowerCase();
  return first + rest;
}

const times = [];
const scores = [];

document.getElementById("playBtn").addEventListener("click", play);
let other = document.getElementById("o")

other.addEventListener("click",otherFunc);
function otherFunc(){
    test.style.display = "block"
}

e.addEventListener("click",hideOther);
m.addEventListener("click",hideOther);
h.addEventListener("click",hideOther);
function hideOther(){
    test.style.display = "none";
}

function play(){
    let levels = document.getElementsByName("level");
    for(let i=0; i<levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }

    if (other.checked){
        range = test.value
    }
    document.getElementById("msg").textContent = "Guess a number 1-" + range + ", " + titleCase(userName);
    answer = Math.floor(Math.random()*range) +1;
    guessCount = 0;

    other.disabled = true;
    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    playBtn.disabled = true;
    timeStart = new Date().getTime();
}

document.getElementById("guessBtn").addEventListener("click", makeGuess);

function makeGuess(){
    let guess = parseInt(document.getElementById("guess").value);
    if(isNaN(guess) || guess > range || guess < 1){
        msg.textContent = "Please enter a valid number."
        return;
    }
    guessCount++;
    if(guess == answer){
        msg.textContent = "Correct! It took you " + guessCount + " tries, " + titleCase(userName) + "!";
        endTime = new Date().getTime();
        times.push((endTime-timeStart)/1000)
        times.sort((a, b) => a - b)
        document.getElementById("fastest").textContent = "Fastest Game: " + times[0].toFixed(1);
        updateScore(guessCount);
        resetGame();
    } 
    else if(guess<answer){
        if((answer-guess)<=2){
            msg.textContent = "Too low, try again. You are hot!";
        } else if ((answer-guess) <= 5 && (answer-guess) > 2){
            msg.textContent = "Too low, try again. You are warm.";
        } else{
            msg.textContent = "Too low, try again. You are cold."
        }
    } 
    else{
        if((guess-answer)<=2){
            msg.textContent = "Too high, try again. You are hot!";
        } else if ((guess-answer)<=5 && (guess-answer) > 2){
            msg.textContent = "Too high, try again. You are warm.";
        } else{
            msg.textContent = "Too high, try again. You are cold."
        }
    }

}

function updateScore(score) {
    scores.push(score);
    wins.textContent = "Total Wins: " + scores.length;
    
    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }
    avgScore.textContent = "Average Score: " + (sum / scores.length).toFixed(1);

    scores.sort((a, b) => a - b); 

    let lb = document.getElementsByName("leaderboard");
    for (let i = 0; i < lb.length; i++) {
        if (i < scores.length) {
            lb[i].textContent = scores[i];
        } else {
            lb[i].textContent = "";
        }
    }

    let sum2 = 0;
    for (let i = 0; i < times.length; i++) {
        sum2 += times[i];
    }
    document.getElementById("avgTime").textContent = "Average Time: " + (sum2 / times.length).toFixed(1);
}

function resetGame(){
    document.getElementById("guess").value = ""; 
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    e.disabled = false;
    h.disabled = false;
    m.disabled = false;
    other.disabled = false;
    test.style.display = "none";
    test.value = "";
    e.checked = true;
}

document.getElementById("giveUpBtn").addEventListener("click",giveUp);

function giveUp(){
    msg.textContent = "You lose. The answer was " + answer + ".";
    updateScore(range);
    resetGame();
}

function getFormattedDate() {
    const today = new Date();
    
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let monthName = months[today.getMonth()];

    let day = today.getDate();
    let suffix = NaN
    if (day === 1 || day === 21 || day === 31){
        suffix = "st";
    } else if (day === 2 || day === 22){
        suffix = "nd";
    } else if (day === 3 || day === 23){
        suffix = "rd";
    } else {
        suffix = "th";
    }
    
    return monthName + " " + day + suffix + ", " + today.getFullYear();
}

document.getElementById("date").textContent = "Date: " + getFormattedDate();

setInterval(function() {
    const now = new Date();
    document.getElementById("date").textContent = "Date: " + getFormattedDate() + " " + now.toLocaleTimeString(); 
}, 1000);