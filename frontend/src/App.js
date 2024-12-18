import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventDetail from './pages/EventDetail';
import Profile from './pages/Profile';
import Groups from './pages/Groups';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.module.scss';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/event/:id" element={<EventDetail />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/groups" element={<Groups />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
