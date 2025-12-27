module.exports = (app) => {
    const session = require('../controller/studentGroupSession');
    const passport = require('passport');

    const auth = passport.authenticate('jwt', { session: false });
    app.get('/api/sessions',auth, session.findAll);
    app.post('/api/addSession',auth, session.create);
    app.post('/api/updateSession/:id',auth, session.update);
    app.post('/api/deleteSession/:id',auth, session.delete);
    app.get('/api/session/:id',auth, session.findById);
};