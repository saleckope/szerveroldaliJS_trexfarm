var requireOption = require('../common').requireOption;

/**
 * Get the trex for the trexid param
 *  - if there is no such trex, redirect to /myfarm
 *  - if there is one, put it on res.tpl.trex
 */

module.exports = function (objectrepository) {

    var trexModel = requireOption(objectrepository, 'trexModel');

    return function (req, res, next) {
        trexModel.findById(req.params.trexid, function(err, trex) {
           if (err || !trex) {
               return res.redirect('/myfarm');
           }
           res.tpl.trex = trex;
           next();
        });
    };

};