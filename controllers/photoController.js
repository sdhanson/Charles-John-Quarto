var Photo = require('../models/photo');

exports.index = function(req, res) {

    Photo.find({}, function(err, allPhotos){
        if(err){
            console.log(err);
        } else {
            var title = 'Photo Gallery';
            var subtitle = '';
            var link = '';
            var image = '/images/rivers.jpeg';
            var sub = false;
            var titlesub = '';
            res.render('photography', {
                title: title,
                error: err,
                photos: allPhotos,
                subtitle: subtitle,
                link: link,
                image: image,
                titlesub: titlesub, sub: sub
            });
        }
    });
};
