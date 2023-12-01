import { ActionType } from "@/enums/actionTypes"
import { FetchEeventsResponse, FetchFleetControlReponse, FetchSafetyPointsResponse, FetchSensorsResponse } from "@/interfaces/actionInterfaces"
import { DetailProps, MapProps } from "@/interfaces/props"
import apiClient from "@/services/apiClient"
import { useEffect, useState } from "react"

const Actions = ({ updateDetailProps }: DetailProps, { updatePosition }: MapProps) => {

    const [selected, SetSelected] = useState(ActionType.NONE)

    const [eevents, setEevents] = useState<FetchEeventsResponse[]>([])
    const [sensors, setSensors] = useState<FetchSensorsResponse[]>([])
    const [safetyPoints, setSafetyPoints] = useState<FetchSafetyPointsResponse[]>([])
    const [fleetControl, setFleetControl] = useState<FetchFleetControlReponse[]>([])
    // const [evacuationPlan, setEvacuationPlan] = useState<FetchEvacuationPlanResponse[]>([])

    const [error, setError] = useState('')

    useEffect(() => {
        switch (selected) {
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

    }, [selected])

    const showTable = () => {
        let headers: JSX.Element = <th></th>;
        let table: JSX.Element[] = [];

        switch (selected) {
            case ActionType.EMERGENCY_EVENT:
                headers = (
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Severity</th>
                        <th>ETA</th>
                    </tr>)

                table = eevents.map((event) => (
                    <tr key={event.id} className="border-b-2 border-slate-300 hover:border-slate-500 w-fit" onClick={() => { updateDetailProps?.({ type: selected, id: event.id }) }}>
                        <td className="text-[12px] w-fit">{event.name}</td>
                        <td className="text-[12px] w-fit">{event.location}</td>
                        <td className="text-[12px] w-fit">{event.severity}</td>
                        <td className="text-[12px] w-fit">{event.id}</td>
                    </tr >))

                break;
            case ActionType.FLEET_CONTROL:
                headers = (
                    <tr>
                        <th>Vehicle</th>
                        <th>ETA</th>
                        <th>Coordinates</th>
                    </tr>)

                table = fleetControl.map((fleet) => (
                    <tr key={fleet.id} className="border-b-2 border-slate-300 hover:border-slate-500" onClick={() => { updateDetailProps?.({ type: selected, id: fleet.id }) }}>
                        <td className="text-sm">{fleet.vehicle}</td>
                        <td className="text-sm">{fleet.eta}</td>
                        <td className="text-sm">{fleet.coordinates.latitude + ',' + fleet.coordinates.longitude}</td>
                    </tr>))
                break;

            case ActionType.SAFETY_POINTS:
                headers = (
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Coordinates</th>
                    </tr>)

                table = safetyPoints.map((point) => (
                    <tr key={point.id} className="border-b-2 border-slate-300 hover:border-slate-500"
                        onClick={() => { updateDetailProps?.({ type: selected, id: point.id }), updatePosition?.({position:[Number(point.coordinates.latitude), Number(point.coordinates.longitude)]})}}>
                        <td className="text-sm">{point.name}</td>
                        <td className="text-sm">{point.location}</td>
                        <td className="text-sm">{point.coordinates.latitude + ',' + point.coordinates.longitude}</td>
                    </tr>))
                break;
            case ActionType.SENSORS:
                headers = (
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Coordinates</th>
                        <th>Status</th>
                    </tr>)

                table = sensors.map((sensor) => (
                    <tr key={sensor.id} className="border-b-2 border-slate-300 hover:border-slate-500" onClick={() => { updateDetailProps?.({ type: selected, id: sensor.id }) }}>
                        <td className="text-sm">{sensor.name}</td>
                        <td className="text-sm">{sensor.location}</td>
                        <td className="text-sm">{sensor.coordinates.latitude + ',' + sensor.coordinates.longitude}</td>
                        <td className="text-sm">{sensor.status}</td>
                    </tr>))
                break;
            // case ActionType.EVACUATION_PLAN:

            //     break;
        }

        return (
            <table className="table-auto text-left w-fit">
                <thead className="sticky top-0 bg-blue-700">
                    {headers}
                </thead>
                <tbody className="overflow-y-hidden hover:overflow-y-scroll mt=10">
                    {error ? <h1>error</h1> : table
                    }
                </tbody>
            </table>
        )
    }


    return (
        <div className="w-72 h-96  flex flex-row flex-wrap gap-2 p-2 items-start justify-start rounded-md overflow-hidden
    bg-slate-100 dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
            <h1 className="text-xl font-semibold h-8">Actions</h1>

            <div className="flex flex-row flex-wrap gap-2 justify-between">
                <button className="grid basis-full h-8 rounded-md overflow-hidden items-center justify-center text-xl
            bg-white dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20"
                    onClick={() => SetSelected(ActionType.EMERGENCY_EVENT)}>
                    Emergency Events
                </button>
                <button className="grid flex-2 h-8 w-32 rounded-md overflow-hidden items-center justify-center text-xl
            bg-white dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20"
                    onClick={() => SetSelected(ActionType.SENSORS)}>
                    Sensors
                </button>
                <button className="grid flex-2 h-8 w-32 rounded-md overflow-hidden items-center justify-center text-lg
            bg-white dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20"
                    onClick={() => SetSelected(ActionType.SAFETY_POINTS)}>
                    Safety Points
                </button>
                <button className="grid text-[15px] flex-2 h-8 w-32 rounded-md overflow-hidden items-center justify-center text-md
            bg-white dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20"
                    onClick={() => SetSelected(ActionType.EVACUATION_PLAN)}>
                    Evacuation Plan
                </button>
                <button className="grid flex-2 h-8 w-32  rounded-md overflow-hidden items-center justify-center text-lg
            bg-white dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20"
                    onClick={() => SetSelected(ActionType.FLEET_CONTROL)}>
                    Fleet Control
                </button>
            </div>

            <div className="overflow-y-hidden hover:overflow-y-scroll w-full max-h-48">
                {error ? <h1 className="grid w-full text-red-600 justify-center">{error}, cannot load data</h1> :
                    selected != ActionType.NONE ? showTable() : <h1 className="grid w-full justify-center"> Select an action</h1>}
            </div>
        </div>
    )
}

export default Actions