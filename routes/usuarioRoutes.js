const router = require('express').Router()
const session = require('express-session');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')

router.use(cookieParser());

const Usuario = require('../models/Usuario')


//registrar usuário
router.post('/cadastro', async (req, res) => {
    const {name, email, password, confirmPassword, active, type, date, area} = req.body

    if(!name){
        return res.status(422).json({message: 'O nome é obrigatório'})
    }
    if(!email){
        return res.status(422).json({message: 'O e-mail é obrigatório'})
    }
    if(!password){
        return res.status(422).json({message: 'A senha é obrigatória'})
    }
    if(password !== confirmPassword){
        return res.status(422).json({message: 'As senhas não conferem'})
    }
    if(!active){
        return res.status(422).json({message: 'Informe se é um cadastro ativo'})
    }
    if(!type){
        return res.status(422).json({message: 'O tipo de usuário é obrigatório'})
    }
    if(type === "administrador" && !date){
        return res.status(422).json({message: 'Preencha data de início e área de especialização'})
    }
    if(type === "administrador" && !date){
        return res.status(422).json({message: 'Preencha data de início e área de especialização'})
    }
    if(type !== "administrador" && date){
        return res.status(422).json({message: 'Campos de data e área são exclusivos para cadastro de administradores'})
    }
    if(type !== "administrador" && area){
        return res.status(422).json({message: 'Campos de data e área são exclusivos para cadastro de administradores'})
    }

    //checar se usuário existe
    const userExists = await Usuario.findOne({ email: email})

    if(userExists){
        return res.status(422).json({message: 'E-mail já cadastrado!'})
    }

    //criar senha
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //criar usuário
    const usuario = new Usuario ({
        name,
        email,
        password: passwordHash,
        active,
        type,
        date,
        area,
    })

    try{
        await usuario.save()

        res.status(201).json({message: 'Usuário criado com sucesso!'})
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro no servidor'})
    }
})

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

        res.status(200).json({message: "Autenticação realizada com sucesso!"})

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
  

//Update
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { name, email, password, confirmPassword, active, type } = req.body

    const usuario = {
        name,
        email,
        password,
        confirmPassword,
        active,
        type
    }

    try{
        const updateUsuario = await Usuario.updateOne({_id: id}, usuario)

        if(updateUsuario.matchedCount === 0){
            res.status(422).json({message: 'Usuário não foi encontrado!'})
        }

        res.status(200).json(usuario)

    } catch (error){
        res.status(500).json({error: error})
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const usuario = await Usuario.findOne({_id: id})

    if (!usuario) {
        res.status(422).json({message: 'Usuário não foi encontrado!'})
        return
    }

    try {
        await Usuario.findOneAndUpdate({ _id: id }, { active: false })

        res.status(200).json({ message: 'Usuário inativado com sucesso' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
})

module.exports = router