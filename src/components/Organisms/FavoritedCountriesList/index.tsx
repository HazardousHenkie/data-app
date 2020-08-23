import React from 'react'

import { useTranslation } from 'react-i18next'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { createStructuredSelector } from 'reselect'
import { useSelector } from 'react-redux'

import InlineLoader from 'components/Atoms/InlineLoader'

import {
    makeSelectFavoritedCountries,
    makeSelectLoader
} from 'globals/favoritedCountriesList/selectors'
import FavoritedCountriesList from './styledComponents'

const stateSelector = createStructuredSelector({
    favoritedCountries: makeSelectFavoritedCountries(),
    loading: makeSelectLoader()
})

const MenuList: React.FC = () => {
    const { t } = useTranslation('menuList')
    const { favoritedCountries, loading } = useSelector(stateSelector)

    return (
        <FavoritedCountriesList data-testid="FavoritedCountriesList">
            {loading && <InlineLoader />}

            {favoritedCountries &&
                favoritedCountries[0] &&
                favoritedCountries[0].ts !== 0 && (
                    <List
                        data-testid="FavoritedCountriesList_list"
                        aria-label={t(
                            'favoritedCountryList:titleMenu',
                            'Favorite countries'
                        )}
                    >
                        <ListItem>
                            <ListItemText
                                primary={t(
                                    'menuList:favoriteCountries',
                                    'Favorite countries'
                                )}
                            />
                        </ListItem>

                        {favoritedCountries.map(favoritedCountry => (
                            <ListItem key={favoritedCountry.data.countryId}>
                                <ListItemText
                                    primary={favoritedCountry.data.countryId}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
        </FavoritedCountriesList>
    )
}

export default MenuList
