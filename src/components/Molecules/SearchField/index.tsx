import React from 'react'

import InputField from 'components/Atoms/InputField'

import { useTranslation } from 'react-i18next'

interface SearchFieldProps {
    setValue: React.Dispatch<React.SetStateAction<string>>
    value: string | number
}

const SearchField: React.FC<SearchFieldProps> = ({ setValue, value }) => {
    const { t } = useTranslation('searchField')

    return (
        <form>
            <InputField
                placeholder={t('searchField:inputLabel', 'search')}
                value={value}
                onChange={(
                    event: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                    >
                ): void => {
                    setValue(event.target.value)
                }}
            />
        </form>
    )
}

export default SearchField
