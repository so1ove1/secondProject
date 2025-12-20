import React, { useState } from 'react';
import http from "../../../http-common";
import { Navigate } from 'react-router-dom';

function AddGroup() {
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        http.post("/addStudentGroup", { name: name })
            .then(() => setSubmitted(true))
            .catch(err => alert("Ошибка при добавлении группы"));
    };

    if (submitted) return <Navigate to="/listStudentGroups" />;

    return (
        <div className="container">
            <h2>Добавить новую группу</h2>
            <form onSubmit={handleSubmit}>
                <label>Название группы:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Например: 2362-ДБ" 
                    required 
                />
                <button type="submit">Добавить</button>
            </form>
        </div>
    );
}

export default AddGroup;