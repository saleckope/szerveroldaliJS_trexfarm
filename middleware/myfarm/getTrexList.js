/**
 * Get the list of the trexes in the farm and put the trexes on res.tpl.trex
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.tpl.trexes = req.user.trexes;
        next();
    };
};
