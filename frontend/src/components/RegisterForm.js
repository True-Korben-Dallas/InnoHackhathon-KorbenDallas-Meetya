import React, { useState } from 'react';
import axios from 'axios';
import styles from './RegisterForm.module.scss';

const RegisterForm = ({ onRegister }) => {
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
            onRegister(response.data.user, response.data.access);
            window.location.href = '/';
        } catch (err) {
            setError('Error during registration');
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.registerForm}>
                <h2 className={styles.title}>Register</h2>
                <div className={styles.formGroup}>
                    <label>Username</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>First Name</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Last Name</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className={styles.alert}>{error}</div>}
                <button type="submit" className={styles.button}>Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
