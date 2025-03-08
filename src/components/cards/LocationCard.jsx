export default function LocationCard({ location, metricTypes, metrics}) {
    return (
        <div className="card">
            <h2>{location.campus} - {location.building} - {location.room}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {metricTypes.map((metricType) => (
                    <div key={metricType.id} className="metric-card">
                        <h3 className="capitalize">{metricType.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {metrics.filter((metric) => metric.metric_type_id === metricType.id).map((metric) => (
                                <div key={metric.id} className="metric">
                                    <h4>{metric.name}</h4>
                                    <p>{metric.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}