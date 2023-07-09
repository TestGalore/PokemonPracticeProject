function pad(num) {
    var s = "00" + num;
    return s.substring(s.length-3);
}

async function get3RandomPokemon(){
    const response = await fetch("/rand");
    const pokemon = await response.json();
    return pokemon;
}

async function addPokemon(){
    pokeContainer = document.getElementById("pokeContainer");
    while (pokeContainer.lastElementChild) {
        pokeContainer.removeChild(pokeContainer.lastElementChild);
    }
    pokemons = await get3RandomPokemon();
    pokemons.forEach( (pokeInfo) => { createPokeCard(pokeInfo) })
}

function createPokeCard(pokeInfo){
    pokeContainer = document.getElementById("pokeContainer");
    pokeCard = document.createElement("div");
    pokeCard.setAttribute("class", "pokeCard");
    pokeName = document.createElement("h1");
    pokeName.appendChild(document.createTextNode(pokeInfo.Name));
    pokeCard.appendChild(pokeName);
    pokeImg = document.createElement("img");
    pokeImg.setAttribute("src", "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + pad(pokeInfo.ID) + ".png");
    pokeCard.appendChild(pokeImg);
    pokeContainer.appendChild(pokeCard);
}

addPokemon();
