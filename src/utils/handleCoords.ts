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

  // Create points in all 4 directions to get proper bounds
  const north = turf.destination(center, offsetMiles, 0, { units: 'miles' })
  const east = turf.destination(center, offsetMiles, 90, { units: 'miles' })
  const south = turf.destination(center, offsetMiles, 180, { units: 'miles' })
  const west = turf.destination(center, offsetMiles, 270, { units: 'miles' })

  // Extract coordinates
  const northLat = north.geometry.coordinates[1]
  const eastLng = east.geometry.coordinates[0]
  const southLat = south.geometry.coordinates[1]
  const westLng = west.geometry.coordinates[0]

  // Create bounding box using proper format [west, south, east, north]
  const bbox = turf.bboxPolygon([westLng, southLat, eastLng, northLat])

  // Create corner points
  const bottomRight: LatLng = { lat: southLat, lon: eastLng }
  const topLeft: LatLng = { lat: northLat, lon: westLng }

  return {
    bbox: bbox.geometry,
    bottomRight,
    topLeft,
  }
}
