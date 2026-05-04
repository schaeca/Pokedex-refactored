import loadPokemon from "./loadPokemon";
//define the container where the pokecards will be displayed
export const container = document.getElementById("pokemon-container")
//the path of the pokemon API
export const path = "https://pokeapi.co/api/v2/pokemon"
//define the array of the pokemons either as empty array if no pokemon has been saved/caught before or as the array of pokemons saved in the local storage
export let caughtPokemons = JSON.parse(localStorage.getItem("caughtPokemons")) || [];
//define the array that will be used for saving the pokemons in the local storage
export let pokeCardArray = []

loadPokemon()

//add the clickHandler function as an eventlistener to the container, so when the catchbutton (=the heart) is clicked, the pokemonHandler function will be called
container.addEventListener("click", clickHandler)

//function for clicking the "heart button"
function clickHandler(e) {
    if (e.target.classList.contains("catchButton")) {
        pokemonHandler(e)
    }
}

//function to save or unsave pokemons in the local storage and style the heart button accordingly
function pokemonHandler(e) {
    e.preventDefault()
    const buttonID = Number(e.target.id)
    const index = buttonID - 1
    const itemToStore = pokeCardArray[index]

    //saving process
    //is the pokemon already caught? --> check if the pokemons id can be found in the caughtPokemons array)
   if (!caughtPokemons.some(i => Number(i.id) == buttonID)) {
        //if it cannot be found, add that pokemon to the caughtPokemons array 
        caughtPokemons.push(itemToStore)       
        //pokemon has been saved, caughtPokemons array should be updated --> save the new caughtPokemons array to the local storage
        localStorage.setItem("caughtPokemons", JSON.stringify(caughtPokemons))
        //style the heart button accordingly
        markButtonSaved(buttonID)
    } else {
        //unsaving process
        //the pokemon was already caught, so it needs to be removed from the caughtPokemons array
        caughtPokemons = caughtPokemons.filter(i => Number(i.id) !== buttonID)        
        //the filter returns all pokemons that do not have the id being checked right now --> so the pokemon with that id has been removed and the caughtPokemons array has been updated accordingly
        //save the new caugthPokemnons array to the local storage
        localStorage.setItem("caughtPokemons", JSON.stringify(caughtPokemons))
        //style the heart button accordingly
        markButtonFree(buttonID)
    }
}

//style the heart button as filled heart to show the pokemon has been saved
function markButtonSaved(buttonID) {
    let pokeButton = document.getElementById(buttonID)
    pokeButton.textContent = "♥"
}

//style the heart button as empty heart to show the pokemon has been removed
function markButtonFree(buttonID) {
    let pokeButton = document.getElementById(buttonID)
    pokeButton.textContent = "♡"
}