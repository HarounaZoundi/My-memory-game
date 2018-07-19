/*
 * Create a list that holds all of your cards
 */
const singleCards = ["fa-bank","fa-camera","fa-futbol-o","fa-heart","fa-laptop","fa-percent","fa-phone","fa-umbrella"]
const cards = singleCards.concat(singleCards);
let deck = document.querySelector(".deckArea");
let shuffledCards = [];
let moveCounter = 0;
let gameTimer = setInterval(updateDisplay, 1000); // every second call updateDisplay
let stars = document.querySelector(".stars");
let popup = document.querySelector(".popup");
let openCards = [];
let selectedCard = $("li.card");
let cardIDs = [];
let cardList = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 cardShuffle();
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function cardShuffle() {
    shuffledCards = shuffle(cards);
    var newCards = $("li.card i");
    
    for (let i=0; i < newCards.length; i++) {
        let ind = shuffledCards[i];
        newCards[i].className = 'fa ' + ind;
    }
}
function restart(){
	shuffledCards = [];
	moveCounter = 0;
	openCards = [];
    cardIDs = [];
    cardList = [];
	cardShuffle();
    $("li.card").removeClass("open show match");
    $(".moves").text(moveCounter);
     $('.timer').find('.value').text("0");
    gameTimer = setInterval(updateDisplay, 1000); // every second call updateDisplay
    addStars();
    let stars = document.querySelector(".stars");

}
function replay(){
    restart();
    $( ".popuptext" ).empty();
}

/* Restart Game Listener */
let restartGame = $("div.restart");
restartGame.click(restart);

/* set up the event listener for a card. If a card is clicked:*/
selectedCard.click(openCard);

/*  - display the card's symbol (put this functionality in another function that you call from this one)*/
/*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) */

function openCard(){
        selectedCard.removeClass("close");
        let currentCardID = $(this).attr("ID");
        if (cardIDs.includes(currentCardID))
        {
           alert("can't select the same card twice!");        }
        
        else
        {
            /*Add to list of current cards for this play of the game */
            cardIDs.push(currentCardID);
            if(selectedCard.classlist !== 'card open show match'){
                $(this).removeClass('close');
                $(this).toggleClass('open');
                $(this).toggleClass('show');
                var card = $(this);
                openCards.push(card);
                /*  - if the list already has another card, check to see if the two cards match*/
                if(openCards.length === 2){
                    matchCard();
                     removeStars();
      
                }
            }
        }

        
}
/* Remove stars at certain intervals of the game*/
function removeStars(){


    if (moveCounter === 18)
    {
       stars.removeChild(stars.firstElementChild);
    }

    if (moveCounter  === 23)
    {
       stars.removeChild(stars.firstElementChild);
    }

    
}

/* Add stars back at the replay or restart of game */
function addStars(){
    let stars = $(".stars");
    stars.empty();
    stars.append("<li><i class='fa fa-star'></i></li>");
    stars.append("<li><i class='fa fa-star'></i></li>");
    stars.append("<li><i class='fa fa-star'></i></li>");


}

/* if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one) */
function matchCard() {
    var card1 = openCards[0].find("i").attr("class");
    var card2 = openCards[1].find("i").attr("class");

    if ( card1 === card2) {
       
        openCards[0].addClass("match");
        openCards[1].addClass("match");
        openCards = [];
        cardIDs = [];
        cardList.push(card1,card2);
        
    } 
    else {

        noMatch();
    }
        
    showScore();

    if (cardList.length === 16)
        {
            gameOver();
        }
}
/* if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)*/
function noMatch() {
    openCards[0].addClass("close");
    openCards[1].addClass("close");

    openCards = [];
    cardIDs = [];

    if ($("li.card").classlist !== 'card open show match')
    {
        $("li.card").removeClass("open show");
    }

}

/* increment the move counter and display it on the page (put this functionality in another function that you call from this one) */
function showScore(){
	moveCounter++;
	$(".moves").text(moveCounter);
}

/* Update timer display */
function updateDisplay() {
    let value = parseInt($('.timer').find('.value').text(), 10);
    value++;
    $('.timer').find('.value').text(value);
}

/* Stop Timer */
function stopTimer() {
    clearInterval(gameTimer);
}
/* if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)*/
 function gameOver() {

     let numberOfMoves = Number($(".moves").textContent);
    let time = document.querySelector('.value').textContent;
    let finalScore = Math.round((Number(time)/moveCounter) * 1000);
    let starHTML = stars.outerHTML;
    let playAgain = "<div class='playagain'> Play Again? </div>";

    stopTimer();
    popup.classList.toggle("show");
    popup.insertAdjacentHTML('beforeend', `<p>Game Over!</p> <p>Your Score Is  ${finalScore}.</p><p>You completed this in ${time} seconds.</p>`);
    popup.insertAdjacentHTML('beforeend',starHTML);
    popup.lastElementChild.classList = "finalStars";

    popup.insertAdjacentHTML('beforeend',playAgain);
    let playButton = $(".playagain");
    playButton.click(replay);
}

