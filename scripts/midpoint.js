export function calculateMidpoint(lat1, lon1, lat2, lon2) {
  // Convert latitude and longitude from degrees to radians
  const radLat1 = (lat1 * Math.PI) / 180;
  const radLon1 = (lon1 * Math.PI) / 180;
  const radLat2 = (lat2 * Math.PI) / 180;
  const radLon2 = (lon2 * Math.PI) / 180;

  // Calculate midpoint coordinates in radians
  const radMidLat = (radLat1 + radLat2) / 2;
  let radMidLon = (radLon1 + radLon2) / 2;

  // Ensure the midpoint longitude is within the [-180, 180] range
  if (Math.abs(radLon1 - radLon2) > Math.PI) {
    if (radLon1 < radLon2) {
      radMidLon += Math.PI;
    } else {
      radMidLon -= Math.PI;
    }
  }

  // Convert midpoint coordinates back to degrees
  const midLat = (radMidLat * 180) / Math.PI;
  const midLon = (radMidLon * 180) / Math.PI;

  return [midLat, midLon];
}
