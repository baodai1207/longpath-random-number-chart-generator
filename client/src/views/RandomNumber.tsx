import React, { useState } from 'react';
import axios from 'axios';

const RandomNumber: React.FC = () => {
    const [number, setNumber] = useState<{ value: number; timestamp: string } | null>(null);

    const fetchRandomNumber = async () => {
        try {
            const response = await axios.get('http://localhost:3000/random');
            setNumber(response.data);
        } catch (error) {
            console.error('Error fetching random number:', error);
        }
    };

    return (
        <div>
            <h2>Random Number</h2>
            <button onClick={fetchRandomNumber}>Fetch Random Number</button>
            {number && (
                <div>
                    <p>Value: {number.value}</p>
                    <p>Timestamp: {number.timestamp}</p>
                </div>
            )}
        </div>
    );
};

export default RandomNumber;
