import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <nav>
            <Link to="/sessions">Учебные сессии</Link>
            <Link to="/attestations">Ведомость</Link>
            <Link to="/listStudents">Список студентов</Link>
            <Link to="/listStudentGroups">Студенческие группы</Link>
            <Link to="/listTeachers">Преподавательский состав</Link>
            <Link to="/listDisciplines">Учебные дисциплины</Link>
            <Link to="/listReportTypes">Типы контроля</Link>
            <button onClick={logout} style={{background: 'red', color: 'white', border: 'none', cursor: 'pointer'}}>Выйти</button>
        </nav>
    );
}
export default Header;