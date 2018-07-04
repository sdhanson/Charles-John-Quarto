var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema(
    {
        title: {type: String, required: true},
        date: {type: Date, required: true},
        author: {type: String, default: 'Charles John Quarto', required: true},
        poems: {type: Array, default: [], required: true},
        image: {type: String},
        description: {type: String, required: true}, // analogous to body - might want array ??
        link: {type: String}
    }
);

// Virtual for poem's URL
BookSchema
    .virtual('url')
    .get(function () {
        return '/written-works/book/' + this._id;
    });

//Export model
module.exports = mongoose.model('Book', BookSchema);