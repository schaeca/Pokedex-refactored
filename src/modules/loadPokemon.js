import { container } from "./main"
import { path } from "./main"
import { caughtPokemons } from "./main"
import { pokeCardArray
    
 } from "./main"
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
           let heart = wasCaught ? "♥" : "♡"

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

        } catch (err) { console.error("Error while fetching data: ",err) }
    }
}

export default loadPokemon