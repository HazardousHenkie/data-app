import React, { useState, useEffect, useRef, useContext } from 'react'

import { isEmpty } from 'lodash'

import { Map, Marker, MapProps, TileLayer } from 'react-leaflet'
import * as Leaflet from 'leaflet'

import Loader from 'components/Atoms/Loader'
import DrawerContext from 'components/Organisms/Drawer/DrawerContext'

import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

import makeSelectCountry from 'containers/HomePage/Molecules/CountryListItem/selectors'

import StyledMap from './styledComponents'

const stateSelector = createSelector(makeSelectCountry(), country => ({
    country
}))

const useMapRef = () => {
    const mapRef = useRef() as React.RefObject<Map<MapProps, Leaflet.Map>>

    useEffect(() => {
        const map = mapRef.current

        if (map) {
            map.leafletElement.locate()
        }
    }, [mapRef])

    return mapRef
}

const useMapState = () => {
    const { country } = useSelector(stateSelector)
    const [mapState, setMapState] = useState({ lat: 0.0, lng: 0.0 })

    useEffect(() => {
        if (country.latlng) {
            setMapState({ lat: country.latlng[0], lng: country.latlng[1] })
        }
    }, [country])

    return { mapState, setMapState }
}

const OSMap: React.FC = () => {
    const { country } = useSelector(stateSelector)
    const [zoom] = useState(6)
    const [loading, setLoading] = useState(true)
    const mapRef = useMapRef()
    const { mapState, setMapState } = useMapState()

    const { setOpenDrawer } = useContext(DrawerContext)

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

                {!isEmpty(country) && (
                    <Marker
                        onClick={() => {
                            setOpenDrawer(true)
                        }}
                        position={[mapState.lat, mapState.lng]}
                    />
                )}
            </StyledMap>
        </>
    )
}

export default OSMap
