import { useState, useEffect } from "react"
import { LatLng } from "leaflet"

export const useMyLocation = () => {

    const [position, setPosition] = useState<LatLng | null>(null);

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setPosition(new LatLng(latitude, longitude));
            }, () => {
                alert("No se pudo obtener tu ubicación");
            }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
        );

    }, [])


    return {
        position
    }
}
