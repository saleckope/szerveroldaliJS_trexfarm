var requireOption = require('../common').requireOption;

/**
 * Delete trex object
 */

module.exports = function (objectrepository) {

    var trexModel = requireOption(objectrepository, 'trexModel');

    return function (req, res, next) {
        trexModel.findById(req.params.trexid, function(err, trex) {
            if (err || !trex) {
                // szép hibakezelő oldalra átirányítás
            }
            trex.remove(function(err, trex) {
                if (!err) {
                    return next();
                }
            });
        });
    };

};