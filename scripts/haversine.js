export function haversine(sourceLatitude, sourceLongitude, destinationLatitude, destinationLongitude) {
  // Radio de la tierra en kilómetros
  const radius = 6371;

  // Convierte coordenadas a radianes
  const sourceLatitudeRad = (sourceLatitude * Math.PI) / 180;
  const sourceLongitudeRad = (sourceLongitude * Math.PI) / 180;
  const destinationLatitudeRad = (destinationLatitude * Math.PI) / 180;
  const destinationLongitudeRad = (destinationLongitude * Math.PI) / 180;

  // Diferencia de latitud y longitud
  const dLat = destinationLatitudeRad - sourceLatitudeRad;
  const dLon = destinationLongitudeRad - sourceLongitudeRad;

  // Formula Haversine
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(sourceLatitudeRad) * Math.cos(destinationLatitudeRad) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = radius * c;

  return distance;
}