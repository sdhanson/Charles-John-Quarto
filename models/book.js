var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema(
    {
        title: {type: String, required: true},
        decade: {type: String, enum: ['1960', '1970', '1980', '1990', '2000', 'Present'], required: true, default: 'Present'},
        author: {type: String, default: 'Charles John Quarto', required: true},
        poems: {type: Array, required: true},
        image: {type: String, required: true, default: '/images/book/jpg'},
        description: {type: String, required: true, default: 'A collection of works from Charles John Quarto'}, // analogous to body - might want array ??
        link: {type: String},
        category: {type: String, default: 'Collection', enum: ['Collection'], required: true}

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