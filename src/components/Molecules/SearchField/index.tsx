import React from 'react'

import InputButton from 'components/Atoms/InputButton'
import InputField from 'components/Atoms/InputField'

const SearchField: React.FC = () => {
    // add translation
    // add form handling maybe in organism?
    // add form handler here but needs to be abstract/reusable
    // add header where?

    const submitForm = () => {}
    // = handleSubmit(({ email }) => {})

    return (
        <form onSubmit={submitForm}>
            <InputField />
            <InputButton>test</InputButton>
        </form>
    )
}

export default SearchField
