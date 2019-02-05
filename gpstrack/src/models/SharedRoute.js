const mongoose = require('mongoose');
const { Schema } = mongoose;

const SharedRouteSchema = new Schema({
    routeId: {type: String}
});

module.exports = mongoose.model('SharedRoute', SharedRouteSchema);