import { useState } from "react"
import { useMapEvents } from "react-leaflet"
import { LatLng } from "leaflet"

export const useMyLocation = () => {

    const [position, setPosition] = useState<LatLng | null>(null);

    const map = useMapEvents({
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
        locationerror(e) {
            alert("No se pudo obtener tu ubicación: " + e.message);
        }
    });

    const getMyLocation = () => {
        map.locate();
    };

    return {
        position, getMyLocation
    }
}
