import React, { useState } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserDataService from "../services/user.service"; // Import API request service
import './Login.css'; // Import styles

function Login() {
    const [username, setUsername] = useState(''); // Store the username
    const [password, setPassword] = useState(''); // Store the password
    const [errorMessage, setErrorMessage] = useState(''); // Store error messages
    const [submitted, setSubmitted] = useState(false); // Track if form is successfully submitted
    const [showModal, setShowModal] = useState(false); // Control the modal visibility
    const { login } = useAuth(); // Get the login function from AuthContext
    const navigate = useNavigate(); // Used for page redirection

    // Handle form submission
    const handleLogin = (e) => {
        e.preventDefault();

        // Validate if username and password fields are empty
        if (!username || !password) {
            setErrorMessage("Both fields are required!");
            return;
        }

        // Send login request
        UserDataService.login(username, password)
            .then(response => {
                console.log("Login successful:", response.data);
                setSubmitted(true);
                setErrorMessage("");

                // Extract role, username, and token from response
                const { role, username, token } = response.data;

                // Save user state using the login function from AuthContext
                login({ username, token });

                // Show success modal
                setShowModal(true);

                // Depending on the role, navigate to the corresponding dashboard
                if (role === 'student') {
                    navigate('/student-dashboard');
                } else if (role === 'teacher') {
                    navigate('/teacher-dashboard');
                } else {
                    setErrorMessage("Invalid role, please contact support.");
                }
            })
            .catch(e => {
                console.error("Login error:", e.response?.data || e.message);
                setErrorMessage(e.response?.data || "Login failed, please try again later.");
            });
    };

    // Close the modal
    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <div className="login-wrapper">
            <div className="login-form-container">
                {submitted ? (
                    <div>
                        <h4 className="login-title">You have logged in successfully!</h4>
                    </div>
                ) : (
                    <Form onSubmit={handleLogin} className="login-form">
                        {errorMessage && (
                            <Alert variant="danger" className="login-alert">
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
                                Username is required
                            </Form.Control.Feedback>
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
                                Password is required
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="login-button w-100">
                            Login
                        </Button>
                    </Form>
                )}

                {/* Modal to show login success */}
                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login Successful</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Display the personalized welcome message */}
                        Welcome, {username}!
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

export default Login;
