import { renderHook } from '@testing-library/react-hooks'

import lightTheme, { darkTheme } from 'styles/themeStyles'

import usePrefersDarkMode from '../usePrefersDarkMode'
import useTheme from '../useTheme'

jest.mock('../usePrefersDarkMode')

describe('usePrefersDarkMode', () => {
    beforeEach(() => {
        // @ts-ignore
        usePrefersDarkMode.mockReturnValue({ darkMode: false })
    })

    it('Should set darkTheme if user prefers darkMode', () => {
        // @ts-ignore
        usePrefersDarkMode.mockReturnValue({ darkMode: true })

        const { result } = renderHook(() => useTheme())

        expect(result.current.theme).toEqual(darkTheme)
    })

    it('Should return darkmode if no preference is set', () => {
        const { result } = renderHook(() => useTheme())

        expect(result.current.theme).toEqual(lightTheme)
    })
})
