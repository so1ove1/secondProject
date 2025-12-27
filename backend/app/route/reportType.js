module.exports = (app) => {
    const reportType = require('../controller/reportType');
    const passport = require('passport');

    const auth = passport.authenticate('jwt', { session: false });
    app.get('/api/reportTypes',auth, reportType.findAll);
    app.post('/api/addReportType',auth, reportType.create);
    app.post('/api/updateReportType/:id',auth, reportType.update);
    app.post('/api/deleteReportType/:id',auth, reportType.delete);
    app.get('/api/reportType/:id',auth, reportType.findById);
};