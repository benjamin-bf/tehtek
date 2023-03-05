const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    productId: { type: String },
    quatity: { type: String },
    state: { type: String },
    category: { type: String },
    observations: { type: String },
    registerBy: { type: String },
    createionDate: { type: String },
})

module.exports = mongoose.model('Stock', Stockchema);