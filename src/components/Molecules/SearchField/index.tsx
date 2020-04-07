import React from 'react'

import { useTranslation } from 'react-i18next'

import InputFieldStyled from './styledComponents'

interface SearchFieldProps {
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const SearchField: React.FC<SearchFieldProps> = ({ setValue }) => {
    const { t } = useTranslation('searchField')

    const handleOnChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setValue(event.target.value)
    }

    return (
        <InputFieldStyled
            placeholder={t('searchField:inputLabel', 'search')}
            onChange={handleOnChange}
        />
    )
}

export default SearchField
