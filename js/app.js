/*
 * Create a list that holds all of your cards
 */
const singleCards = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"]
const cards = singleCards.concat(singleCards);
let shuffledCards = [];
let moveCounter = 0;
let stars = document.querySelector(".stars");
let popup = document.getElementById("myPopup");
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
 restart();
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
	cardShuffle();
    $("li.card").removeClass("open show match");
    $(".moves").text(moveCounter);

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
            if($(this).classlist !== 'card open show match'){
                $(this).removeClass('close');
                $(this).toggleClass('open');
                $(this).toggleClass('show');
                var card = $(this);
                openCards.push(card);
                /*  - if the list already has another card, check to see if the two cards match*/
                if(openCards.length === 2){
                    matchCard();
      
                }
            }
        }

        
}/* if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one) */
function matchCard() {
    var card1 = openCards[0].find("i").attr("class");
    var card2 = openCards[1].find("i").attr("class");

    if ( card1 === card2) {
       
        openCards[0].addClass("match");
        openCards[1].addClass("match");
        openCards = [];
        cardIDs = [];
        cardList.push(card1,card2);
        openCards[0].removeClass("open show");
		openCards[1].removeClass("open show");
  
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
/* if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)*/
 function gameOver() {

    let numberOfMoves = Number($(".moves").textContent);
    
    let playAgain = "<div class='playagain'> Play Again? </div>";
    let playButton = $(".playagain");

    playButton.click(replay);

}

