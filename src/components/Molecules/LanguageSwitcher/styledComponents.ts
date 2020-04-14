import styled from 'styled-components'

import Select from '@material-ui/core/Select'

export const LanguageSwitcherWrapper = styled.div`
    position: relative;
    width: 100%;
`

const SelectStyled = styled(Select)`
    .MuiPopover-root {
        z-index: 1400 !important;
    }
`
export default SelectStyled
