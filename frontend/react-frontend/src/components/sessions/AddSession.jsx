import React, { useState, useEffect } from 'react';
import http from "../../../http-common";
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
        const data = {
            student_group_id: session.student_group_id,
            report_type_id: session.report_type_id,
            teacher_discipline_id: session.teacher_discipline_id,
            mark_date: session.mark_date,
            semester: session.semester
        };

        http.post("/addSession", data)
            .then(() => {
                setSubmitted(true);
            })
            .catch(err => {
                console.log(err);
                alert("Ошибка при добавлении сессии");
            });
    };

    if (submitted) return <Navigate to="/sessions" />;

    return (
        <div className="container">
            <h2>Добавить новую учебную сессию</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Группа:</label>
                    <select name="student_group_id" value={session.student_group_id} onChange={handleChange} required>
                        <option value="">Выберите группу</option>
                        {studentGroups.map(g => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Тип отчета (экзамен/зачет):</label>
                    <select name="report_type_id" value={session.report_type_id} onChange={handleChange} required>
                        <option value="">Выберите тип</option>
                        {reportTypes.map(rt => (
                            <option key={rt.id} value={rt.id}>{rt.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Преподаватель и Дисциплина:</label>
                    <select name="teacher_discipline_id" value={session.teacher_discipline_id} onChange={handleChange} required>
                        <option value="">Выберите связку</option>
                        {teacherDisciplines.map(td => (
                            <option key={td.id} value={td.id}>
                                {td.teacher?.name} — {td.discipline?.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Семестр:</label>
                    <input 
                        type="number" 
                        name="semester" 
                        value={session.semester} 
                        onChange={handleChange} 
                        placeholder="Например: 1" 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Дата проведения:</label>
                    <input 
                        type="text" 
                        name="mark_date" 
                        value={session.mark_date} 
                        onChange={handleChange} 
                        placeholder="ГГГГ-ММ-ДД" 
                        required 
                    />
                </div>

                <button type="submit">Создать сессию</button>
            </form>
        </div>
    );
}

export default AddSession;