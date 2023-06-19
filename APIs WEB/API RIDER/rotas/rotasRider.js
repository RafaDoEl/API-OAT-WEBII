const router = require ('express').Router ()
const { json } = require('express')
const Rider = require ('../models/Rider')

//CRREATE
router.post('/', async (req, res) => {

    const {nome, ano, era} = req.body 
    
    if (!nome) {
        res.status (422).json ({error: 'O nome é obrigatório!'})
        return
    }

    const rider = {
        nome,
        ano,
        era 
    }

    try {

        await Rider.create(rider)
        res.status (201).json ({message: 'Rider inserido com sucesso!'})

    } catch(error) {
        res.status (500).json ({error: error})
    }

})

//READ
router.get ('/', async (req, res) => {
    try {
        const riders = await Rider.find()

        res.status (200).json (riders)
        
    } catch (error) {
        res.status (500).json ({error:error})
    }
})

//UPDATE
router.patch ('/:id', async (req, res) => {

    const id = req.params.id

    const {nome, ano, era} = req.body

    const rider = {
        nome,
        ano,
        era,
    }

    try {
        
        const updatedRider = await Rider.updateOne({_id: id}, rider)

        res.status(200).json(rider)

    } catch (error) {
        res.status(500).json({error:error})
    }
})

//DELETE
router.delete ('/:id', async (req, res) => {

    const id = req.params.id

    const rider = await Rider.findOne({_id: id})

    if (!rider) {
        res.status(422).json({message: 'O usuário não foi encontrado!'})
        return
    }

    try {
        await Rider.deleteOne({_id: id })

        res.status(200).json({message: "Rider removido!"})
    } catch (error) {
        res.status(500).json({error:error})
    }

})
module.exports = router