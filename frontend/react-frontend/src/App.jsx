import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './layout/Header';
import Protected from "./components/auth/ProtectedRoute.jsx";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";

import ListDisciplines from './components/discipline/ListDisciplines';
import AddDiscipline from './components/discipline/AddDiscipline.jsx';
import DisciplineData from "./components/discipline/DisciplineData.jsx";

import ListStudents from './components/students/ListStudents';
import AddStudent from './components/students/AddStudent';
import StudentData from './components/students/StudentData';

import ListGroups from './components/groups/ListGroups';
import AddGroup from './components/groups/AddGroup';
import GroupData from './components/groups/GroupData';

import ListTeachers from './components/teachers/ListTeachers';
import AddTeacher from './components/teachers/AddTeacher';
import TeacherData from './components/teachers/TeacherData';

import ListReportTypes from './components/reportTypes/ListReportTypes';
import AddReportType from './components/reportTypes/AddReportType';
import ReportTypeData from './components/reportTypes/ReportTypeData';

import ListSessions from './components/sessions/ListSessions';
import AddSession from './components/sessions/AddSession';
import SessionData from './components/sessions/SessionData';

import ListAttestations from './components/attestation/ListAttestations';
import AddAttestation from './components/attestation/AddAttestation';
import AttestationData from './components/attestation/AttestationData';

const App = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                
                <Route path='/attestations' element={<Protected><ListAttestations/></Protected>}/>
                <Route path='/addAttestation' element={<Protected><AddAttestation/></Protected>}/>
                <Route path='/attestation/:id' element={<Protected><AttestationData/></Protected>}/>

                <Route path='/sessions' element={<Protected><ListSessions/></Protected>}/>
                <Route path='/addSession' element={<Protected><AddSession/></Protected>}/>
                <Route path='/session/:id' element={<Protected><SessionData/></Protected>}/>

                <Route path='/listStudents' element={<Protected><ListStudents/></Protected>}/>
                <Route path='/addStudent' element={<Protected><AddStudent/></Protected>}/>
                <Route path='/student/:id' element={<Protected><StudentData/></Protected>}/>

                <Route path='/listStudentGroups' element={<Protected><ListGroups/></Protected>}/>
                <Route path='/addGroup' element={<Protected><AddGroup/></Protected>}/>
                <Route path='/studentGroup/:id' element={<Protected><GroupData/></Protected>}/>

                <Route path='/listTeachers' element={<Protected><ListTeachers/></Protected>}/>
                <Route path='/addTeacher' element={<Protected><AddTeacher/></Protected>}/>
                <Route path='/teacher/:id' element={<Protected><TeacherData/></Protected>}/>

                <Route path='/listDisciplines' element={<Protected><ListDisciplines/></Protected>}/>
                <Route path='/addDiscipline' element={<Protected><AddDiscipline/></Protected>}/>
                <Route path='/discipline/:id' element={<Protected><DisciplineData/></Protected>}/>

                <Route path='/listReportTypes' element={<Protected><ListReportTypes/></Protected>}/>
                <Route path='/addReportType' element={<Protected><AddReportType/></Protected>}/>
                <Route path='/reportType/:id' element={<Protected><ReportTypeData/></Protected>}/>

                <Route path='/' element={<Protected><ListAttestations/></Protected>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;