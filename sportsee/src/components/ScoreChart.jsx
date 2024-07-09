import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import '../assets/components/scoreChart.scss';

function ScoreChart ({ score }) {
    // Assurez-vous que le score est un nombre entre 0 et 1
    const scoreValue = Math.min(Math.max(score || 0, 0), 1);

    const data = [
        { name: 'Score', value: scoreValue },
        { name: 'Reste', value: 1 - scoreValue }
    ];

    const COLORS = ['#FF0000', '#FBFBFB'];

    return (
        <div className="score-chart">
            <h2>Score</h2>
        <ResponsiveContainer width="100%" height={200}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={450}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                    <tspan x="50%" dy="-1em" fontSize="26" fontWeight="700">
                        {`${(scoreValue * 100).toFixed(0)}%`}
                    </tspan>
                    <tspan x="50%" dy="1.5em" fontSize="16" fill="#74798C">
                        de votre
                    </tspan>
                    <tspan x="50%" dy="1.5em" fontSize="16" fill="#74798C">
                        objectif
                    </tspan>
                </text>
            </PieChart>
        </ResponsiveContainer>
        </div>
    );
};

export default ScoreChart;