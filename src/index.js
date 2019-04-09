const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const toyCollection =  document.querySelector("#toy-collection")
const URL = "http://localhost:3000/toys"

  fetchToys(renderAllToys)

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      createToy()
    } else {
      toyForm.style.display = 'none'
    }
  })

  //create New Toy form
  function createToy(){
    const form = document.querySelector("#new-toy-form")

    form.addEventListener("submit", e=> {
      e.preventDefault()

      let toyName = document.querySelector("#toy-name").value
      let toyImage = document.querySelector("#toy-image").value

      if(toyName && toyImage){
        let toyObject = {name: toyName, image: toyImage, likes: 0}
        postPatchDeleteToy(URL, "POST", toyObject)
        form.reset()
      }
    })
  }

  //like a toy
  toyCollection.addEventListener('click', e=>{
    if(e.target.id === "like-button"){
      let toyId = e.target.parentNode.dataset.id
      let likeCount = parseInt(e.target.parentNode.querySelector('p').innerText)
      likeCount++

      let likeObject = {likes: likeCount}
      let url = `${URL}/${toyId}`

      postPatchDeleteToy(url, "PATCH", likeObject)
    }

    //delete a toy
    if(e.target.id === "delete-button"){
      let toyId = e.target.parentNode.dataset.id
      let url = `${URL}/${toyId}`
      postPatchDeleteToy(url, "DELETE")
    }
  })

  //fetch all Toys
  function fetchToys(callBack){
    fetch("http://localhost:3000/toys")
    .then(res=>res.json())
    .then(callBack)
  }

  //post or patch a toy to database
  function postPatchDeleteToy(url, method, object){
    fetch(url, {
      method: method,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(object)
    })
    .then(res=>res.json())
    .then(toy => {
      fetchToys(renderAllToys)
    })
  }

  //render all toys
  function renderAllToys(toys){
    toyCollection.innerHTML = ''
    toys.forEach(toyCard)
  }

  //make a toy card
  function toyCard(toy){
    toyCollection.innerHTML +=
    `
    <div data-id=${toy.id} class="card">
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button id="like-button" class="like-btn">Like ♥️</button>
      <button id="delete-button" class="like-btn">Delete</button>
    </div>
    `
  }
