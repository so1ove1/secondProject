import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import http from "../../../http-common";

function AttestationData() {
    const { id } = useParams();
    const [attestation, setAttestation] = useState({ mark: '', theme: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        http.get(`/attestation/${id}`).then(res => {
            setAttestation(res.data);
        });
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        http.post(`/updateAttestation/${id}`, attestation)
            .then(() => setSubmitted(true));
    };

    const handleDelete = () => {
        http.post(`/deleteAttestation/${id}`)
            .then(() => setSubmitted(true));
    };

    if (submitted) return <Navigate to="/attestations" />;

    return (
        <div className="container">
            <h2>Редактировать оценку</h2>
            <form onSubmit={handleUpdate}>
                <label>Оценка:</label>
                <input 
                    type="number" 
                    value={attestation.mark} 
                    onChange={e => setAttestation({...attestation, mark: e.target.value})} 
                />
                <label>Тема:</label>
                <input 
                    type="text" 
                    value={attestation.theme} 
                    onChange={e => setAttestation({...attestation, theme: e.target.value})} 
                />
                <button type="submit">Обновить</button>
            </form>
            <button onClick={handleDelete} style={{background: '#441a1a', marginTop: '10px'}}>Удалить запись</button>
        </div>
    );
}

export default AttestationData;