import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [courseInfo, setCourseInfoState] = useState(() => {
        const storedCourseInfo = localStorage.getItem('courseInfo');
        return storedCourseInfo ? JSON.parse(storedCourseInfo) : null;
    });

    // Function to log in and store user data
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Function to log out and clear user and course data
    const logout = () => {
        setUser(null);
        setCourseInfoState(null);
        localStorage.removeItem('user');
        localStorage.removeItem('courseInfo');
    };

    // Set course info and save it to local storage
    const setCourseInfo = (courseId, studentId) => {
        const newCourseInfo = { courseId, studentId };
        setCourseInfoState(newCourseInfo);
        localStorage.setItem('courseInfo', JSON.stringify(newCourseInfo));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, courseInfo, setCourseInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
