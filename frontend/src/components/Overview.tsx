import { useEffect, useState } from "react"

// probably get from API call and maybe update via useEffect
const Overview = () => {
    const [stats, setStats] = useState({ sensors: "10", eevents: "0" })

    

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000/emergency_events")
        socket.addEventListener("message", (event) => {
            let data = JSON.parse(event.data)
            console.log("Message from server ", data)
            setStats({...stats, eevents:data.msg})
        })
        
    }, [stats])


    return (
        <div className="h-28 w-72 flex flex-row flex-wrap p-2 items-start gap-2 rounded-md overflow-hidden
    bg-slate-100  dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
            <div className="grid flex-1 h-11 px-1 rounded-md overflow-hidden
            bg-white dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                <h1 className="text-sm font-semibold">Sensors</h1>
                <div className="place-self-end text-md">{stats.sensors}</div>
            </div>
            <div className="grid flex-1 h-11 px-1 rounded-md overflow-hidden 
            bg-white dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                <h1 className="text-sm font-semibold">Emergency Events</h1>
                <div className="place-self-end text-md">{stats.eevents}</div>
            </div>
            <div className="grid basis-full h-10 p-1 rounded-md overflow-hidden items-center justify-center text-xl
            bg-white dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20" onClick={() => setStats({ ...stats, eevents: stats.eevents + 1 })}>Request Help</div>
        </div>
    )
}

export default Overview