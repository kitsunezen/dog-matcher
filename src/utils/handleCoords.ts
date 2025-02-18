import * as turf from '@turf/turf'
import type { GeoJSON } from 'geojson'

export interface LatLng {
  lat: number
  lon: number
}

export interface BoundingBox {
  bbox: GeoJSON.Polygon
  bottomRight: LatLng
  topLeft: LatLng
}

export function createBoundingBoxTurf(
  latitude: number,
  longitude: number,
  offsetMiles: number,
): BoundingBox {
  const center = turf.point([longitude, latitude])

  const southEast = turf.destination(center, offsetMiles, 225, { units: 'miles' })
  const northWest = turf.destination(center, offsetMiles, 45, { units: 'miles' })

  const seCoords = southEast.geometry.coordinates as [number, number]
  const nwCoords = northWest.geometry.coordinates as [number, number]

  // Create the bounding box using coordinates directly:
  const bbox = turf.bboxPolygon([seCoords[0], seCoords[1], nwCoords[0], nwCoords[1]])
  // Extract bottom-left and top-right coordinates from the bounding box
  const bottomRight: LatLng = { lat: seCoords[1], lon: seCoords[0] }
  const topLeft: LatLng = { lat: nwCoords[1], lon: nwCoords[0] }

  return {
    bbox: bbox.geometry,
    bottomRight,
    topLeft,
  }
}
