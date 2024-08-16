import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import '../assets/components/performanceRadarChart.scss'

function PerformanceRadarChart({ data }) {
    if (!data || data.length === 0) {
        return <div>Aucune donnée de performance disponible</div>;
    }

    // Les données sont déjà formatées dans le modèle, donc nous n'avons pas besoin de les reformater ici
    const formattedData = data.map(item => ({
        subject: item.subject,
        A: item.A,
        fullMark: item.fullMark
    }));

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