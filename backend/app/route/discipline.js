module.exports = (app) => {

    const discipline = require('../controller/discipline');
    const passport = require('passport');

    const auth = passport.authenticate('jwt', { session: false });

    // Получение списка учебных дисциплин
    app.get('/api/listDisciplines',auth, discipline.findAll);

    // Добавление данных учебной дисциплины
    app.post('/api/addDiscipline',auth, discipline.create);

    // Обновление данных учебной дисциплины
    app.post('/api/updateDiscipline/:id',auth, discipline.update);

    // Удаление данных учебной дисциплины
    app.post('/api/deleteDiscipline/:id',auth, discipline.delete);

    // Получение данных учебной дисциплины по id
    app.get('/api/discipline/:id',auth, discipline.findById);
};