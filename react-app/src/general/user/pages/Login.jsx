import React from 'react';
import LoginForm from '../components/Login/LoginForm.jsx';

const Login = () => {

    
    return (
        <>
        <div className='container'
         style={{
            width: '100%',       
            height: '100vh',      
            background: 'linear-gradient(rgb(176, 201, 230), rgb(213, 225, 235), rgb(239, 243, 246))',
            overflow: 'auto'
          }}
        >
            <LoginForm/>
        </div>
    </>
    );
};

export default Login;