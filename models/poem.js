var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PoemSchema = new Schema(
    {
        title: {type: String, required: true},
        author: {type: String, default: 'Charles John Quarto', required: true},
        image: {type: String},
        decade: {type: String, enum: ['1960', '1970', '1980', '1990', '2000', 'Present'], required: true, default: 'Present'},
        year: {type: String, required: true},
        category: {type: String, default: 'Poem', required: true, enum: ['Poem']},
        body: {type: Array, required: true},
        book: {type: Schema.ObjectId, ref: 'Book'},
        link: {type: String},
        display: {type: String, required: true},
}
);

// Virtual for poem's URL
PoemSchema
    .virtual('url')
    .get(function () {
        return '/written-works/poem/' + this._id;
    });

//Export model
module.exports = mongoose.model('Poem', PoemSchema);