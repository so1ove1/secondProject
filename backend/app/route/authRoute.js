import {login, register} from "../controller/authController.js";

export default function (app) {
    app.post('/api/auth/register', register);
    app.post('/api/auth/login', login);
}