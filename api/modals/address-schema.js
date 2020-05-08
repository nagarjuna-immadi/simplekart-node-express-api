var mongoose = require('mongoose');
var state = require('./state-modal');
var city = require('./city-modal');

var addressSchema = mongoose.Schema({
    type: { type: String, required: true, enum : ['Home', 'Office', 'Bussiness'] },
    street1: { type: String, required: true },
    street2: { type: String },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
    zip: { type: Number, required: true }
});

addressSchema.index({
    type: 'text',
    street1: 'text',
    street2: 'text',
    city: 'text',
    state: 'text',
    zip: 'text'
});

module.exports = addressSchema;

