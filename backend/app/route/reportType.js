module.exports = (app) => {
    const reportType = require('../controller/reportType');
    app.get('/api/reportTypes', reportType.findAll);
    app.post('/api/addReportType', reportType.create);
    app.post('/api/updateReportType/:id', reportType.update);
    app.post('/api/deleteReportType/:id', reportType.delete);
    app.get('/api/reportType/:id', reportType.findById);
};