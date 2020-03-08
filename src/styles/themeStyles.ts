import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

let lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#343434'
    }
  }
})

export let darkTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#343434'
      }
    }
  })
)

export default lightTheme = responsiveFontSizes(lightTheme)
