var mongoose = require('mongoose');
var addressSchema = require('./address-schema');

var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    roles: [{
        type: String,
        enum : ['admin', 'customer']
    }],
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    addresses: [addressSchema],
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

userSchema.index({
    email: 'text',
    firstName: 'text',
    lastName: 'text',
    roles: 'text',
    gender: 'text',
    addresses: 'text'
});
module.exports = mongoose.model("User", userSchema);