document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('master-wrapper').style.display = 'none'
})

let selectedCharId
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
  clippers.innerText = "You're a Clippers fan. Move one space next turn."

  let leftPhone = document.createElement('div')
  leftPhone.id = 'leftphone'
  leftPhone.className = 'effect'
  leftPhone.innerText = "You left your phone at the start. Go back to start."

  let moveBack = document.createElement('div')
  moveBack.id = 'moveback'
  moveBack.className = 'effect'
  moveBack.innerText = "You're a fan of Jared Leto's joker. Move back 3 spaces on next turn."

  function debuffCreator(debuff, length) {
    while (document.querySelectorAll('.effect').length < length) {
      let boardNum = Math.ceil(Math.random() * 22)

      if (document.getElementById(`board-${boardNum}`).querySelector('.effect')) {
      } else {
        let clone = debuff.cloneNode(true)
        document.getElementById(`board-${boardNum}`).append(clone)
      }
    }
  }
  debuffCreator(dysentary, 2)
  debuffCreator(clippers, 4)
  debuffCreator(moveBack, 6)
  debuffCreator(leftPhone, 8)
}

function getChar(id) {
  fetch(`http://localhost:3000/characters/${id}`)
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
      let newishTile
      if (Math.random() > .5 ) {
        let newPosition = parseInt(monster.id.split('-')[1]) + 1
        if (newPosition > 24) {
          newPosition = 24
        } else if (newPosition < 0) {
          newPosition = 0
        }
        let newTile = document.getElementById(`board-${newPosition}`)
        newishTile = newTile
      } else {
        let newPosition = parseInt(monster.id.split('-')[1]) - 1
        if (newPosition > 24) {
          newPosition = 24
        } else if (newPosition < 0) {
          newPosition = 0
        }
        let newTile = document.getElementById(`board-${newPosition}`)
        newishTile = newTile
      }
      if (newishTile.children.namedItem("player")) {
        let captiveMonster = Array.from(document.getElementById('sprites-container').children).find(function(child) {
          return child.innerHTML != ''
        })
        if (captiveMonster) {
          captiveMonster.innerHTML = ''
          monster.children.namedItem("monster").remove()
        } else {
          alert(`${monster.children.namedItem("monster").dataset.tagline} Game over!`)
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

  if (currentPosition.querySelector('.effect')) {
    switch (currentPosition.querySelector('.effect').id) {
      case 'dysentary':
        value = Math.floor(value / 2)
        break
      case 'clippers':
        value = 1
        break
      case 'moveback':
        value = -3
        break
    }
  }

  let newPosition = parseInt(currentPosition.id.split("-")[1]) + parseInt(value)
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
      }
      i++
    }
    // debugger
    if (newTile.children.namedItem("leftphone")) {
      newTile = document.getElementById("board-0")
    }
  }
  if (newTile.children.namedItem("leftphone")) {
    newTile = document.getElementById("board-0")
  }

  newTile.append(insert(char, "player"))
  removeChar(currentPosition, 'player')
  document.getElementById('rollBtn').disabled = true
  document.getElementById('turn-character').style.background = 'white'
  document.getElementById('turn-monster').style.background = 'green'
  moveMonsters()
}

// HELPER METHODS-----------------------------------------------------------------------------------------

function insert (char, id) {
  let div = document.createElement('div')
  let img = document.createElement('img')
  img.src = char.image
  img.className = 'center image'
  div.id = id
  if (char.tagline) {
    div.dataset.tagline = char.tagline
  }
  div.append(img)
  return div
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
