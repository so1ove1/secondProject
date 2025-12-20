import React, { useState } from 'react';
import http from "../../../http-common";
import { Navigate } from 'react-router-dom';

function AddDiscipline() {
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        http.post("/addDiscipline", { name: name })
            .then(() => {
                setSubmitted(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    if (submitted) return <Navigate to="/listDisciplines" />;

    return (
        <div className="container">
            <h2>Новая дисциплина</h2>
            <form onSubmit={handleSubmit}>
                <label>Наименование предмета:</label>
                <input
                    type="text"
                    value={name}
                    placeholder="Например: Высшая математика"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">Добавить в справочник</button>
            </form>
        </div>
    );
}

export default AddDiscipline;