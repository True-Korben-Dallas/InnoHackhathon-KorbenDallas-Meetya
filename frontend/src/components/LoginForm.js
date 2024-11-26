import React, { useState } from 'react';
import axios from 'axios';
import styles from './LoginForm.module.scss'; 

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post('http://127.0.0.1:8000/login/', { email, password });
            localStorage.setItem('access_token', response.data.access);
            window.location.href = '/'; 
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className={styles['login-form']}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className={`form-control ${styles.input}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className={`form-control ${styles.input}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className={`btn btn-primary ${styles.button}`}>Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
