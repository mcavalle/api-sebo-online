const router = require('express').Router()
const session = require('express-session');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')

router.use(cookieParser());

const Usuario = require('../models/Livro')

//cadastrar livro
router.post('/cadastro', async (req, res) => {
    const {title, author, category, price, description, active, editionDate, sellerId} = req.body

    if(!title){
        return res.status(422).json({message: 'O título é obrigatório'})
    }
    if(!author){
        return res.status(422).json({message: 'O autor é obrigatório'})
    }
    if(!category){
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
    const bookExists = await Usuario.findOne({ title: title})

    if(bookExists){
        return res.status(422).json({message: 'Livro já cadastrado!'})
    }

    //criar livro
    const usuario = new Usuario ({
        title,
        author,
        category,
        price,
        description,
        active,
        editionDate,
        sellerId
    })

    try{
        await usuario.save()

        res.status(201).json({message: 'Livro cadastrado com sucesso!'})
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro no servidor'})
    }
})