import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from "../../../http-common";

function ListStudents() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        http.get("/listStudents").then(res => setStudents(res.data));
    }, []);

    return (
        <div>
            <h2>Список студентов</h2>
            <Link to="/addStudent">Добавить студента</Link>
            <table>
                <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Группа</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(s => (
                        <tr key={s.id}>
                            <td>{s.name}</td>
                            <td>{s.student_group?.name}</td>
                            <td><Link to={`/student/${s.id}`}>Редактировать</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListStudents;