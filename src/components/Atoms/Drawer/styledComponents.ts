import styled from 'styled-components'

interface HandleBarProps {
    relative?: boolean
}

export const HandleBar = styled.div<HandleBarProps>`
    position: ${(props): string => (props.relative ? 'relative' : 'fixed')};
    border-radius: 100px;
    border: 2px solid ${(props): string => props.theme.black};
    margin: ${(props): string =>
        props.relative ? '-5px auto 10px' : '0 auto 8px'};
    width: 50%;
    bottom: 0;
    left: ${(props): string => (!props.relative ? '25%' : '0')};
    top: auto;
    background: ${(props): string => props.theme.black};
`

export const DrawerWrapper = styled.div`
    position: relative;
    bottom: 0;
`
