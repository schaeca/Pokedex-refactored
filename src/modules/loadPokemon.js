import { container, path, caughtPokemons, pokeCardArray } from "./main"
import typeColors from "./typeColors"

async function loadPokemon() {
    let count = 1
    while (count < 151) {
        try {
            const res = await fetch(`${path}/${count}`)
            const data = await res.json()
            const typeData = data.types.map(t => {
                const typeName = t.type.name
                return {
                    name: typeName,
                    color: typeColors[typeName]
                }
            })
            const type = typeData.map(t=> {
                return `<span class="rounded-3xl py-1 px-3 text-xs text-white uppercase ${t.color}">${t.name}</span>`}).join(" ")
            
            console.log(typeData);
   
            
            const name = data.name
            const image = data.sprites.other.home.front_default

            
            let typeColor = "rounded-3xl py-1 px-3 text-xs text-white uppercase " + typeColors[type]
           

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
                        <div class="poke-type flex gap-1">${type}</div>
                    </div>                                
                `
            container.innerHTML += newHTML

            count++

        } catch (err) { console.error("Error while fetching data: ",err) }
    }
}

export default loadPokemon