const mongoose = require('mongoose')

const Livro = mongoose.model('Livro', {
    title: String,
    author: String,
    category: String,
    price: double,
    description: String,
    active: Boolean,
    editionDate: Date,
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
})

module.exports = Livro