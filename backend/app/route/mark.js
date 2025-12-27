module.exports = (app) => {
    const mark = require('../controller/mark');
    const passport = require('passport');

    const auth = passport.authenticate('jwt', { session: false });
    app.get('/api/marks/session/:session_id',auth, mark.findBySession);
    app.post('/api/addMark',auth, mark.create);
};