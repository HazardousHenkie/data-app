import styled from 'styled-components'

const CountriesListDiv = styled.div`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background: ${(props): string => props.theme.gray};
`

export default CountriesListDiv
