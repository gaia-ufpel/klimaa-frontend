import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default function MetricCard({ metrics, minDate=null, maxDate=null, dateSpace=1 }) {
    metrics = metrics.sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
        .filter((metric, index) => index % dateSpace === 0)
    if (minDate)
        metrics = metrics.filter((metric) => new Date(metric.datetime) >= new Date(minDate))
    if (maxDate)
        metrics = metrics.filter((metric) => new Date(metric.datetime) <= new Date(maxDate))

    return (
        <ResponsiveContainer width={300} height={300}>
            <LineChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="datetime"/>
                <YAxis dataKey="value"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="value" name="Métrica" stroke="#8884d8"/>
            </LineChart>
        </ResponsiveContainer>
    )
}