import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from "../../../config/axios";

function ListStudents() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        http.get("/listStudents")
            .then(res => {
                setStudents(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="container">
            <h1>Список студентов</h1>
            <Link to="/addStudent" className="btn">Добавить нового студента</Link>
            <table>
                <thead>
                    <tr>
                        <th>ФИО студента</th>
                        <th>Группа</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(s => (
                        <tr key={s.id}>
                            <td>{s.name}</td>
                            <td>{s.student_group?.name || 'Без группы'}</td>
                            <td>
                                <Link to={`/student/${s.id}`}>Редактировать</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListStudents;