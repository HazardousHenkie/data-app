import React, { useEffect } from 'react'

import { createStructuredSelector } from 'reselect'

import { useDispatch, useSelector } from 'react-redux'
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors'

import InlineLoader from 'components/Atoms/InlineLoader'
import InfoMessage from 'components/Atoms/InfoMessage'
import CountryListItem from 'containers/HomePage/Molecules/CountryListItem'

import Fade from '@material-ui/core/Fade'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import { ResponseError } from 'utils/request'
import CountriesListDiv from './styledComponents'

import saga from './saga'
import reducer from './reducer'

import { getCountriesData } from './actions'

import { makeSelectError, makeSelectLoader } from './selectors'

import useFilteredCountries from './useFilteredCountriesHook'

interface CountriesListProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    searchString?: string
}

const key = 'countriesData'

const stateSelector = createStructuredSelector({
    error: makeSelectError(),
    loading: makeSelectLoader()
})

const CountriesList: React.FC<CountriesListProps> = ({
    open,
    setOpen,
    searchString
}) => {
    const dispatch = useDispatch()

    const countries = useFilteredCountries(searchString)

    useEffect(() => {
        dispatch(getCountriesData())
    }, [dispatch])

    const { error, loading } = useSelector(stateSelector)

    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })

    return (
        <Fade in={open} data-testid="CountriesList">
            <CountriesListDiv>
                {error && (
                    <InfoMessage
                        severity="error"
                        message={(error as ResponseError).responseText}
                    />
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
