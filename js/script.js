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
  document.getElementById('turn-character').style.background = 'green'
}

function setMonster (monsters) {
  let selectedMonsters = monsterPicker(monsters)
    // debugger
  monster1 = document.getElementById('board-2')
  monster1.append(insert(selectedMonsters[0], "monster"))

  monster2 = document.getElementById('board-7')
  monster2.append(insert(selectedMonsters[1], "monster"))

  monster3 = document.getElementById('board-12')
  monster3.append(insert(selectedMonsters[2], "monster"))

  monster4 = document.getElementById('board-17')
  monster4.append(insert(selectedMonsters[3], "monster"))

  monster5 = document.getElementById('board-22')
  monster5.append(insert(selectedMonsters[4], "monster"))
}

function moveMonsters() {

  function rollAndMove(monster) {
    if (monster.children.length > 0) {
      if (Math.random() > .5 ) {
        let newPosition = parseInt(monster.id.split('-')[1]) + 1
        if (newPosition > 24) {
          newPosition = 24
        } else if (newPosition < 0) {
          newPosition = 0
        }
        let newTile = document.getElementById(`board-${newPosition}`)
        newTile.append(monster.firstElementChild)
        return newTile
      } else {
        let newPosition = parseInt(monster.id.split('-')[1]) - 1
        if (newPosition > 24) {
          newPosition = 24
        } else if (newPosition < 0) {
          newPosition = 0
        }
        let newTile = document.getElementById(`board-${newPosition}`)
        newTile.append(monster.firstElementChild)
        return newTile
      }
    }
  }
  setTimeout(() => {monster1 = rollAndMove(monster1)}, 500)
  setTimeout(() => {monster2 = rollAndMove(monster2)}, 1000)
  setTimeout(() => {monster3 = rollAndMove(monster3)}, 2000)
  setTimeout(() => {monster4 = rollAndMove(monster4)}, 3000)
  setTimeout(() => {
    monster5 = rollAndMove(monster5)
    document.getElementById('rollBtn').disabled = false
    document.getElementById('turn-character').style.background = 'green'
    document.getElementById('turn-monster').style.background = 'white'
  }, 4000)

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
  let newPosition = parseInt(currentPosition.id.split("-")[1]) + 2 // REMEMBER!!!!!!!!!!!!!!!!!!!!
  if (newPosition > 24) {
    newPosition = 24
  }
  let newTile = document.getElementById(`board-${newPosition}`)
  // check if newTile has child element of monster
  // if newTile has monster
    // then remove monster and put in sprites div


  if (newTile.children.namedItem('monster')) {
    let spritesContainer = document.getElementById('sprites-container')
    let i = 0
    while (newTile.children.length > 0) {
      // debugger
      if (spritesContainer.children[i].innerHTML === '') {
        spritesContainer.children[i].append(newTile.children.namedItem('monster'))
        // reset monster 1
      }
      i++
    }
  }


  newTile.append(insert(char, "player"))
  removeChar(currentPosition, 'player')
  document.getElementById('rollBtn').disabled = true
  document.getElementById('turn-character').style.background = 'white'
  document.getElementById('turn-monster').style.background = 'green'
  moveMonsters()
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

function removeChar (element, id) {
  element.children.namedItem(id).remove()
}

function monsterPicker (monsterArr) {
  let selectedMonsters = []
  while (monsterArr.length > 3) {
    let index = Math.floor(Math.random()*monsterArr.length)
    selectedMonsters.push(monsterArr.splice(index,1))
  }
  return selectedMonsters = selectedMonsters.flat()
}
