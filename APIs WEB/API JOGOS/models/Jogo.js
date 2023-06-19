const mongoose = require ('mongoose')

const Jogo = mongoose.model ('Jogo',{
    nome: String,
    ano: Number,
    genero: String,
})

module.exports = Jogo