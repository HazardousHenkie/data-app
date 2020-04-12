import React, { ChangeEvent } from 'react'

import { appLocales } from 'utils/i18n'
import { useTranslation } from 'react-i18next'

import MenuItem from '@material-ui/core/MenuItem'

import SelectStyled from './styledComponents'

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation()

    const onLocaleToggle = (event: React.ChangeEvent<{ value: unknown }>) => {
        i18n.changeLanguage(event.target.value as string)
    }

    // maybe have a loader when switching

    return (
        <SelectStyled
            labelId="select-language"
            id="select-language"
            value={i18n.language}
            onChange={onLocaleToggle}
        >
            {appLocales.map(value => (
                <MenuItem key={value} value={value}>
                    {value}
                </MenuItem>
            ))}
        </SelectStyled>
    )
}

export default LanguageSwitcher
