import React, { useState, useEffect } from 'react';
import http from "../../../config/axios";
import { Navigate } from 'react-router-dom';

function AddSession() {
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
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSession({ ...session, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        http.post("/addSession", session)
            .then(() => setSubmitted(true))
            .catch(err => alert("Ошибка при сохранении"));
    };

    if (submitted) return <Navigate to="/sessions" />;

    return (
        <div className="container">
            <h2>Добавить новую сессию</h2>
            <form onSubmit={handleSubmit}>
                <label>Студенческая группа:</label>
                <select name="student_group_id" value={session.student_group_id} onChange={handleChange} required>
                    <option value="">Выберите группу...</option>
                    {studentGroups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>

                <label>Тип контроля:</label>
                <select name="report_type_id" value={session.report_type_id} onChange={handleChange} required>
                    <option value="">Выберите тип...</option>
                    {reportTypes.map(rt => <option key={rt.id} value={rt.id}>{rt.name}</option>)}
                </select>

                <label>Преподаватель и дисциплина:</label>
                <select name="teacher_discipline_id" value={session.teacher_discipline_id} onChange={handleChange} required>
                    <option value="">Выберите предмет...</option>
                    {teacherDisciplines.map(td => (
                        <option key={td.id} value={td.id}>{td.teacher?.name} — {td.discipline?.name}</option>
                    ))}
                </select>

                <label>Семестр:</label>
                <input type="number" name="semester" value={session.semester} onChange={handleChange} required />

                <label>Дата:</label>
                <input type="date" name="mark_date" value={session.mark_date} onChange={handleChange} required />

                <button type="submit">Создать сессию</button>
            </form>
        </div>
    );
}

export default AddSession;