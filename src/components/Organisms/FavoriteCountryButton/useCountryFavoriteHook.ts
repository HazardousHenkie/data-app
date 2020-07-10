import { useState, useEffect } from 'react'

import { createStructuredSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'

import { setFavoritedCountries } from 'globals/favoritedCountriesList/actions'
import { setError } from 'globals/globalErrors/actions'
import authToken from 'globals/authentication/authToken'
import { FavoritedCountryInterface } from 'globals/favoritedCountriesList/types'
import { initialFavoritedCountriesState } from 'globals/favoritedCountriesList/constants'

import request from 'utils/request'

import {
    makeSelectFavoritedCountries,
    makeSelectLoader
} from 'globals/favoritedCountriesList/selectors'

const stateSelector = createStructuredSelector({
    favoritedCountries: makeSelectFavoritedCountries(),
    loading: makeSelectLoader()
})

const useCountryFavorite = (
    favoritedCountry: FavoritedCountryInterface,
    active: boolean,
    clicked: boolean
) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState<boolean>(false)
    const [countrySucessfullRequest, setCountrySucessfullRequest] = useState<
        FavoritedCountryInterface
    >()
    const { favoritedCountries } = useSelector(stateSelector)

    useEffect(() => {
        if (clicked) {
            const fetchData = async () => {
                setLoading(true)
                let fetchRequest: FavoritedCountryInterface

                try {
                    if (favoritedCountry.ref['@ref'].id !== '') {
                        fetchRequest = await request(
                            `/.netlify/functions/deleteCountry/${favoritedCountry.ref['@ref'].id}`,
                            {
                                method: 'DELETE',
                                headers: {
                                    Authorization: `Bearer ${authToken.token}`
                                }
                            }
                        )

                        setCountrySucessfullRequest({
                            ...initialFavoritedCountriesState.countries[0],
                            data: {
                                ...initialFavoritedCountriesState.countries[0]
                                    .data,
                                countryId: favoritedCountry.data.countryId
                            }
                        })

                        dispatch(
                            setFavoritedCountries(
                                favoritedCountries.filter(
                                    country =>
                                        country.data.countryId !==
                                        favoritedCountry.data.countryId
                                )
                            )
                        )
                    } else {
                        fetchRequest = await request(
                            `/.netlify/functions/saveCountry/${favoritedCountry.data.countryId}`,
                            {
                                method: 'GET',
                                headers: {
                                    Authorization: `Bearer ${authToken.token}`
                                }
                            }
                        )

                        setCountrySucessfullRequest(fetchRequest)

                        dispatch(
                            setFavoritedCountries([
                                ...favoritedCountries,
                                fetchRequest
                            ])
                        )
                    }
                } catch (error) {
                    if (error.response && error.response.status !== 404) {
                        dispatch(setError(error))
                    }
                }

                setLoading(false)
            }

            fetchData()
        }
    }, [favoritedCountries, dispatch, favoritedCountry, active, clicked])

    return {
        loading,
        countrySucessfullRequest
    }
}

export default useCountryFavorite
