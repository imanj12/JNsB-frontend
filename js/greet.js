document.addEventListener('DOMContentLoaded', function (){
  getAllChars()
  document.getElementById('char-form').addEventListener('submit', createChar)
})

function getAllChars () {
  fetch('http://localhost:3000/characters')
    .then(res => res.json())
    .then(data => renderChars(data))
}

function createChar (event) {
  event.preventDefault()
  let charForm = document.querySelector("#char-form")
  dataObject = {
    name: charForm.children[0].value.trim(),
    image: charForm.children[1].value.trim(),
  }
  charForm.children[0].value = ''
  charForm.children[1].value = ''

  fetch('http://localhost:3000/characters', {
    method: "POST",
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(dataObject)
  })
    .then(res => res.json())
    .then(data => renderChars([data]))
}

function renderChars (charsArr) {
  charsArr.forEach(char => {
    let div = document.createElement('div')
    let img = document.createElement('img')
    div.innerHTML = `<h3 class="center">${char.name}</h3>`
    div.className = "grid-item center greet-chars"
    img.src = char.image
    img.className = "image center"
    img.dataset.id = char.id

    img.addEventListener('click', goToHowTo)

    div.append(img)

    if (!((char.name === "Hillary") || (char.name === "Paul") || (char.name === "Lane"))) {
      let btn = document.createElement("button")
      btn.dataset.id = char.id
      btn.innerText = "Delete Character"
      btn.className = "delete-char"
      btn.addEventListener("click", deleteChar)
      div.append(btn)
    }

    let charContainer = document.getElementById('characters')
    charContainer.append(div)
  })
}

function goToHowTo (event) {
  event.preventDefault()
  document.getElementById('greet-page').style.display = 'none'
  selectedCharId = event.target.dataset.id
  document.getElementById('how-to').style.display = 'grid'

}

function deleteChar(event) {
  const id = event.target.dataset.id

  fetch(`http://localhost:3000/characters/${id}`, {
    method: "DELETE"
  })
    .then(() => {
      event.target.parentElement.remove()
    })
}
