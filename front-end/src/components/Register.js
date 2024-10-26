import React, { useState } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserDataService from "../services/user.service"; // Import API request service
import './Register.css'; // Import styles

function Register() {
    const [username, setUsername] = useState(''); // Store the username
    const [email, setEmail] = useState(''); // Store the email
    const [password, setPassword] = useState(''); // Store the password
    const [role, setRole] = useState('student'); // Store the role, default is "student"
    const [errorMessage, setErrorMessage] = useState(''); // Store error message
    const [submitted, setSubmitted] = useState(false); // Track if form is successfully submitted
    const [showModal, setShowModal] = useState(false); // Control modal visibility
    const navigate = useNavigate(); // Used for page redirection

    // Handle form submission
    const handleRegister = (e) => {
        e.preventDefault();

        // Validate if fields are empty
        if (!username || !email || !password || !role) {
            setErrorMessage("All fields are required!");
            return;
        }

        // Prepare the user data to be sent
        const userData = {
            username,
            email,
            password,
            role,
        };

        UserDataService.create(userData) // Use UserDataService.create
            .then(response => {
                console.log("Registration successful:", response.data);
                setSubmitted(true);
                setErrorMessage("");

                // Show success modal
                setShowModal(true);
            })
            .catch(e => {
                console.error("Registration error:", e.response?.data || e.message);
                setErrorMessage(e.response?.data || "Registration failed, please try again later.");
            });
    };

    // Close the modal and redirect to the login page
    const handleModalClose = () => {
        setShowModal(false);
        navigate('/login');
    };

    return (
        <div className="register-wrapper">
            <div className="register-form-container">
                {submitted ? (
                    <div>
                        <h4 className="register-title">Registration successful!</h4>
                    </div>
                ) : (
                    <Form onSubmit={handleRegister} className="register-form">
                        {errorMessage && (
                            <Alert variant="danger" className="register-alert">
                                {errorMessage}
                            </Alert>
                        )}

                        <Form.Group controlId="formBasicUsername" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                isInvalid={!!errorMessage && !username}
                            />
                            <Form.Control.Feedback type="invalid">
                                Username is required.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            {/* Email field: type="text" prevents automatic email validation */}
                            <Form.Control
                                type="text" // Change input type from "email" to "text" to disable built-in validation
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isInvalid={!!errorMessage && !password}
                            />
                            <Form.Control.Feedback type="invalid">
                                Password is required.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicRole" className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                isInvalid={!!errorMessage && !role}
                            >
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please select a role.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="success" type="submit" className="register-button w-100">
                            Register
                        </Button>
                    </Form>
                )}

                {/* Modal to show registration success */}
                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registration Successful</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Your account has been created successfully!
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

export default Register;
