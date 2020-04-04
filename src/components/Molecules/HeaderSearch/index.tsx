import React, { useState, useEffect } from 'react'

import SearchField from 'components/Molecules/SearchField'
import CountriesList from 'components/Molecules/CountriesList'

import TopBar from './styledComponents'

const HeaderSearch: React.FC = () => {
    const [searchString, setSearchString] = useState('')
    const [openCountriesList, setOpenCountriesList] = React.useState(false)

    useEffect(() => {
        if (searchString !== '') {
            setOpenCountriesList(true)
        }
    }, [searchString])

    return (
        <TopBar>
            <SearchField setValue={setSearchString} />
            <CountriesList
                open={openCountriesList}
                setOpen={setOpenCountriesList}
            />
        </TopBar>
    )
}

export default HeaderSearch
