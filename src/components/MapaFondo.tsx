import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMyLocation } from "../hooks/useMyLocation";
import type { RutaDatos } from "../interface/interfaces";
import { EnfocarRuta, ObtenerUbicacionUsuario } from "./MapaControles";

interface MapaFondoProps {
  datos: RutaDatos
}

export const MapaFondo = ({ datos }: MapaFondoProps) => {

  const { position } = useMyLocation();

  const posicionArray: [number, number] | null = position ? [position.lat, position.lng] : null;

  return (
    <>
      <div className="fixed inset-0 z-0">
        <MapContainer
          center={[10.9685, -74.7813]}
          zoom={13}
          scrollWheelZoom={true}
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {position && (
            <Marker position={position}>
              <Popup>Estás aquí</Popup>
            </Marker>
          )}

          <ObtenerUbicacionUsuario position={posicionArray} />

          {datos.coordenadas.length > 0 && (
            <Polyline positions={datos.coordenadas} color="blue" />
          )}

          {datos.origen !== null && (
            <Marker position={datos.origen} />
          )}
          {datos.destino !== null && (
            <Marker position={datos.destino} />
          )}
          <EnfocarRuta coordenadas={datos.coordenadas} />
        </MapContainer>
      </div>
    </>
  )
}
