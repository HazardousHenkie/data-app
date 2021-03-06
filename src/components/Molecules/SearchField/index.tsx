import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import InputFieldStyled from './styledComponents'

interface SearchFieldProps {
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const SearchField: React.FC<SearchFieldProps> = ({ setValue }) => {
    const [inputValue, setInputValue] = useState<string>('')
    const { t } = useTranslation('searchField')

    useEffect(() => {
        const timer = setTimeout(() => {
            setValue(inputValue)
        }, 500)

        return () => clearTimeout(timer)
    }, [inputValue, setValue])

    const handleOnChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setInputValue(event.target.value)
    }

    return (
        <form>
            <InputFieldStyled
                data-cy="searchInputField"
                value={inputValue}
                placeholder={t('searchField:inputLabel', 'search')}
                onChange={handleOnChange}
            />
        </form>
    )
}

export default SearchField
