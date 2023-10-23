const Details = () => {
interface Props {
    event1: string
}
    
    return (
        <div className=" w-72 h-60 flex flex-col p-2 items-start gap-1 rounded-md overflow-hidden
    bg-slate-100 dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
            <h1 className="text-xl font-semibold h-8 w-full">Details</h1>
            <div className="grid grid-cols-2 gap-y-1 auto-cols-min">
                <h1 className="text-sm">Event 1</h1>
                <span className="text-sm text-red-600"> HIGH</span>
                <h1 className="text-sm">Location</h1>
                <span className="text-sm"> NTUA Main Entrance</span>
                <h1 className="text-sm">Cordinates</h1>
                <span className="text-sm">37.86245, 23.6756453</span>
                <h1 className="text-sm">ETA</h1>
                <span className="text-sm">5 min 14 sec</span>
                <h1 className="text-sm">Wind Speed</h1>
                <span className="text-sm"> SE 0.73 m/s</span>
            </div>

            <button className="absolute bottom-2 right-1 h-8 w-24 rounded-full overflow-hidden items-center justify-center place-self-end 
            text-sm text-white font-semibold
            bg-slate-400 hover:bg-slate-500 dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-90">
                More Details
            </button>
        </div>
    )
}

export default Details