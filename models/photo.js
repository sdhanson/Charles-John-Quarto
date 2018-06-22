var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhotoSchema = new Schema(
    {
        title: {type: String, required: true},
        Photographer: {type: String},
        image: {type: String, required: true},
        date: {type: Date, required: true},
        description: {type: String},
        location: {type: String, default: 'Nashville, TN'}
    }
);

// Virtual for poem's URL
PhotoSchema
    .virtual('url')
    .get(function () {
        return '/photography/photo' + this._id;
    });

//Export model
module.exports = mongoose.model('Photo', PhotoSchema);