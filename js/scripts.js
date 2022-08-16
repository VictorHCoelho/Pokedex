const url = "https://pokeapi.co/api/v2"

const pokeList = document.querySelector("#poke-list")
const pokemonContainer = document.querySelector("#pokemon-container")
const searchPoke = document.querySelector("#search-poke")

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
    // Search Pokémon
    let pokemons = []

    searchPoke.addEventListener("input", e => {
        const value = e.target.value.toLowerCase()
        pokemons.forEach(poke => {
            const isVisible = poke.name.toLowerCase().includes(value)
            poke.element.classList.toggle("hide", !isVisible)
            console.log(poke)
        })

    })

    

    // Get all pokemons URL
    fetch(`${url}/pokemon/?limit=898`, options)
        .then(response => {
            response.json()
                .then(data => {
                    pokemons = data.results.map((poke) => {
                        const item = document.createElement("a");
                        item.setAttribute("class", "poke-item")                                            

                        const name = document.createElement("span");
                        const number = document.createElement("span");
                        const sprite = document.createElement("img")

                        item.appendChild(number)
                        item.appendChild(sprite)
                        item.appendChild(name)
                        

                        // Get all pokemon data
                        fetch(poke.url, options).then(responsePoke => {
                            responsePoke.json()
                                .then(
                                    dataPoke => {
                                        item.setAttribute("href", `data.html?id=${dataPoke.id}`)

                                        const pokeNames = dataPoke.species.name.replace("nidoran-m", "nidoran-♂").replace("nidoran-f", "nidoran-♀");
                                        name.innerText = pokeNames.toUpperCase()
                                        name.setAttribute("id", "poke-nome")

                                        number.innerText = "#" + dexNumber(dataPoke) 

                                        number.setAttribute("id", "dex-number")

                                        sprite.setAttribute("src", dataPoke.sprites.versions["generation-v"]["black-white"].front_default)

                                        dataPoke.types.map(pokeType => {
                                            const type = document.createElement("span")
                                            type.setAttribute("class", "poke-types")
                                            const typeName = pokeType.type.name.charAt(0).toUpperCase() + pokeType.type.name.slice(1)
                                            getTypeColors(typeName, type)
                                            type.innerText = typeName
                                            item.appendChild(type)
                                        })


                                    }
                                )
                        })
                            .catch(e => console.log("error " + e, message))

                        pokeList.appendChild(item);
                        return { name: poke.name, element: item }
                    })
                })
        })
        .catch(e => console.log("error " + e, message))

} else {

    // Get Pokemon
    fetch(`${url}/pokemon/${pokeId}`, options)
        .then(response => {
            response.json()
                .then(
                    data => {
                        const name = document.createElement("span")
                        const number = document.createElement("span")
                        const height = document.createElement("span")
                        const weight = document.createElement("span")
                        const sprite = document.createElement("img")

                        document.title = `Pokedex - ${data.species.name.charAt(0).toUpperCase() + data.species.name.replace("nidoran-m", "nidoran-♂").replace("nidoran-f", "nidoran-♀").slice(1)}`

                        name.innerText = data.species.name.replace("nidoran-m", "nidoran-♂").replace("nidoran-f", "nidoran-♀").toUpperCase()
                        sprite.setAttribute("src", data.sprites.versions["generation-v"]["black-white"].front_default)

                        number.innerText = "No. " + dexNumber(data)
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
                            getTypeColors(typeName, type)
                            type.innerText = typeName
                            pokeInfo2.appendChild(type)
                        })
                    }
                )
        })
        .catch(e => console.log("error " + e, message))

    // Get Pokemon Dex
    fetch(`${url}/pokemon-species/${pokeId}`, options)
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
}

function getTypeColors(typeName, type) {
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
            type.style.backgroundColor = "#705848"
            break
        case "Steel":
            type.style.backgroundColor = "#B8B8D0"
            break
        default:
            break;
    }
}

function dexNumber(data) {
    if (data.id < 10) {                        
        return "00" + data.id;
    } else if (data.id >= 10 && data.id < 100) {
        return "0" + data.id;
    } else {
        return data.id;
    }
}