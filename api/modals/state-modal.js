var mongoose = require('mongoose');

var stateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true }
});

module.exports = mongoose.model("State", stateSchema);