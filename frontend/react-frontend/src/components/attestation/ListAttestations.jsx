import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from "../../../http-common";

function ListAttestations() {
    const [attestations, setAttestations] = useState([]);

    useEffect(() => {
        http.get("/attestations")
            .then(res => {
                setAttestations(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className="container">
            <h1>Ведомость</h1>
            <Link to="/addAttestation" className="btn">Поставить новую оценку</Link>
            <table>
                <thead>
                    <tr>
                        <th>Студент</th>
                        <th>Группа</th>
                        <th>Дисциплина</th>
                        <th>Оценка</th>
                        <th>Тема</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {attestations.map(a => (
                        <tr key={a.id}>
                            <td>{a.student?.name}</td>
                            <td>{a.student?.student_group?.name}</td>
                            <td>{a.student_group_session?.teacher_discipline?.discipline?.name}</td>
                            <td><strong>{a.mark}</strong></td>
                            <td>{a.theme}</td>
                            <td>
                                <Link to={`/attestation/${a.id}`}>Изменить</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListAttestations;