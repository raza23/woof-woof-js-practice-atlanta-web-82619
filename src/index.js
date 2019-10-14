const main = 'http://localhost:3000/'
const filter = document.getElementById('filter-div')
const button = document.getElementById('good-dog-filter')
const dogBar = document.getElementById('dog-bar')
const dogInfo = document.getElementById('dog-info')
const dogsSummary = document.getElementById('dog-summary-container')


function fetchdogs(){
    fetch(main + 'pups')
    .then(res => res.json())
    .then(dogData => listDogs(dogData))
}


function listDogs(dogs){
    // console.log(dogs)
    dogs.map(dog => {
        const span = document.createElement('span')
        //  console.log(dogBar)
        span.textContent = dog.name
        span.addEventListener('mouseover', (e) => 
        displayDog(dog)
        )
        
        dogBar.appendChild(span)
        
        
    })
}

function clearNode(node){
    while(node.firstChild) {
        node.removeChild(node.firstChild)
    }
}

function displayDog(dog){
    clearNode(dogInfo)
    let dogImg = document.createElement('img')
    dogImg.src = dog.image
    
    let dogName = document.createElement('h2')
    dogName.textContent = dog.name
    
    let dogButt = document.createElement('button')
    if (dog.isGoodDog)
        dogButt.textContent = 'Good Dog'
    else
        dogButt.textContent = 'Bad Dog!'
        dogButt.classList += 'ui button'
        dogButt.addEventListener('click', (e) => {
            changeBehavior(dog)
        } )

    dogInfo.appendChild(dogImg)
    dogInfo.appendChild(dogName)
    dogInfo.appendChild(dogButt)

}

function changeBehavior(dog) { 
   dog.isGoodDog = !dog.isGoodDog
   fetch(main + `pups/${dog.id}`,{
       method: 'PATCH',
       headers: {
           'Content-Type': 'application/json',
           'Accepts' : 'application/json'
       },
       body: JSON.stringify(dog)
   })
   .then(res => res.json())
   .then(dog => displayDog(dog))
}

fetchdogs()