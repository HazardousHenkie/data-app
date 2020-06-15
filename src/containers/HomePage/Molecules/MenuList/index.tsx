import React from 'react'

import { useTranslation } from 'react-i18next'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import GoogleLoginButton from 'components/Atoms/GoogleLogin'
import LogoutButton from 'components/Atoms/GoogleLogout'
import ThemeSwitcher from 'components/Atoms/ThemeSwitcher'
import LanguageSwitcher from 'components/Molecules/LanguageSwitcher'

import ListStyled from './styledComponents'

const MenuList: React.FC = () => {
    const { t } = useTranslation('menuList')

    return (
        <ListStyled aria-label={t('menuList:titleMenu', 'Mainmenu')}>
            <ListItem>
                <ListItemText primary={t('menuList:title', 'Data App')} />
            </ListItem>

            <ListItem>
                <GoogleLoginButton />

                <LogoutButton />
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
    )
}

export default MenuList
