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

import { CountryItem } from 'containers/HomePage/Molecules/CountryListItem/constants'
import { CountryInterface } from 'containers/HomePage/Molecules/CountryListItem/types'

import {
    makeSelectFavoritedCountries,
    makeSelectError,
    makeSelectLoader
} from 'globals/favoritedCountriesList/selectors'

const useCountryFavorite = (
    favoritedCountry: CountryInterface,
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
        if (favoritedCountry.alpha2Code !== '' && clicked) {
            let fetchRequest: Promise<Response>

            if (active) {
                setQuerySuccessfull(false)
                // todo.ref['@ref'].id this one? and make it after tht again
                fetchRequest = request(
                    `/.netlify/functions/deleteCountry/${favoritedCountry}`,
                    {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${authToken.token}`
                        }
                    }
                )
            } else {
                fetchRequest = request(
                    `/.netlify/functions/saveCountry/${favoritedCountry}`,
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
    const [favoritedCountry, setFavoritedCountry] = useState<CountryInterface>({
        ...CountryItem.country
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

        console.log(isAlreadyFavoriteCountry)

        // set favoritedcountry if there for use in call
        if (isAlreadyFavoriteCountry) {
            // setFavoritedCountry(isAlreadyFavoriteCountry)
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

        // when toggeling set favoritedocountry first if not just set clickedcountry
        // if (favoritedCountry) {
        // } else {
        //     setFavoritedCountry(clickedCountry)
        // }
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
