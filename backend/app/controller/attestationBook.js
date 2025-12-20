var db = require('../config/db.config.js');
var Attestation = db.attestation_book;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    Attestation.findAll({
        include: [
            {
                model: db.student,
                include: [db.student_group] // Вкладываем группу в студента
            },
            {
                model: db.student_group_session,
                include: [
                    {
                        model: db.teacher_discipline,
                        include: [db.discipline] // Вкладываем дисциплину в связку
                    }
                ]
            }
        ]
    })
    .then(objects => { globalFunctions.sendResult(res, objects); })
    .catch(err => { globalFunctions.sendError(res, err); });
};

exports.create = (req, res) => {
    Attestation.create({
        student_id: req.body.student_id,
        student_group_session_id: req.body.student_group_session_id,
        mark: req.body.mark,
        theme: req.body.theme
    })
    .then(object => { globalFunctions.sendResult(res, object); })
    .catch(err => { globalFunctions.sendError(res, err); });
};

exports.update = (req, res) => {
    Attestation.update(req.body, { where: { id: req.params.id } })
        .then(object => { globalFunctions.sendResult(res, object); })
        .catch(err => { globalFunctions.sendError(res, err); });
};

exports.delete = (req, res) => {
    Attestation.destroy({ where: { id: req.params.id } })
        .then(() => { globalFunctions.sendResult(res, 'Удалено'); })
        .catch(err => { globalFunctions.sendError(res, err); });
};

exports.findById = (req, res) => {
    Attestation.findByPk(req.params.id, {
        include: [
            { model: db.student, include: [db.student_group] },
            { 
                model: db.student_group_session, 
                include: [{ model: db.teacher_discipline, include: [db.discipline] }] 
            }
        ]
    })
    .then(object => { globalFunctions.sendResult(res, object); })
    .catch(err => { globalFunctions.sendError(res, err); });
};