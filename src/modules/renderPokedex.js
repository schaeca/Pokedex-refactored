import { container } from "./showPokedex";
import { getCaughtPokemons } from "./main";
import { renderTypesFromCaughtPokemons } from "./renderTypes";
import createPokemonCard from "./createPokemonCard";

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
    const notesHTML = pokemon.notes
        ? `<p class="text-[10px] italic text-gray-700 mt-2 p-1 bg-yellow-100 border-l-2 border-yellow-400 w-full rounded pointer-events-none">"${pokemon.notes}"</p>`
        : "";
    const cardHTML = createPokemonCard(pokeID, count, heart, img, name, type, notesHTML);
    container.innerHTML += cardHTML;
  });
}

export default renderPokedex