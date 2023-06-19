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
const rotasRider = require ('./rotas/rotasRider')

app.use ('/rider', rotasRider)


//disponibilizando a porta
mongoose.connect ('mongodb+srv://rafaelbeiral:28L3ZfsOHItBAUPj@cluster0.nc308tn.mongodb.net/?retryWrites=true&w=majority')
.then(() =>{
    console.log('Conectamos ao MongoDB!')
    app.listen (3000)
})
.catch((err) => console.log(err))
