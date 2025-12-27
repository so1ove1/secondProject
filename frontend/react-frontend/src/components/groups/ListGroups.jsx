import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from "../../../config/axios";

function ListGroups() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        http.get("/listStudentGroups")
            .then(res => {
                setGroups(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="container">
            <h1>Студенческие группы</h1>
            <Link to="/addGroup" className="btn">Создать новую группу</Link>
            <table>
                <thead>
                    <tr>
                        <th>Наименование группы</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map(g => (
                        <tr key={g.id}>
                            <td>{g.name}</td>
                            <td>
                                <Link to={`/studentGroup/${g.id}`}>Редактировать</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListGroups;