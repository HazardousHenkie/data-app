import React, { useState, useEffect } from 'react'

import InputField from 'components/Atoms/InputField'

import { useTranslation } from 'react-i18next'

interface SearchFieldProps {
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const SearchField: React.FC<SearchFieldProps> = ({ setValue }) => {
    const { t } = useTranslation('searchField')
    const [inputValue, setInputValue] = useState('')

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
            <InputField
                placeholder={t('searchField:inputLabel', 'search')}
                onChange={handleOnChange}
            />
        </form>
    )
}

export default SearchField
