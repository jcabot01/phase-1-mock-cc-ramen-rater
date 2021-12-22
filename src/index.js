
const baseUrl = "http://localhost:3000/ramens"

//define variables
const ramenDetail = document.getElementById('ramen-detail') //assign variable to ramen-detail so we can host whole menu item; image, name, etc.
// const onLoadEvent = ( => {
//     let bigImage = document.getElementById('ramen-detail')
//     bigImage.addEventListener('load', (event) => {
//         console.log('Logo has been loaded!');
//         logo.src = "logo.png"


//fetches
//GET
const getRamenObjs = () => {    //fetch ramen data using GET request
    fetch(baseUrl) //server request
    .then(res => res.json()) //promise
    .then(renderAllRamens) //send all retrieved data to a render helper function
}

//POST
//send input data here via callback
const postNewRamen = newRamenObj => { //POST new ramen object from input form
    const config = {    //new ramen items are submitted via input form then posted to server via POST request
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(newRamenObj) //new ramen input data is to be stringified
    }
    fetch(baseUrl, config) //perform a fetch request then post new object
    .then(res => res.json()) //promise
    .then(renderRamenMeal) //output is sent to helper function that renders ramen objects onto the page.
}

//PATCH
//using the existing input form to patch an existing ramen object
// const patchRamen = (image, rating, comment, id) => { //use name and restaurant to call up the ramen object needing an update
//     const updateBody = {
//         // "name": name,
//         // "restaurant": restaurant,
//         "image": image,
//         "rating": rating,
//         "comment": comment, 
//     }
//     const config = {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(updateBody)
//     }
//     fetch(baseUrl + `/${id}`, config)
//     .then(res => res.json())
//     .then(console.log)
// }
//rendering
const renderAllRamens = ramenArr => { //after GET request, we have an array of ramen objects.  We need to do a forEach to render each object onto page
    ramenArr.forEach(renderRamenMeal) //take every object in ramenArr, and for each one, we will render them in the meals rendering
}

const renderRamenMeal = ramenObj => { //take in each ramenObj, and let's assign all of the HTML parts to db.json parts and get them communicating
    //example // "id": 2,
            //   "name": "Naruto Ramen",
            //   "restaurant": "Naruto",
            //   "image": "./assets/ramen/naruto.jpg",
            //   "rating": 10,
            //   "comment": "My absolute fave!"

    //create containers for images
    const imgContainer = document.createElement('container')
    const img = document.createElement('img') //create an HTML img tag to display each item's picture
    img.src = ramenObj.image //connect HTML element with db.json data

    //create a delete button incase our review is too harsh and we don't want to hurt anyone's feelings
    const deleteBtn = document.createElement('button') //create HTML element and define as an a variable in this scope
        deleteBtn.dataset.id = ramenObj.id //assign the HTML delete button to the ramen Object id
        deleteBtn.innerText = 'Remove'
        deleteBtn.className = 'remove-btn'
        deleteBtn.style.cssText = 'display:flex;margin-left:33%'   

    imgContainer.append(img, deleteBtn)
    

    //define destination container for pictures
    const ramenMenu = document.querySelector("#ramen-menu") //assign variable to ramen-menu div so we can have a gellery of all menu items.
    ramenMenu.append(imgContainer)   //append all ramen images to ramenMenu <div>

    deleteBtn.addEventListener('click', (e) => { //pass in click event...
        const id = e.target.dataset.id
        // console.log(id)
        fetch(baseUrl + `/${id}`, {method: "DELETE"})
        .then(res => res.json())
        .then(console.log) 

        window.location.reload();
    })

    //event listeners
    img.addEventListener('click', () => { //pass in click event...    
        const detailImage = document.querySelector('.detail-image')
            detailImage.src = ramenObj.image
            detailImage.alt = ramenObj.name

            const name = document.querySelector(".name")
            name.innerText = ramenObj.name //assign HTML h2 to db.json name

            const restaurant = document.querySelector(".restaurant")
            restaurant.innerText = ramenObj.restaurant //assign HTML h3 class '.restaurant' to db.json restaurant

            const rating = document.querySelector("#rating-display")
            rating.innerText = ramenObj.rating //assign HTML span id '#rating-display' to db.json rating

            const comment = document.querySelector("#comment-display")
            comment.innerText = ramenObj.comment //assign HTML <p> tag id '#comment-display' to db.json comment
    })
}

const createBtn = document.getElementById("new-ramen")  //assign a new variable to HTML new-ramen input form
createBtn.addEventListener('submit', (e) => {   //assign eventListener on new-ramen submit button
    e.preventDefault() //prevent page reload on submission

    //create new ramen object
    const newRamenObj = {}
    newRamenObj.name = document.querySelector("#new-name").value
    newRamenObj.restaurant = document.querySelector("#new-restaurant").value
    newRamenObj.image = document.querySelector("#new-image").value
    newRamenObj.rating = document.querySelector("#new-rating").value
    newRamenObj.comment = document.querySelector("#new-comment").value
    
    // console.log(newRamenObj)
    postNewRamen(newRamenObj)   //send new ramen object to POST request
    createBtn.reset() //reset the form to blank after submission
})


getRamenObjs() //on page load run GET fetch to server