import React from 'react'
import { render } from 'utils/test-utils'

import SelectStyled, { LanguageSwitcherWrapper } from '../styledComponents'

import 'jest-styled-components'

describe('<SelectStyled />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(
            <SelectStyled>
                <li>test</li>
            </SelectStyled>
        )

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <SELECT> tag', () => {
        const { container } = render(
            <SelectStyled>
                <li>test</li>
            </SelectStyled>
        )

        expect(container.firstElementChild?.tagName).toEqual('DIV')
    })
})

describe('<LanguageSwitcherWrapper />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<LanguageSwitcherWrapper />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <DIV> tag', () => {
        const { container } = render(<LanguageSwitcherWrapper />)

        expect(container.firstElementChild?.tagName).toEqual('DIV')
    })
})
