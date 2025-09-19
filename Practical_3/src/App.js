import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to CHARUSAT!!!!</h1>
                <div className="datetime-container">
                    <p className="date">It is {formatDate(currentTime)}</p>
                    <p className="time">It is {formatTime(currentTime)}</p>
                </div>
            </header>
        </div>
    );
}

export default App;