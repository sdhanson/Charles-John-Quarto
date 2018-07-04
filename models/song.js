var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = new Schema(
    {
        title: {type: String, required: true},
        decade: {type: String, enum: ['1960', '1970', '1980', '1990', '2000', 'Present'], required: true, default: 'Present'},
        artist: {type: Array, default: ['Charles John Quarto'], required: true}, // analogous to author
        category: {type: String, default: 'Song', enum: ['Song', 'Single'], required: true},
        image: {type: String, required: true},
        description: {type: String, required: true},
        producers: {type: Array},
        album: {type: Schema.ObjectId, ref: 'Album'},
        link: {type: String},
        length: {type: String, required: true},
        lyrics: {type: String}, // analogous to body - might want array ??
        spotify_uri: {type: String}
    }
);

// Virtual for poem's URL
SongSchema
    .virtual('url')
    .get(function () {
        return '/written-works/song/' + this._id;
    });

//Export model
module.exports = mongoose.model('Song', SongSchema);