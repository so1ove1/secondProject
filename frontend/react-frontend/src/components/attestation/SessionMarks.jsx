import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import http from "../../../http-common";

function SessionMarks() {
    const { id } = useParams();
    const [marks, setMarks] = useState([]);
    const [students, setStudents] = useState([]);
    const [session, setSession] = useState(null);
    const [newMark, setNewMark] = useState({ student_id: '', mark: '', theme: '' });

    useEffect(() => {
        http.get(`/session/${id}`).then(res => {
            setSession(res.data);
            return http.get(`/studentsByStudentGroup/studentGroupId=${res.data.student_group_id}`);
        }).then(res => setStudents(res.data[0].students));

        http.get(`/marks/session/${id}`).then(res => setMarks(res.data));
    }, [id]);

    const handleAddMark = (e) => {
        e.preventDefault();
        http.post("/addMark", { ...newMark, student_group_session_id: id })
            .then(() => window.location.reload());
    };

    return (
        <div className="container">
            <h2>Ведомость: {session?.student_group?.name}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Студент</th>
                        <th>Оценка</th>
                        <th>Тема</th>
                    </tr>
                </thead>
                <tbody>
                    {marks.map(m => (
                        <tr key={m.id}>
                            <td>{m.student?.name}</td>
                            <td>{m.mark}</td>
                            <td>{m.theme}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <form onSubmit={handleAddMark} style={{marginTop: '30px'}}>
                <h3>Выставить оценку</h3>
                <select onChange={e => setNewMark({...newMark, student_id: e.target.value})}>
                    <option value="">Выберите студента</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <input type="number" placeholder="Оценка" onChange={e => setNewMark({...newMark, mark: e.target.value})} />
                <input type="text" placeholder="Тема" onChange={e => setNewMark({...newMark, theme: e.target.value})} />
                <button type="submit">Сохранить</button>
            </form>
        </div>
    );
}

export default SessionMarks;