import React, { useEffect, useState } from 'react'

import { createStructuredSelector } from 'reselect'

import { useDispatch, useSelector } from 'react-redux'
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors'

import InlineLoader from 'components/Atoms/InlineLoader'
import InfoMessage from 'components/Atoms/InfoMessage'
import { CountryInterface } from 'containers/HomePage/Molecules/CountryListItem/types'
import CountryListItem from 'containers/HomePage/Molecules/CountryListItem'

import Fade from '@material-ui/core/Fade'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import CountriesListDiv from './styledComponents'

import saga from './saga'
import reducer from './reducer'

import { getCountriesData } from './actions'

import { makeSelectError, makeSelectLoader, makeSelectData } from './selectors'

interface CountriesListProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    searchString?: string
}

const key = 'countriesData'

const stateSelector = createStructuredSelector({
    data: makeSelectData(),
    error: makeSelectError(),
    loading: makeSelectLoader()
})

const useGetCountries = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCountriesData())
    }, [dispatch])
}

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

const CountriesList: React.FC<CountriesListProps> = ({
    open,
    setOpen,
    searchString
}) => {
    useGetCountries()
    const countries = useFilteredCountries(searchString)

    const { error, loading } = useSelector(stateSelector)

    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })

    return (
        <Fade in={open}>
            <CountriesListDiv>
                {error && (
                    <InfoMessage severity="error" message={error.toString()} />
                )}

                {loading ? (
                    <InlineLoader />
                ) : (
                    <List component="nav" aria-label="countries">
                        {countries.map(country => (
                            <div key={country.name}>
                                <CountryListItem
                                    setOpen={setOpen}
                                    listCountry={country}
                                />
                                <Divider />
                            </div>
                        ))}
                    </List>
                )}
            </CountriesListDiv>
        </Fade>
    )
}

export default CountriesList
