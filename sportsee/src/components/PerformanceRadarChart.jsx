import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import '../assets/components/performanceRadarChart.scss'

function PerformanceRadarChart ({ data }) {
    if (!data || data.length === 0) {
        return <div>Aucune donnée de performance disponible</div>;
    }

    const performanceLabels = {
        1: 'Cardio',
        2: 'Energie',
        3: 'Endurance',
        4: 'Force',
        5: 'Vitesse',
        6: 'Intensité'
    };

    

    const formattedData = data.map(item => ({
          ...item,
        kind: performanceLabels[item.kind]
    }));

    return (
        <div className="performance-radar-chart">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={formattedData}>
                    <PolarGrid stroke="#fff" />
                    <PolarAngleAxis dataKey="kind" tick={{ fill: 'white', fontSize: 12 }} />
                    <Radar name="Performance" dataKey="value" stroke="#E60000" fill="#E60000" fillOpacity={0.7} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PerformanceRadarChart;