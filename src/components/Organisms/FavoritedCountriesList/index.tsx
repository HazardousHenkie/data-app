import React from 'react'

import { useTranslation } from 'react-i18next'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

import { makeSelectLoggedIn } from 'globals/authentication/selectors'

// const stateSelector = createSelector(
//     makeSelectFavoritedCountries(),
//     favoritedCountries => ({
//         favoritedCountries
//     })
// )

const MenuList: React.FC = () => {
    const { t } = useTranslation('menuList')
    // const { favoritedCountries, loading, error } = useSelector(stateSelector)

    return (
        <List aria-label={t('menuList:titleMenu', 'Mainmenu')}>
            <ListItem>
                <ListItemText primary={t('menuList:title', 'Data App')} />
            </ListItem>
        </List>
    )
}

export default MenuList
