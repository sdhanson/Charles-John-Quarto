var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = new Schema(
    {
        title: {type: String, required: true},
        date: {type: Date, required: true},
        artist: {type: Array, default: ['Charles John Quarto'], required: true}, // analogous to author
        producers: {type: Array},
        album: {type: Schema.ObjectId, ref: 'Album'},
        image: {type: String},
        length: {type: Number},
        lyrics: {type: String, required: true} // analogous to body - might want array ??
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