import React, { useEffect } from 'react'

import { createStructuredSelector } from 'reselect'

import { useDispatch, useSelector } from 'react-redux'
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors'

import InlineLoader from 'components/Atoms/InlineLoader'
import InfoMessage from 'components/Atoms/InfoMessage'

import Dialog from '@material-ui/core/Dialog'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import saga from './saga'
import reducer from './reducer'

import { getCountriesData } from './actions'

import { makeSelectError, makeSelectLoader, makeSelectData } from './selectors'

interface CountriesListProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const key = 'countriesData'

const stateSelector = createStructuredSelector({
    data: makeSelectData(),
    error: makeSelectError(),
    loading: makeSelectLoader()
})

const CountriesList: React.FC<CountriesListProps> = ({ setOpen, open }) => {
    const { error, loading, data } = useSelector(stateSelector)

    const dispatch = useDispatch()

    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })

    useEffect(() => {
        dispatch(getCountriesData())
    }, [dispatch])

    const handleClose = () => {
        setOpen(false)
    }

    // when search filter with js function just get a search param in
    // search param is optional
    // add countries flags
    // change language for japanese and stuff

    return (
        <Dialog fullScreen open={open} onClose={handleClose}>
            {error && (
                <InfoMessage severity="error" message={error.toString()} />
            )}

            {loading ? (
                <InlineLoader />
            ) : (
                <List component="nav" aria-label="main mailbox folders">
                    {data.map((country: Record<string, string>) => (
                        <div key={country.name}>
                            <ListItem button>
                                <ListItemText primary={country.name} />
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
            )}
        </Dialog>
    )
}

export default CountriesList