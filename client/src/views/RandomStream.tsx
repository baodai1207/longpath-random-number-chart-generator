import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import ReactEcharts from 'echarts-for-react';

interface RandomStreamProps {
    data: { value: number; timestamp: string }[];
    setData: React.Dispatch<React.SetStateAction<{ value: number; timestamp: string }[]>>;
    isRunning: boolean;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

const WEBSOCKET_URL = 'http://localhost:3000';

const RandomStream: React.FC<RandomStreamProps> = ({ data, setData, isRunning, setIsRunning }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(WEBSOCKET_URL);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect(); // Clean up socket connection
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

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
    }, [isRunning, socket, setData]);

    const chartOptions = {
        xAxis: { type: 'category', data: data.map((d) => d.timestamp) },
        yAxis: { type: 'value' },
        series: [{ data: data.map((d) => d.value), type: 'line' }],
    };

    return (
        <div>
            <h2>Real-Time Random Numbers</h2>
            <button onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
            <ReactEcharts option={chartOptions} />
        </div>
    );
};

export default RandomStream;
