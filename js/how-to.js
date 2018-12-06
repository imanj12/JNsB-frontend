document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('how-to').style.display = 'none'
  document.getElementById('start').addEventListener('click', function() {
    document.getElementById('how-to').style.display = 'none'
    document.getElementById('master-wrapper').style.display = 'grid'
    getChar(selectedCharId)
    getMonster()
    debuffsCreator()

    document.getElementById('leavegame').addEventListener('click', gameOver)
  })
})
