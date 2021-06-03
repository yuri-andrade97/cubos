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
        //console.log(`Endereço encontrado ${promiseCep.data}`)
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

async function buscarEndereco(req, res) {
    const cep = formatarCep(req.params.cep)
    
    // Já formatei o cep, agora só falta pesquisar no bancoDeEnderecos e se não encontrar fazer a requisição para a api do via CEP!
    const localizarNoBancoDeEnderecos = await localizarCep(cep);

    res.json(localizarNoBancoDeEnderecos)
}


module.exports = {
    buscarEndereco,
}