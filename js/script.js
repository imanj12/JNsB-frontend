document.addEventListener('DOMContentLoaded', function() {
  // checkTiles()
  getChar()
  getMonster()
})

let turn = true
let char
let monster1, monster2, monster3, monster4, monster5

function getChar() {
  fetch('http://localhost:3000/characters/1')
    .then(res => res.json())
    .then(data => {
      char = data
      start(char)})
}

function getMonster () {
  fetch('http://localhost:3000/monsters')
    .then(res => res.json())
    .then(data => {
      setMonster(Array.from(data))
    })
}

function start(char) {
  let firstTile = document.getElementById('board-0')
  firstTile.append(insert(char, "player"))
}

function setMonster (monsters) {
  let selectedMonsters = monsterPicker(monsters)
    // debugger
  let firstMonster = document.getElementById('board-2')
  firstMonster.append(insert(selectedMonsters[0], "monster"))

  let secondMonster = document.getElementById('board-7')
  secondMonster.append(insert(selectedMonsters[1], "monster"))

  let thirdMonster = document.getElementById('board-12')
  thirdMonster.append(insert(selectedMonsters[2], "monster"))

  let fourthMonster = document.getElementById('board-17')
  fourthMonster.append(insert(selectedMonsters[3], "monster"))

  let fifthMonster = document.getElementById('board-22')
  fifthMonster.append(insert(selectedMonsters[4], "monster"))
}

function checkTiles () {
  let tiles = Array.from(document.getElementById('gameboard').children)
  tiles.forEach(tile => tile.innerText = 'Test')
}

function rollDiceWithoutValues() {
  const element = document.getElementById('dice-box1');
  const numberOfDice = 1;
  const options = {
    element, // element to display the animated dice in.
    numberOfDice, // number of dice to use
    callback: moveChar
  }
  rollADie(options);
}

function moveChar (value) {
  let currentPosition = document.getElementById("player").parentElement
  let newPosition = parseInt(currentPosition.id.split("-")[1]) + parseInt(value)
  let newTile = document.getElementById(`board-${newPosition}`)
  newTile.append(insert(char, "player"))
  removeChar(currentPosition)
  // disable roll
  // highlight monster turn
  // function to move monsters
    // at end of this function, re-enable roll, highlight character turn
}

// HELPER METHODS-----------------------------------------------------------------------------------------

function insert (char, id) {
  let img = document.createElement('img')
  img.src = char.image
  img.className = 'center image'
  img.id = id
  return img
}

function removeChar (element) {
  element.children.namedItem('player').remove()
}

function monsterPicker (monsterArr) {
  let selectedMonsters = []
  while (monsterArr.length > 3) {
    let index = Math.floor(Math.random()*monsterArr.length)
    selectedMonsters.push(monsterArr.splice(index,1))
  }
  return selectedMonsters = selectedMonsters.flat()
}
