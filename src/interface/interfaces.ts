export interface ResultadoPhoton {
  features: {
    geometry: {
      coordinates: [number, number];
    };
    properties: {
      name: string;
      city?: string;
      state?: string;
      country?: string;
    };
  }[];
}

export interface RutaDatos {
  coordenadas: [number, number][]; 
  origen: [number, number] | null;
  destino: [number, number] | null;
}