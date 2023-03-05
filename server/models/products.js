const mongoose = require('mongoose');

const Productchema = new mongoose.Schema({manufacturer: { type: String },
    model: { type: String },
    specifications: { type: String },
    category: { type: String },
    observations: { type: String },
    createBy: { type: String },
    createionDate: { type: String },
})

module.exports = mongoose.model('Product', Productchema);