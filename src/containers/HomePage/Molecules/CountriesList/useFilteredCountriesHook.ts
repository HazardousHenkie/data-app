import { useEffect, useState } from 'react'

import { createStructuredSelector } from 'reselect'

import { useSelector } from 'react-redux'

import { CountryInterface } from 'containers/HomePage/Molecules/CountryListItem/types'

import { makeSelectData } from './selectors'

const stateSelector = createStructuredSelector({
    data: makeSelectData()
})

const useFilteredCountries = (searchString: string | undefined) => {
    const { data } = useSelector(stateSelector)
    const [countries, setCountries] = useState<CountryInterface[]>([])

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
