import React, { useState } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CourseDataService from "../services/course.service"; // Import API request service
import './UploadCourse.css'; // Import styles

function UploadCourse() {
    const [title, setTitle] = useState(''); // Store the course title
    const [content, setContent] = useState(''); // Store the course content
    const [level, setLevel] = useState(''); // Store the course level
    const [price, setPrice] = useState(''); // Store the course price
    const [errorMessage, setErrorMessage] = useState(''); // Store error messages
    const [submitted, setSubmitted] = useState(false); // Track if form is successfully submitted
    const [showModal, setShowModal] = useState(false); // Control the modal visibility
    const navigate = useNavigate(); // Used for page redirection

    // Handle form submission
    const handleUpload = (e) => {
        e.preventDefault();

        // Validate if the fields are empty
        if (!title || !content || !level || !price) {
            setErrorMessage("All fields are required!");
            return;
        }

        // Send upload request
        const courseData = {
            title: title,
            content: content,
            level: level,
            price: parseFloat(price), // Ensure price is a number
        };

        CourseDataService.uploadCourse(courseData, 15) // Pass course data and teacherId
            .then(response => {
                console.log("Course uploaded successfully:", response.data);
                setSubmitted(true);
                setErrorMessage("");
                // Show success modal
                setShowModal(true);
            })
            .catch(e => {
                console.error("Upload error:", e.response?.data || e.message);
                setErrorMessage(e.response?.data || "Upload failed, please try again later.");
            });
    };

    // Close the modal
    const handleModalClose = () => {
        setShowModal(false);
        // Optionally redirect after closing the modal
        navigate('/teacher-dashboard'); // Redirect to courses page after success
    };

    const handleGoToDashboard = () => {
        navigate('/teacher-dashboard');
    };

    return (
        <div className="upload-wrapper">
            <div className="upload-form-container">
                {submitted ? (
                    <div>
                        <h4 className="upload-title">Course uploaded successfully!</h4>
                    </div>
                ) : (
                    <Form onSubmit={handleUpload} className="upload-form">
                        {errorMessage && (
                            <Alert variant="danger" className="upload-alert">
                                {errorMessage}
                            </Alert>
                        )}

                        <Form.Group controlId="formCourseTitle" className="mb-3">
                            <Form.Label>Course Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter course title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                isInvalid={!!errorMessage && !title}
                            />
                            <Form.Control.Feedback type="invalid">
                                Course title is required
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formCourseContent" className="mb-3">
                            <Form.Label>Course Content</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter course content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                isInvalid={!!errorMessage && !content}
                            />
                            <Form.Control.Feedback type="invalid">
                                Course content is required
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formCourseLevel" className="mb-3">
                            <Form.Label>Course Level</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter course level (e.g., Beginner)"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                isInvalid={!!errorMessage && !level}
                            />
                            <Form.Control.Feedback type="invalid">
                                Course level is required
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formCoursePrice" className="mb-3">
                            <Form.Label>Course Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter course price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                isInvalid={!!errorMessage && !price}
                            />
                            <Form.Control.Feedback type="invalid">
                                Course price is required
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="upload-button w-100">
                            Upload Course
                        </Button>
                    </Form>
                )}
                <Button
                    variant="secondary"
                    className="mt-3"
                    onClick={handleGoToDashboard}
                >
                    Back to Teacher Dashboard
                </Button>

                {/* Modal to show upload success */}
                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Course Uploaded</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Your course has been successfully uploaded!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleModalClose}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default UploadCourse;
