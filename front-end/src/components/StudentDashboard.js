import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 获取用户登录信息
import './StudentDashboard.css'; // 引入CSS文件

function StudentDashboard() {
    const { user, logout } = useAuth(); // 从 AuthContext 获取用户信息和登出功能
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]); // 用来存储课程数据的状态

    useEffect(() => {
        // 模拟获取课程数据
        const mockCourses = [
            { id: 1, title: 'Mathematics 101', description: 'Basic Mathematics for Beginners' },
            { id: 2, title: 'Physics 101', description: 'Introduction to Physics' },
            { id: 3, title: 'English Literature', description: 'Learn about Classic English Literature' },
        ];
        setCourses(mockCourses);
    }, []);

    // 处理退出登录逻辑
    const handleLogout = () => {
        logout(); // 调用 AuthContext 中的 logout 函数
        navigate('/'); // 退出登录后重定向到首页
    };

    // 跳转到相应页面的处理函数
    const navigateToProfile = () => navigate('/profile');
    const navigateToRecharge = () => navigate('/recharge');
    const navigateToCourses = () => navigate('/course-list');
    const navigateToHistory = () => navigate('/study-history');

    return (
        <Container className="dashboard-container">
            <div className="dashboard-header">
                <h1>Welcome, {user.username}!</h1>
                <p>Manage your profile and explore courses below:</p>
            </div>

            <Row className="dashboard-actions mb-4">
                <Col>
                    <Button variant="info" onClick={navigateToProfile} className="dashboard-btn">
                        View Profile
                    </Button>
                </Col>
                <Col>
                    <Button variant="success" onClick={navigateToRecharge} className="dashboard-btn">
                        Recharge
                    </Button>
                </Col>
                <Col>
                    <Button variant="primary" onClick={navigateToCourses} className="dashboard-btn">
                        Courses
                    </Button>
                </Col>
                <Col>
                    <Button variant="warning" onClick={navigateToHistory} className="dashboard-btn">
                        Study History
                    </Button>
                </Col>
            </Row>

            <div className="course-list">
                <h3>Your Courses</h3>
                {courses.length > 0 ? (
                    courses.map(course => (
                        <Card key={course.id} className="mb-3 course-card">
                            <Card.Body>
                                <Card.Title>{course.title}</Card.Title>
                                <Card.Text>{course.description}</Card.Text>
                                <Button variant="primary">Go to Course</Button>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No courses available at the moment.</p>
                )}
            </div>

            <div className="logout-button">
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </Container>
    );
}

export default StudentDashboard;
