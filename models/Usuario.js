const mongoose = require('mongoose')

const Usuario = mongoose.model('Usuario', {
    name: String,
    email: String,
    password: String,
    active: Boolean,
    type: String,
    date: Date,
    area: String,
})

module.exports = Usuario