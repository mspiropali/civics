export interface FetchEeventsResponse {
    id: number,
    name: string,
    type: string,
    location: string,
    coordinates: { latitude: string, longitude: "string" },
    severity: string,
    recommendations: Array<string>,
    sensors: Array<number>,
    fleets: Array<number>
}

export interface FetchFleetControlReponse {
    id: number,
    vehicle: string,
    eta: number,
    coordinates: { latitude: string, longitude: string },
}

export interface FetchSafetyPointsResponse { 
    id: number,
    name:string,
    location:string,
    coordinates: { latitude: string, longitude: string }
}

export interface FetchSensorsResponse {
    id:number,
    name: string,
    location:string,
    coordinates: { latitude: string, longitude: string },
    status:string,
    temperature:number,
    humidity:number,
    smoke:number,
    UV:number
 }


// interface FetchEvacuationPLanResponse {}