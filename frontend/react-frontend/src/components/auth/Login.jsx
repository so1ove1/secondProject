import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../config/axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/login", { username, password });
            localStorage.setItem("token", res.data.token);
            navigate("/attestations");
        } catch (err) {
            alert("Неверный логин или пароль");
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleLogin} className="auth-form">
                <h2>Вход в систему</h2>
                
                <label>Логин:</label>
                <input 
                    type="text"
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    placeholder="Введите логин"
                    required 
                />
                
                <label>Пароль:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Введите пароль"
                    required 
                />
                
                <button type="submit">Войти</button>
                
                <div className="auth-footer">
                    Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;