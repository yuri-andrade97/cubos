const express = require("express");
const { buscarEndereco } = require('./controllers/cep');

const router = express();

router.get("/enderecos/:cep", buscarEndereco)


module.exports = router;