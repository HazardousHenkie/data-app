import React from 'react'

import { useTranslation } from 'react-i18next'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import GoogleLoginButton from 'components/Atoms/GoogleLogin'
import GoogleLogoutButton from 'components/Atoms/GoogleLogout'
import ThemeSwitcher from 'components/Atoms/ThemeSwitcher'
import LanguageSwitcher from 'components/Molecules/LanguageSwitcher'

import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

import { makeSelectLoggedIn } from 'globals/authentication/selectors'

import FavoritedCountriesList from 'components/Organisms/FavoritedCountriesList'
import ListStyled from './styledComponents'

const stateSelector = createSelector(makeSelectLoggedIn(), loggedIn => ({
    loggedIn
}))

const MenuList: React.FC = () => {
    const { t } = useTranslation('menuList')
    const { loggedIn } = useSelector(stateSelector)

    return (
        <>
            <FavoritedCountriesList />
            <ListStyled
                data-testid="ListStyled"
                aria-label={t('menuList:titleMenu', 'Mainmenu')}
            >
                <ListItem>
                    <ListItemText primary={t('menuList:title', 'Data App')} />
                </ListItem>

                <ListItem>
                    {loggedIn ? <GoogleLogoutButton /> : <GoogleLoginButton />}
                </ListItem>

                <ListItem style={{ marginTop: 'auto' }} dense>
                    <ListItemText
                        primary={t('menuList:languageTitle', 'Language')}
                    />
                </ListItem>
                <ListItem>
                    <LanguageSwitcher />
                </ListItem>
                <ListItem dense>
                    <ListItemText primary={t('menuList:themeTitle', 'Theme')} />
                </ListItem>
                <ListItem dense>
                    <ThemeSwitcher />
                </ListItem>
            </ListStyled>
        </>
    )
}

export default MenuList
