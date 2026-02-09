import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMyLocation } from "../hooks/useMyLocation";
import { useMapEvents, Marker, Popup } from "react-leaflet";

function MyLocationMarker() {
  const {position, getMyLocation} = useMyLocation();

  useMapEvents({
    click() {
      getMyLocation();
    }
  });

  return position ? (
    <Marker position={position}>
      <Popup>Estás aquí</Popup>
    </Marker>
  ) : null;
}

export const MapaFondo = () => {


  return (
    <>
      <div className="fixed inset-0 z-0">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={true}
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <MyLocationMarker />
        </MapContainer>
      </div>
    </>
  )
}
