import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import http from "../../../http-common";

function SessionData() {
    const { id } = useParams();
    const [studentGroups, setStudentGroups] = useState([]);
    const [reportTypes, setReportTypes] = useState([]);
    const [teacherDisciplines, setTeacherDisciplines] = useState([]);
    
    const [session, setSession] = useState({
        student_group_id: "",
        report_type_id: "",
        teacher_discipline_id: "",
        mark_date: "",
        semester: ""
    });

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        http.get("/listStudentGroups").then(res => setStudentGroups(res.data));
        http.get("/reportTypes").then(res => setReportTypes(res.data));
        http.get("/listTeacherDiscipline").then(res => setTeacherDisciplines(res.data));
        
        http.get(`/session/${id}`).then(res => {
            setSession({
                student_group_id: res.data.student_group_id,
                report_type_id: res.data.report_type_id,
                teacher_discipline_id: res.data.teacher_discipline_id,
                mark_date: res.data.mark_date,
                semester: res.data.semester
            });
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSession({ ...session, [name]: value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        http.post(`/updateSession/${id}`, session)
            .then(() => setSubmitted(true));
    };

    const handleDelete = () => {
        http.post(`/deleteSession/${id}`)
            .then(() => setSubmitted(true))
            .catch(() => alert("Удаление невозможно: есть связанные оценки"));
    };

    if (submitted) return <Navigate to="/sessions" />;

    return (
        <div className="container">
            <h2>Редактировать сессию</h2>
            <form onSubmit={handleUpdate}>
                <label>Группа:</label>
                <select name="student_group_id" value={session.student_group_id} onChange={handleChange} required>
                    {studentGroups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>

                <label>Тип контроля:</label>
                <select name="report_type_id" value={session.report_type_id} onChange={handleChange} required>
                    {reportTypes.map(rt => <option key={rt.id} value={rt.id}>{rt.name}</option>)}
                </select>

                <label>Предмет:</label>
                <select name="teacher_discipline_id" value={session.teacher_discipline_id} onChange={handleChange} required>
                    {teacherDisciplines.map(td => (
                        <option key={td.id} value={td.id}>{td.teacher?.name} — {td.discipline?.name}</option>
                    ))}
                </select>

                <label>Семестр:</label>
                <input type="number" name="semester" value={session.semester} onChange={handleChange} required />

                <label>Дата:</label>
                <input type="date" name="mark_date" value={session.mark_date} onChange={handleChange} required />

                <button type="submit">Сохранить</button>
            </form>
            <button onClick={handleDelete} style={{background: '#441a1a', marginTop: '10px'}}>Удалить сессию</button>
        </div>
    );
}

export default SessionData;