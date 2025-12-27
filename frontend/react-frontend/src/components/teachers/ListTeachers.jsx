import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from "../../../config/axios";

function ListTeachers() {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        http.get("/listTeachers")
            .then(res => {
                setTeachers(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="container">
            <h1>Преподавательский состав</h1>
            <Link to="/addTeacher" className="btn">Добавить преподавателя</Link>
            <table>
                <thead>
                    <tr>
                        <th>ФИО Преподавателя</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(t => (
                        <tr key={t.id}>
                            <td>{t.name}</td>
                            <td>
                                <Link to={`/teacher/${t.id}`}>Редактировать и/или назначить дисциплины</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListTeachers;