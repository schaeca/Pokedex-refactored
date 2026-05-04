import loadPokemon from "./loadPokemon";
import { markButtonSaved } from "./styleButtons";
import { markButtonFree } from "./styleButtons";
import pokemonHandler from "./pokemonHandler";

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

export function getCaughtPokemons() {
    return caughtPokemons
}

export function savePokemon(itemToStore){
    caughtPokemons.push(itemToStore)
    save()
}

export function removePokemon(buttonID){
    caughtPokemons = caughtPokemons.filter(p=>Number(p.id) !== buttonID)
    //  (only filter the ones that do not equal the id)
    save()
}

export function save(){
    localStorage.setItem("caughtPokemons", JSON.stringify(caughtPokemons))
}

