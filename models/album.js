var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = new Schema(
    {
        title: {type: String, required: true},
        decade: {type: String, enum: ['1960', '1970', '1980', '1990', '2000', 'Present'], required: true},
        artist: {type: Array, default: ['Charles John Quarto'], required: true}, // analogous to author
        category: {type: String, default: 'Album', enum: ['Album', 'Collaboration'], required: true},
        songs: {type: Array, required: true},
        image: {type: String, required: true},
        description: {type: String, required: true}, // analogous to body - might want array ??
        producers: {type: Array},
        link: {type: String, default: 'http://shop.com'},
        spotify: {type: String, default: 'http://spotify.com/cjq'}
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