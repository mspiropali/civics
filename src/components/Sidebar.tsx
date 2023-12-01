import { DetailProps, MapProps } from "@/interfaces/props"
import Actions from "./Actions"
import Details from "./Details"
import Overview from "./Overview"
import { useState } from "react"
import { ActionType } from "@/enums/actionTypes"


const Sidebar = (mapProps: MapProps) => {
    const updateDetailProps = (detailProps: DetailProps) => {
        detailProps.updateDetailProps = updateDetailProps;
        setDetailProps(detailProps)
    }
    const [detailProps, setDetailProps] = useState<DetailProps>({ type: ActionType.NONE, id: -1, updateDetailProps: updateDetailProps })



    return (
        <div className="absolute bottom-0 left-0 h-[calc(100vh-48px)] flex flex-col items-center justify-start space-y-4 w-80 py-4 
        bg-slate-100  dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
            <Overview />
            <Actions {...detailProps} {...mapProps} />
            <Details {...detailProps} />
        </div>
    )
}

export default Sidebar