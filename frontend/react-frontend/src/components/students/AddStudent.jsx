import React, { useState, useEffect } from 'react';
import http from "../../../config/axios";
import { Navigate } from 'react-router-dom';

function AddStudent() {
    const [name, setName] = useState("");
    const [groupId, setGroupId] = useState("");
    const [groups, setGroups] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        http.get("/listStudentGroups").then(res => setGroups(res.data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            student_group_id: groupId
        };
        http.post("/addStudent", data)
            .then(() => setSubmitted(true))
            .catch(err => alert("Ошибка при добавлении"));
    };

    if (submitted) return <Navigate to="/listStudents" />;

    return (
        <div className="container">
            <h2>Регистрация нового студента</h2>
            <form onSubmit={handleSubmit}>
                <label>Полное имя (ФИО):</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Введите ФИО" 
                    required 
                />

                <label>Студенческая группа:</label>
                <select 
                    value={groupId} 
                    onChange={e => setGroupId(e.target.value)} 
                    required
                >
                    <option value="">Выберите группу...</option>
                    {groups.map(g => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                </select>

                <button type="submit">Зачислить</button>
            </form>
        </div>
    );
}

export default AddStudent;