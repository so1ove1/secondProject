module.exports = (app) => {
    const session = require('../controller/session');
    const passport = require('passport');

    const auth = passport.authenticate('jwt', { session: false });
    app.get('/api/sessions',auth, session.findAll);
    app.post('/api/addSession',auth, session.create);
    app.get('/api/session/:id',auth, session.findById);
};