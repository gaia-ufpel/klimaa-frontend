import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default function MetricCard({ metric }) {
    return (
        <ResponsiveContainer width={300} height={300}>
            <LineChart data={metric}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="datetime"/>
                <YAxis dataKey="value"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="value" stroke="#8884d8"/>
            </LineChart>
        </ResponsiveContainer>
    )
}