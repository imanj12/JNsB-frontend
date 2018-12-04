document.addEventListener('DOMContentLoaded', function() {
  checkTiles()
})


function checkTiles () {
  let tiles = Array.from(document.getElementById('gameboard').children)
  tiles.forEach(tile => tile.innerText = 'Test')
}

function response(res) {
  // returns an array of the values from the dice
  console.log(res)
}
function rollDiceWithoutValues() {
  const element = document.getElementById('dice-box1');
  const numberOfDice = 1;
  const options = {
    element, // element to display the animated dice in.
    numberOfDice, // number of dice to use
    callback: response
  }
  rollADie(options);
}
