const mongoose = require('mongoose')

const Item = mongoose.model('Item', {
    title: String,
    author: String,
    type: String,
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

module.exports = Item