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
    pokeName.appendChild(document.createTextNode("#" + pokeInfo.ID + " " + pokeInfo.Name));
    pokeCard.appendChild(pokeName);
    pokeImg = document.createElement("img");
    pokeImg.setAttribute("src", "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + pad(pokeInfo.ID) + ".png");
    pokeCard.appendChild(pokeImg);
    stats = document.createElement("span");
    stats.appendChild(document.createTextNode("Type: " + pokeInfo.Type1));
    pokeCard.append(stats);
    stats = document.createElement("span");
    stats.appendChild(document.createTextNode("HP: " + pokeInfo.HP));
    pokeCard.append(stats);
    stats = document.createElement("span");
    stats.appendChild(document.createTextNode("Attack: " + pokeInfo.Attack));
    pokeCard.append(stats);
    stats = document.createElement("span");
    stats.appendChild(document.createTextNode("Defense: " + pokeInfo.Defense));
    pokeCard.append(stats);

    pokeContainer.appendChild(pokeCard);
}

t = 
{
    Name : "Bulbo",
    ID : "1",
    Type1: "Test",
    HP: "50",
    Attack: "80",
    Defense: "2",

}

createPokeCard(t);
