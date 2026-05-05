function createPokemonCard(pokeID, count, heart, image, name, type) {
  return `
                <div class="pokemon-card rounded-md bg-gray-100 flex flex-col justify-center items-center shadow-md hover:scale-105 transition-transform overflow-hidden cursor-pointer">
                    <div class="flex flex-col justify-center items-center pt-2">
                        <div class="flex justify-between items-center w-full px-2">
                            <p class = "poke-id bg-black text-white p-1 rounded-2xl text-xs">#${pokeID}</p>
                            <button id = "${count}" class="catchButton text-2xl bg-white text-red-500 px-2 rounded-full hover:scale-125 transition-transform z-50">${heart}</button>
                        </div>
                        <img class = "w-full h-full object-contain pb-8" src=${image}>
                    </div>
                    <div class = "p-2 bg-white min-w-full flex flex-col justify-center items-start rounded-md">
                        <p class="poke-name font-bold text-lg capitalize pb-2">${name}</p>
                        <div class="poke-type flex gap-1">${type}
                    </div>
                </div>                                
                `;
}

export default createPokemonCard;
