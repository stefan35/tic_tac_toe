var selectBtnPlayer = ".vsPlayer",
selectBtnBot = ".vsBot",
selectBtnX = ".playerX",
selectBtnO = ".playerO",
playBoard = ".play-board",
players = ".players",
allBoxes = "section span",
selectBox = ".select-box-type",
winText = ".win-text",
result = ".result-box";

var playerSign = null;
var game_type = null;

$(document).on('click','.vsPlayer',function(){
    $(selectBtnPlayer).css({'background': "#95a5a6"})
    $(selectBtnBot).css({'background': "#2D414B"})
    game_type = "player"
})

$(document).on('click','.vsBot',function(){
    $(selectBtnPlayer).css({'background': "#2D414B"})
    $(selectBtnBot).css({'background': "#95a5a6"})
    game_type = "bot";
})

$(document).on('click','.playerX',function(){
    $(selectBtnX).css({'background': "#95a5a6"})
    $(selectBtnO).css({'background': "#2D414B"})
    playerSign = "X";
})

$(document).on('click','.playerO',function(){
    $(selectBtnX).css({'background': "#2D414B"})
    $(selectBtnO).css({'background': "#95a5a6"})
    playerSign = "O";
})

$(document).on('click','.start-game',function(){
    if(playerSign == null || game_type == null)
        return

    if(playerSign === "O")
        $(players).addClass("players active player");

    $(allBoxes).each(function(index, obj){
        if(game_type === "bot")
            $(obj).attr("onclick", "clickedBoxBotGame(this)");
        else if(game_type === "player")
            $(obj).attr("onclick", "clickedBoxPlayerGame(this)");
    })
    
    $(selectBox).removeClass('show');
    $(selectBox).addClass('hide');
    $(playBoard).addClass("show");
})

function clickedBoxPlayerGame(element){
    if(playerSign === "O"){
        playerSign = "O";

        element.innerHTML = `<i>O</i>`;
        element.setAttribute("id", playerSign);
        $(players).removeClass("active");
        selectWinner();

        playerSign = "X";
    }else{
        playerSign = "X";

        element.innerHTML = `<i>X</i>`;
        element.setAttribute("id", playerSign);
        $(players).addClass("active");
        selectWinner();

        playerSign = "O";
    }

    element.style.pointerEvents = "none";
    $(playBoard).css('pointer-events','auto');
}

function clickedBoxBotGame(element){
    if($(players).hasClass("player")){
        playerSign = "O";

        element.innerHTML = `<i>O</i>`;
        element.setAttribute("id", playerSign);
        $(players).removeClass("active");
        
    }else{
        element.innerHTML = `<i>X</i>`;
        element.setAttribute("id", playerSign);
        $(players).addClass("active");
    }
    selectWinner();

    element.style.pointerEvents = "none";
    $(playBoard).css('pointer-events','none');

    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(()=>{
        bot();
    }, randomTimeDelay);
}

function bot(){
    let array = [];

    $(allBoxes).each(function(index, obj){
        if(!$(obj).attr('id')){
            array.push(index);
        }
    })

    let randomBox = array[Math.floor(Math.random() * array.length)];
    var arrAllBoxes = $(allBoxes).map(function (){ return this; }).get();

   if(array.length > 0){
        if($(players).hasClass("player")){ 
            $(players).addClass("active");
            playerSign = "X";
            arrAllBoxes[randomBox].innerHTML = `<i>X</i>`;
            arrAllBoxes[randomBox].setAttribute("id", playerSign);    
        }else{
            $(players).removeClass("active");
            playerSign = "O";
            arrAllBoxes[randomBox].innerHTML = `<i>O</i>`;
            arrAllBoxes[randomBox].setAttribute("id", playerSign);  
        }
        selectWinner();
    }

    playerSign = "X";
    arrAllBoxes[randomBox].style.pointerEvents = "none";
    $(playBoard).css('pointer-events','auto');
}

function getIdVal(class_name){
    return $(".box"+class_name)[0].id;
}

function checkIdSign(val1, val2, val3, sign){ 
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}

function selectWinner(){
    if(checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || checkIdSign(7, 8, 9, playerSign) || checkIdSign(1, 4, 7, playerSign) || checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) || checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)){
        setTimeout(()=>{
            $(result).addClass("show");
            $(playBoard).removeClass("show");
        }, 300);
        $(winText).html(`Player <p>${playerSign}</p> won the game!`);
    }else{
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""){
            setTimeout(()=>{
                $(result).addClass("show");
                $(playBoard).removeClass("show");
            }, 300);
            $(winText).text("Match has been drawn!");
        }
    }
}

$(document).on('click','.btn',function(){
    window.location.reload();
})
