import styled, { keyframes, Keyframes, css } from 'styled-components'

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

interface HandleBarProps {
    relative?: boolean
}

interface SwipeIndicatorProps {
    down?: boolean
}

const arrow = css`
    position: absolute;
    left: 50%;
    margin-left: -12px;
    color: ${(props): string => props.theme.black};
`

const indicator = css`
    cursor: pointer;
    opacity: 0.5;
    position: absolute;
    left: 50%;
    width: 30px;
    height: 30px;
    margin-left: -15px;
    border: 2px solid ${(props): string => props.theme.black};
    border-radius: 50px;
`

const swipeAnimation = (reverse: boolean): Keyframes => keyframes`
    0% {
        transform: translate(0, 0);
        opacity: 0;
    }
    40% {
        opacity: 1;
    }
    80% {
        transform: translate(0, ${reverse ? '10px' : '-10px'});
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
`

export const SwipeableDrawerStyled = styled(SwipeableDrawer)`
    .MuiDrawer-paper {
        padding: 20px;
        border-top-right-radius: 25px;
        border-top-left-radius: 25px;
        background-color: ${(props): string => props.theme.darkGrey};
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

    @media (${(props): number => props.theme.breakpoints.up.md}) {
        display: none;
    }
`

export const DrawerWrapper = styled.div`
    position: relative;
    bottom: 0;
`

export const SwipeIndicator = styled.div<SwipeIndicatorProps>`
    ${(props): string => (!props.down ? 'bottom: 10px;' : 'top: -35px;')};
    ${indicator}
`

export const ClickIndicator = styled.div`
    bottom: 10px;
    ${indicator}

    @media (${(props): number => props.theme.breakpoints.down.md}) {
        display: none;
    }
`

export const SwipeIndicatorInner = styled(ArrowDropUpIcon)`
    ${arrow}
    top: 5px;
    animation: ${swipeAnimation(false)} 2s infinite;
`

export const SwipeIndicatorInnerDown = styled(ArrowDropDownIcon)`
    ${arrow}
    top: -5px;
    animation: ${swipeAnimation(true)} 2s infinite;
`
