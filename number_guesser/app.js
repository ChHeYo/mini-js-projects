let min = 1,
    max = 10,
    winningNum = getWinningNum(min, max),
    guessesLeft = 3;

const game = document.querySelector("#game"),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector(".max-num"),
      guessBtn = document.querySelector("#guess-btn"),
      guessInput = document.querySelector("#guess-input"),
      message = document.querySelector(".message");

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener("mousedown", (e) => {
    if(e.target.className === "play-again"){
        window.location.reload();
    }
})


guessBtn.addEventListener("click", (e) => {
    let userInputNum = parseInt(guessInput.value);

    if (isNaN(userInputNum) || userInputNum < min || userInputNum > max) {
        setMsg(`The number must be between ${min} and ${max}`, "red");
    }

    if (userInputNum === winningNum) {
        gameOver(true, `${winningNum} is correct. YOU WIN!`);
    } else {
        guessesLeft--;
        if (guessesLeft === 0) {
            gameOver(false, `Game over, you lost. The correct number was ${winningNum}.`);
        } else {
            if (guessesLeft > 1){
                setMsg(`${userInputNum} is not correct. You have ${guessesLeft} guesses left.`, "orange");
                guessInput.value = '';
            } else if (guessesLeft === 1) {
                setMsg(`${userInputNum} is not correct. You have ${guessesLeft} guess left.`, "orange");
                guessInput.value = '';
            }
        }
    }
})

function gameOver(won, msg){
    let color;
    won === true ? color = "green" : color = "red";
    if (won === true) {
        guessInput.disabled = true;
        guessInput.style.borderColor = color;
        setMsg(msg, color); 
    } else {
        guessInput.disabled = true;
        guessInput.style.borderColor = color;
        setMsg(msg, color);
    }
    guessBtn.value = "Play again";
    guessBtn.className ="play-again";
}

function getWinningNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function setMsg(msg, color){
    message.style.color = color;
    message.textContent = msg;
}