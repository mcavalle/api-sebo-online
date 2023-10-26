const mongoose = require('mongoose')

const Transacao = mongoose.model('Transacao', {
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

module.exports = Transacao