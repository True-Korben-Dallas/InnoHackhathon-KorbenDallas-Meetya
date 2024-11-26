import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import Groups from './pages/Groups';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    return (
        <Router>
            <Header user={user} isAuthenticated={!!user} />
            <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
            </Routes>
        </Router>
    );
};

export default App;
