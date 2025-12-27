import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from "../../../config/axios";

function ListDisciplines() {
    const [disciplines, setDisciplines] = useState([]);

    useEffect(() => {
        http.get("/listDisciplines")
            .then(response => {
                setDisciplines(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    return (
        <div className="container">
            <h1>Учебные дисциплины</h1>
            <Link to="/addDiscipline" className="btn">Добавить дисциплину</Link>
            <table>
                <thead>
                    <tr>
                        <th>Наименование дисциплины</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {disciplines.length > 0 ? (
                        disciplines.map((d) => (
                            <tr key={d.id}>
                                <td>{d.name}</td>
                                <td>
                                    <Link to={`/discipline/${d.id}`}>Редактировать</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{textAlign: 'center'}}>Дисциплины не найдены</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListDisciplines;