import React, { useState, useMemo } from 'react';

interface HistoryEntry {
    value: number;
    timestamp: string;
}

interface HistoryViewProps {
    data: HistoryEntry[];
}

const HistoryView: React.FC<HistoryViewProps> = ({ data }) => {
    const [minValue, setMinValue] = useState<number | ''>('');
    const [maxValue, setMaxValue] = useState<number | ''>('');
    const [sortBy, setSortBy] = useState<'timestamp' | 'value'>('timestamp');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Filter data based on min and max value
    const filteredData = useMemo(() => {
        return data
            .filter((entry) => {
                if (minValue !== '' && entry.value < minValue) return false;
                if (maxValue !== '' && entry.value > maxValue) return false;
                return true;
            })
            .sort((a, b) => {
                const fieldA = sortBy === 'value' ? a.value : new Date(a.timestamp).getTime();
                const fieldB = sortBy === 'value' ? b.value : new Date(b.timestamp).getTime();
                return sortOrder === 'asc' ? fieldA - fieldB : fieldB - fieldA;
            });
    }, [data, minValue, maxValue, sortBy, sortOrder]);

    return (
        <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '20px' }}>
            <h2>History View</h2>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Min Value:
                    <input
                        type="number"
                        value={minValue}
                        onChange={(e) => setMinValue(e.target.value === '' ? '' : Number(e.target.value))}
                        placeholder="Min"
                        style={{ marginLeft: '5px', marginRight: '10px' }}
                    />
                </label>
                <label>
                    Max Value:
                    <input
                        type="number"
                        value={maxValue}
                        onChange={(e) => setMaxValue(e.target.value === '' ? '' : Number(e.target.value))}
                        placeholder="Max"
                        style={{ marginLeft: '5px', marginRight: '10px' }}
                    />
                </label>
                <label>
                    Sort By:
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'timestamp' | 'value')}
                        style={{ marginLeft: '5px', marginRight: '10px' }}
                    >
                        <option value="timestamp">Timestamp</option>
                        <option value="value">Value</option>
                    </select>
                </label>
                <label>
                    Order:
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                        style={{ marginLeft: '5px', marginRight: '10px' }}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                <thead>
                    <tr style={{ backgroundColor: 'black' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>#</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Value</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((entry, index) => (
                        <tr key={index} style={{ textAlign: 'left' }}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{index + 1}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{entry.value}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{entry.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryView;
