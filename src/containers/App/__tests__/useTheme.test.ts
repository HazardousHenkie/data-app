import { renderHook } from '@testing-library/react-hooks'

import lightTheme, { darkTheme } from 'styles/themeStyles'

import useDarkMode from '../useDarkMode'
import useTheme from '../useTheme'

jest.mock('../useDarkMode')

describe('useDarkMode', () => {
    beforeEach(() => {
        // @ts-ignore
        useDarkMode.mockReturnValue({ darkMode: false })
    })

    it('Should set darkTheme if user prefers darkMode', () => {
        // @ts-ignore
        useDarkMode.mockReturnValue({ darkMode: true })

        const { result } = renderHook(() => useTheme(true))

        expect(result.current.theme).toEqual(darkTheme)
    })

    it('Should return darkmode if no preference is set', () => {
        const { result } = renderHook(() => useTheme(false))

        expect(result.current.theme).toEqual(lightTheme)
    })
})
