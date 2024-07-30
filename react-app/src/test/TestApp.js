import React, { useState, useEffect } from 'react';
import webSocketService from './WebSocketService';

const TestApp = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        webSocketService.connect((newContent) => {
            setContent(newContent);
        });

        fetch('http://localhost:8282/notes')
            .then(response => response.text())
            .then(data => setContent(data));
    }, []);

    const handleContentChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);
        webSocketService.sendContent(newContent);
    };

    return (
        <div className="App">
            <h1>협력 노트</h1>
            <textarea
                value={content}
                onChange={handleContentChange}
                rows="10"
                cols="50"
            />
        </div>
    );
};

export default TestApp;


