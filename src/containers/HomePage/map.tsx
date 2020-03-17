import React, { useState, useEffect, useRef } from 'react'

import { Map, MapProps, TileLayer } from 'react-leaflet'
import * as Leaflet from 'leaflet'

import { StyledMap } from './styledComponents'
import Loader from 'components/Atoms/Loader'

const OSMap: React.FC = () => {
  const [mapState, setMapState] = useState({ lat: 0.0, lng: 0.0 })
  const [zoom] = useState(6)
  const [loading, setLoading] = useState(true)
  const mapRef = useRef() as React.RefObject<Map<MapProps, Leaflet.Map>>

  useEffect(() => {
    const map = mapRef.current

    if (map) {
      map.leafletElement.locate()
    }
  }, [mapRef])

  const getLocationSuccess = (e: Leaflet.LocationEvent) => {
    setMapState(e.latlng)
    setLoading(false)
  }

  const getLocationError = () => {
    setLoading(false)
  }

  return (
    <>
      {loading && <Loader />}

      <StyledMap
        center={[mapState.lat, mapState.lng]}
        onlocationfound={getLocationSuccess}
        onlocationerror={getLocationError}
        zoom={zoom}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </StyledMap>
    </>
  )
}

export default OSMap
