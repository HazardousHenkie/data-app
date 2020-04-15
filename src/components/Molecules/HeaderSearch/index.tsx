import React, { useState, useEffect } from 'react'

import SearchField from 'components/Molecules/SearchField'

const HeaderSearch: React.FC = () => {
    const [searchString, setSearchString] = useState('')

    useEffect(() => {
        console.log(searchString)
    }, [searchString])

    return <SearchField setValue={setSearchString} value={searchString} />
}

export default HeaderSearch
