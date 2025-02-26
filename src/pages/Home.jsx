import {useEffect, useState} from "react";
import useAuth from '../hooks/useAuth.js'
import MetricCard from "../components/cards/MetricCard.jsx";
import Accordion from "../components/Accordion.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

export default function Home() {
    const { token, user, logout } = useAuth()
    const [metrics, setMetrics] = useState([])
    const [metricTypes, setMetricTypes] = useState([])
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
                setMetrics(responseData)
                let locations = responseData.reduce((acc, item) => {
                    acc[item.location_id] = item.location
                    return acc
                }, {})
                let metricTypes = responseData.reduce((acc, item) => {
                    acc[item.metric_type_id] = item.metric_type
                    return acc
                }, {})

                setLocations(Object.values(locations))
                setMetricTypes(Object.values(metricTypes))
                setLoading(false)
            })
    }, [])

    return (
        <MainLayout>
            <div className="p-6 grid grid-cols-1 md:grid-cols-1 gap-6">
                { loading && <h2 className="text-xl font-semibold">Carregando...</h2> }
                {!loading && locations.map((location) => (
                    <section className="flex flex-col space-y-4" key={location.id}>
                        <h1 className="text-gray-800 text-2xl">{location.campus} - {location.building} - {location.room}</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {metricTypes.map((metricType) => (
                                <div key={metricType.id} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                                    <h3>{metricType.name}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <MetricCard
                                            metrics={metrics.filter((metric) => metric.metric_type_id === metricType.id && metric.location_id === location.id).map((metric) => {
                                                return {
                                                    id: metric.id,
                                                    datetime: new Date(metric.datetime),
                                                    value: parseFloat(metric.value)
                                                }
                                            })}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </MainLayout>
    )
}