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
    color: ${({ theme }) => theme.palette.common.black};
`

const indicator = css`
    cursor: pointer;
    opacity: 0.5;
    position: absolute;
    left: 50%;
    width: 30px;
    height: 30px;
    margin-left: -15px;
    border: 2px solid ${({ theme }) => theme.palette.common.black};
    border-radius: 50px;
`

export const swipeAnimation = (reverse: boolean): Keyframes => keyframes`
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
    }
`

export const HandleBar = styled.div<HandleBarProps>`
    border-radius: 100px;
    width: 50%;
    bottom: 0;
    top: auto;

    ${props =>
        props.relative
            ? `
            position: relative;
            left: 0;
            margin: -5px auto 10px;
        `
            : `
            position: fixed;
            left: 25%;
            margin: 0 auto 8px;
        `}

    ${({ theme }) => `
        background: ${theme.palette.common.black};
        border: 2px solid ${theme.palette.common.black};

        ${theme.breakpoints.up('md')} {
            display: none;
        }
    `}
`

export const DrawerWrapper = styled.div`
    position: relative;
    bottom: 0;
`

export const SwipeIndicator = styled.div<SwipeIndicatorProps>`
    ${indicator}
    ${(props): string => (!props.down ? 'bottom: 10px;' : 'top: -35px;')};
`

export const ClickIndicator = styled.div`
    ${indicator}
    bottom: 10px;

    ${({ theme }) => theme.breakpoints.down('sm')} {
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
