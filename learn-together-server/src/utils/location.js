const haversineDistanceWithAltitude = (coord1, coord2) => {
  const R = 6371; // Radius of the Earth in kilometers

  const lat1 = coord1.latitude;
  const lon1 = coord1.longitude;
  const alt1 = coord1.altitude || 0; // Default altitude to 0 if not provided
  const lat2 = coord2.latitude;
  const lon2 = coord2.longitude;
  const alt2 = coord2.altitude || 0; // Default altitude to 0 if not provided

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const dAlt = alt2 - alt1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = Math.sqrt(c * c + dAlt * dAlt) * R; // Distance in kilometers
  return distance;
};

module.exports = {
  haversineDistanceWithAltitude,
};

//   const coord1 = {
//     latitude: 37.4226711,
//     longitude: -122.0849872,
//     altitude: 0,
//   };

//   const coord2 = {
//     latitude: 34.052235,
//     longitude: -118.243683,
//     altitude: 100,
//   };
