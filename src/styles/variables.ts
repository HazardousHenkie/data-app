const variables = {
    black: '#000',
    white: '#fff',
    gray: '#f0f0f0',
    darkGray: '#6b6969',
    shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.25)',
    mapFilter: 'grayscale(1)',
    mapFilterDark: 'invert(1) grayscale(1)',
    breakpoints: {
        up: {
            xxs: 'min-width: 0',
            xs: 'min-width: 420px',
            sm: 'min-width: 600px',
            md: 'min-width: 960px',
            lg: 'min-width: 1280px',
            xl: 'min-width: 1920px'
        },
        down: {
            xs: 'max-width: 420px',
            sm: 'max-width: 599px',
            md: 'max-width: 959px',
            lg: 'max-width: 1279px',
            xl: 'max-width: 1919px'
        }
    }
}

export default variables
