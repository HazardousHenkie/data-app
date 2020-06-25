import React, { useState, useEffect } from 'react'

import HeartButton from 'components/Molecules/HeartButton'

import { useTranslation } from 'react-i18next'

import authToken from 'globals/authentication/authToken'
import request from 'utils/request'

import { createStructuredSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors'
import {
    getFavoritedCountries,
    setFavoritedCountries
} from 'globals/favoritedCountriesList/actions'

import reducer from 'globals/favoritedCountriesList//reducer'
import saga from 'globals/favoritedCountriesList/saga'

import { FavoritedCountryInterface } from 'globals/favoritedCountriesList/types'
import { initialFavoritedCountriesState } from 'globals/favoritedCountriesList/constants'
import { CountryInterface } from 'containers/HomePage/Molecules/CountryListItem/types'

import {
    makeSelectFavoritedCountries,
    makeSelectError,
    makeSelectLoader
} from 'globals/favoritedCountriesList/selectors'

const stateSelector = createStructuredSelector({
    favoritedCountries: makeSelectFavoritedCountries(),
    error: makeSelectError(),
    loading: makeSelectLoader()
})

const useCountryFavorite = (
    favoritedCountry: FavoritedCountryInterface,
    active: boolean,
    clicked: boolean
) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState<boolean>(false)
    const [fetchingError, setFetchingError] = useState<Error>()
    const [countrySucessfullRequest, setCountrySucessfullRequest] = useState<
        FavoritedCountryInterface
    >()
    const { favoritedCountries } = useSelector(stateSelector)
    // fix serverless function
    // fix errors make into seperate component
    // only show button when logged In
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
                        setFetchingError(error)
                    }
                }

                setLoading(false)
            }

            fetchData()
        }
    }, [favoritedCountries, dispatch, favoritedCountry, active, clicked])

    return {
        loading,
        countrySucessfullRequest,
        fetchingError
    }
}

interface FavoriteCountryButtonInterface {
    clickedCountry: CountryInterface
}

const FavoriteCountryButton: React.FC<FavoriteCountryButtonInterface> = ({
    clickedCountry
}) => {
    const key = 'favoritedCountries'
    const dispatch = useDispatch()
    const [favoritedCountry, setFavoritedCountry] = useState<
        FavoritedCountryInterface
    >({
        ...initialFavoritedCountriesState.countries[0]
    })
    const [active, setActive] = useState<boolean>(false)
    const [clicked, setClicked] = useState<boolean>(false)

    const {
        loading,
        countrySucessfullRequest,
        fetchingError
    } = useCountryFavorite(favoritedCountry, active, clicked)
    const { t } = useTranslation('FavoriteCountryButton')

    const { favoritedCountries } = useSelector(stateSelector)

    useEffect(() => {
        if (
            favoritedCountries &&
            favoritedCountries[0] &&
            favoritedCountries[0].ts === 0
        ) {
            dispatch(getFavoritedCountries())
        }
    }, [dispatch, favoritedCountries])

    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })

    useEffect(() => {
        if (favoritedCountries) {
            const isAlreadyFavoriteCountry = favoritedCountries.find(
                favoriteCountry =>
                    favoriteCountry.data.countryId === clickedCountry.alpha2Code
            )

            if (isAlreadyFavoriteCountry) {
                setFavoritedCountry(isAlreadyFavoriteCountry)
                setActive(true)
            }
        }
    }, [favoritedCountries, clickedCountry])

    useEffect(() => {
        if (countrySucessfullRequest) {
            setActive(activeState => !activeState)
            setFavoritedCountry(countrySucessfullRequest)
            setClicked(false)
        }
    }, [countrySucessfullRequest])

    const toggleFavorite = () => {
        setClicked(true)

        if (favoritedCountry.ref['@ref'].id === '') {
            setFavoritedCountry({
                ...initialFavoritedCountriesState.countries[0],
                data: {
                    ...initialFavoritedCountriesState.countries[0].data,
                    countryId: clickedCountry.alpha2Code
                }
            })
        }
    }

    return (
        <HeartButton
            loading={loading}
            label={t('FavoriteCountryButton:label', 'Toggle favorite country')}
            active={active}
            heartOnClick={toggleFavorite}
        />
    )
}

export default FavoriteCountryButton
