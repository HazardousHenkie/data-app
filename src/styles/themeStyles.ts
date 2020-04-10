import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

let lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#343434'
        }
    },
    overrides: {
        MuiDrawer: {
            paperAnchorBottom: {
                overflow: 'visible'
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
                paperAnchorBottom: {
                    overflow: 'visible'
                }
            }
        }
    })
)

export default lightTheme = responsiveFontSizes(lightTheme)
