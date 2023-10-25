const router = require('express').Router()
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')

router.use(cookieParser());

const Item = require('../models/Item')

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

//cadastrar item
router.post('/cadastro', checkAuthentication, async (req, res) => {
    const {title, author, type, categoryId, price, description, active, editionDate, sellerId} = req.body

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

    //checar se item existe
    const itemExists = await Item.findOne({ title: title})

    if(itemExists){
        return res.status(422).json({message: 'Item já cadastrado!'})
    }

    //criar item
    const item = new Item ({
        title,
        author,
        type,
        categoryId,
        price,
        description,
        active,
        editionDate,
        sellerId
    })

    try{
        await item.save()

        res.status(201).json({message: 'Item cadastrado com sucesso!'})
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro no servidor'})
    }
})

//Listar itens
router.get("/", async (req, res) => {
    const id = req.params.id

    const item = await Item.find({})

    res.status(200).json({item})
})

//Buscar por ID
router.get("/:id", async (req, res) => {
    const id = req.params.id

    const item = await Item.findById(id)

    if(!item){
        return res.status(404).json({message: "Item não encontrado"})
    }

    res.status(200).json({item})
})

//Editar item
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { title, author, type, categoryId, price, description, active, editionDate, sellerId } = req.body

    const item = {
        title,
        author,
        type,
        categoryId,
        price,
        description,
        active,
        editionDate,
        sellerId
    }

    try{
        const updateItem = await Item.updateOne({_id: id}, item)

        if(updateItem.matchedCount === 0){
            res.status(422).json({message: 'Item não foi encontrado!'})
        }

        res.status(200).json(item)

    } catch (error){
        res.status(500).json({error: error})
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const item = await Item.findOne({_id: id})

    if (!item) {
        res.status(422).json({message: 'Item não foi encontrado!'})
        return
    }

    try {
        await Item.findOneAndUpdate({ _id: id }, { active: false })

        res.status(200).json({ message: 'Item inativado com sucesso' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
})


module.exports = router