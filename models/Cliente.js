const mongoose = require('mongoose')

const Cliente = mongoose.model('Cliente', {
    name: String,
    email: String,
    active: Boolean,
})

module.exports = Cliente