const axios = require('axios');
const fs = require('fs/promises');
const bancoDeEnderecos = require('../data/enderecos.json');
const path = require('path');


function formatarCep(cep) {

    const cepFormatado = cep.replace(/^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/, "$1$2-$3")
    return cepFormatado
}

async function localizarCep(cep) {

    const cepLocalizado = bancoDeEnderecos.find(endereco => endereco.cep === cep);
    console.log(cepLocalizado)

    if(cepLocalizado) {
        return cepLocalizado;
    } else {
        const promiseCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        bancoDeEnderecos.push(promiseCep.data)
        fs.writeFile(path.join(__dirname,"..", "data", "enderecos.json"), JSON.stringify(bancoDeEnderecos), (err) => {
            if(err) {
                console.log("ERRO" , err) 
            } else {
                console.log("escrito com sucesso")
            }
        })
    }

}

//async function localizarLogradouro() {}



async function buscarLogradouro(req, res) {
    const { uf, cidade, logradouro } = req.params;

    const logradouroLocalizado = bancoDeEnderecos.find(endereco => endereco.logradouro === logradouro);
    if(logradouroLocalizado) {
        res.json(logradouroLocalizado);
        return;
    } else {
        const promiseLogradouro = await axios.get(`https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`)
        
        console.log(promiseLogradouro.data)
          promiseLogradouro.data.forEach((item) => bancoDeEnderecos.push(item))

        fs.writeFile(path.join(__dirname, "..", "data", "enderecos.json"), JSON.stringify(bancoDeEnderecos), (err) => {
            if(err) {
                res.send("[ERRO]", err);
            } else {
                res.send("escrito com sucesso!")
            }
        });      
    }
}

async function buscarEndereco(req, res) {
    const cep = formatarCep(req.params.cep)
    
    const localizarNoBancoDeEnderecos = await localizarCep(cep);

    res.json(localizarNoBancoDeEnderecos)
}


module.exports = {
    buscarEndereco,
    buscarLogradouro
}