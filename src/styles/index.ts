import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  .MuiPopover-root {
    z-index: 1400 !important;
  }
`

export default GlobalStyle
