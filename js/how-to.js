document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('how-to').style.display = 'none'
  document.getElementById('start').addEventListener('click', function() {
    document.getElementById('how-to').style.display = 'none'
    document.getElementById('master-wrapper').style.display = 'grid'
    getChar(selectedCharId)
    getMonster()
    debuffsCreator()
    document.getElementById('turn-character').style.background = 'green'
    document.getElementById('turn-monster').style.background = 'none'
    document.getElementById('rollBtn').disabled = false
    document.getElementById('leave-game').addEventListener('click', gameOver)
  })
})
