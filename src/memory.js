'use strict';

let MemoryGame = function (cards) {
  this.cards = cards;
  this.firstCard = null;
  this.secondCard = null;
  this.pairsClicked = 0;
  this.pairsMatched = 0;
};

MemoryGame.prototype.shuffleCards = function () {
  let result = [];

  for (; this.cards.length > 0; ) {
    let randomNum = Math.floor(Math.random() * this.cards.length);
    let randomCard = this.cards.splice(randomNum, 1);
    result.push(randomCard[0]);
  }
  this.cards = result;
};

MemoryGame.prototype.checkIfMatch = function () {
  this.pairsClicked++;
  let firstCardValue = this.firstCard.getAttribute('name');
  let secondCardValue = this.secondCard.getAttribute('name');

  if ( firstCardValue === secondCardValue ) {
    this.pairsMatched++;
  } 
  else {
    return (firstCardValue === secondCardValue);
  }
};

MemoryGame.prototype.checkIfGameOver = function () {
  if (this.pairsMatched * 2 === this.cards.length) alert('GAME OVER');
};