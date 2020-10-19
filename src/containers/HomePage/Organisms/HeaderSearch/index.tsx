import React, { useState } from 'react'

import CountriesList from 'containers/HomePage/Molecules/CountriesList'
import SearchField from 'components/Molecules/SearchField'
import SideDrawer from 'components/Organisms/SideDrawer'
import MenuList from '../../Molecules/MenuList'

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
            <TopBar data-testid="TopBar">
                {!openCountriesList && (
                    <SideDrawer>
                        <MenuList />
                    </SideDrawer>
                )}
                {openCountriesList && (
                    <CloseCountriesList
                        data-testid="CloseCountriesList"
                        onClick={closeCountriesListClick}
                    />
                )}
                <SearchFieldWrapper
                    data-testid="SearchFieldWrapper"
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
                setOpen={setOpenCountriesList}
                searchString={searchString}
            />
        </>
    )
}

export default HeaderSearch
