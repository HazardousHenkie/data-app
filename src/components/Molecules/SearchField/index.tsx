import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import InputFieldStyled from './styledComponents'

interface SearchFieldProps {
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const SearchField: React.FC<SearchFieldProps> = ({ setValue }) => {
    const [inputValue, setInputValue] = useState('')
    // suspense makes the map not so we will have handle the not ready state here
    const { t, ready } = useTranslation('searchField', { useSuspense: false })

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
            {ready && (
                <InputFieldStyled
                    placeholder={t('searchField:inputLabel', 'search')}
                    onChange={handleOnChange}
                />
            )}
        </form>
    )
}

export default SearchField
