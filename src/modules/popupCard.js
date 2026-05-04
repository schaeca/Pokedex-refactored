import typeColors from "./typeColors";

// const typeColors = {
//     grass: "bg-green-400", fire: "bg-red-500", water: "bg-blue-400",
//     bug: "bg-lime-500", poison: "bg-purple-400", psychic: "bg-pink-400",
//     ghost: "bg-purple-700", ground: "bg-yellow-700", fairy: "bg-pink-200",
//     fighting: "bg-orange-600", rock: "bg-stone-400", electric: "bg-yellow-300",
//     ice: "bg-cyan-200", dragon: "bg-indigo-600", normal: "bg-gray-300"
// };

document.addEventListener('click', async (event) => {
    const card = event.target.closest('.pokemon-card');
    if (!card || event.target.closest('button')) return;

    const nameElement = card.querySelector('.poke-name');
    if (!nameElement) return;

    const name = nameElement.innerText.toLowerCase();

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        createPopup(data);
    } catch (e) {
        console.error(e);
    }
});

function createPopup(pokemon) {
    const existingPopup = document.getElementById('poke-popup-overlay');
    if (existingPopup) existingPopup.remove();

    const overlay = document.createElement('div');
    overlay.id = 'poke-popup-overlay';
    overlay.className = "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]";

    const caught = JSON.parse(localStorage.getItem("caughtPokemons")) || [];
    const caughtData = caught.find(p => Number(p.id) === pokemon.id);
    const currentNote = caughtData && caughtData.notes ? caughtData.notes : "";

    const isPokedexPage = window.location.href.includes("pokedex.html");

    const badges = pokemon.types.map(t => {
        const color = typeColors[t.type.name] || "bg-gray-400";
        return `<span class="${color} text-white px-2 py-1 rounded mx-1 text-xs uppercase font-bold">${t.type.name}</span>`;
    }).join('');

    let notesSectionHTML = "";
    if (isPokedexPage) {
        notesSectionHTML = `
            <div class="text-left bg-gray-50 p-4 rounded-xl mt-4">
                <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deine Notizen</label>
                <textarea id="poke-note-input" class="w-full bg-transparent border-none focus:ring-0 p-0 mt-1 text-sm text-gray-700 placeholder-gray-300 h-24 resize-none" placeholder="Notes...">${currentNote}</textarea>
                <button id="save-note-btn" class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg mt-2 text-xs font-bold transition-all shadow-md">Save</button>
            </div>
        `;
    }

    overlay.innerHTML = `
        <div class="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl relative mx-4">
            <button id="close-btn" class="absolute top-4 right-4 font-bold text-gray-400 hover:text-black text-xl cursor-pointer">✕</button>
            <div class="text-center">
                <p class="text-gray-400 text-sm font-bold">#${String(pokemon.id).padStart(3, '0')}</p>
                <h2 class="text-3xl font-bold capitalize mb-2">${pokemon.name}</h2>
                <div class="bg-gray-50 rounded-xl py-4 mb-4">
                    <img src="${pokemon.sprites.other.home.front_default}" class="w-40 h-40 mx-auto drop-shadow-lg">
                </div>
                <div class="mb-6">${badges}</div>
                <div class="flex justify-around border-t border-gray-100 pt-4">
                    <div class="text-center">
                        <p class="font-bold text-gray-800">${pokemon.weight / 10} kg</p>
                        <p class="text-gray-400 text-xs uppercase">Gewicht</p>
                    </div>
                    <div class="text-center">
                        <p class="font-bold text-gray-800">${pokemon.height / 10} m</p>
                        <p class="text-gray-400 text-xs uppercase">Größe</p>
                    </div>
                </div>
                ${notesSectionHTML}
            </div>
        </div>`;

    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    overlay.querySelector('#close-btn').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

    const saveBtn = overlay.querySelector('#save-note-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const newNote = document.getElementById('poke-note-input').value;
            let caughtArr = JSON.parse(localStorage.getItem("caughtPokemons")) || [];
            caughtArr = caughtArr.map(p => {
                if (Number(p.id) === pokemon.id) {
                    return { ...p, notes: newNote };
                }
                return p;
            });
            localStorage.setItem("caughtPokemons", JSON.stringify(caughtArr));
            saveBtn.innerText = "Saved";
            saveBtn.className = "w-full bg-green-500 text-white py-2 rounded-lg mt-2 text-xs font-bold transition-all";
            setTimeout(() => {
                location.reload();
            }, 500);
        });
    }
}