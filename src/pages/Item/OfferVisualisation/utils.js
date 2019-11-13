export const parsePolygonCoordinates = coordinates =>
  coordinates.map(coordinate => ({
    lat: coordinate[1],
    lng: coordinate[0]
  }))
