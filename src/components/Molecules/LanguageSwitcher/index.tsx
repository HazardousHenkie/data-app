import React, { useState, useEffect } from 'react'

import { appLocales } from 'utils/i18n'
import { useTranslation } from 'react-i18next'

import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

import SelectStyled, { LanguageSwitcherWrapper } from './styledComponents'

const LanguageSwitcher: React.FC = () => {
    const [loadingLanguage, setloadingLanguage] = useState(false)
    const { i18n } = useTranslation()

    const onLocaleToggle = (event: React.ChangeEvent<{ value: unknown }>) => {
        setloadingLanguage(true)
        i18n.changeLanguage(event.target.value as string)
    }

    useEffect(() => {
        setloadingLanguage(false)
    }, [i18n.language])

    return (
        <LanguageSwitcherWrapper>
            <FormControl variant="outlined" fullWidth>
                <SelectStyled
                    data-testid="languageSwitcher"
                    labelId="select-language"
                    id="select-language"
                    value={i18n.language}
                    onChange={onLocaleToggle}
                    disabled={loadingLanguage}
                >
                    {appLocales.map(value => (
                        <MenuItem key={value} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </SelectStyled>
            </FormControl>
        </LanguageSwitcherWrapper>
    )
}

export default LanguageSwitcher
