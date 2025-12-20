var db = require('../config/db.config.js');
var Attestation = db.attestation_book;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    Attestation.findAll({
        include: [db.student, db.student_group_session]
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
    Attestation.findByPk(req.params.id)
        .then(object => { globalFunctions.sendResult(res, object); })
        .catch(err => { globalFunctions.sendError(res, err); });
};