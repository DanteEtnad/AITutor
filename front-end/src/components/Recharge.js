import React, { useState } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserDataService from '../services/user.service';
import './Recharge.css'; // 引入 CSS 样式

function Recharge() {
    const [amount, setAmount] = useState(''); // 保存充值金额
    const [paymentMethod, setPaymentMethod] = useState('credit_card'); // 默认支付方式
    const [errorMessage, setErrorMessage] = useState(''); // 错误信息
    const [showModal, setShowModal] = useState(false); // 控制弹窗显示
    const [submitted, setSubmitted] = useState(false); // 表单提交状态
    const navigate = useNavigate(); // 跳转导航

    // 处理充值提交
    const handleRecharge = (e) => {
        e.preventDefault();

        // 验证充值金额
        if (!amount || isNaN(amount) || amount <= 0) {
            setErrorMessage("Please enter a valid amount!");
            return;
        }

        // 假设 userId 是从用户上下文中获取
        const userId = 1; // 替换为真实的 userId

        // 调用充值 API
        UserDataService.recharge(userId, amount)
            .then(() => {
                setSubmitted(true);
                setErrorMessage("");
                setShowModal(true);
            })
            .catch(e => {
                setErrorMessage('Recharge failed: ' + e.message);
            });
    };

    // 关闭弹窗并跳转回用户仪表盘
    const handleModalClose = () => {
        setShowModal(false);
        navigate('/student-dashboard'); // 跳转回用户仪表盘
    };

    return (
        <div className="recharge-wrapper">
            <h2 className="recharge-title">Account Recharge</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleRecharge} className="recharge-form">
                <Form.Group controlId="formAmount" className="mb-3">
                    <Form.Label>Recharge Amount</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formPaymentMethod" className="mb-3">
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Control
                        as="select"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="credit_card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bank_transfer">Bank Transfer</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="success" type="submit" className="w-100">
                    Recharge Now
                </Button>
            </Form>

            {/* 提交成功后显示弹窗 */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Recharge Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your account has been recharged successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleModalClose}>
                        Back to Dashboard
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Recharge;
