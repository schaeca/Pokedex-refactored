import loadPokemon from "./loadPokemon";
import { markButtonSaved } from "./styleButtons";
import { markButtonFree } from "./styleButtons";
import pokemonHandler from "./pokemonHandler";

//container where the pokecards will be displayed
export const container = document.getElementById("pokemon-container")
//path of the pokemon API
export const path = "https://pokeapi.co/api/v2/pokemon"
//array of saved Pokemons
export let caughtPokemons = JSON.parse(localStorage.getItem("caughtPokemons")) || [];
//define the array that will be used for saving the pokemons in the local storage
export let pokeCardArray = []

if (container && !document.body.classList.contains("pokedex")) {
    loadPokemon()
    
    container.addEventListener("click", clickHandler)
    
    //function for clicking the "heart button"
    function clickHandler(e) {
        console.log("clickhandler started");
        
        if (e.target.classList.contains("catchButton")) {
            pokemonHandler(e)
        }
    }    
    
} else{}

export function getCaughtPokemons() {
        return caughtPokemons
    }

export function addPokemon(itemToStore){    
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
