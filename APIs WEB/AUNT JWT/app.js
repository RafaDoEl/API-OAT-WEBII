require ('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())

const Usuario = require('./model/Usuario')

//ROTA PUBLICA
app.get('/', (req, res) => {
    res.status(200).json({msg:'Bem vindo a nossa API!'})
})

//ROTA PRÍVADA
app.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id
    const user = await Usuario.findById(id, '-password')

    if (!user){
        return res.status(404).json ({msg:'Usuário não encontrado!'})
    }

    res.status(200).json({ user })
})

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status (401).json({msg:'Acesso negado!'})
    }

    try {
        
        const secret = process.env.SECRET

        jwt.verify(token,secret)

        next()

    } catch (error) {
      res.status(400).json({msg:'Token inválido!'})  
        
    }

}

//REGISTRAR USUARIO
app.post ('/auth/register', async(req, res) => {
    const {name, email, password, confirmpassword} = req.body

//VALIDAÇÕES
    if (!name) {
        return res.status(422).json({msg:'O nome é obrigatório!'})
    }
    if (!email) {
        return res.status(422).json({msg:'O email é obrigatório!'})
    }
    if (!password) {
        return res.status(422).json({msg:'A senha é obrigatório!'})
    }
    if (password !== confirmpassword) {
        return res.status(422).json({msg:'As senhas não conferem!'})
    }

//CHECANDO SE O USUARIO EXISTE
const userExists = await Usuario.findOne({ email: email })

if (userExists) {
    return res.status(422).json({msg:'Por favor, utilize outro email!'})
}

//CRIANDO SENHA

const salt = await bcrypt.genSalt(12)
const passwordHash = await bcrypt.hash(password, salt )

//CRIANDO USUARIO

const user = new Usuario ({
    name, 
    email,
    password: passwordHash,
})

try {

    await user.save()

    res.status(201).json({msg:'Usuario criado com sucesso!'})
    
} catch (error) {
  console.log(error)

    res
        .status(500).json({msg:'Aconteceu um erro no servidor!'})
}

})

//LOGIN DO USUARIO
app.post('/auth/login', async (req, res) => {
    const {email, password} = req.body

    if (!email) {
        return res.status(422).json({msg:'O email é obrigatório!'})
    }
    if (!password) {
        return res.status(422).json({msg:'A     senha é obrigatório!'})
    }
// CHECANDO SE USUARIO EXISTE
const user = await Usuario.findOne({ email: email })
    if (!user) {
        return res.status(404).json({msg:'Usuário não encontrado!'})
}

try {
    
    const secret = process.env.SECRET

    const token = jwt.sign (
        {
            id: user._id
        }, 
        secret,
    )

    res.status(200).json({msg: 'Autenticação realizada com sucesso!', token})

} catch (error) {
    console.log(error)

    res.status(500).json({msg:'Aconteceu um erro no servidor!'})  
}


})  

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.uu2hau2.mongodb.net/?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log("Conectado!");
    app.listen(3000);
  })
  .catch((err) => console.log(err));