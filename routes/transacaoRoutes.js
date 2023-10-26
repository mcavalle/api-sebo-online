const router = require('express').Router()
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')

router.use(cookieParser());

const Transacao = require('../models/Transacao')

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

// Cadastrar transacao
router.post('/cadastro', checkAuthentication, async (req, res) => {
    const {clientId, sellerId, itemId, price, transactionDate} = req.body

    if(!clientId){
        return res.status(422).json({message: 'O ID do cliente é obrigatório'})
    }
    if(!sellerId){
        return res.status(422).json({message: 'O ID do vendedor é obrigatório'})
    }
    if(!itemId){
        return res.status(422).json({message: 'O ID do item é obrigatório'})
    }
    if(!price){
        return res.status(422).json({message: 'O valor é obrigatório'})
    }
    if(!transactionDate){
        return res.status(422).json({message: 'A data da transação é obrigatória'})
    }

// Criar transação
    const transacao = new Transacao ({
        clientId,
        sellerId,
        itemId,
        price,
        transactionDate,
    })

    try{
        await transacao.save()
        res.status(201).json({message: 'Transação cadastrado com sucesso!'})
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro no servidor'})
    }
})

// Listar transações
router.get("/", async (req, res) => {
    const id = req.params.id

    const transacao = await Transacao.find({})

    res.status(200).json({transacao})
})

// Buscar por ID do vendedor
router.get("/:id", async (req, res) => {
    const id = req.params.id

    const transacao = await Transacao.findById(id)

    if(!transacao){
        return res.status(404).json({message: "Transação não encontrada"})
    }

    res.status(200).json({transacao})
})

// Buscar transações por ID do vendedor
router.get("/vendedor/:id", async (req, res) => {
    const vendedorId = req.params.id;
  
    const transacao = await Transacao.find({ sellerId: vendedorId });
  
    if (!transacao || transacao.length === 0) {
      return res.status(404).json({ message: "Nenhuma transação encontrada para este vendedor!" });
    }
  
    res.status(200).json({ transacao });
  });
  

module.exports = router