import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import UserDataService from '../services/user.service'; // 引入 UserDataService
import './Profile.css'; // 引入 CSS 样式

function Profile() {
    const { user } = useAuth(); // 从 AuthContext 中获取当前登录用户信息
    const [userInfo, setUserInfo] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // 使用 useEffect 在组件加载时获取用户信息
    useEffect(() => {
        if (user && user.username) {
            UserDataService.getUserInfo(user.username)
                .then(response => {
                    setUserInfo(response.data); // 保存用户信息到 state 中
                })
                .catch(e => {
                    setErrorMessage('Error fetching user info: ' + e.message);
                });
        }
    }, [user]);

    // 如果没有用户信息则显示加载状态
    if (!userInfo) {
        return <div>Loading user information...</div>;
    }

    return (
        <div className="profile-wrapper">
            <h2 className="profile-title">User Profile</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="profile-info">
                <div className="profile-item">
                    <strong>ID: </strong>
                    <span>{userInfo.userId}</span> {/* 显示 user_id */}
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
        </div>
    );
}

export default Profile;
