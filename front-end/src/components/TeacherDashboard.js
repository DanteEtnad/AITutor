import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import './TeacherDashboard.css'; // 引入CSS文件

function TeacherDashboard() {
    return (
        <div className="teacher-dashboard-wrapper">
            <Container>
                <h1 className="dashboard-title">Teacher Dashboard</h1>

                <Row className="mb-4">
                    {/* Overview Cards */}
                    <Col md={3}>
                        <Card className="dashboard-card">
                            <Card.Body>
                                <Card.Title>Courses</Card.Title>
                                <Card.Text>Manage all your courses</Card.Text>
                                <Button variant="primary" href="/manage-courses">Manage Courses</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="dashboard-card">
                            <Card.Body>
                                <Card.Title>Students</Card.Title>
                                <Card.Text>View and manage students</Card.Text>
                                <Button variant="primary" href="/manage-students">Manage Students</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="dashboard-card">
                            <Card.Body>
                                <Card.Title>Assessments</Card.Title>
                                <Card.Text>Create or review assessments</Card.Text>
                                <Button variant="primary" href="/manage-assessments">Manage Assessments</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="dashboard-card">
                            <Card.Body>
                                <Card.Title>Finance</Card.Title>
                                <Card.Text>View balance and transactions</Card.Text>
                                <Button variant="primary" href="/finance">Manage Finance</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-4">
                    {/* Additional Actions */}
                    <Col md={4}>
                        <Card className="dashboard-card">
                            <Card.Body>
                                <Card.Title>Send Notifications</Card.Title>
                                <Card.Text>Send important notifications to students</Card.Text>
                                <Button variant="secondary" href="/notifications">Manage Notifications</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="dashboard-card">
                            <Card.Body>
                                <Card.Title>Profile</Card.Title>
                                <Card.Text>View or update your profile</Card.Text>
                                <Button variant="secondary" href="/profile">Manage Profile</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="dashboard-card">
                            <Card.Body>
                                <Card.Title>Analytics</Card.Title>
                                <Card.Text>Review student performance and course analytics</Card.Text>
                                <Button variant="secondary" href="/analytics">View Analytics</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default TeacherDashboard;
