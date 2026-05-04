export function markButtonSaved(buttonID) {
    let pokeButton = document.getElementById(buttonID)
    pokeButton.textContent = "♥"
}

//style the heart button as empty heart to show the pokemon has been removed
export function markButtonFree(buttonID) {
    let pokeButton = document.getElementById(buttonID)
    pokeButton.textContent = "♡"
}