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
                main: '#fffafa',
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
                black: '#fff',
                white: '#000'
            },
            primary: {
                light: '#424141',
                main: '#636363',
                dark: '#252525',
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
