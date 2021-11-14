// Timer
var timerEI = document.getElementById("countdown");

function countdown(){
    var timeLeft = 5;
    var timeInterval = setInterval(function(){
        if (timeLeft > 0){
            timerEI.textContent = "Timer: " + timeLeft;
            timeLeft--
            console.log(timeLeft)
        }
        else {
            timerEI.textContent = "Timer: " + timeLeft;
            clearInterval(timeInterval);
        }
    },1000);
}


// Questions
