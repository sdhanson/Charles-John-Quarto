var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = new Schema(
    {
        title: {type: String, required: true},
        year: {type: String, required: true},
        artist: {type: Array, default: ['Charles John Quarto'], required: true}, // analogous to author
        producers: {type: Array},
        songs: {type: Array, default: [], required: true},
        image: {type: String, required: true},
        description: {type: String, required: true}, // analogous to body - might want array ??
        link: {type: String},
        category: {type: String, required: true}
    }
);

// Virtual for poem's URL
AlbumSchema
    .virtual('url')
    .get(function () {
        return '/discography/album/' + this._id;
    });

//Export model
module.exports = mongoose.model('Album', AlbumSchema);