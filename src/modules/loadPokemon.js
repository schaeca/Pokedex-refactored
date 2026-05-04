import { container, path, caughtPokemons, pokeCardArray } from "./main";
import typeColors from "./typeColors";
import renderTypes from "./renderTypes";
import createPokemonCard from "./createPokemonCard";

async function loadPokemon() {
  for (let count = 1; count < 151; count++) {
    try {
      const res = await fetch(`${path}/${count}`);
      const data = await res.json();
      const type = renderTypes(data.types);
      const name = data.name;
      const image = data.sprites.other.home.front_default;

      let pokeID = data.id;
      if (pokeID < 10) {
        pokeID = `00${pokeID}`;
      } else if (pokeID >= 10 && pokeID < 100) {
        pokeID = `0${pokeID}`;
      } else {
        pokeID = `${pokeID}`;
      }

      let pokeCard = {
        id: pokeID,
        name: name,
        img: image,
        type: type,
      };

      pokeCardArray.push(pokeCard);

      const wasCaught = caughtPokemons.some((i) => i.id === pokeID);
      let heart = wasCaught ? "♥" : "♡";

      const newHTML = createPokemonCard(
        pokeID,
        count,
        heart,
        image,
        name,
        type,
      );
      container.innerHTML += newHTML;
    } catch (err) {
      if (error.status === 404) {
        showUserFeedback("Not found.");
      } else if (error.status >= 500) {
        showUserFeedback(
          "The Poke API is currently overloaded. Please try at a later point.",
          { showRetry: true },
        );
      } else {
        showUserFeedback("An unexpected network error occured.");
      }
      console.error("Error while fetching data: ", err);
    }
  }
}

export default loadPokemon;
