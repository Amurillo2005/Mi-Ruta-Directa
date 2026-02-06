import { MapPin, Navigation, Building2 } from "lucide-react"
import { useState } from "react"

function App() {

  const [direccionOrigen, setDireccionOrigen] = useState<string>("");
  const [direccionDestino, setDireccionDestino] = useState<string>("");
  const [ciudad, setCiudad] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!direccionOrigen || !direccionDestino || !ciudad) {
      alert("Información incompleta");
      return
    }
    
    setDireccionOrigen("");
    setDireccionDestino("");
    setCiudad("");

  }

  return (
    <>
    
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
