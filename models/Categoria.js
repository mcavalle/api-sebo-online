const mongoose = require('mongoose')

const Categoria = mongoose.model('Categoria', {
    name: String,
    description: String,
})

module.exports = Categoria