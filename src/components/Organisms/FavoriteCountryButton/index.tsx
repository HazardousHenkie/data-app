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

import {
    makeSelectFavoritedCountries,
    makeSelectError,
    makeSelectLoader
} from 'globals/favoritedCountriesList/selectors'

const useCountryFavorite = (
    favoritedCountry: string,
    active: boolean,
    clicked: boolean
) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [querySuccessfull, setQuerySuccessfull] = useState(false)
    const [fetchingError, setFetchingError] = useState<Error>()

    // only show button when logged In
    useEffect(() => {
        if (favoritedCountry !== '' && clicked) {
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
    clickedCountry: string
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
    const [favoritedCountry, setFavoritedCountry] = useState<string>('')
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
            favoriteCountry => favoriteCountry.data.countryId === clickedCountry
        )

        if (isAlreadyFavoriteCountry) {
            setActive(true)
        }
    }, [favoritedCountries, clickedCountry])

    useEffect(() => {
        if (querySuccessfull) {
            setActive(activeState => !activeState)
            setClicked(false)
        }
    }, [querySuccessfull])

    const toggleFavorite = () => {
        setClicked(true)
        setFavoritedCountry(clickedCountry)
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
