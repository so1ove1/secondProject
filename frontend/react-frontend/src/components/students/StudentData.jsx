import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import http from "../../../config/axios";

function StudentData() {
    const { id } = useParams();
    const [groups, setGroups] = useState([]);
    const [student, setStudent] = useState({ name: '', student_group_id: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        http.get("/listStudentGroups").then(res => setGroups(res.data));
        http.get(`/student/${id}`).then(res => setStudent(res.data));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        http.post(`/updateStudent/${id}`, student)
            .then(() => setSubmitted(true));
    };

    const handleDelete = () => {
        http.post(`/deleteStudent/${id}`)
            .then(() => setSubmitted(true));
    };

    if (submitted) return <Navigate to="/listStudents" />;

    return (
        <div className="container">
            <h2>Редактировать данные студента</h2>
            <form onSubmit={handleUpdate}>
                <label>ФИО студента:</label>
                <input 
                    type="text" 
                    value={student.name} 
                    onChange={e => setStudent({...student, name: e.target.value})} 
                    required 
                />

                <label>Группа:</label>
                <select 
                    value={student.student_group_id} 
                    onChange={e => setStudent({...student, student_group_id: e.target.value})} 
                    required
                >
                    {groups.map(g => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                </select>

                <button type="submit">Обновить данные</button>
            </form>
            <button onClick={handleDelete} style={{background: '#441a1a', marginTop: '10px'}}>Отчислить (удалить)</button>
        </div>
    );
}

export default StudentData;