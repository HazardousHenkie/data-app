import React, { useState, useEffect } from 'react'

import CountriesList from 'components/Molecules/CountriesList'
import SearchField from 'components/Molecules/SearchField'

import TopBar, { CloseCountriesList } from './styledComponents'

const HeaderSearch: React.FC = () => {
    const [searchString, setSearchString] = useState('')
    const [openCountriesList, setOpenCountriesList] = React.useState(false)

    useEffect(() => {
        if (searchString !== '') {
            setOpenCountriesList(true)
        }
    }, [searchString])

    return (
        <>
            <TopBar>
                <CloseCountriesList />
                <SearchField setValue={setSearchString} />
            </TopBar>
            <CountriesList
                open={openCountriesList}
                setOpen={setOpenCountriesList}
                searchString={searchString}
            />
        </>
    )
}

export default HeaderSearch
