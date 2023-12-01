import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapProps } from '@/interfaces/props'

// animate panning
function SetViewOnClick() {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      })
    })
  
    return null
  }


// h-[calc(100vh-48px)] w-[calc(100vw-320px)] 
const Map = ({position}: MapProps) => {
  console.log(position)
    return (
        <div className="relative z-0 h-screen w-screen
        flex flex-row justify-center items-center bottom-0 right-0
         bg-slate-500  dark:bg-slate-800 dark:text-gray-100 ">
            <MapContainer center={position} zoom={13}  maxZoom={17} minZoom={5} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>This is a position marker!</Popup>
                </Marker>

                <SetViewOnClick />
            </MapContainer>
        </div>
    )
}

export default Map