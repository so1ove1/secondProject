import React, { useState, useEffect } from 'react';
import http from "../../../http-common";
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
        http.post("/addStudent", { name, student_group_id: groupId })
            .then(() => setSubmitted(true));
    };

    if (submitted) return <Navigate to="/listStudents" />;

    return (
        <form onSubmit={handleSubmit}>
            <h3>Новый студент</h3>
            <input placeholder="ФИО" value={name} onChange={e => setName(e.target.value)} />
            <select value={groupId} onChange={e => setGroupId(e.target.value)}>
                <option value="">Выберите группу</option>
                {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
            <button type="submit">Добавить</button>
        </form>
    );
}

export default AddStudent;