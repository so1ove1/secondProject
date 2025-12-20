import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <nav>
            <Link to="/sessions">Сессии</Link>
            <Link to="/attestations">Оценки</Link>
            <Link to="/listStudents">Студенты</Link>
            <Link to="/listStudentGroups">Группы</Link>
            <Link to="/listTeachers">Преподаватели</Link>
            <Link to="/listDisciplines">Дисциплины</Link>
            <Link to="/listReportTypes">Типы отчетов</Link>
            <button onClick={logout} style={{background: 'red', color: 'white', border: 'none', cursor: 'pointer'}}>Выйти</button>
        </nav>
    );
}
export default Header;