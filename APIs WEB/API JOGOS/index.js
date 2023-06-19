const express = require ('express')
const mongoose = require ('mongoose')
const app = express ()


//ler JSON
app.use (
    express.urlencoded({
        extended: true
    })
)

app.use(express.json()) 


//rotas da api
const rotasJogo = require ('./rotas/rotasJogo')

app.use ('/jogo', rotasJogo)


//disponibilizando a porta
mongoose.connect ('mongodb+srv://rafaelbeiral:28L3ZfsOHItBAUPj@cluster0.nc308tn.mongodb.net/?retryWrites=true&w=majority')

app.listen(3000)
