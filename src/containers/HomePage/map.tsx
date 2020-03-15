import React, { useState, useEffect } from 'react'

import { TileLayer } from 'react-leaflet'

import { StyledMap } from './styledComponents'
import Loader from 'components/Atoms/Loader'

const OSMap: React.FC = () => {
  const [mapState, setMapState] = useState({ lat: 0.0, lng: 0.0 })
  const [zoom] = useState(6)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      getLocationSuccess,
      getLocationError
    )
  }, [])

  const getLocationSuccess = (position: Record<string, any>) => {
    setMapState({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })

    setLoading(false)
  }

  const getLocationError = () => {
    setLoading(false)
  }

  return (
    <>
      {loading && <Loader />}

      <StyledMap center={[mapState.lat, mapState.lng]} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </StyledMap>
    </>
  )
}

export default OSMap
