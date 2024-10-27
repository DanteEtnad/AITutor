import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import UserDataService from '../services/user.service';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        if (user && user.username) {
            UserDataService.getUserInfo(user.username)
                .then(response => {
                    setUserInfo(response.data);
                })
                .catch(e => {
                    setErrorMessage('Error fetching user info: ' + e.message);
                });
        }
    }, [user]);


    if (!userInfo) {
        return <div>Loading user information...</div>;
    }


    const handleBackToDashboard = () => {
        if (userInfo.role === 'student') {
            navigate('/student-dashboard');
        } else if (userInfo.role === 'teacher') {
            navigate('/teacher-dashboard');
        }
    };

    return (
        <div className="profile-wrapper">
            <h2 className="profile-title">User Profile</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="profile-info">
                <div className="profile-item">
                    <strong>ID: </strong>
                    <span>{userInfo.userId}</span>
                </div>
                <div className="profile-item">
                    <strong>Username: </strong>
                    <span>{userInfo.username}</span>
                </div>
                <div className="profile-item">
                    <strong>Email: </strong>
                    <span>{userInfo.email}</span>
                </div>
                <div className="profile-item">
                    <strong>Role: </strong>
                    <span>{userInfo.role}</span>
                </div>
                <div className="profile-item">
                    <strong>Balance: </strong>
                    <span>{userInfo.balance}</span>
                </div>
            </div>


            <Button variant="secondary" onClick={handleBackToDashboard} className="mt-4">
                Back to Dashboard
            </Button>
        </div>
    );
}

export default Profile;
