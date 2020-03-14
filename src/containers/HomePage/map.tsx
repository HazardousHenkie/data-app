import React, { useState } from 'react'

import { Map, TileLayer } from 'react-leaflet'

import { StyledMap } from './styledComponents'

const OSMap: React.FC = () => {
  const [mapState] = useState({ lat: 51.505, lng: -0.09, zoom: 13 })

  const handleLocationFound = () => event => {
    console.log('tesr', event.latLng)
  }

  return (
    <Map
      center={[mapState.lat, mapState.lng]}
      onLocationfound={handleLocationFound}
      zoom={mapState.zoom}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </Map>
  )
}

export default OSMap
