const router = require('express').Router()
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')

router.use(cookieParser());

const Categoria = require('../models/Categoria')

function checkAuthentication(req, res, next) {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ message: 'Acesso negado. Faça login para continuar.' });
    }
  
    try {
      const secret = process.env.SECRET;
      jwt.verify(token, secret);
      next(); 
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido. Faça login para continuar.' });
    }
  }  
  
//cadastrar categoria
router.post('/cadastro', checkAuthentication, async (req, res) => {
    const {name, description} = req.body

    if(!name){
        return res.status(422).json({message: 'O nome é obrigatório'})
    }
    if(!description){
        return res.status(422).json({message: 'A descrição é obrigatória'})
    }

    //checar se a categoria existe
    const categoriaExists = await Categoria.findOne({ name: name})

    if(categoriaExists){
        return res.status(422).json({message: 'Categoria já cadastrada!'})
    }

    //criar categoria
    const categoria = new Categoria ({
        name,
        description,
    })

    try{
        await categoria.save()
        res.status(201).json({message: 'Categoria cadastrada com sucesso!'})
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro no servidor'})
    }
})

module.exports = router