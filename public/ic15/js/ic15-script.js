// IC15 – COSC 2328 – Professor McCurry
// Implemented by: [Diego Maradiaga]
 
const pokemonInput = document.querySelector("#pokemon-input");
const statusMessage = document.querySelector("#status-message");
const pokemonCard = document.querySelector("#pokemon-card");
 
// --- Search (step 5:
 
async function searchPokemon(name) {
    statusMessage.textContent = "Searching...";
    statusMessage.className = "";
    pokemonCard.innerHTML = "";
 
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name.toLowerCase().trim());
 
        if (!response.ok) {
            throw new Error("Pokemon not found");
        }
 
        const data = await response.json();
        renderPokemon(data);
        statusMessage.textContent = "";
    } catch (error) {
        statusMessage.textContent = error.message;
        statusMessage.className = "status-error";
        pokemonCard.innerHTML = "";
    }
}
 
// --- Render (step 8):
function renderPokemon(data) {
    const types = data.types.map(function (t) {
        return t.type.name;
    });
 
    pokemonCard.innerHTML =
        "<img src='" + data.sprites.front_default + "' alt='" + data.name + "'>" +
        "<h2>" + data.name + "</h2>" +
        types.map(function (t) {
            return "<span class='type-badge'>" + t + "</span>";
        }).join(" ");
}
 
// --- Wiring (Step 6):
 
document.querySelector("#btn-search").addEventListener("click", function () {
    searchPokemon(pokemonInput.value);
});
 

