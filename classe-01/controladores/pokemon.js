const axios = require("axios");

async function getPokemons(req, res) {
    const offset = req.query.offset;
    const limit = req.query.limit;

    const pokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);

    res.json(pokemons.data)
}

async function getPokemon(req, res) {
    const idOuNome = req.params.id
    const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idOuNome}`);

    console.log(pokemon.data)
    res.json({
        id: pokemon.data.id,
        name: pokemon.data.name,
        height: pokemon.data.height,
        weight: pokemon.data.weight,
        base_experience: pokemon.data.base_experience,
        forms: pokemon.data.forms,
        abilities: pokemon.data.abilities,
        species: pokemon.data.species
    })
}



module.exports = {
    getPokemons,
    getPokemon
}