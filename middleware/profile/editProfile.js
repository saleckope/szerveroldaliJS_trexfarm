/**
 * Edit profile
 *  - if everything is ok redirect to /profile
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if(req.body) {
            const formData = {
                image: req.body.image,
                email: req.body.email,
                age: req.body.age
            };
            console.log(formData);
            req.user.image = formData.image;
            req.user.email = formData.email;
            req.user.age = formData.age;
            req.user.save(function(err, user) {
                if (err) {
                    return redirect('/login');
                }
                next();
            });
        }
        next();
    };
};