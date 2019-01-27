const mongoose = require('mongoose');
const { Schema } = mongoose;

const RouteSchema = new Schema({
    user: {type: String},
    lat: {type: Array},
    lon: {type: Array},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Route', RouteSchema);