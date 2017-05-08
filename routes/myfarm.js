var passport = require('passport');
var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');
var getTrexListMW = require('../middleware/myfarm/getTrexList');
var createTrexMW = require('../middleware/myfarm/createTrex');
var getTrexMW = require('../middleware/myfarm/getTrex');
var editTrexMW = require('../middleware/myfarm/editTrex');
var deleteTrexMW = require('../middleware/myfarm/deleteTrex');
var trexModel = require('../models/trex');
var userModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        trexModel: trexModel,
        userModel: userModel
    };

    app.use('/myfarm', authMW(objectRepository));

    /**
     * Display T-Rex creation form
     */

    app.get('/myfarm/new',
        renderMW(objectRepository, 'newtrex')
    );

    /**
     * Handles POST message from T-Rex create form
     */
    app.post('/myfarm/new',
        createTrexMW(objectRepository),
        function(req, res, next) {
            res.redirect('/myfarm');
        }
    );

    /**
     * Displays the T-Rex edit form
     */

    app.get('/myfarm/:trexid/edit',
        getTrexMW(objectRepository),
        renderMW(objectRepository, 'trex_edit')
    );

    /**
     * Handles POST message from T-Rex edit form
     */

    app.post('/myfarm/:trexid/edit',
        editTrexMW(objectRepository),
        function(req, res, next) {
            res.redirect('/myfarm/' + req.params.trexid);
        }
    );

    /**
     * Delete trex
     * - then redirect to /myfarm
     */

    app.post('/myfarm/:trexid/delete',
        deleteTrexMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/myfarm');
        }
    );

    /**
     * T-rex details
     */

    app.get('/myfarm/:trexid',
        getTrexMW(objectRepository),
        renderMW(objectRepository, 'trex')
    );

    /**
     * List all trexes
     */

    app.get('/myfarm',
        getTrexListMW(objectRepository),
        renderMW(objectRepository, 'myfarm')
    );

};