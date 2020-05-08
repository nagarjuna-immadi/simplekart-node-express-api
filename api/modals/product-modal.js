var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
});

module.exports = mongoose.model("Product", productSchema);