import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventDetail from './pages/EventDetail';
import Profile from './pages/Profile';
import Groups from './pages/Groups';
import Login from './components/LoginForm';
import Register from './components/RegisterForm';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.module.scss';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            fetch('http://127.0.0.1:8000/api/user/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => setUser(data))  
            .catch(error => console.error('Error fetching user:', error));
        }
    }, []);

    const handleLogin = (userData, token) => {
        localStorage.setItem('access_token', token);
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setUser(null);
    };

    return (
        <Router>
            <div className="App">
                <Header user={user} setUser={setUser} onLogout={handleLogout} />
                <Routes>
                    <Route path="/" element={<Home user={user} />} />
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/event/:id" element={<EventDetail />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/groups" element={<Groups />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register onRegister={handleLogin} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
