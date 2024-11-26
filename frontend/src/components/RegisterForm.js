import React, { useState } from 'react';
import axios from 'axios';
import styles from './RegisterForm.module.scss';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post('http://127.0.0.1:8000/register/', {
                username,  
                email,
                password,
                first_name: firstName,
                last_name: lastName,
            });
            localStorage.setItem('access_token', response.data.access);
            window.location.href = '/'; 
        } catch (err) {
            setError('Error during registration');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className={styles['register-form']}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className={`form-control ${styles.input}`}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        className={`form-control ${styles.input}`}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className={`form-control ${styles.input}`}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit" className={`btn btn-primary ${styles.button}`}>Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
