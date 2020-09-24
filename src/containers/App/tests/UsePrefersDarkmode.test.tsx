import { renderHook } from '@testing-library/react-hooks'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import usePrefersDarkMode from '../usePrefersDarkMode'

jest.mock('@material-ui/core/useMediaQuery')

describe('useTheme', () => {
    beforeEach(() => {
        // @ts-ignore
        useMediaQuery.mockReturnValue(false)
    })

    it('DarkMode should be false when (prefers-color-scheme: dark) is not set', () => {
        const { result } = renderHook(() => usePrefersDarkMode())

        expect(result.current.darkMode).toEqual(false)
    })

    it('DarkMode should be true when useMediaQuery is true', () => {
        // @ts-ignore
        useMediaQuery.mockReturnValue(true)

        const { result } = renderHook(() => usePrefersDarkMode())

        expect(result.current.darkMode).toEqual(true)
    })
})
