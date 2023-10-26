const mongoose = require('mongoose')

const Item = mongoose.model('Item', {
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    price: Number,
    transactionDate: Date,
})

module.exports = Item