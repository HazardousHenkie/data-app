import styled from 'styled-components'

export const HandleBar = styled.div`
    position: fixed;
    border-radius: 100px;
    border: 3px solid ${(props): string => props.theme.black};
    margin: 0 auto 8px;
    width: 50%;
    bottom: 0;
    left: 25%;
    top: auto;
    background: ${(props): string => props.theme.black};
`

export const DrawerWrapper = styled.div`
    position: relative;
    bottom: 0;
`
