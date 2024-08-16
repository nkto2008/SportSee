import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import '../assets/components/performanceRadarChart.scss'

function PerformanceRadarChart({ data }) {
    if (!data || data.length === 0) {
        return <div>Aucune donnée de performance disponible</div>;
    }

    const translationMap = {
        'cardio': 'Cardio',
        'energy': 'Énergie',
        'endurance': 'Endurance',
        'strength': 'Force',
        'speed': 'Vitesse',
        'intensity': 'Intensité'
    };

    const orderMap = {
        'Intensité': 1,
        'Vitesse': 2,
        'Force': 3,
        'Endurance': 4,
        'Énergie': 5,
        'Cardio': 6
    };

    const formattedData = data
        .map(item => ({
            subject: translationMap[item.subject] || item.subject,
            A: item.A,
            fullMark: item.fullMark
        }))
        .sort((a, b) => orderMap[a.subject] - orderMap[b.subject]);

    return (
        <div className="performance-radar-chart">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={formattedData}>
                    <PolarGrid stroke="#fff" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'white', fontSize: 12 }} />
                    <Radar name="Performance" dataKey="A" stroke="#E60000" fill="#E60000" fillOpacity={0.7} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PerformanceRadarChart;