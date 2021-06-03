const express = require("express");
const { getPokemons, getPokemon } = require("./controladores/pokemon");

const roteador = express();

roteador.get("/pokemon", getPokemons);
roteador.get("/pokemon/:id", getPokemon);


module.exports = roteador;
