module.exports = (app) => {

    const student = require('../controller/student');
    const passport = require('passport');

    const auth = passport.authenticate('jwt', { session: false });

    // Получение списка студентов
    app.get('/api/listStudents', auth, student.findAll);

    // Добавление студента
    app.post('/api/addStudent',auth, student.create);

    // Обновление данных студента
    app.post('/api/updateStudent/:id',auth, student.update);

    // Удаление данных студента
    app.post('/api/deleteStudent/:id',auth, student.delete);

    // Получение данных студента по id
    app.get('/api/student/:id',auth, student.findById);

    // Получение студентов по студенческой группе
    app.get('/api/studentsByStudentGroup/studentGroupId=:student_group_id',auth, student.studentsByStudentGroup);
};