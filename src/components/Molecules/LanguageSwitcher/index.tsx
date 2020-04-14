import React, { useState, useEffect } from 'react'

import Loader from 'components/Atoms/Loader'

import { appLocales } from 'utils/i18n'
import { useTranslation } from 'react-i18next'

import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

import SelectStyled, { LanguageSwitcherWrapper } from './styledComponents'

const LanguageSwitcher: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const { i18n } = useTranslation()

    const onLocaleToggle = (event: React.ChangeEvent<{ value: unknown }>) => {
        setLoading(true)
        i18n.changeLanguage(event.target.value as string)
    }

    useEffect(() => {
        setLoading(false)
    }, [i18n.language])

    // check why loader is wierd
    return (
        <LanguageSwitcherWrapper>
            {loading && <Loader />}
            <FormControl variant="outlined" fullWidth>
                <SelectStyled
                    labelId="select-language"
                    id="select-language"
                    value={i18n.language}
                    onChange={onLocaleToggle}
                    disabled={loading}
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
