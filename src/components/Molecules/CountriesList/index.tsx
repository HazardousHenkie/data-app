import React, { useState, useEffect } from 'react'

import SearchField from 'components/Molecules/SearchField'

import { createStructuredSelector } from 'reselect'

import { useDispatch, useSelector } from 'react-redux'
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors'
import reducer from './reducer'
import saga from './saga'

import { getCountriesData } from './actions'

import { makeSelectError, makeSelectLoader, makeSelectData } from './selectors'

const key = 'countriesData'

const stateSelector = createStructuredSelector({
    data: makeSelectData(),
    error: makeSelectError(),
    loading: makeSelectLoader()
})

const CountriesList: React.FC = () => {
    const { error, loading, data } = useSelector(stateSelector)
    const [searchString, setSearchString] = useState('')
    const dispatch = useDispatch()

    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })

    useEffect(() => {
        dispatch(getCountriesData())
    }, [dispatch])

    // intiial full list off counties
    // when search filter with js function just get a search param in
    // search param is optional
    // show loader
    // show error
    // add countries flags

    return <SearchField setValue={setSearchString} value={searchString} />
}

export default CountriesList
