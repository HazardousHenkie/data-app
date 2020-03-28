import styled, { keyframes } from 'styled-components'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'

interface HandleBarProps {
    relative?: boolean
}

const mouseAnimation = keyframes`
  0% {
    transform: translate(0, 0);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  80% {
    transform: translate(0, -10px);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`

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

export const SwipeIndicator = styled.div`
    opacity: 0.5;
    position: absolute;
    left: 50%;
    width: 30px;
    height: 30px;
    margin-left: -15px;
    border: 2px solid ${(props): string => props.theme.black};
    border-radius: 50px;
    bottom: 12px;
`

export const SwipeIndicatorInner = styled(ArrowDropUpIcon)`
    position: absolute;
    top: 5px;
    left: 50%;
    margin-left: -12px;
    color: ${(props): string => props.theme.black};
    animation: ${mouseAnimation} 2s infinite;
`
