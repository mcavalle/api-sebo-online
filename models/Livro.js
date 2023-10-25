const mongoose = require('mongoose')

const Livro = mongoose.model('Livro', {
    title: String,
    author: String,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    price: Number,
    description: String,
    active: Boolean,
    editionDate: Date,
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
})

module.exports = Livro