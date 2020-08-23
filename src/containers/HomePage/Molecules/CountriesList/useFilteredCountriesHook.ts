import { useEffect, useState } from 'react'

import { createStructuredSelector } from 'reselect'

import { useSelector } from 'react-redux'
import { useInjectReducer } from 'utils/redux-injectors'

import { CountryInterface } from 'containers/HomePage/Molecules/CountryListItem/types'
import reducer from './reducer'

import { makeSelectData } from './selectors'

const stateSelector = createStructuredSelector({
    data: makeSelectData()
})

const useFilteredCountries = (searchString: string | undefined) => {
    const { data } = useSelector(stateSelector)
    const [countries, setCountries] = useState<CountryInterface[]>([])

    useInjectReducer({ key: 'countriesData', reducer })

    useEffect(() => {
        if (searchString && searchString !== '') {
            setCountries(
                data.filter(country =>
                    RegExp(searchString.toLowerCase()).exec(
                        country.name.toLowerCase()
                    )
                )
            )
        } else if (searchString === '') {
            setCountries(data)
        }
    }, [searchString, data])

    return countries
}

export default useFilteredCountries
