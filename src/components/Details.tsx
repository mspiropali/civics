import { ActionType } from "@/enums/actionTypes"
import { FetchEeventsResponse, FetchFleetControlReponse, FetchSafetyPointsResponse, FetchSensorsResponse } from "@/interfaces/actionInterfaces";
import { DetailProps } from "@/interfaces/props";
import apiClient from "@/services/apiClient";
import { useEffect, useState } from "react"



const Details = ({ id, type }: DetailProps) => {
    const [eevents, setEevents] = useState<FetchEeventsResponse[]>([])
    const [sensors, setSensors] = useState<FetchSensorsResponse[]>([])
    const [safetyPoints, setSafetyPoints] = useState<FetchSafetyPointsResponse[]>([])
    const [fleetControl, setFleetControl] = useState<FetchFleetControlReponse[]>([])
    // const [evacuationPlan, setEvacuationPlan] = useState<FetchEvacuationPlanResponse[]>([])
    const [error, setError] = useState('')

    useEffect(() => {

        switch (type) {
            case ActionType.EMERGENCY_EVENT:
                apiClient.get<FetchEeventsResponse[]>('/eevents.json')
                    .then(res => setEevents(res.data))
                    .catch(err => { setError(err.message) })
                break;
            case ActionType.FLEET_CONTROL:
                apiClient.get<FetchFleetControlReponse[]>('/fleet.json')
                    .then(res => setFleetControl(res.data))
                    .catch(err => { setError(err.message) })
                break;
            // case ActionType.EVACUATION_PLAN:
            //     apiClient.get<FetchEvacuationPlanResponse[]>('/evacuation.json')
            //         .then(res => setEvacuationPlan(res.data))
            //         .catch(err => { setError(err.message) })
            //     break;
            case ActionType.SAFETY_POINTS:
                apiClient.get<FetchSafetyPointsResponse[]>('/safety.json')
                    .then(res => setSafetyPoints(res.data))
                    .catch(err => { setError(err.message) })
                break;
            case ActionType.SENSORS:
                apiClient.get<FetchSensorsResponse[]>('/sensors.json')
                    .then(res => setSensors(res.data))
                    .catch(err => { setError(err.message) })
                break;

            default:
                break;
        }

    }, [type, id])

    const showDetails = () => {
        let details: JSX.Element = <h1></h1>
        const event = eevents.find(event => event.id == id);
        const fleet = fleetControl.find(fleet => fleet.id == id);
        const point = safetyPoints.find(point => point.id == id);
        const sensor = sensors.find(sensor => sensor.id == id);

        switch (type) {
            case ActionType.EMERGENCY_EVENT:
                details = (
                    <div className="grid grid-cols-2 h-full gap-x-4 auto-cols-min mt-2">
                        <h1 className="text-sm">{event?.name}</h1>
                        <span className="text-sm text-red-600 font-semibold"> {event?.severity.toUpperCase()}</span>
                        <h1 className="text-sm">Location</h1>
                        <span className="text-sm"> {event?.location} </span>
                        <h1 className="text-sm">Cordinates</h1>
                        <span className="text-sm">{event?.coordinates.latitude + ', ' + event?.coordinates.longitude}</span>
                        <h1 className="text-sm">Sensors</h1>
                        <span className="text-sm">{event?.sensors.join(" | ")}</span>
                        <h1 className="text-sm">Recommendations</h1>
                        <span className="text-sm">{event?.recommendations.join(',\n')}</span>
                    </div>
                )
                break;
            // case ActionType.EVACUATION_PLAN:

            //     break;
            case ActionType.FLEET_CONTROL:
                details = (
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 auto-cols-min mt-2">
                        <h1 className="text-sm">Vehicle</h1>
                        <span className="text-sm "> {fleet?.vehicle}</span>
                        <h1 className="text-sm">ETA</h1>
                        <span className="text-sm"> {fleet?.eta} </span>
                        <h1 className="text-sm">Cordinates</h1>
                        <span className="text-sm">{fleet?.coordinates.latitude + ', ' + fleet?.coordinates.longitude}</span>
                    </div>
                )

                break;
            case ActionType.SAFETY_POINTS:
                details = (
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 auto-cols-min mt-2">
                        <h1 className="text-sm">Name</h1>
                        <span className="text-sm "> {point?.name}</span>
                        <h1 className="text-sm">Location</h1>
                        <span className="text-sm"> {point?.location} </span>
                        <h1 className="text-sm">Cordinates</h1>
                        <span className="text-sm">{point?.coordinates.latitude + ', ' + point?.coordinates.longitude}</span>
                    </div>
                )

                break;
            case ActionType.SENSORS:
                details = (
                    <div className="grid grid-cols-2 gap-x-2 auto-cols-min mt-1">
                        <h1 className="text-sm">Name</h1>
                        <span className="text-sm "> {sensor?.name}</span>
                        <h1 className="text-sm">Location</h1>
                        <span className="text-sm"> {sensor?.location} </span>
                        <h1 className="text-sm">Cordinates</h1>
                        <span className="text-sm">{sensor?.coordinates.latitude + ', ' + sensor?.coordinates.longitude}</span>
                        <h1 className="text-sm">Status</h1>
                        <span className="text-sm "> {sensor?.status}</span>
                        <h1 className="text-sm">Temperature</h1>
                        <span className="text-sm "> {sensor?.temperature}°C</span>
                        <h1 className="text-sm">Humidity</h1>
                        <span className="text-sm "> {sensor?.humidity} RH</span>
                        <h1 className="text-sm">Smoke</h1>
                        <span className="text-sm "> {sensor?.smoke} OD</span>
                        <h1 className="text-sm">UV</h1>
                        <span className="text-sm "> {sensor?.UV} UV</span>
                    </div>
                )

                break;
            default:
                details = (
                    <div className="flex - flex-row w-full justify-center mt-4">
                        <h1>No data to diplay</h1>
                    </div>
                )
                break;
        }

        return details
    }

    return (
        <div className=" w-72 h-60 flex flex-col p-2 items-start gap-1 rounded-md overflow-hidden
    bg-slate-100 dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
            <h1 className="text-xl font-semibold h-6 w-full">Details</h1>

            {error ? <h1 className="grid w-full text-red-600 justify-center">{error}, cannot load data</h1> : showDetails()}

        </div>
    )
}

export default Details