var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = new Schema(
    {
        title: {type: String, required: true},
        year: {type: String, required: true},
        decade: {type: String, enum: ['1960', '1970', '1980', '1990', '2000', 'Present'], required: true, default: 'Present'},
        artist: {type: Array, default: ['Charles John Quarto'], required: true}, // analogous to author
        category: {type: String, default: 'Song', enum: ['Song', 'Single'], required: true},
        image: {type: String},
        display: {type: String, required: true},
        producers: {type: Array},
        label: {type: String},
        album: {type: Schema.ObjectId, ref: 'Album'},
        link: {type: String},
        length: {type: String},
        lyrics: {type: Array},
        spotify: {type: String}
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