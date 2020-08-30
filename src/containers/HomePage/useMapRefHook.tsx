import React, { useEffect, useRef } from 'react'

import { Map, MapProps } from 'react-leaflet'
import * as Leaflet from 'leaflet'

const useMapRef = () => {
    const mapRef = useRef() as React.RefObject<Map<MapProps, Leaflet.Map>>

    useEffect(() => {
        const map = mapRef.current

        if (map) {
            map.leafletElement.locate({ timeout: 5000 })
        }
    }, [mapRef])

    return mapRef
}

export default useMapRef
