import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CoursePreview from './components/CoursePreview';
import StudentDashboard from './components/StudentDashboard'; // Import StudentDashboard
import TeacherDashboard from './components/TeacherDashboard'; // Import TeacherDashboard
import Profile from './components/Profile';
import Recharge from './components/Recharge';
import CourseList from './components/CourseList';
import StudyHistory from './components/StudyHistory';
import UploadCourse from './components/UploadCourse';
import Finance from './components/Finance';
import MyCourses from './components/MyCourse';
import TakeCourse from './components/TakeCourse';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/course-preview" element={<CoursePreview />} />
                    <Route path="/student-dashboard" element={<StudentDashboard />} /> {/* Student Dashboard */}
                    <Route path="/teacher-dashboard" element={<TeacherDashboard />} /> {/* Teacher Dashboard */}
                    <Route path="/finance" element={<Finance />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/upload-course" element={<UploadCourse />} />
                    <Route path="/recharge" element={<Recharge />} />
                    <Route path="/course-list" element={<CourseList />} />
                    <Route path="/study-history" element={<StudyHistory />} />
                    <Route path="/my-courses" element={<MyCourses />} />
                    <Route path="take-course" element={<TakeCourse />} />
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
