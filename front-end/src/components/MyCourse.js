import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // 获取用户上下文
import UserDataService from '../services/user.service'; // 导入 UserDataService
import { Table, Alert, Container, Button } from 'react-bootstrap';
import './MyCourse.css'; // 引入样式
import { useNavigate } from 'react-router-dom';

function MyCourses() {
    const { user } = useAuth(); // 从 AuthContext 中获取当前登录用户信息
    const [userInfo, setUserInfo] = useState(null); // 存储用户信息，包括 userId
    const [courses, setCourses] = useState([]); // 存储课程列表
    const [errorMessage, setErrorMessage] = useState(''); // 存储错误信息
    const navigate = useNavigate();

    // 第一个 useEffect，使用 username 获取 userId
    useEffect(() => {
        if (user && user.username) {
            UserDataService.getUserInfo(user.username)
                .then(response => {
                    setUserInfo(response.data); // 保存用户信息到 state 中，包括 userId
                    console.log("User Info fetched:", response.data); // 调试输出用户信息
                })
                .catch(e => {
                    setErrorMessage('Error fetching user info: ' + e.message);
                });
        }
    }, [user]);

    // 第二个 useEffect，使用 userId 获取教师上传的课程列表
    useEffect(() => {
        if (userInfo && userInfo.userId) {
            UserDataService.getCoursesByTeacherId(userInfo.userId)
                .then(response => {
                    setCourses(response.data); // 保存课程数据到 state 中
                    console.log("Courses fetched:", response.data); // 调试输出课程信息
                })
                .catch(e => {
                    setErrorMessage('Error fetching courses: ' + e.message);
                });
        }
    }, [userInfo]);
    const handleGoToDashboard = () => {
        navigate('/teacher-dashboard');
    };
    // 如果没有课程则显示提示
    if (!courses.length && !errorMessage) {
        return <div>Loading courses...</div>;
    }

    return (
        <Container className="courses-wrapper">
            <h2 className="courses-title">My Uploaded Courses</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {/* Button to go back to Teacher Dashboard */}
            <Button variant="secondary" onClick={handleGoToDashboard} className="mb-3">
                Back to Teacher Dashboard
            </Button>

            {courses.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Level</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses.map((course, index) => (
                        <tr key={course.id}>
                            <td>{index + 1}</td>
                            <td>{course.title}</td>
                            <td>{course.content}</td>
                            <td>{course.level}</td>
                            <td>${course.price}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            ) : (
                <p className="text-center">No courses uploaded.</p>
            )}
        </Container>
    );
}

export default MyCourses;
