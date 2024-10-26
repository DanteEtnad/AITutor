import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // 引入样式文件

function Home() {
    const navigate = useNavigate();

    // 跳转到登录页面
    const handleLoginClick = () => {
        navigate('/login');
    };

    // 跳转到注册页面
    const handleRegisterClick = () => {
        navigate('/register');
    };

    // 跳转到课程预览页面
    const handleCoursePreviewClick = () => {
        navigate('/course-preview');
    };

    return (
        <Container className="home-container">
            <div className="home-content">
                <h1>Welcome to AI Tutor</h1>
                <p>
                    AI Tutor provides students with advanced learning simulations and assessments supported by AI technology. Teachers can create scenario-based simulations and evaluate student performance effectively.
                </p>

                {/* 快捷入口按钮 */}
                <div className="home-buttons">
                    <Button variant="primary" onClick={handleLoginClick} className="home-button">
                        Login
                    </Button>
                    <Button variant="success" onClick={handleRegisterClick} className="home-button">
                        Register
                    </Button>
                </div>

                {/* 平台特色 */}
                <h2>Platform Features</h2>
                <Row className="features-section">
                    <Col md={4}>
                        <Card className="feature-card">
                            <Card.Body>
                                <Card.Title>AI Learning Assistant</Card.Title>
                                <Card.Text>
                                    Receive personalized learning assistance powered by AI, enhancing your educational experience.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="feature-card">
                            <Card.Body>
                                <Card.Title>Scenario Simulations</Card.Title>
                                <Card.Text>
                                    Engage in scenario-based simulations designed to improve your practical skills.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="feature-card">
                            <Card.Body>
                                <Card.Title>Performance Assessments</Card.Title>
                                <Card.Text>
                                    Teachers can create detailed assessments to evaluate student progress and provide feedback.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* 课程预览 */}
                <h2>Course Previews</h2>
                <p>
                    Explore some of our publicly available courses before signing up. These courses give you a glimpse into what AI Tutor has to offer.
                </p>
                <Button variant="info" onClick={handleCoursePreviewClick} className="home-button">
                    Explore Courses
                </Button>
            </div>
        </Container>
    );
}

export default Home;
