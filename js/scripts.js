const url = "https://pokeapi.co/api/v2/pokedex/2"

const pokeList = document.querySelector("#poke-list")
const pokemonContainer = document.querySelector("#pokemon-container")

// Get id from URL
const urlSearchParams = new URLSearchParams(window.location.search)
const pokeId = urlSearchParams.get("id")

// Get all pokemons

async function getAllPokemon() {
    const response = await fetch(url);
    console.log(response)

    const data = await response.json();
    console.log(data)

    console.log(data.pokemon_entries)
    

    data.pokemon_entries.map((poke) => {
        const item = document.createElement("a");
        const name = document.createElement("span");
        const number = document.createElement("span");
        const pokeNames = poke.pokemon_species.name.toUpperCase();    

        name.innerText = pokeNames
        name.setAttribute("id","poke-nome")

        number.innerText = "#" + poke.entry_number;
        number.setAttribute("id","dex-number")

        item.setAttribute("class","poke-item")
        item.setAttribute("href",`/data.html?id=${poke.entry_number}`)

        item.appendChild(number)
        item.appendChild(name)        

        pokeList.appendChild(item);
    })
}


// Get Pokemon
async function getPokemon(pokeId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
    const data = await response.json();
    console.log(data);

    createPokemon(data);
}

// CreatePokemon
function createPokemon(data) {
    const div = document.createElement("div")
    div.setAttribute("id","poke-info")

    const name = document.createElement("span")
    const number = document.createElement("span")
    const height = document.createElement("span")
    const weight = document.createElement("span")
    const sprite = document.createElement("img")

    name.innerText = data.name.toUpperCase()
    sprite.setAttribute("src",data.sprites.versions["generation-i"]["red-blue"].front_default)
    number.innerText = "#" + data.id
    height.innerText = "Height:" + data.height
    weight.innerText = "Weight:" + data.weight
    
    div.appendChild(sprite)
    div.appendChild(number)
    div.appendChild(name)
    div.appendChild(height)
    div.appendChild(weight)   
    
    // Passa por todos os objetos de tipo
    data.types.map((poke) => {
        const type = document.createElement("span")        
        
        type.innerText = poke.type.name.charAt(0).toUpperCase() + poke.type.name.slice(1)
        div.appendChild(type)
    })

    pokemonContainer.appendChild(div)
}

// Get Pokemon Dex
async function getPokemonDex(pokeId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}`)
    const data = await response.json();
    console.log(data);

    const descriptionName = document.createElement("span")
    const divText = document.createElement("div")
    const dexText = document.createElement("p")

    descriptionName.innerText = data.genera[7].genus
    dexText.innerText = data.flavor_text_entries[0].flavor_text.replace("","")
    
    divText.appendChild(descriptionName)
    divText.appendChild(dexText)
    
    pokemonContainer.appendChild(divText)

}

// Verificação Pokemon ID
if(!pokeId) {
    getAllPokemon()
} else {
    getPokemon(pokeId)
    getPokemonDex(pokeId)
}