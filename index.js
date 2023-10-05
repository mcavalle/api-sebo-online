//configuração inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()

//leitura do JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())


//models
const Usuario = require('./models/Usuario')

//rotas da API
const usuarioRoutes = require('./routes/usuarioRoutes')
const adminRoutes = require('./routes/adminRoutes')

app.use('/usuario', usuarioRoutes)
app.use('/admin', adminRoutes)

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

