const selectBoxGame = document.querySelector(".select-box-type")
selectBtnPlayer = selectBoxGame.querySelector(".options .vsPlayer"),
selectBtnBot = selectBoxGame.querySelector(".options .vsBot"),
selectBtnX = selectBoxGame.querySelector(".options .playerX"),
selectBtnO = selectBoxGame.querySelector(".options .playerO"),
startBtn = selectBoxGame.querySelector(".start-game"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

let playerSign = null;
let game_type = null;

selectBtnPlayer.onclick = () =>{
    selectBtnPlayer.style.background = "#95a5a6"
    selectBtnBot.style.background = "#2D414B"
    game_type = "player";
}

selectBtnBot.onclick = () =>{
    selectBtnPlayer.style.background = "#2D414B"
    selectBtnBot.style.background = "#95a5a6"
    game_type = "bot";
}

selectBtnX.onclick = () =>{
    selectBtnX.style.background = "#95a5a6"
    selectBtnO.style.background = "#2D414B"
    playerSign = "X"
}

selectBtnO.onclick = () =>{
    selectBtnX.style.background = "#2D414B"
    selectBtnO.style.background = "#95a5a6"
    playerSign = "O"
}

startBtn.onclick = () =>{
    if(playerSign === "O"){
        players.setAttribute("class", "players active player");
    }

    for (let i = 0; i < allBox.length; i++) {
        if(game_type === "bot"){
                allBox[i].setAttribute("onclick", "clickedBoxBotGame(this)");
        }
        else if(game_type === "player"){
                allBox[i].setAttribute("onclick", "clickedBoxPlayerGame(this)");
        }
    }

    selectBoxGame.classList.remove("show");
    selectBoxGame.classList.add("hide");
    playBoard.classList.add("show");
}

function clickedBoxPlayerGame(element){
    if(playerSign === "O"){
        playerSign = "O";

        element.innerHTML = `<i>O</i>`;
        element.setAttribute("id", playerSign);
        players.classList.remove("active");
        selectWinner();
        playerSign = "X";
    }else{
        playerSign = "X";

        element.innerHTML = `<i>X</i>`;
        element.setAttribute("id", playerSign);
        players.classList.add("active");
        selectWinner();
        playerSign = "O";
    }

    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto";
}

function clickedBoxBotGame(element){
    if(players.classList.contains("player")){
        playerSign = "O";

        element.innerHTML = `<i>O</i>`;
        element.setAttribute("id", playerSign);
        players.classList.remove("active");
        
    }else{
        element.innerHTML = `<i>X</i>`;
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    selectWinner();

    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";

    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(()=>{
        bot();
    }, randomTimeDelay);
}

function bot(){
    let array = [];

    for (let i = 0; i < allBox.length; i++) {
        if(allBox[i].childElementCount == 0){
            array.push(i);
        }
    }

    let randomBox = array[Math.floor(Math.random() * array.length)];

    if(array.length > 0){
        if(players.classList.contains("player")){ 
            players.classList.add("active");
            playerSign = "X";
            allBox[randomBox].innerHTML = `<i>X</i>`;
            allBox[randomBox].setAttribute("id", playerSign);    
        }else{
            players.classList.remove("active");
            playerSign = "O";
            allBox[randomBox].innerHTML = `<i>O</i>`;
            allBox[randomBox].setAttribute("id", playerSign);  
        }
        selectWinner();
    }

    playerSign = "X";
    allBox[randomBox].style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto";
}

function getIdVal(class_name){
    return document.querySelector(".box" + class_name).id;
}

function checkIdSign(val1, val2, val3, sign){ 
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}

function selectWinner(){
    if(checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || checkIdSign(7, 8, 9, playerSign) || checkIdSign(1, 4, 7, playerSign) || checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) || checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)){
        setTimeout(()=>{
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 300);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    }else{
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""){
            setTimeout(()=>{
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 300);
            wonText.textContent = "Match has been drawn!";
        }
    }
}

replayBtn.onclick = ()=>{
    window.location.reload();
}
