var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new Schema(
    {
        title: {type: String, required: true},
        date: {type: Date, required: true},
        author: {type: String, default: 'Charles John Quarto', required: true},
        poems: {type: Array, default: [], required: true},
        image: {type: String},
        length: {type: Number},
        description: {type: String, required: true}, // analogous to body - might want array ??
        link: {type: String}
    }
);

// Virtual for poem's URL
CollectionSchema
    .virtual('url')
    .get(function () {
        return '/written-work/collection/' + this._id;
    });

//Export model
module.exports = mongoose.model('Collection', CollectionSchema);