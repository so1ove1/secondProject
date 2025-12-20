var db = require('../config/db.config.js');
var Mark = db.attestation_book;
var Student = db.student;
var globalFunctions = require('../config/global.functions.js');

exports.findBySession = (req, res) => {
    Mark.findAll({
        where: { student_group_session_id: req.params.session_id },
        include: [{ model: Student }]
    })
    .then(objects => { globalFunctions.sendResult(res, objects); })
    .catch(err => { globalFunctions.sendError(res, err); });
};

exports.create = (req, res) => {
    Mark.create({
        student_id: req.body.student_id,
        student_group_session_id: req.body.student_group_session_id,
        mark: req.body.mark,
        theme: req.body.theme
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};