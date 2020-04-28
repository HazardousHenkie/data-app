import React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import ThemeSwitcher from 'components/Atoms/ThemeSwitcher'
import LanguageSwitcher from 'components/Molecules/LanguageSwitcher'

const MenuList: React.FC = () => {
    return (
        <List component="nav" aria-label="main menu">
            <ListItem>
                <ListItemText primary="home" />
            </ListItem>

            <ListItem>
                <LanguageSwitcher />
            </ListItem>
            <ListItem>
                <ThemeSwitcher />
            </ListItem>
        </List>
    )
}

export default MenuList
