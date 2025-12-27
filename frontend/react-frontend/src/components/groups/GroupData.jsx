import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import http from "../../../config/axios";

function GroupData() {
    const { id } = useParams();
    const [group, setGroup] = useState({ name: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        http.get(`/studentGroup/${id}`).then(res => {
            setGroup({ name: res.data.name });
        });
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        http.post(`/updateStudentGroup/${id}`, group)
            .then(() => setSubmitted(true))
            .catch(err => console.log(err));
    };

    const handleDelete = () => {
        http.post(`/deleteStudentGroup/${id}`)
            .then(() => setSubmitted(true))
            .catch(err => alert("Ошибка при удалении. Возможно, в группе есть студенты."));
    };

    if (submitted) return <Navigate to="/listStudentGroups" />;

    return (
        <div className="container">
            <h2>Редактировать группу</h2>
            <form onSubmit={handleUpdate}>
                <label>Название группы:</label>
                <input 
                    type="text" 
                    value={group.name} 
                    onChange={e => setGroup({ name: e.target.value })} 
                    required 
                />
                <button type="submit">Сохранить изменения</button>
            </form>
            <button onClick={handleDelete} style={{ background: '#441a1a', marginTop: '10px' }}>Удалить группу</button>
        </div>
    );
}

export default GroupData;