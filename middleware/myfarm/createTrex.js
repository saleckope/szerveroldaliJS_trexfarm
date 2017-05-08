var requireOption = require('../common').requireOption;

/**
 * Create trex object
 */
module.exports = function (objectrepository) {

    var trexModel = requireOption(objectrepository, 'trexModel');

    return function (req, res, next) {
        if (req.body) {
            trexModel.create(req.body, function(err, trex) {
                if (err || !trex) {
                    // meg kéne jeleníteni valamilyen hibakezelő oldalt
                }
                req.user.trexes.push(trex);
                req.user.save();
                return next();
            });
        }
    };
};