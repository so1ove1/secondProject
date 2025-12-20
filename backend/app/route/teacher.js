module.exports = (app) => {
    const teacher = require('../controller/teacher');
    
    app.get('/api/listTeachers', teacher.listTeachers);
    app.post('/api/addTeacher', teacher.addTeacher);
    app.post('/api/updateTeacher/:id', teacher.updateTeacher);
    app.post('/api/deleteTeacher/:id', teacher.deleteTeacher);
    app.get('/api/teacher/:id', teacher.findById);
    
    app.get('/api/listTeacherDiscipline', teacher.listTeacherDiscipline);
    app.post('/api/addTeacherDiscipline', teacher.addTeacherDiscipline);
    app.post('/api/deleteTeacherDiscipline/teacherId=:teacher_id/disciplineId=:discipline_id', teacher.deleteTeacherDiscipline);
};