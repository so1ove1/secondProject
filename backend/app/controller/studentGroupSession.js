var db = require('../config/db.config.js');
var Session = db.student_group_session;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    Session.findAll({
        include: [
            { model: db.student_group },
            { model: db.report_type },
            { 
                model: db.teacher_discipline, 
                include: [db.teacher, db.discipline] 
            }
        ]
    })
    .then(objects => { globalFunctions.sendResult(res, objects); })
    .catch(err => { globalFunctions.sendError(res, err); });
};

exports.create = (req, res) => {
    Session.create({
        student_group_id: req.body.student_group_id,
        report_type_id: req.body.report_type_id,
        teacher_discipline_id: req.body.teacher_discipline_id,
        mark_date: req.body.mark_date,
        semester: req.body.semester
    })
    .then(object => { globalFunctions.sendResult(res, object); })
    .catch(err => { globalFunctions.sendError(res, err); });
};

exports.update = (req, res) => {
    Session.update(req.body, { where: { id: req.params.id } })
        .then(object => { globalFunctions.sendResult(res, object); })
        .catch(err => { globalFunctions.sendError(res, err); });
};

exports.delete = (req, res) => {
    Session.destroy({ where: { id: req.params.id } })
        .then(() => { globalFunctions.sendResult(res, 'Удалено'); })
        .catch(err => { globalFunctions.sendError(res, err); });
};

exports.findById = (req, res) => {
    Session.findByPk(req.params.id)
        .then(object => { globalFunctions.sendResult(res, object); })
        .catch(err => { globalFunctions.sendError(res, err); });
};