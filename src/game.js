'use strict';

function main() {

  // Create the memoryGame instance, shuffle cards
  const memoryGame = new MemoryGame(cards);
  memoryGame.shuffleCards();

  // create function that generates each card DOM element,
  function createCardDivs () {
    let result = '';

    memoryGame.cards.forEach(function (ele) {
      result += `
      <div class="card" data-card-name="${ele.name}">
        <div class="back" name="${ele.img}"></div>
        <div class="front" style="background: url(img/${ele.img}) no-repeat"> </div>
      </div>`;
    });
    return result;
  }

  // Generate card divs and append them to the board 
  let memoryBoard = document.querySelector('#memory-board');
  memoryBoard.innerHTML = createCardDivs();

  // Add event listener to the back of each card
  let back = document.querySelectorAll('.back');
  back.forEach(function (element) {
    element.addEventListener('click', flipCard);
  });

  // main function that flips the card calls next functions accordingly
  function flipCard() {

    // Run the code in function only if first or second card are not selected yet
    if (this !== memoryGame.firstCard || this !== memoryGame.secondCard) {

      // if the first card is not selected
      if (!memoryGame.firstCard) {
        memoryGame.firstCard = this;
        displayCard(this);
        return;
      }
      // if the second card is not selected and 
      else if (!memoryGame.secondCard && this !== memoryGame.firstCard) {
        memoryGame.secondCard = this;
        blockBoard();
        displayCard(this);
        checkIfMatch();
        printGameInfo();
        
        memoryGame.checkIfGameOver();
      }
    }
  }

  // Modularize all the code into functions
  function blockBoard () {
    back.forEach((element) => element.classList.add('block'));    
  }

  function checkIfMatch() {
    let isMatch = memoryGame.checkIfMatch();
    isMatch ? resetBoard() : unflipCards();
  }

  function unflipCards() {
    setTimeout(function () {
      memoryGame.firstCard.style.background = '#0d8faf';

      memoryGame.secondCard.style.background = '#0d8faf';
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    memoryGame.firstCard = null;
    memoryGame.secondCard = null;
    back.forEach((element) => element.classList.remove('block'));
  }

  function printGameInfo() {
    document.getElementById('pairs-clicked').innerHTML = memoryGame.pairsClicked;
    document.getElementById('pairs-guessed').innerHTML = memoryGame.pairsMatched;
  }

  function displayCard(clickedCard) {
    clickedCard.style.background = `url(img/${clickedCard.getAttribute('name') }) no-repeat`;
  }
};

window.addEventListener('load', main);