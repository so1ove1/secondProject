import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './layout/Header'
import Protected from "./components/auth/ProtectedRoute.jsx";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";

import ListDisciplines from './components/discipline/ListDisciplines';
import AddDiscipline from './components/discipline/AddDiscipline.jsx';
import DisciplineData from "./components/discipline/DisciplineData.jsx";

import ListStudents from './components/students/ListStudents';
import AddStudent from './components/students/AddStudent';

import ListSessions from './components/sessions/ListSessions';
import AddSession from './components/sessions/AddSession';

const App = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                
                <Route path='/listDisciplines' element={<Protected><ListDisciplines/></Protected>}/>
                <Route path='/addDiscipline' element={<Protected><AddDiscipline/></Protected>}/>
                <Route path='/discipline/:id' element={<Protected><DisciplineData/></Protected>}/>

                <Route path='/listStudents' element={<Protected><ListStudents/></Protected>}/>
                <Route path='/addStudent' element={<Protected><AddStudent/></Protected>}/>

                <Route path='/sessions' element={<Protected><ListSessions/></Protected>}/>
                <Route path='/addSession' element={<Protected><AddSession/></Protected>}/>

                <Route path='/' element={<Protected><ListSessions/></Protected>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;