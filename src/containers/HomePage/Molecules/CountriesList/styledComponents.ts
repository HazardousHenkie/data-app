import styled from 'styled-components'

const CountriesListDiv = styled.div`
    padding-top: 86px;
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    overflow-y: hidden;
    overflow-y: auto;
    background: ${({ theme }) => theme.palette.primary.light};

    ::-webkit-scrollbar {
        background-color: ${({ theme }) => theme.palette.primary.light};
    }

    ::-webkit-scrollbar-thumb {
        height: 30px;
        border-radius: 25px;
        background: ${({ theme }) => theme.palette.primary.dark};
    }
`

export default CountriesListDiv
