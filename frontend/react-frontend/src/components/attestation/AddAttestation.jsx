import React, { useState, useEffect } from 'react';
import http from "../../../http-common";
import { Navigate } from 'react-router-dom';

function AddAttestation() {
    const [students, setStudents] = useState([]);
    const [allSessions, setAllSessions] = useState([]);
    const [filteredSessions, setFilteredSessions] = useState([]);
    
    const [formData, setFormData] = useState({ 
        student_id: '', 
        student_group_session_id: '', 
        mark: '', 
        theme: '' 
    });
    
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        http.get("/listStudents").then(res => setStudents(res.data));
        http.get("/sessions").then(res => setAllSessions(res.data));
    }, []);

    const handleStudentChange = (e) => {
        const selectedStudentId = e.target.value;
        const student = students.find(s => s.id === parseInt(selectedStudentId));
        
        setFormData({ 
            ...formData, 
            student_id: selectedStudentId,
            student_group_session_id: '' 
        });

        if (student) {
            const filtered = allSessions.filter(s => s.student_group_id === student.student_group_id);
            setFilteredSessions(filtered);
        } else {
            setFilteredSessions([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.student_group_session_id) {
            alert("Выберите сессию, доступную для этого студента");
            return;
        }
        http.post("/addAttestation", formData).then(() => setSubmitted(true));
    };

    if (submitted) return <Navigate to="/attestations" />;

    return (
        <div className="container">
            <h2>Выставить оценку</h2>
            <form onSubmit={handleSubmit}>
                <label>Студент:</label>
                <select 
                    value={formData.student_id} 
                    onChange={handleStudentChange} 
                    required
                >
                    <option value="">Сначала выберите студента...</option>
                    {students.map(s => (
                        <option key={s.id} value={s.id}>
                            {s.name} ({s.student_group?.name})
                        </option>
                    ))}
                </select>

                <label>Доступные сессии:</label>
                <select 
                    value={formData.student_group_session_id}
                    onChange={e => setFormData({...formData, student_group_session_id: e.target.value})}
                    disabled={!formData.student_id}
                    required
                >
                    <option value="">
                        {formData.student_id ? "Выберите сессию..." : "Выберите студента, чтобы увидеть список"}
                    </option>
                    {filteredSessions.map(s => (
                        <option key={s.id} value={s.id}>
                            {s.teacher_discipline?.discipline?.name} — {s.report_type?.name} ({s.mark_date})
                        </option>
                    ))}
                </select>

                <label>Оценка:</label>
                <input 
                    type="number" 
                    min="2" 
                    max="5" 
                    value={formData.mark}
                    onChange={e => setFormData({...formData, mark: e.target.value})} 
                    required 
                />

                <label>Тема (если есть):</label>
                <input 
                    type="text" 
                    value={formData.theme}
                    onChange={e => setFormData({...formData, theme: e.target.value})} 
                />

                <button type="submit" disabled={!formData.student_group_session_id}>
                    Сохранить в ведомость
                </button>
            </form>
        </div>
    );
}

export default AddAttestation;