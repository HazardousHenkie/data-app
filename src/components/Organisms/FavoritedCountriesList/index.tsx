import React from 'react'

import { useTranslation } from 'react-i18next'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { createStructuredSelector } from 'reselect'
import { useSelector } from 'react-redux'

import InlineLoader from 'components/Atoms/InlineLoader'

import FavoritedCountriesList from './styledComponents'

import reducer from './reducer'
// import saga from './saga'

import {
    makeSelectFavoritedCountries,
    makeSelectError,
    makeSelectLoader
} from './selectors'

const stateSelector = createStructuredSelector({
    favoritedCountries: makeSelectFavoritedCountries(),
    error: makeSelectError(),
    loading: makeSelectLoader()
})

const MenuList: React.FC = () => {
    const key = 'favoritedCountries'
    const { t } = useTranslation('menuList')
    const { favoritedCountries, loading, error } = useSelector(stateSelector)

    // get countries in saga
    // set up db in fauna
    // get/check one countrie if in list
    // ad button do save/delete and check if on list before or something

    // useInjectReducer({ key, reducer })
    // useInjectSaga({ key, saga })

    return (
        <FavoritedCountriesList>
            {loading && <InlineLoader />}

            {favoritedCountries.map(() => (
                <List aria-label={t('menuList:titleMenu', 'Mainmenu')}>
                    <ListItem>
                        <ListItemText
                            primary={t('menuList:title', 'Data App')}
                        />
                    </ListItem>
                </List>
            ))}
        </FavoritedCountriesList>
    )
}

export default MenuList
