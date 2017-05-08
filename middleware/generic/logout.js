/*
    Logs out the user
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        req.logout();
        res.redirect('/');
    };

};