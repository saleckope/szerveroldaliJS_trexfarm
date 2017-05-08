var passport = require('passport');
var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');
var getProfileMW = require('../middleware/profile/getProfile');
var editProfileMW = require('../middleware/profile/editProfile');
var deleteProfileMW = require('../middleware/profile/deleteProfile');
var trexModel = require('../models/trex');
var userModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        trexModel: trexModel,
        userModel: userModel
    };

    app.use('/profile', authMW(objectRepository));

    /**
     * Edit profile details
     */

    app.get('/profile/edit',
        getProfileMW(objectRepository),
        renderMW(objectRepository, 'profile_edit')
    );

    app.post('/profile/edit',
        editProfileMW(objectRepository),
        function(req, res, next) {
            res.redirect('/profile')
        }
    );

    /**
     * Delete profile
     * - then redirect to /
     */

    app.use('/profile/delete',
        getProfileMW(objectRepository),
        deleteProfileMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/');
        }
    );

    /**
     * Profile details
     */

    app.get('/profile',
        getProfileMW(objectRepository),
        renderMW(objectRepository, 'profile')
    );

};