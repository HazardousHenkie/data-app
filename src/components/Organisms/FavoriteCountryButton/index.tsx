import React, { useState, useEffect } from 'react'

import IconButton from '@material-ui/core/IconButton'

import InlineLoader from 'components/Atoms/InlineLoader'

import { useTranslation } from 'react-i18next'

import { createStructuredSelector } from 'reselect'
import { useSelector } from 'react-redux'

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors'

import reducer from 'globals/favoritedCountriesList//reducer'
import saga from 'globals/favoritedCountriesList/saga'

import { FavoritedCountryInterface } from 'globals/favoritedCountriesList/types'
import { initialFavoritedCountriesState } from 'globals/favoritedCountriesList/constants'
import { CountryInterface } from 'containers/HomePage/Molecules/CountryListItem/types'

import { makeSelectFavoritedCountries } from 'globals/favoritedCountriesList/selectors'

import HeartButtonWrapper, {
    FavoriteIconStyled,
    FavoriteBorderIconStyled
} from './styledComponents'

import useCountryFavorite from './useCountryFavoriteHook'

const stateSelector = createStructuredSelector({
    favoritedCountries: makeSelectFavoritedCountries()
})

interface FavoriteCountryButtonInterface {
    clickedCountry: CountryInterface
}

const FavoriteCountryButton: React.FC<FavoriteCountryButtonInterface> = ({
    clickedCountry
}) => {
    const key = 'favoritedCountries'
    const [favoritedCountry, setFavoritedCountry] = useState<
        FavoritedCountryInterface
    >({
        ...initialFavoritedCountriesState.countries[0]
    })
    const [active, setActive] = useState<boolean>(false)
    const [clicked, setClicked] = useState<boolean>(false)

    const { loading, countrySucessfullRequest } = useCountryFavorite(
        favoritedCountry,
        active,
        clicked
    )
    const { t } = useTranslation('FavoriteCountryButton')

    const { favoritedCountries } = useSelector(stateSelector)

    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })

    // move this logic to the reducer or something, it's hard to test when it's here
    // check if the intitial country is something?
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
        <HeartButtonWrapper data-testid="heartButton">
            {loading && <InlineLoader />}

            <IconButton
                onClick={toggleFavorite}
                aria-label={t(
                    'FavoriteCountryButton:label',
                    'Toggle favorite country'
                )}
                data-testid="iconButton"
            >
                {active ? (
                    <FavoriteIconStyled data-testid="favoriteIcon" />
                ) : (
                    <FavoriteBorderIconStyled data-testid="favoriteIconBorder" />
                )}
            </IconButton>
        </HeartButtonWrapper>
    )
}

export default FavoriteCountryButton
