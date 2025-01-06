import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const correctPassword = process.env.REACT_APP_PASSWORD;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password === correctPassword) {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/all'); 
        } else {
            setError('Incorrect password!');
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className='items-center justify-center max flex flex-col'>
                <h1 className='text-5xl word-1 my-12'>enter</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col items-center justify-center bg-transparent'>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="pa*ssw*or*d"
                            className='border-b-4 outline-none text-center focus:outline-none p-2 bg-transparent'
                        />
                        <button type="submit" className='my-12 hover:scale-110 hover:duration-150 scale-100 duration-150'>login</button>
                    </div>
                </form>
            </div>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}      
        </div>
    );
}

export default Login;
