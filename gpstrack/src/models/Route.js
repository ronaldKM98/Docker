const mongoose = require('mongoose');
const { Schema } = mongoose;

const RouteSchema = new Schema({
    user: {type: String},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Route', RouteSchema);