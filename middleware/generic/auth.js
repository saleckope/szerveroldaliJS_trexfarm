var passport = require('passport');
/*
 If the user is not logged in, redirects to /
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            return res.redirect('/login');
        }
    };
};