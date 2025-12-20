import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from "../../../http-common";

function ListSessions() {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        http.get("/sessions")
            .then(res => setSessions(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="container">
            <h1>Учебные сессии</h1>
            <Link to="/addSession" className="btn">Создать сессию</Link>
            <table>
                <thead>
                    <tr>
                        <th>Группа</th>
                        <th>Дисциплина</th>
                        <th>Преподаватель</th>
                        <th>Тип</th>
                        <th>Дата</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map(s => (
                        <tr key={s.id}>
                            <td>{s.student_group?.name}</td>
                            <td>{s.teacher_discipline?.discipline?.name}</td>
                            <td>{s.teacher_discipline?.teacher?.name}</td>
                            <td>{s.report_type?.name}</td>
                            <td>{s.mark_date}</td>
                            <td>
                                <Link to={`/session/${s.id}`}>Редактировать</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListSessions;