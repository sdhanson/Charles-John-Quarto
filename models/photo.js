var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhotoSchema = new Schema(
    {
        photographer: {type: String, required: true},
        image: {type: String, required: true},

        title: {type: String},
        date: {type: String},
        description: {type: String},
        location: {type: String}
    }
);

//Export model
module.exports = mongoose.model('Photo', PhotoSchema);