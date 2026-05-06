// window.handleNote = function (id) {
//     const oldNote = caughtPokemons.find(p => p.id === id)?.notes || "";
//     const note = prompt("Notiz hinzufügen:", oldNote);
//     if (note !== null) {
//         caughtPokemons = caughtPokemons.map(p => p.id === id ? { ...p, notes: note } : p);
//         localStorage.setItem("caughtPokemons", JSON.stringify(caughtPokemons));
//         renderPokedex();
//     }
// };