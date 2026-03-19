# Mi Ruta Directa

Este es un pequeño proyecto para búsqueda de direcciones y cálculo de rutas en tiempo real.

## Tecnologías usadas

- React + TypeScript.
- Tailwind para estilos.
- Leaflet y React Leaflet para mostrar el mapa.
- Photon para búsqueda de las direcciones ingresadas en la base de datos de OpenStreetMap y obtener las latitudes y longitudes.
- OSRM (Open Source Routing Machine) para el cálculo de las rutas ya teniendo latitud y longitud.
- Lucide React para los iconos usados en los inputs.

## Instalación y uso

- Clonar el respositorio con git clone https://github.com/Amurillo2005/Mi-Ruta-Directa
- Ir a la ruta del proyecto con cd Mi-Ruta-directa
- Instalar dependencias con npm install 
- Iniciar el entorno de desarrollo con npm run dev

## Notas

El proyecto tiene ciertos errores como:

- Muchas veces no encuentra las direcciones ingresadas.
- Algunas direcciones no las pone exactas como el usuario las ingresó sino que las pone cerca.
- La dirección de destino la pone en otra ciudad distinta a la que el usuario ingresó.

A pesar de estos errores, estoy satisfecho con el resultado.