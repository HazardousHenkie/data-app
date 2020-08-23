import { useState, useEffect } from 'react'

import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

import { Reducer } from 'redux'
import { useInjectReducer } from 'utils/redux-injectors'
import makeSelectCountry from 'containers/HomePage/Molecules/CountryListItem/selectors'

import request from 'utils/request'

import reducer from 'containers/HomePage/Molecules/CountryListItem/reducer'
import CountryAdvisoryInterface from './types'

const stateSelector = createSelector(makeSelectCountry(), country => ({
    country
}))

const useCountryAdvisory = () => {
    const { country } = useSelector(stateSelector)
    const [loading, setLoading] = useState<boolean>(false)
    const [fetchingError, setFetchingError] = useState<string>()
    const [countryAdvisory, setCountryAdvisory] = useState<
        CountryAdvisoryInterface
    >()

    useInjectReducer({ key: 'country', reducer: reducer as Reducer })

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const result = await request(
                    `https://www.travel-advisory.info/api?countrycode=${country.alpha2Code}`
                )

                if (result) {
                    setCountryAdvisory(result.data[country.alpha2Code])
                }
            } catch (error) {
                if (error.response.status !== 404) {
                    setFetchingError(error.responseText)
                }
            }

            setLoading(false)
        }

        fetchData()
    }, [country])

    return { loading, fetchingError, countryAdvisory }
}

export default useCountryAdvisory
