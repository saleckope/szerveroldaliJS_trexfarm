const User = require('../../models/user');
/*
 If the user is not registrated yet (email check), then create user
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (req.body) {
            const userData = {
                username: req.body.username,
                email: req.body.email,
                age: req.body.age,
                trexes: [],
                image: req.body.image
            };
            User.register(new User(userData), req.body.password, function(err, user) {
                if (err) {
                    console.log('error while user register!', err);
                    return next(err);
                }
                console.log('user registered', user);
                return res.redirect('/login');
            });
        }
    };
};