import React, { useState } from 'react'

import CountriesList from 'components/Molecules/CountriesList'
import SearchField from 'components/Molecules/SearchField'

import TopBar, {
    CloseCountriesList,
    SearchFieldWrapper
} from './styledComponents'

const HeaderSearch: React.FC = () => {
    const [searchString, setSearchString] = useState('')
    const [openCountriesList, setOpenCountriesList] = React.useState(false)

    const closeCountriesListClick = () => {
        setOpenCountriesList(false)
    }

    const openCountriesListClick = () => {
        setOpenCountriesList(true)
    }

    return (
        <>
            <TopBar>
                <CloseCountriesList onClick={closeCountriesListClick} />
                <SearchFieldWrapper
                    role="button"
                    tabIndex={0}
                    onClick={openCountriesListClick}
                    onKeyDown={openCountriesListClick}
                >
                    <SearchField setValue={setSearchString} />
                </SearchFieldWrapper>
            </TopBar>
            <CountriesList
                open={openCountriesList}
                searchString={searchString}
            />
        </>
    )
}

export default HeaderSearch
