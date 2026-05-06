import typeColors from "./typeColors";
import { getCaughtPokemons, removePokemon } from "./main";
import createPokemonCard from "./createPokemonCard";
import { renderTypesFromCaughtPokemons } from "./renderTypes";

const container = document.getElementById("pokemon-container");
container.addEventListener("click", pokedexClickHanlder);
renderPokedex();

function pokedexClickHanlder(e) {
  if (e.target.classList.contains("catchButton")) {
    const buttonID = Number(e.target.id);
    removePokemon(buttonID);
    renderPokedex();
  }
}

// window.handleNote = function (id) {
//     const oldNote = caughtPokemons.find(p => p.id === id)?.notes || "";
//     const note = prompt("Notiz hinzufügen:", oldNote);
//     if (note !== null) {
//         caughtPokemons = caughtPokemons.map(p => p.id === id ? { ...p, notes: note } : p);
//         localStorage.setItem("caughtPokemons", JSON.stringify(caughtPokemons));
//         renderPokedex();
//     }
// };

// window.handleRelease = function (id) {
//     if (confirm("Release Pokémon?")) {
//         caughtPokemons = caughtPokemons.filter(p => p.id !== id);
//         localStorage.setItem("caughtPokemons", JSON.stringify(caughtPokemons));
//         renderPokedex();
//     }
// };

function renderPokedex() {
  const caughtPokemons = getCaughtPokemons();
  container.innerHTML = "";

  if (caughtPokemons.length === 0) {
    container.innerHTML = `<p class="text-gray-500 col-span-full text-center py-10">Your PokéDex is empty.</p>`;
    return;
  }

  caughtPokemons.forEach((pokemon, i) => {
    const pokeID = pokemon.id;
    const name = pokemon.name;
    const img = pokemon.img;
    const type = renderTypesFromCaughtPokemons(pokemon.type);
    const heart = "♥";
    const count = pokeID;

    // const notesHTML = pokemon.notes
    //     ? `<p class="text-[10px] italic text-gray-700 mt-2 p-1 bg-yellow-100 border-l-2 border-yellow-400 w-full rounded pointer-events-none">"${pokemon.notes}"</p>`
    //     : "";
    const cardHTML = createPokemonCard(pokeID, count, heart, img, name, type);
    // const cardHTML = `
    //     <div class="pokemon-card relative rounded-md bg-gray-100 flex flex-col items-center shadow-md p-2 hover:scale-105 transition-transform overflow-hidden cursor-pointer">
    //         <div class="flex justify-between items-center w-full px-1 z-30 relative">
    //             <p class="poke-id bg-black text-white px-2 py-0.5 rounded-2xl text-[10px]">#${pokemon.id}</p>
    //             <button onclick="event.stopPropagation(); window.handleRelease('${pokemon.id}')" class="text-red-500 text-xl hover:scale-125 transition-transform z-50">♥</button>
    //         </div>
    //         <div class="relative w-full flex justify-center py-4">
    //             <img class="w-28 h-28 object-contain pointer-events-none" src="${pokemon.img}" alt="${pokemon.name}">
    //         </div>
    //         <div class="p-2 bg-white w-full flex flex-col items-start rounded-md shadow-inner relative z-10 pointer-events-none">
    //             <p class="poke-name font-bold text-base capitalize">${pokemon.name}</p>
    //             <p class="poke-type rounded-full py-0.5 px-3 text-[10px] text-white uppercase font-semibold ${typeColor}">
    //                 ${pokemon.type}
    //             </p>
    //             ${notesHTML}
    //         </div>
    //     </div>`;
    container.innerHTML += cardHTML;
  });
}
