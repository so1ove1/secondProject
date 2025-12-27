module.exports = (app) => {

    const user = require('../controller/user');
    const passport = require('passport');

    const auth = passport.authenticate('jwt', { session: false });

    // Получение всех пользователей
    app.get('/api/users',auth, user.findAll);

    // Добавление пользователя
    app.post('/api/addUser',auth, user.create);

    // Обновление данных пользователя по id
    app.post('/api/updateUser/:id',auth, user.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteUser/:id',auth, user.delete);

    // Получение пользователя по id
    app.get('/api/user/:id',auth, user.findById);

    // Получение пользователя по username
    app.get('/api/user/username/:username',auth, user.findByUsername);
};