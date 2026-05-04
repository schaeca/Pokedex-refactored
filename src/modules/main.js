//define the container where the pokecards will be displayed
const container = document.getElementById("pokemon-container")
//the path of the pokemon API
const path = "https://pokeapi.co/api/v2/pokemon"
//define the array of the pokemons either as empty array if no pokemon has been saved/caught before or as the array of pokemons saved in the local storage
let caughtPokemons = JSON.parse(localStorage.getItem("caughtPokemons")) || []
//define the array that will be used for saving the pokemons in the local storage
let pokeCardArray = []


async function loadPokemon() {
    let count = 1
    while (count < 151) {
        try {
            const res = await fetch(`${path}/${count}`)
            const data = await res.json()
            const type = data.types[0].type.name
            const name = data.name
            const image = data.sprites.other.home.front_default

            let typeColor = "rounded-3xl py-1 px-3 text-xs text-white uppercase"
            if (type == "grass") {
                typeColor += " bg-green-400"
            } else if (type == "fire") {
                typeColor += " bg-red-500"
            } else if (type == "water") {
                typeColor += " bg-blue-400"
            } else if (type == "bug") {
                typeColor += " bg-[#acba5f]"
            } else if (type == "poison") {
                typeColor += " bg-violet-400"
            } else if (type == "psychic") {
                typeColor += " bg-pink-400"
            } else if (type == "ghost") {
                typeColor += " bg-[#864491]"
            } else if (type == "ground") {
                typeColor += " bg-orange-800"
            } else if (type == "fairy") {
                typeColor += " bg-fuchsia-400"
            } else if (type == "fighting") {
                typeColor += " bg-orange-400"
            } else if (type == "rock") {
                typeColor += " bg-[#c7cca9]"
            } else if (type == "electric") {
                typeColor += " bg-yellow-300"
            } else if (type == "ice") {
                typeColor += " bg-blue-200"
            } else if (type == "dragon") {
                typeColor += " bg-indigo-500"
            } else {
                typeColor += " bg-gray-300"
            }

            let pokeID = data.id
            if (pokeID < 10) {
                pokeID = `00${pokeID}`
            } else if (pokeID >= 10 && pokeID < 100) {
                pokeID = `0${pokeID}`
            } else {
                pokeID = `${pokeID}`
            }

            let pokeCard = {
                id: pokeID,
                name: name,
                img: image,
                type: type,
            }

            const wasCaught = caughtPokemons.some(i => i.id === pokeID)
            let heart
            if (!wasCaught) { heart = "♡" } else { heart = "♥" }

            pokeCardArray.push(pokeCard)

            let newHTML = `
                <div class="pokemon-card rounded-md bg-gray-100 flex flex-col justify-center items-center shadow-md">
                    <div class="flex flex-col justify-center items-center pt-2">
                        <div class="flex justify-between items-center w-full px-2">
                            <p class = "poke-id bg-black text-white p-1 rounded-2xl text-xs">#${pokeID}</p>
                            <button id = "${count}" class="catchButton text-2xl bg-white text-red-500 px-2 rounded-full">${heart}</button>
                        </div>
                        <img class = "w-full h-full object-contain pb-8" src=${image}>
                    </div>
                    <div class = "p-2 bg-white min-w-full flex flex-col justify-center items-start rounded-md">
                        <p class="poke-name font-bold text-lg capitalize pb-2">${name}</p>
                        <p class="poke-type ${typeColor}">${type}</p>
                    </div>                                
                `
            container.innerHTML += newHTML

            count++

        } catch (err) { console.error(err) }
    }
}

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
    console.log(`buttonID: ${buttonID}`);
    const index = buttonID - 1
    const itemToStore = pokeCardArray[index]
    console.log(itemToStore);

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