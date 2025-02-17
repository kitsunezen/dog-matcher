import * as turf from '@turf/turf'
import type { GeoJSON } from 'geojson'

export interface LatLng {
  lat: number
  lon: number
}

export interface BoundingBox {
  bbox: GeoJSON.Polygon
  bottomLeft: LatLng
  topRight: LatLng
}

export function createBoundingBoxTurf(
  latitude: number,
  longitude: number,
  offsetMiles: number,
): BoundingBox {
  const center = turf.point([longitude, latitude])

  const southWest = turf.destination(center, offsetMiles, 225)
  const northEast = turf.destination(center, offsetMiles, 45)

  const swCoords = southWest.geometry.coordinates as [number, number]
  const neCoords = northEast.geometry.coordinates as [number, number]

  // Create the bounding box using coordinates directly:
  const bbox = turf.bboxPolygon([swCoords[0], swCoords[1], neCoords[0], neCoords[1]])
  // Extract bottom-left and top-right coordinates from the bounding box
  const bottomLeft: LatLng = { lat: swCoords[1], lon: swCoords[0] }
  const topRight: LatLng = { lat: neCoords[1], lon: neCoords[0] }

  return {
    bbox: bbox.geometry,
    bottomLeft,
    topRight,
  }
}
