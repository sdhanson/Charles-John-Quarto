var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PoemSchema = new Schema(
    {
        title: {type: String, required: true},
        author: {type: String, default: 'Charles John Quarto', required: true},
        image: {type: String, default: '/images/mountain.jpg', required: true},
        date: {type: Date, required: true},
        body: {type: String, required: true},
        book: {type: Schema.ObjectId, ref: 'Book'}
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