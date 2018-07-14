var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema(
    {
        title: {type: String, required: true},
        decade: {type: String, enum: ['1960', '1970', '1980', '1990', '2000', 'Present'], required: true, default: 'Present'},
        year: {type: String},
        author: {type: String, default: 'Charles John Quarto'},
        poems: {type: Array, required: true},
        image: {type: String, default: 'images/book.jpg'},
        link: {type: String},
        category: {type: String, default: 'Collection', enum: ['Collection']},
        visible: {type: Array, required: true},
        type: {type: String, required: true, enum: ['Songs', 'Poetry']},
    }
);

// Virtual for poem's URL
BookSchema
    .virtual('url')
    .get(function () {
        return '/written-works/book/' + this._id;
    });

BookSchema
    .virtual('display')
    .get(function () {
        var cat = 'poems';
        if(this.type === 'Songs') {
            cat = 'songs';
        }
        if(this.visible.length === 0) {
            return 'A collection of ' + cat + ' from Charles John Quarto';
        } else if(this.visible.length === 1) {
            return 'A collection of ' + cat + ' from Charles John Quarto, including ' +  this.visible[0].title;
        }  else if(this.visible.length >= 2) {
            return 'A collection of ' + cat + ' from Charles John Quarto, including ' +  this.visible[0].title + ' and ' + this.visible[1].title;
        }

    });
//Export model
module.exports = mongoose.model('Book', BookSchema);