module.exports = (app) => {
    const session = require('../controller/studentGroupSession');
    app.get('/api/sessions', session.findAll);
    app.post('/api/addSession', session.create);
    app.post('/api/updateSession/:id', session.update);
    app.post('/api/deleteSession/:id', session.delete);
    app.get('/api/session/:id', session.findById);
};