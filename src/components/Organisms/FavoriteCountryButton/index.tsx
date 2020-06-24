import React, { useState, useEffect } from 'react'

import HeartButton from 'components/Molecules/HeartButton'

import { useTranslation } from 'react-i18next'

import authToken from 'globals/authentication/authToken'
import request from 'utils/request'

import { createStructuredSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors'
import { getFavoritedCountries } from 'globals/favoritedCountriesList/actions'

import reducer from 'globals/favoritedCountriesList//reducer'
import saga from 'globals/favoritedCountriesList/saga'

import { FavoritedCountryInterface } from 'globals/favoritedCountriesList/types'
import { initialFavoritedCountriesState } from 'globals/favoritedCountriesList/constants'
import { CountryInterface } from 'containers/HomePage/Molecules/CountryListItem/types'

import { query } from 'faunadb'

import {
    makeSelectFavoritedCountries,
    makeSelectError,
    makeSelectLoader
} from 'globals/favoritedCountriesList/selectors'

const useCountryFavorite = (
    favoritedCountry: FavoritedCountryInterface,
    active: boolean,
    clicked: boolean
) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [querySuccessfull, setQuerySuccessfull] = useState(false)
    const [fetchingError, setFetchingError] = useState<Error>()

    // only show button when logged In
    useEffect(() => {
        // iff favoritedcountry has ref other then 0 it's a delete request
        // active may not be necessary anymore
        // if it's a save return the favorited country otherwise return the clicked country (favoritedcountry)
        if (favoritedCountry.data.countryId !== '' && clicked) {
            let fetchRequest: Promise<Response>

            if (active) {
                setQuerySuccessfull(false)
                // todo.ref['@ref'].id this one? and make it after tht again
                fetchRequest = request(
                    `/.netlify/functions/deleteCountry/${favoritedCountry.data.countryId}`,
                    {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${authToken.token}`
                        }
                    }
                )
            } else {
                fetchRequest = request(
                    `/.netlify/functions/saveCountry/${favoritedCountry.data.countryId}`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${authToken.token}`
                        }
                    }
                )
            }
            const fetchData = async () => {
                setLoading(true)
                try {
                    await fetchRequest
                    setQuerySuccessfull(true)
                } catch (error) {
                    if (error.response.status !== 404) {
                        setFetchingError(error)
                    }
                }

                setLoading(false)
            }

            fetchData()
        }
    }, [favoritedCountry, active, clicked])

    return { loading, querySuccessfull, fetchingError }
}

interface FavoriteCountryButtonInterface {
    clickedCountry: CountryInterface
}

const stateSelector = createStructuredSelector({
    favoritedCountries: makeSelectFavoritedCountries(),
    error: makeSelectError(),
    loading: makeSelectLoader()
})

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
    // error handling
    const { loading, querySuccessfull } = useCountryFavorite(
        favoritedCountry,
        active,
        clicked
    )
    const { t } = useTranslation('FavoriteCountryButton')

    const { favoritedCountries } = useSelector(stateSelector)

    useEffect(() => {
        if (favoritedCountries[0].ts === 0) {
            dispatch(getFavoritedCountries())
        }
    }, [dispatch, favoritedCountries])

    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })

    useEffect(() => {
        const isAlreadyFavoriteCountry = favoritedCountries.find(
            favoriteCountry =>
                favoriteCountry.data.countryId === clickedCountry.alpha2Code
        )

        if (isAlreadyFavoriteCountry) {
            setFavoritedCountry(isAlreadyFavoriteCountry)
            setActive(true)
        }
    }, [favoritedCountries, clickedCountry])

    // useEffect(() => {
    //     // return favorited country if it's a new save
    //     if (queryFavoritedCountry) {
    //         setActive(activeState => !activeState)
    //         setFavoritedCountry(queryFavoritedCountry)
    //         setClicked(false)
    //     }
    // }, [queryFavoritedCountry])

    const toggleFavorite = () => {
        setClicked(true)

        // make this more beatifull? maybe use a spread from the constants and only assing data.countryid
        if (!favoritedCountry) {
            setFavoritedCountry({
                ref: query.Ref(query.Collection('country_user'), ''),
                ts: 0,
                data: {
                    userId: '',
                    countryId: clickedCountry.alpha2Code,
                    updatedAt: 0,
                    createdAt: 0
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
