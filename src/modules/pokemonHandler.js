import { getCaughtPokemons, addPokemon, removePokemon, pokeCardArray, save} from "./main"
import { markButtonFree, markButtonSaved } from "./styleButtons"

function pokemonHandler(e) {
    console.log("pokemonHandler started");
    
    e.preventDefault()
    console.log(e);
    const buttonID = Number(e.target.id)
    const index = buttonID - 1
    const itemToStore = pokeCardArray[index]
    const caughtPokemons = getCaughtPokemons()
    console.log(caughtPokemons);
    
    
    //check if pokemon was already saved (check if id of the pokemon can be found in the saved array)
    //if not save the pokemon
    if (caughtPokemons.length === 0){
        addPokemon(itemToStore)
        markButtonSaved(buttonID)
        
    } else{   
        if (!caughtPokemons.some(i => Number(i.id) === buttonID)) {
            addPokemon(itemToStore) 
            //style the heart button accordingly
            markButtonSaved(buttonID)
            
        } else {
            //else remove the pokemon
            removePokemon(buttonID)      
            //style the heart button accordingly
            markButtonFree(buttonID)            
        }
    }
}

export default pokemonHandler