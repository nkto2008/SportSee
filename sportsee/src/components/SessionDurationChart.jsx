import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../assets/components/sessionDurationChart.scss';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p>{`${payload[0].value} min`}</p>
            </div>
        );
    }

    return null;
};

function SessionDurationChart ({ data }) {
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    console.log("Données reçues dans SessionDurationChart:", data);

    if (!data || !Array.isArray(data) || data.length === 0) {
        return <div>Aucune donnée de session disponible</div>;
    }

    const formattedData = data.map((session, index) => ({
        ...session,
        day: days[index]
    }));

    console.log("Données formatées:", formattedData);

    return (
        <div className="session-duration-chart">
            <h2>Durée moyenne des sessions</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedData}>
                    <CartesianGrid vertical={false} horizontal={false} />
                    <XAxis
                        dataKey="day"
                        tick={{ fill: 'white', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="sessionLength" stroke="white" dot={false} activeDot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SessionDurationChart;