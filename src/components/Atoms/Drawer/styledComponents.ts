import styled from 'styled-components'

export const HandleBar = styled.div`
    position: fixed;
    height: 5px;
    border-radius: 50px;
    margin: 0 auto;
    width: 50%;
    bottom: 0;
    left: 25%;
    top: auto;
    background: ${props => props.theme.black};
`

export const DrawerWrapper = styled.div`
    position: relative;
    bottom: 0;
`
