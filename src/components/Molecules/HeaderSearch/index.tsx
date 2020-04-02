import React, { useState } from 'react'

import SearchField from 'components/Molecules/SearchField'

const HeaderSearch: React.FC = () => {
    const [searchString, setSearchString] = useState('')

    return <SearchField setValue={setSearchString} value={searchString} />
}

export default HeaderSearch
