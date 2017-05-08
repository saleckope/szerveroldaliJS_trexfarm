/**
 * Get the data os the user
 * put it on res.tpl.profile
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.tpl.profile = req.user;
        console.log(res.tpl.profile);
        next();
    };
};