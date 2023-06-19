const mongoose = require ('mongoose')

const Rider = mongoose.model ('Rider',{
    nome: String,
    ano: Number,
    era: String,
})

module.exports = Rider 