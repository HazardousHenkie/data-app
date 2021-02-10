import { useState, useEffect } from 'react'

import { createStructuredSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'

import ERROR_STATUS_CODES from 'utils/errorStatusCodes'

import { getRefreshTokenRequest } from 'globals/authentication/refreshToken/actions'
import { logoutRequest } from 'globals/authentication/logout/actions'

import { setFavoritedCountries } from 'globals/favoritedCountriesList/actions'
import { setError } from 'globals/globalErrors/actions'
import authToken from 'globals/authentication/authToken'
import { FavoritedCountryInterface } from 'globals/favoritedCountriesList/types'
import { initialFavoritedCountriesState } from 'globals/favoritedCountriesList/constants'

import request from 'utils/request'

import { makeSelectFavoritedCountries } from 'globals/favoritedCountriesList/selectors'
import ENDPOINTS from 'utils/constants'

const stateSelector = createStructuredSelector({
    favoritedCountries: makeSelectFavoritedCountries()
})

const useCountryFavorite = (
    favoritedCountry: FavoritedCountryInterface,
    initialClicked?: boolean
) => {
    const dispatch = useDispatch()
    const [clicked, setClicked] = useState<boolean>(initialClicked || false)
    const [loading, setLoading] = useState<boolean>(false)
    const [countrySucessfullRequest, setCountrySucessfullRequest] = useState<
        FavoritedCountryInterface
    >()

    const { favoritedCountries } = useSelector(stateSelector)

    useEffect(() => {
        if (clicked) {
            const fetchData = async () => {
                setLoading(true)
                setClicked(false)

                let fetchRequest: FavoritedCountryInterface

                try {
                    if (favoritedCountry.ref['@ref'].id !== '') {
                        fetchRequest = await request(
                            `${ENDPOINTS.DELETE_COUNTRY}${favoritedCountry.ref['@ref'].id}`,
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
                            `${ENDPOINTS.SAVE_COUNTRY}${favoritedCountry.data.countryId}`,
                            {
                                method: 'GET',
                                headers: {
                                    Authorization: `Bearer ${authToken.token}`
                                }
                            }
                        )

                        setCountrySucessfullRequest(fetchRequest)

                        if (
                            favoritedCountries &&
                            favoritedCountries.length === 1 &&
                            favoritedCountries[0].ts === 0
                        ) {
                            dispatch(setFavoritedCountries([fetchRequest]))
                        } else {
                            dispatch(
                                setFavoritedCountries([
                                    ...favoritedCountries,
                                    fetchRequest
                                ])
                            )
                        }
                    }
                } catch (error) {
                    if (
                        error.response &&
                        error.response.status ===
                            ERROR_STATUS_CODES.UNAUTHORIZED &&
                        localStorage.getItem('userId')
                    ) {
                        dispatch(
                            getRefreshTokenRequest(
                                localStorage.getItem('userId') as string
                            )
                        )
                    } else {
                        dispatch(logoutRequest())
                    }

                    if (error.response && error.response.status !== 404) {
                        dispatch(setError(error))
                    }
                }

                setLoading(false)
            }

            fetchData()
        }
    }, [favoritedCountries, dispatch, favoritedCountry, clicked])

    return {
        loading,
        countrySucessfullRequest,
        setClicked
    }
}

export default useCountryFavorite
