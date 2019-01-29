const mongoose = require('mongoose');
const { Schema } = mongoose;

const PointSchema = new Schema({
    route: {type: String},
    lat: {type: Number},
    lon: {type: Number},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Point', PointSchema);