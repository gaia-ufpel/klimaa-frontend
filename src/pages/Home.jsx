import {useEffect, useState} from "react";
import useAuth from '../hooks/useAuth.js'
import MetricCard from "../components/cards/MetricCard.jsx";
import Accordion from "../components/Accordion.jsx";

export default function Home() {
    const { token, user, logout } = useAuth()
    const [data, setData] = useState([])
    const [metricCards, setMetricCards] = useState([])
    const [locations, setLocations] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/v1/metrics`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(response => response.json())
            .then(responseData => {
                let locations = responseData.reduce((acc, item) => {
                    acc[item.location_id] = item.location
                    return acc
                }, {})
                setLocations(locations)

                let metricsByLocationByMetricType = responseData.reduce((acc, item) => {
                    (acc[item.location_id] = acc[item.location_id] || []).push(item)
                    return acc
                }, {})
                for (const [key, metric] of Object.entries(metricsByLocationByMetricType)) {
                    let metricsByMetricType = metric.reduce((acc, item) => {
                        (acc[item.metric_type_id] = acc[item.metric_type_id] || []).push(item)
                        return acc
                    }, [])
                    metricsByLocationByMetricType[key] = { location_id: key, metrics_by_type: Object.values(metricsByMetricType) }
                }

                setData(Object.values(metricsByLocationByMetricType))
                setLoading(false)
            })
    }, [])

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <h1 className="text-2xl font-semibold">Bem-vindo, {user.name}</h1>
            { loading && <h2 className="text-xl font-semibold">Carregando...</h2> }
            {!loading && data.map((l) => (
                <div key={l.location_id} className="space-y-4">
                    { console.log(l) }
                    <h2 className="text-xl font-semibold">
                        {locations?.[l.location_id] || "Localização Desconhecida"}
                    </h2>
                    {Array.isArray(l.metrics_by_type) && l.metrics_by_type.map((metricType, typeIndex) => (
                        <div key={typeIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Array.isArray(metricType) && metricType.map((metric, metricIndex) => (
                                <MetricCard key={metricIndex} metric={metric} />
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}