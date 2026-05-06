import {removePokemon } from "./main";
import renderPokedex from "./renderPokedex";

export const container = document.getElementById("pokemon-container");
container.addEventListener("click", pokedexClickHanlder);
renderPokedex();

function pokedexClickHanlder(e) {
  if (e.target.classList.contains("catchButton")) {
    const buttonID = Number(e.target.id);
    removePokemon(buttonID);
    renderPokedex();
  }
}
