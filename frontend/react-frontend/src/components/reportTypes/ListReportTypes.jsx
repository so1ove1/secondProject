import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from "../../../config/axios";

function ListReportTypes() {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        http.get("/reportTypes").then(res => setTypes(res.data));
    }, []);

    return (
        <div className="container">
            <h1>Типы контроля</h1>
            <Link to="/addReportType" className="btn">Добавить тип</Link>
            <table>
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {types.map(t => (
                        <tr key={t.id}>
                            <td>{t.name}</td>
                            <td>
                                <Link to={`/reportType/${t.id}`}>Изменить</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListReportTypes;