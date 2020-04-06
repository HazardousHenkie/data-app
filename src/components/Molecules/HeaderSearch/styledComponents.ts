import styled from 'styled-components'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

const TopBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1350;
    padding: 15px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const CloseCountriesList = styled(ChevronLeftIcon)`
    font-size: 3rem;
    cursor: pointer;
    color: ${(props): string => props.theme.black};
`

export default TopBar
