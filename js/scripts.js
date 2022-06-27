const url = "https://pokeapi.co/api/v2/pokedex/1"

const pokeList = document.querySelector("#poke-list")
const pokemonContainer = document.querySelector("#pokemon-container")

const pokeImg = document.querySelector("#poke-img")
const pokeInfo1 = document.querySelector("#poke-info1")
const pokeInfo2 = document.querySelector("#poke-info2")
const pokeText = document.querySelector("#dex-text")

// Get id from URL
const urlSearchParams = new URLSearchParams(window.location.search)
const pokeId = urlSearchParams.get("id")

const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
}

// Verificação Pokemon ID
if (!pokeId) {
    // Get all pokemons
    fetch(url, options)
        .then(response => {
            response.json()
                .then(data => {
                    data.pokemon_entries.map((poke) => {
                        const item = document.createElement("a");
                        const name = document.createElement("span");
                        const number = document.createElement("span");
                        const pokeNames = poke.pokemon_species.name.toUpperCase();

                        name.innerText = pokeNames
                        name.setAttribute("id", "poke-nome")

                        number.innerText = "#" + poke.entry_number;
                        number.setAttribute("id", "dex-number")

                        item.setAttribute("class", "poke-item")
                        item.setAttribute("href", `/data.html?id=${poke.entry_number}`)

                        item.appendChild(number)
                        item.appendChild(name)

                        pokeList.appendChild(item);
                    })
                    console.log(data)
                })
        })
        .catch(e => console.log("error " + e, message))


    // Get Pokemon types
    fetch(`https://pokeapi.co/api/v2/pokemon/1`, options)
        .then(response => {
            response.json()
                .then(
                    data => {
                        console.log(data)
                    }
                )
        })
        .catch(e => console.log("error " + e, message))
} else {

    // Get Pokemon
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`, options)
        .then(response => {
            response.json()
                .then(
                    data => createPokemon(data)
                )
        })
        .catch(e => console.log("error " + e, message))

    // Get Pokemon Dex
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}`, options)
        .then(response => {
            response.json()
                .then(data => {
                    const descriptionName = document.createElement("span")
                    const dexText = document.createElement("p")


                    // Verificar o texto da dex em Inglês
                    data.flavor_text_entries.map(flavorText => {
                        if (flavorText.language.name == "en" && (flavorText.version.name == "x" || flavorText.version.name == "sword")) {
                            dexText.innerHTML = flavorText.flavor_text.replace("", " ")
                            console.log(flavorText)
                        }
                    })

                    // Verificar o gênero do pokémon em inglês
                    data.genera.map(genera => {
                        if (genera.language.name == "en") {
                            descriptionName.innerText = genera.genus
                        }
                    })



                    pokeInfo1.appendChild(descriptionName)
                    pokeText.appendChild(dexText)
                })
        })
        .catch(e => console.log("error " + e, message))
    //getPokemon(pokeId)
    //getPokemonDex(pokeId)
}


/*data.pokemon_entries.map((poke) => {
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
}*/

/*async function getPokemon(pokeId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
    const data = await response.json();
    console.log(data);

    createPokemon(data);
}*/

// CreatePokemon
function createPokemon(data) {
    const name = document.createElement("span")
    const number = document.createElement("span")
    const height = document.createElement("span")
    const weight = document.createElement("span")
    const sprite = document.createElement("img")

    name.innerText = data.name.toUpperCase()
    sprite.setAttribute("src", data.sprites.versions["generation-v"]["black-white"].front_default)
    number.innerText = "No. " + data.id
    height.innerText = "HT: " + data.height
    weight.innerText = "WT: " + data.weight

    pokeImg.appendChild(sprite)
    pokeInfo1.appendChild(number)
    pokeInfo1.appendChild(name)
    pokeInfo2.appendChild(height)
    pokeInfo2.appendChild(weight)

    // Passa por todos os objetos de tipo
    data.types.map((poke) => {
        const type = document.createElement("span")
        type.setAttribute("class", "poke-types")
        const typeName = poke.type.name.charAt(0).toUpperCase() + poke.type.name.slice(1)
        switch (typeName) {
            case "Grass":
                type.style.backgroundColor = "#75C144"
                break;
            case "Poison":
                type.style.backgroundColor = "#A5419E"
                break;
            case "Fire":
                type.style.backgroundColor = "#EA8138"
                break;
            case "Normal":
                type.style.backgroundColor = "#A5A977"
                break
            case "Water":
                type.style.backgroundColor = "#6195F5"
                break
            case "Electric":
                type.style.backgroundColor = "#F8D325"
                break
            case "Bug":
                type.style.backgroundColor = "#A9B620"
                break
            case "Ghost":
                type.style.backgroundColor = "#7053A4"
                break
            case "Ice":
                type.style.backgroundColor = "#96D9D8"
                break
            case "Flying":
                type.style.backgroundColor = "#AD95F6"
                break
            case "Fighting":
                type.style.backgroundColor = "#BE372C"
                break
            case "Ground":
                type.style.backgroundColor = "#D4BC5B"
                break
            case "Rock":
                type.style.backgroundColor = "#BB9F33"
                break
            case "Dragon":
                type.style.backgroundColor = "#6F3BF8"
                break
            case "Psychic":
                type.style.backgroundColor = "#FF568E"
                break
            case "Fairy":
                type.style.backgroundColor = "#F69ABA"
                break
            case "Dark":
                type.style.backgroundColor = "#404040"
                break
            default:
                break;
        }
        type.innerText = typeName
        pokeInfo2.appendChild(type)
    })

}



/*async function getPokemonDex(pokeId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}`)
    const data = await response.json();
    console.log(data);

    const descriptionName = document.createElement("span")
    const dexText = document.createElement("p")

    descriptionName.innerText = data.genera[7].genus
    dexText.innerText = data.flavor_text_entries[0].flavor_text.replace("", " ")

    pokeInfo1.appendChild(descriptionName)
    pokeText.appendChild(dexText)


}*/

