const router = require('express').Router()
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')

router.use(cookieParser());

const Cliente = require('../models/Cliente')

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

//cadastrar cliente
router.post('/cadastro', checkAuthentication, async (req, res) => {
    const {name, email, active} = req.body

    if(!name){
        return res.status(422).json({message: 'O nome é obrigatório'})
    }
    if(!email){
        return res.status(422).json({message: 'O e-mail é obrigatório'})
    }
    if(!active){
        return res.status(422).json({message: 'Informe se é um cadastro ativo'})
    }

    //checar se cliente existe
    const clienteExists = await Cliente.findOne({ name: name})

    if(clienteExists){
        return res.status(422).json({message: 'Cliente já cadastrado!'})
    }

    //criar cliente
    const cliente = new Cliente ({
        name,
        email,
        active,
    })

    try{
        await cliente.save()

        res.status(201).json({message: 'Cliente cadastrado com sucesso!'})
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro no servidor'})
    }
})

//Listar clientes
router.get("/", async (req, res) => {
    const id = req.params.id

    const cliente = await Cliente.find({})

    res.status(200).json({cliente})
})

//Buscar por ID
router.get("/:id", async (req, res) => {
    const id = req.params.id

    const cliente = await Cliente.findById(id)

    if(!cliente){
        return res.status(404).json({message: "Cliente não encontrado"})
    }

    res.status(200).json({cliente})
})

//Editar cliente
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { name, email, active } = req.body

    const cliente = {
        name,
        email,
        active,
    }

    try{
        const updateCliente = await Cliente.updateOne({_id: id}, cliente)

        if(updateCliente.matchedCount === 0){
            res.status(422).json({message: 'Cliente não foi encontrado!'})
        }

        res.status(200).json(cliente)

    } catch (error){
        res.status(500).json({error: error})
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const cliente = await Cliente.findOne({_id: id})

    if (!cliente) {
        res.status(422).json({message: 'Cliente não foi encontrado!'})
        return
    }

    try {
        await Cliente.findOneAndUpdate({ _id: id }, { active: false })

        res.status(200).json({ message: 'Cliente inativado com sucesso' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
})


module.exports = router