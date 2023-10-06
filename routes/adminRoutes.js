const router = require('express').Router()
const session = require('express-session');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')

router.use(cookieParser());

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

        res.cookie('token', token, {httpOnly: true})

        res.status(200).json({message: "Autenticação realizada com sucesso!", token})

    }catch(error){
        console.log(error)

        res.status(500).json({ message: 'Erro no servidor'})
    }
})

//Logout
router.get('/logout', (req, res) => {

    res.clearCookie('token');
    req.session.message = 'Logout realizado com sucesso!';

    res.redirect('/');
});

// Rotas privadas
// Buscar usuário por ID
router.get("/usuario/:id", checkToken, async (req, res) => {
    const id = req.params.id

    const usuario = await Usuario.findById(id, '-password')

    if(!usuario){
        return res.status(404).json({message: "Usuário não encontrado"})
    }

    res.status(200).json({usuario})
})

function checkToken (req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({message: 'Acesso negado'})
    }

    try{
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()
    }catch(error){
        res.status(400).json({message: 'Token inválido!'})
    }
}

// Listar usuários
router.get("/usuarios", checkToken, async (req, res) => {
    const id = req.params.id

    const usuario = await Usuario.find({}, '-password')

    res.status(200).json({usuario})
})

function checkToken (req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({message: 'Acesso negado'})
    }

    try{
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()
    }catch(error){
        res.status(400).json({message: 'Token inválido!'})
    }
}


// Relatórios
router.get("/relatorios", checkToken, async (req, res) => {
    
})

function checkToken (req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({message: 'Acesso negado'})
    }

    try{
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()
    }catch(error){
        res.status(400).json({message: 'Token inválido!'})
    }
}


module.exports = router