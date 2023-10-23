import Actions from "./Actions"
import Details from "./Details"
import Overview from "./Overview"

const Sidebar = () => {
    return (
        <div className="absolute bottom-0 left-0 h-[calc(100vh-48px)] flex flex-col items-center justify-start space-y-4 w-80 py-4 
        bg-slate-100  dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
            <Overview />
            <Actions />
            <Details />
        </div>
    )
}

export default Sidebar