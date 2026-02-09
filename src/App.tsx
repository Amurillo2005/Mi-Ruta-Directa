import { MapPin, Navigation, Building2 } from "lucide-react"
import { useState } from "react"
import { MapaFondo } from "./components/MapaFondo";
import type { ResultadoPhoton } from "./interface/interfaces";
import type { RutaDatos } from "./interface/interfaces";

function App() {

  const [direccionOrigen, setDireccionOrigen] = useState<string>("");
  const [direccionDestino, setDireccionDestino] = useState<string>("");
  const [ciudad, setCiudad] = useState<string>("");

  const [datosRuta, setDatosRuta] = useState<RutaDatos>({
    coordenadas: [],
    origen: null,
    destino: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!direccionOrigen || !direccionDestino || !ciudad) {
      alert("Información incompleta");
      return
    }

    try {
      const resOrigen = await fetch(`https://photon.komoot.io/api/?q=${direccionOrigen}, ${ciudad}&limit=1`);
      const dataOrigen: ResultadoPhoton = await resOrigen.json()

      const resDestino = await fetch(`https://photon.komoot.io/api/?q=${direccionDestino}, ${ciudad}&limit=1`);
      const dataDestino: ResultadoPhoton = await resDestino.json()

      if (dataOrigen.features.length > 0 && dataDestino.features.length > 0) {
        const [lonOrigen, latOrigen] = dataOrigen.features[0].geometry.coordinates;
        const [lonDestino, latDestino] = dataDestino.features[0].geometry.coordinates;
        const resRuta = await fetch(`https://router.project-osrm.org/route/v1/driving/${lonOrigen},${latOrigen};${lonDestino},${latDestino}?overview=full&geometries=geojson`);
        const datosRuta = await resRuta.json();
        if (datosRuta.routes && datosRuta.routes.length > 0) {
          const ruta = datosRuta.routes[0];
          const coordenadasRuta = ruta.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
          setDatosRuta({
            coordenadas: coordenadasRuta,
            origen: [latOrigen, lonOrigen],
            destino: [latDestino, lonDestino]
          })
        }
        console.log("Datos de la ruta: ", datosRuta)
        console.log("Coordenadas de origen: ", latOrigen, lonOrigen)
        console.log("Coordenadas de destino: ", latDestino, lonDestino)
      }else{
        alert("No se encontró la ubicación");
      }
    } catch (e) {
      console.log("Error al encontrar la ubicación: ", e)
    }
    
    setDireccionOrigen("");
    setDireccionDestino("");
    setCiudad("");

  }

  return (
    <>
    
      <MapaFondo />
      <form onSubmit={handleSubmit} className="absolute top-10 left-1/2 -translate-x-1/2 z-10 flex justify-center items-center gap-5 w-fit p-4 bg-gray-400 rounded-3xl shadow-[0_0_20px_8px] shadow-white/30" >
        <div className="relative w-80 text-gray-500 focus-within:text-gray-500">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <MapPin size={20} />
          </div>
          <input value={direccionOrigen} onChange={(e)=> setDireccionOrigen(e.target.value)} className="w-full p-3 pl-12 bg-white rounded-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Ingresa tu dirección de origen" />
        </div>
        <div className="relative w-80 focus-within:text-gray-500">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Navigation size={20} className="rotate-90" /> 
          </div>
          <input value={direccionDestino} onChange={(e)=> setDireccionDestino(e.target.value)} className="w-full p-3 pl-12 bg-white rounded-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Ingresa tu dirección de destino" />
        </div>
        <div className="relative w-80 focus-within:text-gray-500">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
           <Building2 size={20} />
          </div>
          <input value={ciudad} onChange={(e)=> setCiudad(e.target.value)} className="w-full p-3 pl-12 bg-white rounded-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Ingresa tu ciudad"/>
        </div>
        <button className="bg-white p-3 rounded-2xl cursor-pointer hover:bg-gray-500 transition-colors duration-400 ease-in-out" type="submit">Buscar</button>
      </form>
    </>
  )
}

export default App
