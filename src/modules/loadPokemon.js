import { container, path, caughtPokemons, pokeCardArray } from "./main";
import typeColors from "./typeColors";
import renderTypes from "./renderTypes";
import createPokemonCard from "./createPokemonCard";

async function loadPokemon() {
  for (let count = 1; count < 151; count++) {
    try {
      const res = await fetch(`${path}/${count}`);

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      const data = await res.json();
      if (!data) continue;
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
      let message = "Something went wrong.";

      if (err.message.includes("HTTP Error")) {
        message = "Server error. Please try again later.";
      } else if (err.message.includes("Failed to fetch")) {
        message = "No internet connection. Check your network.";
      } else if (err.message.includes("Timeout")) {
        message = "Request took too long. Try again.";
      }
      showPokeError(message);
      console.error("Error while fetching data: ", err);
      return null;
    }
  }
}

function showPokeError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.textContent = message;
  errorDiv.className = "text-red-500";
  container.appendChild(errorDiv);
}

export default loadPokemon;
