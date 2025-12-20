module.exports = (app) => {
    const mark = require('../controller/mark');
    app.get('/api/marks/session/:session_id', mark.findBySession);
    app.post('/api/addMark', mark.create);
};