const express = require("express");
const { buscarEndereco, buscarLogradouro } = require('./controllers/cep');

const router = express();

router.get("/enderecos/:cep", buscarEndereco)
router.get("/enderecos/:uf/:cidade/:logradouro", buscarLogradouro);


module.exports = router;