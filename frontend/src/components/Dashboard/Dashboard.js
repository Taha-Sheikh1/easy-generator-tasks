import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/');
    }, [navigate]); 

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <h1>Welcome to the application!</h1>
        </div>
    );
};

export default Dashboard; 