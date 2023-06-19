const router = require ('express').Router ()
const { json } = require('express')
const Jogo = require ('../models/Jogo')

//CRREATE
router.post('/', async (req, res) => {

    const {nome, ano, genero} = req.body 
    
    if (!nome) {
        res.status (422).json ({error: 'O nome é obrigatório!'})
        return
    }

    const jogo = {
        nome,
        ano,
        genero 
    }

    try {

        await Jogo.create(jogo)
        res.status (201).json ({message: 'Jogo inserido com sucesso!'})

    } catch(error) {
        res.status (500).json ({error: error})
    }

})

//READ
router.get ('/', async (req, res) => {
    try {
        const jogos = await Jogo.find()

        res.status (200).json (jogos)
        
    } catch (error) {
        res.status (500).json ({error:error})
    }
})

//UPDATE
router.patch ('/:id', async (req, res) => {

    const id = req.params.id

    const {nome, ano, genero} = req.body

    const jogo = {
        nome,
        ano,
        genero,
    }

    try {
        
        const updatedJogo = await Jogo.updateOne({_id: id}, jogo)

        res.status(200).json(jogo)

    } catch (error) {
        res.status(500).json({error:error})
    }
})

//DELETE
router.delete ('/:id', async (req, res) => {

    const id = req.params.id

    const jogo = await Jogo.findOne({_id: id})

    if (!jogo) {
        res.status(422).json({message: 'O jogo não foi encontrado!'})
        return
    }

    try {
        await Jogo.deleteOne({_id: id })

        res.status(200).json({message: "Jogo removido!"})
    } catch (error) {
        res.status(500).json({error:error})
    }

})
module.exports = router