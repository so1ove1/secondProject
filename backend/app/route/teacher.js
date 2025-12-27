module.exports = (app) => {
    const teacher = require('../controller/teacher');
    const passport = require('passport');

    const auth = passport.authenticate('jwt', { session: false });

    app.get('/api/listTeachers',auth, teacher.listTeachers);
    app.post('/api/addTeacher',auth, teacher.addTeacher);
    app.post('/api/updateTeacher/:id',auth, teacher.updateTeacher);
    app.post('/api/deleteTeacher/:id',auth, teacher.deleteTeacher);
    app.get('/api/teacher/:id',auth, teacher.findById);

    app.get('/api/listTeacherDiscipline',auth, teacher.listTeacherDiscipline);
    app.post('/api/addTeacherDiscipline',auth, teacher.addTeacherDiscipline);
    app.post('/api/deleteTeacherDiscipline/teacherId=:teacher_id/disciplineId=:discipline_id',auth, teacher.deleteTeacherDiscipline);
};