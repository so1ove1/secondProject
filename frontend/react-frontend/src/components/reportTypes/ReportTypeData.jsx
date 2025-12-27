import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import http from "../../../config/axios";

function ReportTypeData() {
    const { id } = useParams();
    const [type, setType] = useState({ name: "" });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        http.get(`/reportType/${id}`).then(res => setType({ name: res.data.name }));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        http.post(`/updateReportType/${id}`, type).then(() => setSubmitted(true));
    };

    const handleDelete = () => {
        http.post(`/deleteReportType/${id}`).then(() => setSubmitted(true));
    };

    if (submitted) return <Navigate to="/listReportTypes" />;

    return (
        <div className="container">
            <h2>Редактировать тип контроля</h2>
            <form onSubmit={handleUpdate}>
                <label>Наименование:</label>
                <input type="text" value={type.name} onChange={e => setType({ name: e.target.value })} required />
                <button type="submit">Обновить</button>
            </form>
            <button onClick={handleDelete} style={{ background: '#441a1a', marginTop: '10px' }}>Удалить</button>
        </div>
    );
}

export default ReportTypeData;