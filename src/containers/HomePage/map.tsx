import React, { useState, useEffect, useRef } from 'react'

import { Map, MapProps, TileLayer } from 'react-leaflet'
import * as Leaflet from 'leaflet'

import Loader from 'components/Atoms/Loader'
import StyledMap from './styledComponents'

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

    const getLocationSuccess = (e: Leaflet.LocationEvent): void => {
        setMapState(e.latlng)
        setLoading(false)
    }

    const getLocationError = (): void => {
        setLoading(false)
    }

    return (
        <>
            {loading && <Loader />}

            <StyledMap
                zoomControl={false}
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
