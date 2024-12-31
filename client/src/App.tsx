import React, { useState, useEffect } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import ControlPanel from './views/ControlPanel';
import RandomStream from './views/RandomStream';
import HistoryView from './views/HistoryView';

const App: React.FC = () => {
  const [data, setData] = useState<{ value: number; timestamp: string }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const socket = io('http://localhost:3000');

  useEffect(() => {
    if (isRunning) {
      socket.emit('start', 1000);
      socket.on('data', (newData) => {
        setData((prev) => [...prev, newData].slice(-20)); // Keep last 20 entries
      });
    } else {
      socket.emit('stop');
    }

    return () => {
      socket.off('data');
    };
  }, [isRunning]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>LongPath App</h1>
        <ControlPanel isRunning={isRunning} setIsRunning={setIsRunning} />
        <RandomStream data={data} setData={setData} isRunning={isRunning} setIsRunning={setIsRunning} />
        <HistoryView data={data} />
      </header>
    </div>
  );
};

export default App;
