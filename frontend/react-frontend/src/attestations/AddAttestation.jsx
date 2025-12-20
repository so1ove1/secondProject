import React, { useState, useEffect } from 'react';
import http from "../../../http-common";
import { Navigate } from 'react-router-dom';

function AddAttestation() {
    const [students, setStudents] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [formData, setFormData] = useState({ student_id: '', student_group_session_id: '', mark: '', theme: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        http.get("/listStudents").then(res => setStudents(res.data));
        http.get("/sessions").then(res => setSessions(res.data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        http.post("/addAttestation", formData).then(() => setSubmitted(true));
    };

    if (submitted) return <Navigate to="/attestations" />;

    return (
        <div className="container">
            <h2>Выставить оценку</h2>
            <form onSubmit={handleSubmit}>
                <label>Студент:</label>
                <select onChange={e => setFormData({...formData, student_id: e.target.value})} required>
                    <option value="">Выберите...</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>

                <label>Сессия:</label>
                <select onChange={e => setFormData({...formData, student_group_session_id: e.target.value})} required>
                    <option value="">Выберите...</option>
                    {sessions.map(s => <option key={s.id} value={s.id}>{s.student_group?.name} - {s.teacher_discipline?.discipline?.name}</option>)}
                </select>

                <label>Оценка:</label>
                <input type="number" onChange={e => setFormData({...formData, mark: e.target.value})} required />

                <label>Тема:</label>
                <input type="text" onChange={e => setFormData({...formData, theme: e.target.value})} />

                <button type="submit">Сохранить</button>
            </form>
        </div>
    );
}

export default AddAttestation;