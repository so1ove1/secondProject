import { useState } from "react";
import axios from "../../../config/axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/register", {
                username,
                password
            });

            localStorage.setItem("token", res.data.token);
            navigate("/attestations");

        } catch (err) {
            console.log(err);
            alert(err.response?.data?.message || "Ошибка регистрации");
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleRegister} className="auth-form">
                <h2>Регистрация</h2>

                <label>Имя пользователя:</label>
                <input
                    placeholder="Придумайте логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label>Пароль:</label>
                <input
                    type="password"
                    placeholder="Придумайте пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Создать аккаунт</button>
                
                <div className="auth-footer">
                    Уже есть аккаунт? <Link to="/login">Войти</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;