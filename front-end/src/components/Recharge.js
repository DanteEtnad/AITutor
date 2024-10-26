import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserDataService from "../services/user.service"; // Import API request service
import './Recharge.css'; // Import styles

function Recharge() {
    const { user } = useAuth(); // Get current user from AuthContext
    const [amount, setAmount] = useState(''); // Store the amount to recharge
    const [errorMessage, setErrorMessage] = useState(''); // Store error messages
    const [submitted, setSubmitted] = useState(false); // Track if form is successfully submitted
    const [showModal, setShowModal] = useState(false); // Control the modal visibility
    const [userId, setUserId] = useState(null); // State to hold userId

    const navigate = useNavigate(); // Used for page redirection

    // Use effect to fetch user info and get userId
    useEffect(() => {
        if (user && user.username) {
            UserDataService.getUserInfo(user.username)
                .then(response => {
                    setUserId(response.data.userId); // Save userId from response
                })
                .catch(e => {
                    setErrorMessage('Error fetching user info: ' + e.message);
                });
        }
    }, [user]);

    // Handle form submission
    const handleRecharge = (e) => {
        e.preventDefault();

        // Validate if amount field is empty
        if (!amount) {
            setErrorMessage("Amount is required!");
            return;
        }

        // Check if userId is valid
        if (!userId) {
            setErrorMessage("User ID is not available. Please try again later.");
            return;
        }

        // Send recharge request
        UserDataService.recharge(userId, amount)
            .then(response => {
                console.log("Recharge successful:", response.data);
                setSubmitted(true);
                setErrorMessage("");
                setShowModal(true);
            })
            .catch(e => {
                console.error("Recharge error:", e.response?.data || e.message);
                setErrorMessage(e.response?.data || "Recharge failed, please try again later.");
            });
    };

    // Close the modal
    const handleModalClose = () => {
        setShowModal(false);
        navigate('/student-dashboard'); // Navigate to student dashboard
    };

    // Handle navigate back to student-dashboard
    const handleBackToDashboard = () => {
        navigate('/student-dashboard');
    };

    return (
        <div className="recharge-wrapper">
            <div className="recharge-form-container">
                {submitted ? (
                    <div>
                        <h4 className="recharge-title">Recharge successful!</h4>
                    </div>
                ) : (
                    <Form onSubmit={handleRecharge} className="recharge-form">
                        {errorMessage && (
                            <Alert variant="danger" className="recharge-alert">
                                {errorMessage}
                            </Alert>
                        )}

                        <Form.Group controlId="formBasicAmount" className="mb-3">
                            <Form.Label>Recharge Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                isInvalid={!!errorMessage && !amount}
                            />
                            <Form.Control.Feedback type="invalid">
                                Amount is required
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="recharge-button w-100 mb-2">
                            Recharge
                        </Button>

                        {/* Back to Dashboard Button */}
                        <Button variant="secondary" onClick={handleBackToDashboard} className="w-100">
                            Back to Student Dashboard
                        </Button>
                    </Form>
                )}

                {/* Modal to show recharge success */}
                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Recharge Successful</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You have successfully recharged ${amount}!
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

export default Recharge;
