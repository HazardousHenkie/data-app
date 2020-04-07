import styled from 'styled-components'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

const TopBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1350;
    margin: 15px;
    width: calc(100% - 30px);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: ${(props): string => props.theme.shadow};
    background: ${(props): string => props.theme.white};
`

export const SearchFieldWrapper = styled.div`
    width: 100%;
`

export const CloseCountriesList = styled(ChevronLeftIcon)`
    font-size: 2.5rem;
    cursor: pointer;
    color: ${(props): string => props.theme.darkGray};
`

export default TopBar
