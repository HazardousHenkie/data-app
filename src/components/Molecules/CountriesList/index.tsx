import React, { useEffect, useState } from 'react'

import { createStructuredSelector } from 'reselect'

import { useDispatch, useSelector } from 'react-redux'
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors'

import InlineLoader from 'components/Atoms/InlineLoader'
import InfoMessage from 'components/Atoms/InfoMessage'
import CountryListItem from 'components/Molecules/CountryListItem'

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

const CountriesList: React.FC<CountriesListProps> = ({
    open,
    setOpen,
    searchString
}) => {
    const { error, loading, data } = useSelector(stateSelector)
    const [countries, setCountries] = useState([])

    const dispatch = useDispatch()

    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })

    useEffect(() => {
        setCountries(data)
    }, [data])

    useEffect(() => {
        dispatch(getCountriesData())
    }, [dispatch])

    useEffect(() => {
        if (searchString) {
            setCountries(
                data.filter((country: Record<string, string>) =>
                    RegExp(searchString.toLowerCase()).exec(
                        country.name.toLowerCase()
                    )
                )
            )
        } else if (searchString === '') {
            setCountries(data)
        }
    }, [searchString, data])

    // where to put these files
    // add countries flags
    // change language for japanese and stuff

    return (
        <Fade in={open}>
            <CountriesListDiv>
                {error && (
                    <InfoMessage severity="error" message={error.toString()} />
                )}

                {loading ? (
                    <InlineLoader />
                ) : (
                    <List component="nav" aria-label="main mailbox folders">
                        {countries.map((country: Record<string, string>) => (
                            <div key={country.name}>
                                <CountryListItem
                                    setOpen={setOpen}
                                    name={country.name}
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
