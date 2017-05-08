var mainRedirectMW = require('../middleware/generic/mainRedirect');
var renderMW = require('../middleware/generic/render');
var registrationMW = require('../middleware/generic/registration');
var logoutMW = require('../middleware/generic/logout');
var authMW = require('../middleware/generic/auth');
var User = require('../models/user');
var passport = require('passport');

module.exports = function (app) {

    var objectRepository = {
        userModel: User
    };

    /**
     * Registration
     */
    app.get('/login/registration',
        renderMW(objectRepository, 'registration')
    );

    /**
     * Handle POST message from registration form
     */
    app.post('/login/registration',
        registrationMW(objectRepository)
    );

    /**
     * Login page
     */
    app.get('/login',
        renderMW(objectRepository, 'index')
    );

    app.get('/users', function (req, res, next) {
        User.find(function (err, users) {
            res.json(users);
        });
    });

    app.get('/deleteAllUsers', function (req, res, next) {
        User.find(function (err, users) {
            users.forEach(function (user) {
                user.remove();
            });
            return res.end();
        });
    });

    app.post('/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/myfarm');
            });
        })(req, res, next);
    });

    /**
     * Main page
     */
    app.get('/',
        mainRedirectMW(objectRepository)
    );

    /**
     * Main page
     */
    app.get('/logout',
        logoutMW(objectRepository),
        function (req, res, next) {
            res.redirect('/');
        }
    );

};