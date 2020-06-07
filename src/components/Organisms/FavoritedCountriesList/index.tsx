import React, { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { createStructuredSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'

import InlineLoader from 'components/Atoms/InlineLoader'

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors'
import { getFavoritedCountries } from 'globals/favoritedCountriesList/actions'

import reducer from 'globals/favoritedCountriesList//reducer'
import saga from 'globals/favoritedCountriesList/saga'
import {
    makeSelectFavoritedCountries,
    makeSelectError,
    makeSelectLoader
} from 'globals/favoritedCountriesList/selectors'
import FavoritedCountriesList from './styledComponents'

const stateSelector = createStructuredSelector({
    favoritedCountries: makeSelectFavoritedCountries(),
    error: makeSelectError(),
    loading: makeSelectLoader()
})

const MenuList: React.FC = () => {
    const key = 'favoritedCountries'
    const dispatch = useDispatch()
    const { t } = useTranslation('menuList')
    // error hanlding
    const { favoritedCountries, loading } = useSelector(stateSelector)

    useEffect(() => {
        if (favoritedCountries[0].ts === 0) {
            dispatch(getFavoritedCountries())
        }
    }, [dispatch, favoritedCountries])

    // error handling
    // check if country is in list and set active
    // add country to list or remove from list without making a db call
    // check comments in favoritecountrybutton and favoritedcountrieslist
    // updated list after delete/add in store? check if necessary maybe active is fine

    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })

    return (
        <FavoritedCountriesList>
            {loading && <InlineLoader />}

            <List
                aria-label={t(
                    'favoritedCountryList:titleMenu',
                    'Favorite countries'
                )}
            >
                {favoritedCountries.map(favoritedCountry => (
                    <ListItem key={favoritedCountry.data.countryId}>
                        <ListItemText
                            primary={favoritedCountry.data.countryId}
                        />
                    </ListItem>
                ))}
            </List>
        </FavoritedCountriesList>
    )
}

export default MenuList
