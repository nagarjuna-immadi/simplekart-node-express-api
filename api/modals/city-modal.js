var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true }
});

module.exports = mongoose.model("City", citySchema);