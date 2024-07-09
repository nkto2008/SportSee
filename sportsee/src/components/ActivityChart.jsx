import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../assets/components/activityChart.scss';

function CustomTooltip ({ active, payload }) {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${payload[0].value}kg`}</p>
                <p className="label">{`${payload[1].value}kCal`}</p>
            </div>
        );
    }

    return null;
};

function CustomLegend (props) {
    const { payload } = props;
    return (
        <div className="custom-legend">
            {payload.map((entry, index) => (
                <div key={`item-${index}`} className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: entry.color }}></span>
                    {entry.value}
                </div>
            ))}
        </div>
    );
};

function ActivityChart({ data }) {
    if (!data || data.length === 0) {
        return <div>Aucune donnée d'activité disponible</div>;
    }

    return (
        <div className="activity-chart">
            <h2>Activité quotidienne</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    barCategoryGap="30%"
                    barGap={2}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" tickLine={false} />
                    <YAxis yAxisId="left" orientation="left" stroke="#282D30" tickLine={false} />
                    <YAxis yAxisId="right" orientation="right" stroke="#FF0101" tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={<CustomLegend />} verticalAlign="top" align="right" />
                    <Bar yAxisId="left" dataKey="kilogram" fill="#282D30" name="Poids (kg)" radius={[10, 10, 0, 0]} />
                    <Bar yAxisId="right" dataKey="calories" fill="#E60000" name="Calories brûlées (kCal)" radius={[10, 10, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ActivityChart;
