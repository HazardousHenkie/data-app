import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

const lightTheme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            type: 'light',
            common: {
                black: '#000',
                white: '#fff'
            },
            primary: {
                light: '#f0f0f0',
                main: '#343434',
                dark: '#6b6969',
                contrastText: 'grayscale(1)'
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

export const darkTheme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            type: 'dark',
            common: {
                black: '#000',
                white: '#fff'
            },
            primary: {
                light: '#f0f0f0',
                main: '#343434',
                dark: '#6b6969',
                contrastText: 'invert(1) grayscale(1)'
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

export default lightTheme
