document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('how-to').style.display = 'none'
  document.getElementById('start').addEventListener('click', function() {
    document.getElementById('how-to').style.display = 'none'
    document.getElementById('master-wrapper').style.display = 'grid'
    getChar(selectedCharId)
    getMonster()
    debuffsCreator()

    document.getElementById('leavegame').addEventListener('click', function() {
      document.getElementById('greet-page').style.display = 'grid'
      document.getElementById('master-wrapper').style.display = 'none'

      // Removes Old Character Div from BoardGame Div
      document.querySelector("#player").remove()

      // Removes Old Monster Divs from BoardGame Div
      monsterArr = Array.from(document.querySelectorAll("#monster"))
      monsterArr.forEach((monster) => {monster.remove()})

      // Removes Old Effect Divs from Board Game Div
      effectArr = Array.from(document.querySelectorAll(".effect"))
      effectArr.forEach((effect) => {effect.remove()})
    })
  })
})
