module.exports = (app) => {
    const session = require('../controller/session');
    app.get('/api/sessions', session.findAll);
    app.post('/api/addSession', session.create);
    app.get('/api/session/:id', session.findById);
};