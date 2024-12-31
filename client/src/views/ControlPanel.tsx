import React, { useState } from 'react';
import { io } from 'socket.io-client';

const WEBSOCKET_URL = 'http://localhost:3000';

interface ControlPanelProps {
    isRunning: boolean;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ isRunning, setIsRunning }) => {
    const [frequency, setFrequency] = useState(1000);
    // const [isRunning, setIsRunning] = useState(false);
    const socket = io(WEBSOCKET_URL);

    const startStreaming = () => {
        setIsRunning(true);
        socket.emit('start', frequency);
    };

    const stopStreaming = () => {
        setIsRunning(false);
        socket.emit('stop');
    };

    const updateFrequency = () => {
        if (isRunning) {
            socket.emit('updateFrequency', frequency);
        }
    };

    return (
        <div>
            <h2>Control Panel</h2>
            <button onClick={isRunning ? stopStreaming : startStreaming}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
            <input
                type="number"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                placeholder="Frequency (ms)"
            />
            <button onClick={updateFrequency} disabled={!isRunning}>
                Update Frequency
            </button>
        </div>
    );
};

export default ControlPanel;
