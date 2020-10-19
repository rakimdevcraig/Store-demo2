const mongoose = require('mongoose')


//Create schema
const ItemSchema = new mongoose.Schema({
    name: { type: String },
    quantity: { type: String, },
    file: { type: String },
    date: { type: Date, default: Date.now }
})

module.exports = Item = mongoose.model('demo2', ItemSchema)