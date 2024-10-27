import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import UserDataService from '../services/course.service';
import { Table, Alert, Container, Button } from 'react-bootstrap';
import './MyCourse.css';
import { useNavigate } from 'react-router-dom';

function MyCourses() {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState(null);
    const [courses, setCourses] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const navigate = useNavigate();

    // Fetch user info using username
    useEffect(() => {
        if (user && user.username) {
            UserDataService.getUserInfo(user.username)
                .then(response => {
                    setUserInfo(response.data);
                    console.log("User Info fetched:", response.data);
                })
                .catch(e => {
                    setErrorMessage('Error fetching user info: ' + e.message);
                });
        }
    }, [user]);

    // Fetch courses using userId
    useEffect(() => {
        if (userInfo && userInfo.userId) {
            UserDataService.getCoursesByTeacherId(userInfo.userId)
                .then(response => {
                    setCourses(response.data);
                    setIsLoading(false); // Stop loading once data is fetched
                    console.log("Courses fetched:", response.data);
                })
                .catch(e => {
                    setErrorMessage('Error fetching courses: ' + e.message);
                    setIsLoading(false); // Stop loading on error
                });
        } else {
            setIsLoading(false); // Stop loading if userInfo is not available
        }
    }, [userInfo]);

    const handleGoToDashboard = () => {
        navigate('/teacher-dashboard');
    };

    return (
        <Container className="courses-wrapper">
            <h2 className="courses-title">My Uploaded Courses</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            {/* Button to go back to Teacher Dashboard */}
            <Button variant="secondary" onClick={handleGoToDashboard} className="mb-3">
                Back to Teacher Dashboard
            </Button>

            {isLoading ? (
                <div>Loading courses...</div>
            ) : courses.length > 0 ? (
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
                        <tr key={course.courseId}>
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
