//configuração inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const session = require('express-session');
const app = express()


//leitura do JSON
app.use(session({
    secret: 'secreto', // Uma chave secreta para assinar a sessão
    resave: false, // Não regravar a sessão se não houver alterações
    saveUninitialized: true, // Salvar sessões não inicializadas
  }),
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())


//models
const Usuario = require('./models/Usuario')
const Cliente = require('./models/Cliente')
const Livro = require('./models/Item')
const Categoria = require('./models/Categoria')

//rotas da API
const usuarioRoutes = require('./routes/usuarioRoutes')
const clienteRoutes = require('./routes/clienteRoutes')
const adminRoutes = require('./routes/adminRoutes')
const itemRoutes = require('./routes/itemRoutes')
const categoriaRoutes = require('./routes/categoriaRoutes')

app.use('/usuario', usuarioRoutes)
app.use('/cliente', clienteRoutes)
app.use('/admin', adminRoutes)
app.use('/item', itemRoutes)
app.use('/categoria', categoriaRoutes)


//rota inicial / endpoint
app.get('/', (req, res) => {
    res.status(200).json({message: 'Bem vindo ao Sebo Online!'})
})

// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.afztj5c.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log("Conectamos ao MongoDB")
    app.listen(3000)
})
.catch((err) => console.log(err))