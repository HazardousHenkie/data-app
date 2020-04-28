import styled from 'styled-components'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

const TopBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1350;
    padding: 0 10px;
    margin: 15px;
    width: calc(100% - 30px);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: ${props => props.theme.shadow};
    background: ${({ theme }) => theme.palette.primary.main};
`

export const SearchFieldWrapper = styled.div`
    width: 100%;
`

export const CloseCountriesList = styled(ChevronLeftIcon)`
    font-size: 2.5rem;
    width: 35px;
    margin-right: 7px;
    cursor: pointer;
    color: ${({ theme }) => theme.palette.common.black};
`

export default TopBar
