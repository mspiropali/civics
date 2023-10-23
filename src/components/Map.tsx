import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LatLngTuple } from 'leaflet'

const position:LatLngTuple = [37.9838, 23.7275, 0] // Athens position

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
const Map = () => {
  
    return (
        <div className="relative z-0 h-screen w-screen
        flex flex-row justify-center items-center bottom-0 right-0
         bg-slate-500  dark:bg-slate-800 dark:text-gray-100 ">
            <MapContainer center={position} zoom={13}  maxZoom={17} minZoom={5} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    // url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>This is the City Centre!</Popup>
                </Marker>

                <SetViewOnClick />
            </MapContainer>
        </div>
    )
}

export default Map