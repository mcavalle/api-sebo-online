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
    const {name, description, active} = req.body

    if(!name){
        return res.status(422).json({message: 'O nome é obrigatório'})
    }
    if(!description){
        return res.status(422).json({message: 'A descrição é obrigatória'})
    }
    if(!active){
      return res.status(422).json({message: 'Informe se o cadastro está ativo ou não'})
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
        active,
    })

    try{
        await categoria.save()
        res.status(201).json({message: 'Categoria cadastrada com sucesso!'})
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro no servidor'})
    }
})

//Listar categorias
router.get("/", async (req, res) => {
  const id = req.params.id

  const categoria = await Categoria.find({})

  res.status(200).json({categoria})
})

//Buscar por ID
router.get("/:id", async (req, res) => {
  const id = req.params.id

  const categoria = await Categoria.findById(id)

  if(!categoria){
      return res.status(404).json({message: "Categoria não encontrada"})
  }

  res.status(200).json({categoria})
})

//Editar categoria
router.patch('/:id', async (req, res) => {
  const id = req.params.id

  const { name, description, active } = req.body

  const categoria = {
      name,
      description,
      active
  }

  try{
      const updateCategoria = await Categoria.updateOne({_id: id}, categoria)

      if(updateCategoria.matchedCount === 0){
          res.status(422).json({message: 'Categoria não foi encontrada!'})
      }

      res.status(200).json(categoria)

  } catch (error){
      res.status(500).json({error: error})
  }
})

//Delete
router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const categoria = await Categoria.findOne({_id: id})

  if (!categoria) {
      res.status(422).json({message: 'Categoria não foi encontrada!'})
      return
  }

  try {
      await Categoria.findOneAndUpdate({ _id: id }, { active: false })

      res.status(200).json({ message: 'Categoria inativada com sucesso' })
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
  }
})

module.exports = router