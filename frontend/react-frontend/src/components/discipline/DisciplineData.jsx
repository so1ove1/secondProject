import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import http from "../../../http-common";

function DisciplineData() {
    const { id } = useParams();
    const [discipline, setDiscipline] = useState({ name: "" });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        http.get("/discipline/" + id)
            .then(response => {
                setDiscipline({ name: response.data.name });
            })
            .catch(e => console.log(e));
    }, [id]);

    const handleUpdate = (event) => {
        event.preventDefault();
        http.post("/updateDiscipline/" + id, { name: discipline.name })
            .then(() => {
                setSubmitted(true);
            })
            .catch(e => console.log(e));
    };

    const handleDelete = () => {
        http.post("/deleteDiscipline/" + id)
            .then(() => {
                setSubmitted(true);
            })
            .catch(e => alert("Ошибка! Возможно, дисциплина используется в сессиях."));
    };

    if (submitted) return <Navigate to="/listDisciplines" />;

    return (
        <div className="container">
            <h2>Редактировать дисциплину</h2>
            <form onSubmit={handleUpdate}>
                <label>Название дисциплины:</label>
                <input 
                    type="text" 
                    value={discipline.name} 
                    onChange={(e) => setDiscipline({ name: e.target.value })} 
                    required 
                />
                <button type="submit">Сохранить изменения</button>
            </form>
            <button 
                onClick={handleDelete} 
                style={{ background: '#441a1a', marginTop: '10px' }}
            >
                Удалить дисциплину
            </button>
        </div>
    );
}

export default DisciplineData;