var db = require('../config/db.config.js');
var Session = db.student_group_session;
var Group = db.student_group;
var TeacherDiscipline = db.teacher_discipline;
var Teacher = db.teacher;
var Discipline = db.discipline;
var ReportType = db.report_type;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    Session.findAll({
        include: [
            { model: Group },
            { model: ReportType },
            { 
                model: TeacherDiscipline,
                include: [{ model: Teacher }, { model: Discipline }]
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
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.findById = (req, res) => {
    Session.findByPk(req.params.id, {
        include: [{ model: Group }]
    })
    .then(object => { globalFunctions.sendResult(res, object); })
    .catch(err => { globalFunctions.sendError(res, err); });
};