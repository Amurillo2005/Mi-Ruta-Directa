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

    const origenSeguro = encodeURIComponent(direccionOrigen);
    const destinoSeguro = encodeURIComponent(direccionDestino);

    try {
      const resOrigen = await fetch(`https://photon.komoot.io/api/?q=${origenSeguro},${ciudad}&limit=1`);
      const dataOrigen: ResultadoPhoton = await resOrigen.json()

      const resDestino = await fetch(`https://photon.komoot.io/api/?q=${destinoSeguro},${ciudad}&limit=1`);
      const dataDestino: ResultadoPhoton = await resDestino.json()

      if (dataOrigen.features.length > 0 && dataDestino.features.length > 0) {

        const [lonO, latO] = dataOrigen.features[0].geometry.coordinates;
        const [lonD, latD] = dataDestino.features[0].geometry.coordinates;
        const resRuta = await fetch(`https://router.project-osrm.org/route/v1/driving/${lonO},${latO};${lonD},${latD}?overview=full&geometries=geojson`);
        const datosRuta = await resRuta.json();
        if (datosRuta.routes && datosRuta.routes.length > 0) {
          const ruta = datosRuta.routes[0];
          const coordenadasRuta = ruta.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
          setDatosRuta({
            coordenadas: coordenadasRuta,
            origen: [latO, lonO],
            destino: [latD, lonD]
          })
        }
        console.log("Datos de la ruta: ", datosRuta)
        console.log("Coordenadas de origen: ", latO, lonO)
        console.log("Coordenadas de destino: ", latD, lonD)
      } else {
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

      <MapaFondo datos={datosRuta} />
      <form onSubmit={handleSubmit} className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 z-20 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2 w-[92%] md:w-fit max-w-6xl p-3 md:p-2 bg-gray-400 rounded-3xl shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64 lg:w-72 text-gray-500">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <MapPin size={18} />
            </div>
            <input value={direccionOrigen} onChange={(e) => setDireccionOrigen(e.target.value)} className="w-full p-3 pl-11 bg-white rounded-full placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Origen"/>
          </div>
          <div className="relative w-full md:w-64 lg:w-72 text-gray-500">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Navigation size={18} className="rotate-90" />
            </div>
            <input value={direccionDestino} onChange={(e) => setDireccionDestino(e.target.value)} className="w-full p-3 pl-11 bg-white rounded-full placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Destino"/>
          </div>
          <div className="relative w-full md:w-40 lg:w-48 text-gray-500">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Building2 size={18} />
            </div>
            <input value={ciudad} onChange={(e) => setCiudad(e.target.value)} className="w-full p-3 pl-11 bg-white rounded-full placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Ciudad"/>
          </div>
        </div>
        <button className="w-full md:w-auto px-8 py-3 bg-white text-gray-700 rounded-full md:rounded-2xl  hover:bg-gray-100 transition-all duration-300 shadow-sm active:scale-95" type="submit"> Buscar </button>
      </form>
    </>
  )
}

export default App
