import { useState, useEffect } from 'react'

import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

import makeSelectCountry from 'containers/HomePage/Molecules/CountryListItem/selectors'

const stateSelector = createSelector(makeSelectCountry(), country => ({
    country
}))

const useMapState = () => {
    const { country } = useSelector(stateSelector)
    const [mapState, setMapState] = useState({ lat: 0.0, lng: 0.0 })

    useEffect(() => {
        if (country && country.latlng) {
            setMapState({ lat: country.latlng[0], lng: country.latlng[1] })
        }
    }, [country])

    return { mapState, setMapState }
}

export default useMapState
