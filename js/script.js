document.addEventListener('DOMContentLoaded', function() {
  // checkTiles()
  getChar()
  getMonster()
  debuffsCreator()
})

let char
let monster1, monster2, monster3, monster4, monster5
let effectsArr = []

function debuffsCreator () {
  let dysentary = document.createElement('div')
  dysentary.id = 'dysentary'
  dysentary.className = 'effect'
  dysentary.innerText = 'You have dysentary lol. Your next dice roll will be halved.'

  let clippers = document.createElement('div')
  clippers.id = 'clippers'
  clippers.className = 'effect'
  clippers.innerText = "You're a Clippers fan. Lose a turn!"

  let leftPhone = document.createElement('div')
  leftPhone.id = 'leftphone'
  leftPhone.className = 'effect'
  leftPhone.innerText = "You left your phone at the start. Go back to start."

  let moveBack = document.createElement('div')
  moveBack.id = 'moveback'
  moveBack.className = 'effect'
  moveBack.innerText = "You're a fan of Jared Leto's joker. Move back 3 spaces."

  // let index = Math.floor(Math.random() * monsterArr.length)
  function debuffCreator(debuff, length) {
    while (document.querySelectorAll('.effect').length < length) {
      let boardNum = Math.floor(Math.random() * 23)
      // debugger
      if (document.getElementById(`board-${boardNum}`).querySelector('.effect')) {
      } else {
        let clone = debuff.cloneNode(true)
        document.getElementById(`board-${boardNum}`).append(clone)
      }
    }
  }
  debuffCreator(dysentary, 2)
  debuffCreator(clippers, 4)
  debuffCreator(leftPhone, 6)
  debuffCreator(moveBack, 8)
}

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
    if (monster.children.namedItem("monster")) {
      // debugger
      let newishTile
      if (Math.random() > .5 ) {
        let newPosition = parseInt(monster.id.split('-')[1]) + 1
        if (newPosition > 24) {
          newPosition = 24
        } else if (newPosition < 0) {
          newPosition = 0
        }
        let newTile = document.getElementById(`board-${newPosition}`)
        // newTile.append(monster.firstElementChild)
        newishTile = newTile
      } else {
        let newPosition = parseInt(monster.id.split('-')[1]) - 1
        if (newPosition > 24) {
          newPosition = 24
        } else if (newPosition < 0) {
          newPosition = 0
        }
        let newTile = document.getElementById(`board-${newPosition}`)
        // newTile.append(monster.firstElementChild)
        newishTile = newTile
      }
      if (newishTile.children.namedItem("player")) {
        let captiveMonster = Array.from(document.getElementById('sprites-container').children).find(function(child) {
          return child.innerHTML != ''
        })
        if (captiveMonster) {
          captiveMonster.innerHTML = ''
          // debugger
          monster.children.namedItem("monster").remove()
        } else {
          alert('Game over!')
        }
      } else {
        newishTile.append(monster.children.namedItem('monster'))
      }
      return newishTile
    }

  }
  setTimeout(() => {monster1 = rollAndMove(monster1)}, 250)
  setTimeout(() => {monster2 = rollAndMove(monster2)}, 500)
  setTimeout(() => {monster3 = rollAndMove(monster3)}, 1000)
  setTimeout(() => {monster4 = rollAndMove(monster4)}, 1500)
  setTimeout(() => {
    monster5 = rollAndMove(monster5)
    // debugger
    document.getElementById('rollBtn').disabled = false
    document.getElementById('turn-character').style.background = 'green'
    document.getElementById('turn-monster').style.background = 'white'
  }, 2000)

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


  if (newTile.children.namedItem('monster')) {
    let spritesContainer = document.getElementById('sprites-container')
    let i = 0
    while (!!newTile.children.namedItem('monster')) {
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
