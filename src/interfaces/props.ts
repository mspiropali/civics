import { ActionType } from "@/enums/actionTypes";
import { LatLngTuple } from "leaflet";

export interface DetailProps {
    type: ActionType,
    id: number,
    updateDetailProps?(detailProps: DetailProps): void
}

export interface MapProps {
    position: LatLngTuple,
    updatePosition?(props: MapProps): void
}