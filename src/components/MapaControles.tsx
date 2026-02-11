import { useMap } from "react-leaflet";
import { useEffect } from "react";

export const ObtenerUbicacionUsuario = ({ position }: { position: [number, number] | null }) => {
  const map = useMap();
  
    useEffect(() => {
      if (position) {
        map.flyTo(position, 15);
      }
    }, [position, map]);
  
    return null;
}



export const EnfocarRuta = ({ coordenadas }: { coordenadas: [number, number][] }) => {
  const map = useMap();
  useEffect(() => {
    if (coordenadas.length > 0) {
      map.fitBounds(coordenadas, { padding: [50, 50] });
    }
  }, [coordenadas, map])

  return null;
}
