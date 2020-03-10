import React, { useState } from 'react'

import { TileLayer } from 'react-leaflet'

import { StyledMap } from './styledComponents'

// https://github.com/smeijer/leaflet-geosearch

const OSMap: React.FC = () => {
  const [mapState] = useState({ lat: 51.505, lng: -0.09, zoom: 13 })

  return (
    <StyledMap center={[mapState.lat, mapState.lng]} zoom={mapState.zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        // https://wiki.openstreetmap.org/wiki/Tiles
      />
    </StyledMap>
  )
}

export default OSMap
