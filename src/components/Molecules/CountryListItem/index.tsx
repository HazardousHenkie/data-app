import React from 'react'

import { Reducer } from 'redux'

import { useInjectReducer } from 'utils/redux-injectors'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectData } from 'components/Molecules/CountriesList/selectors'
import setSelectedCountry from './actions'

import reducer from './reducer'

interface CountriesListItemProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    name: string
}

const key = 'country'

const stateSelector = createStructuredSelector({
    countries: makeSelectData()
})

const CountriesListItem: React.FC<CountriesListItemProps> = ({
    setOpen,
    name
}) => {
    const dispatch = useDispatch()
    useInjectReducer({ key, reducer: reducer as Reducer })
    const { countries } = useSelector(stateSelector)

    const onClickCountry = (selectedName: string) => {
        const selectedCountry = countries.find(
            (country: Record<string, string>) => country.name === selectedName
        )

        if (selectedCountry) {
            setOpen(false)
            dispatch(setSelectedCountry(selectedCountry))
        }
    }

    return (
        <ListItem button onClick={() => onClickCountry(name)}>
            <ListItemText primary={name} />
        </ListItem>
    )
}

export default CountriesListItem
