import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserDataService from "../services/user.service";
import './Finance.css';

function Finance() {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState(null);
    const [balance, setBalance] = useState(0); // Store the current balance from response.data
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [finalWithdrawAmount, setFinalWithdrawAmount] = useState(null);

    // Fetch user info and balance
    useEffect(() => {
        if (user && user.username) {
            UserDataService.getUserInfo(user.username)
                .then(response => {
                    setUserInfo(response.data);
                    setBalance(response.data.balance); // Set balance from response.data
                })
                .catch(e => {
                    setErrorMessage('Error fetching user info: ' + e.message);
                });
        }
    }, [user]);

    const handleWithdraw = (e) => {
        e.preventDefault();

        if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
            setErrorMessage("Withdrawal amount must be greater than 0");
            return;
        }

        UserDataService.withdrawBalance(userInfo.userId, parseFloat(withdrawAmount))
            .then(response => {
                setBalance(balance - parseFloat(withdrawAmount));
                setWithdrawAmount('');
                setFinalWithdrawAmount(parseFloat(withdrawAmount));
                setErrorMessage('');
                setShowModal(true);
            })
            .catch(e => {
                console.error("Withdrawal error:", e.response?.data || e.message);
                setErrorMessage(e.response?.data || "Withdrawal failed, please try again later.");
            });
    };

    const handleModalClose = () => {
        setShowModal(false);
        navigate('/teacher-dashboard');
    };
    const handleGoToDashboard = () => {
        navigate('/teacher-dashboard');
    };
    return (
        <div className="finance-wrapper">
            <div className="finance-form-container">
                {errorMessage && (
                    <Alert variant="danger" className="finance-alert">
                        {errorMessage}
                    </Alert>
                )}

                <h4 className="finance-title">Current Balance: ${balance.toFixed(2)}</h4>

                <Form onSubmit={handleWithdraw} className="finance-form">
                    <Form.Group controlId="formWithdrawAmount" className="mb-3">
                        <Form.Label>Withdraw Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter amount to withdraw"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            isInvalid={!!errorMessage && !withdrawAmount}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid withdrawal amount.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="finance-button w-100">
                        Withdraw
                    </Button>
                </Form>
                <Button
                    variant="secondary"
                    className="mt-3"
                    onClick={handleGoToDashboard}
                >
                    Back to Teacher Dashboard
                </Button>

                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Withdrawal Successful</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You have successfully withdrawn ${finalWithdrawAmount}!
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

export default Finance;
