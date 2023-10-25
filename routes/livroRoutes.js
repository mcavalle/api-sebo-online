const router = require('express').Router()
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')

router.use(cookieParser());

const Livro = require('../models/Livro')

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
  

//cadastrar livro
router.post('/cadastro', checkAuthentication, async (req, res) => {
    const {title, author, categoryId, price, description, active, editionDate, sellerId} = req.body

    if(!title){
        return res.status(422).json({message: 'O título é obrigatório'})
    }
    if(!author){
        return res.status(422).json({message: 'O autor é obrigatório'})
    }
    if(!categoryId){
        return res.status(422).json({message: 'A categoria é obrigatória'})
    }
    if(!active){
        return res.status(422).json({message: 'Informe se é um cadastro ativo'})
    }
    if(!price){
        return res.status(422).json({message: 'O preço é obrigatório'})
    }
    if(!description){
        return res.status(422).json({message: 'A descrição é obrigatória'})
    }
    if(!editionDate){
        return res.status(422).json({message: 'A data da edição é obrigatória'})
    }
    if(!sellerId){
        return res.status(422).json({message: 'O ID do vendedor é obrigatório'})
    }

    //checar se livro existe
    const livroExists = await Livro.findOne({ title: title})

    if(livroExists){
        return res.status(422).json({message: 'Livro já cadastrado!'})
    }

    //criar livro
    const livro = new Livro ({
        title,
        author,
        categoryId,
        price,
        description,
        active,
        editionDate,
        sellerId
    })

    try{
        await livro.save()

        res.status(201).json({message: 'Livro cadastrado com sucesso!'})
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro no servidor'})
    }
})

module.exports = router