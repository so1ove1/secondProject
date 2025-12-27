module.exports = (app) => {

    const studentGroup = require('../controller/studentGroup');
    const passport = require('passport');

    const auth = passport.authenticate('jwt', { session: false });

    // Получение списка студенческих групп
    app.get('/api/listStudentGroups',auth, studentGroup.findAll);

    // Добавление студенческой группы
    app.post('/api/addStudentGroup',auth, studentGroup.create);

    // Обновление студенческой группы
    app.post('/api/updateStudentGroup/:id',auth, studentGroup.update);

    // Удаление студенческой группы
    app.post('/api/deleteStudentGroup/:id',auth, studentGroup.delete);

    // Получение студенческой группы по id
    app.get('/api/studentGroup/:id',auth, studentGroup.findById);
};