import React, { useState } from 'react';
import http from "../../../config/axios";
import { Navigate } from 'react-router-dom';

function AddTeacher() {
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        http.post("/addTeacher", { name: name })
            .then(() => setSubmitted(true))
            .catch(err => alert("Ошибка при добавлении"));
    };

    if (submitted) return <Navigate to="/listTeachers" />;

    return (
        <div className="container">
            <h2>Новый преподаватель</h2>
            <form onSubmit={handleSubmit}>
                <label>ФИО преподавателя:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Иванов Иван Иванович" 
                    required 
                />
                <button type="submit">Добавить</button>
            </form>
        </div>
    );
}

export default AddTeacher;