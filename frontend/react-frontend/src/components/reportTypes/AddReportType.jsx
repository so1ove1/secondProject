import React, { useState } from 'react';
import http from "../../../config/axios";
import { Navigate } from 'react-router-dom';

function AddReportType() {
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        http.post("/addReportType", { name: name })
            .then(() => setSubmitted(true));
    };

    if (submitted) return <Navigate to="/listReportTypes" />;

    return (
        <div className="container">
            <h2>Новый тип контроля</h2>
            <form onSubmit={handleSubmit}>
                <label>Название (экзамен, зачет и т.д.):</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                <button type="submit">Добавить</button>
            </form>
        </div>
    );
}

export default AddReportType;