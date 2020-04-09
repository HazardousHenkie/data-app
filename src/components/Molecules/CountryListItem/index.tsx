import React from 'react'

import { Reducer } from 'redux'

import { useInjectReducer } from 'utils/redux-injectors'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import { useTranslation } from 'react-i18next'

import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectData } from 'components/Molecules/CountriesList/selectors'
import setSelectedCountry from './actions'

import reducer from './reducer'

interface CountriesListItemProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    listCountry: Record<string, any>
}

const key = 'country'

const stateSelector = createStructuredSelector({
    countries: makeSelectData()
})

const CountriesListItem: React.FC<CountriesListItemProps> = ({
    setOpen,
    listCountry
}) => {
    const dispatch = useDispatch()
    const { i18n } = useTranslation()
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
        <ListItem button onClick={() => onClickCountry(listCountry.name)}>
            <ListItemIcon>
                <img
                    width="30"
                    height="20"
                    src={listCountry.flag}
                    alt={listCountry.name}
                />
            </ListItemIcon>
            <ListItemText
                primary={
                    i18n.language === 'en'
                        ? listCountry.name
                        : listCountry.translations[i18n.language]
                }
            />
        </ListItem>
    )
}

export default CountriesListItem
