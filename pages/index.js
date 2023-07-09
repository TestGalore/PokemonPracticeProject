function pad(num) {
    var s = "00" + num;
    return s.substring(s.length-3);
}

async function getRandomPokemon(){
    const response = await fetch("");
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

bulbo = 
{
    ID: 1,
    Name: "Bulbo",
}

createPokeCard(bulbo);
