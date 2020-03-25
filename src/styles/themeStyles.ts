import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import variables from './variables'

import MuiDrawer from './themeStylesMixins'

let lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#343434'
        }
    },
    overrides: {
        MuiDrawer: {
            paper: {
                ...MuiDrawer,
                backgroundColor: variables.gray
            }
        }
    }
})

export const darkTheme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#343434'
            }
        },
        overrides: {
            MuiDrawer: {
                paper: {
                    ...MuiDrawer,
                    backgroundColor: variables.darkGray
                }
            }
        }
    })
)

export default lightTheme = responsiveFontSizes(lightTheme)
