var requireOption = require('../common').requireOption;

/**
 * Edit trex
 *  - if there is no title, set tpl.error
 *  - if everything is ok redirect to /myfarm/:trexid
 */

module.exports = function (objectrepository) {

    var trexModel = requireOption(objectrepository, 'trexModel');

    return function (req, res, next) {
        if (req.body) {
            trexModel.findById(req.params.trexid, function (err, trex) {
                if (err || !trex) {
                    // szép hibakezelő oldalra átirányítás
                }

                trex.name = req.body.name;
                trex.age = req.body.age;
                trex.sex = req.body.sex;
                trex.size = req.body.size;
                trex.image = req.body.image;
                trex.save();

                return next();
            });
        }
    };

};