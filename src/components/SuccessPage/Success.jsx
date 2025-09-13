import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Success = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/signin');
        }
    }, [navigate]);
    return (
        <h1 style={{textAlign:'center'}}>Login Successfully</h1>
    )
}

export default Success;