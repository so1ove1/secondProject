import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import http from "../../../config/axios";

function TeacherData() {
    const { id } = useParams();
    const [teacher, setTeacher] = useState({ name: '' });
    const [allDisciplines, setAllDisciplines] = useState([]);
    const [teacherLinks, setTeacherLinks] = useState([]);
    const [selectedDiscipline, setSelectedDiscipline] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        http.get(`/teacher/${id}`).then(res => setTeacher({ name: res.data.name }));
        http.get("/listDisciplines").then(res => setAllDisciplines(res.data));
        loadLinks();
    }, [id]);

    const loadLinks = () => {
        http.get("/listTeacherDiscipline").then(res => {
            const filtered = res.data.filter(link => link.teacher_id === parseInt(id));
            setTeacherLinks(filtered);
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        http.post(`/updateTeacher/${id}`, teacher).then(() => alert("Имя обновлено"));
    };

    const handleAddLink = (e) => {
        e.preventDefault();
        if (!selectedDiscipline) return;
        http.post("/addTeacherDiscipline", { teacher_id: id, discipline_id: selectedDiscipline })
            .then(() => {
                loadLinks();
                setSelectedDiscipline("");
            });
    };

    const handleDeleteLink = (disciplineId) => {
        http.post(`/deleteTeacherDiscipline/teacherId=${id}/disciplineId=${disciplineId}`)
            .then(() => loadLinks());
    };

    const handleDeleteTeacher = () => {
        http.post(`/deleteTeacher/${id}`).then(() => setSubmitted(true));
    };

    if (submitted) return <Navigate to="/listTeachers" />;

    return (
        <div className="container">
            <h2>Данные преподавателя</h2>
            <form onSubmit={handleUpdate}>
                <label>ФИО:</label>
                <input type="text" value={teacher.name} onChange={e => setTeacher({name: e.target.value})} />
                <button type="submit">Изменить имя</button>
            </form>

            <div style={{ marginTop: '40px' }}>
                <h3>Дисциплины преподавателя</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Дисциплина</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teacherLinks.map(link => (
                            <tr key={link.discipline_id}>
                                <td>{link.discipline?.name}</td>
                                <td>
                                    <button onClick={() => handleDeleteLink(link.discipline_id)} className="btn" style={{background: '#441a1a'}}>Удалить связь</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <form onSubmit={handleAddLink} style={{marginTop: '20px'}}>
                    <label>Назначить новую дисциплину:</label>
                    <select value={selectedDiscipline} onChange={e => setSelectedDiscipline(e.target.value)}>
                        <option value="">Выберите предмет...</option>
                        {allDisciplines.map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                    </select>
                    <button type="submit">Добавить дисциплину</button>
                </form>
            </div>

            <button onClick={handleDeleteTeacher} style={{ background: '#7a1a1a', marginTop: '50px', width: '100%' }}>Удалить преподавателя полностью</button>
        </div>
    );
}

export default TeacherData;