import React, { useState, useContext } from 'react'

import { Marker, TileLayer } from 'react-leaflet'
import * as Leaflet from 'leaflet'

import Loader from 'components/Atoms/Loader'
import DrawerContext from 'components/Organisms/Drawer/DrawerContext'

import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

import reducer from 'containers/HomePage/Molecules/CountryListItem/reducer'
import makeSelectCountry from 'containers/HomePage/Molecules/CountryListItem/selectors'

import { Reducer } from 'redux'
import { useInjectReducer } from 'utils/redux-injectors'

import StyledMap from './styledComponents'

import useMapRef from './useMapRefHook'
import useMapState from './useMapStateHook'

const stateSelector = createSelector(makeSelectCountry(), country => ({
    country
}))

const key = 'country'

const OSMap: React.FC = () => {
    const { country } = useSelector(stateSelector)
    const [zoom] = useState(6)
    const [loading, setLoading] = useState(true)
    const mapRef = useMapRef()
    const { mapState, setMapState } = useMapState()

    useInjectReducer({ key, reducer: reducer as Reducer })

    const { setOpenDrawer } = useContext(DrawerContext)

    const getLocationSuccess = (e: Leaflet.LocationEvent): void => {
        setMapState(e.latlng)
        setLoading(false)
    }

    const getLocationError = (): void => {
        setLoading(false)
    }

    return (
        <div data-testid="OSMap">
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
                    data-testid="TileLayer"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
                />

                {country && country.alpha2Code !== '' && (
                    <Marker
                        onClick={() => {
                            setOpenDrawer(true)
                        }}
                        position={[mapState.lat, mapState.lng]}
                    />
                )}
            </StyledMap>
        </div>
    )
}

export default OSMap
