let levelStatus = "";
let cardClicked = [];
let cardDiv = [];
let cardMatched = 0;
let intro = document.getElementById("one");
let level = document.getElementById("levelList");
let boardActive = true;
let defalutCardNum = 4;
let time = 1500;


function startGame(){
    start.addEventListener("click", () => {
        level.classList.add("show");
        intro.classList.add("hide");
    })
    chooseLevel();
}

function chooseLevel(){
    let levelBtn = document.getElementsByClassName("levBtn");
    for(let i = 0; i<levelBtn.length;i++){
        levelBtn[i].addEventListener("click", ()=>{
            let whichLevel = levelBtn[i].classList[1];
            if(whichLevel === "first"){
                levelOne();
            } else if(whichLevel === "second"){
                levelTwo();
            } else if(whichLevel === "thrid"){
                levelThree();
            } else if(whichLevel === "fourth"){
                levelFour();
            } else if(whichLevel === "fifth"){
                levelFive();
            }
        });
    }
}

function resetGame(){

    cardClicked = [];
    cardDiv = [];
    cardMatched = [];
    let board = document.getElementById("game-board");
    while(board.hasChildNodes()){
        board.removeChild(board.firstChild);
    }
}

startGame();
function varifityCard(card, faceVlue){
    function removeClass(){
        for(let i = 0; i < cardDiv.length ; i++){
            cardDiv[i].classList.remove("selected");
        }
    }
    if(cardClicked.length < 2){
        cardClicked.push(faceVlue);
        cardDiv.push(card);
        card.classList.add("selected");
    }
    if(cardClicked.length === 2){
        if(cardClicked[0] === cardClicked[1]){
            cardMatched++
            let selected = document.getElementsByClassName("selected");
            setTimeout(()=> {
                for(let i = 0; i< selected.length;i++){
                    selected[i].classList.add("match");
                }
                removeClass();
            }, 1000);
            cardClicked=[];
            if(cardMatched === defalutCardNum/2){
                setTimeout(()=> {
                    nextLevel();
                }, 2000);
            }
        }else{
            setTimeout(()=> {
               removeClass();
            }, time);
            cardClicked=[];
        }
    }
}
function nextLevel(){
    let ele = document.getElementById("pass");
    if(levelStatus !== "lv5"){
        ele.style.display = "flex";
    }else{
        document.getElementById("end").style.display = "flex";
    }
    
    document.getElementById("next").addEventListener("click", () => {
        if(levelStatus == "lv1"){
            levelTwo();
            ele.style.display = "none";
        }else if(levelStatus == "lv2"){
            levelThree();
            ele.style.display = "none";
        }else if(levelStatus == "lv3"){
            levelFour();
            ele.style.display = "none";
        }else if(levelStatus == "lv4"){
            levelFive();
            ele.style.display = "none";
        }else if(levelStatus == "lv5"){
            ele.style.display = "none";
            
        }
    })
}
function showCards(numCards){
    let numOfCards = numCards;
    let cardFaces = ["mA.png", "mB.png", "mC.png", "mD.png", "mE.png","mF.png", "mG.png", "mH.png"];
    let cardOptions = [];
    let cardPicked = [];
    
    for(let i =0; i<numOfCards/2;i++){
        let randomIndex = Math.floor(Math.random()* cardFaces.length);
        cardOptions.push(cardFaces[randomIndex]);
        cardFaces.splice(randomIndex, 1);
        cardPicked = cardOptions.concat(cardOptions);
        cardPicked.sort(()=> Math.random() - 0.5);
    }
    for(let i = 0; i<numOfCards; i++){
        makeCard(cardPicked[i])  
    }
}
function makeCard(img){
    let selectedCard = document.getElementsByClassName("selected");
    let cardContainer = document.createElement("div");
    let cardInner = document.createElement("div");
    let cardFront = document.createElement("div");
    let cardBack = document.createElement("div");
    let faceVlue = img;

    cardContainer.className = "card container";
    cardInner.className = "card inner";
    cardFront.className = "card front cF";
    cardBack.className = "card back cB";

    cardBack.style.cssText = "background-image:url(imgs/" + img + ");";
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardContainer.appendChild(cardInner);
    document.getElementById("game-board").appendChild(cardContainer);

    cardContainer.addEventListener("click", () => {
        if(selectedCard.length < 2){
            cardContainer.classList.add("selected");
            varifityCard(cardContainer, faceVlue);
        }
    })
}
function levelOne(){
    resetGame();
    level.classList.remove("show");
    showCards(defalutCardNum);
    levelStatus = "lv1";
}
function levelTwo(){
    resetGame();
    level.classList.remove("show");
    defalutCardNum = 6;
    showCards(defalutCardNum);
    levelStatus = "lv2";
}
function levelThree(){
    resetGame();
    level.classList.remove("show");
    defalutCardNum = 8
    showCards(defalutCardNum);
    levelStatus = "lv3";
}
function levelFour(){
    resetGame();
    level.classList.remove("show");
    defalutCardNum = 10;
    showCards(defalutCardNum);
    levelStatus = "lv4";
}
function levelFive(){
    resetGame();
    level.classList.remove("show");
    defalutCardNum = 12;
    showCards(defalutCardNum);
    levelStatus = "lv5";
}
function end(){
    document.getElementById("end").style.display = "none";
    resetGame();
    intro.classList.remove("hide");
    startGame();
}