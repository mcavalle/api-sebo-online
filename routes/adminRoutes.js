const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/Usuario')

//Login
router.post("/login", async (req, res) => {
    const {email, password} = req.body

    if(!email){
        return res.status(422).json({message: 'O e-mail é obrigatório'})
    }
    if(!password){
        return res.status(422).json({message: 'A senha é obrigatória'})
    }

    //checar se usuário existe
    const user = await Usuario.findOne({ email: email})

    if(!user){
        return res.status(404).json({message: 'Usuário não cadastrado!'})
    }

    //checar se a senha está correta
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword){
        return res.status(422).json({message: 'Senha inválida!'})
    }

    try{
        const secret = process.env.SECRET 
        const token = jwt.sign({
            id: user._id
        },
        secret,
        )

        res.status(200).json({message: "Autenticação realizada com sucesso!"})

    }catch(error){
        console.log(error)

        res.status(500).json({ message: 'Erro no servidor'})
    }
})

//Read
router.get('/usuarios', async (req, res) => {
    try{
        const usuarios = await Usuario.find()
        res.status(200).json(usuarios)
    } catch (error){
        res.status(500).json({error: error})
    }
})

router.get('/usuario/:id', async (req, res) => {
    const id = req.params.id

    try{
        const usuario = await Usuario.findOne({_id: id})

        if(!usuario){
            res.status(422).json({message: 'Usuário não foi encontrado!'})
            return
        }

        res.status(200).json(usuario)
    } catch(error){
        res.status(500).json({error: error})
    }
})

module.exports = router