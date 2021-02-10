import { renderHook } from '@testing-library/react-hooks'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import useDarkMode from '../useDarkMode'

jest.mock('@material-ui/core/useMediaQuery')

describe('useTheme', () => {
    beforeEach(() => {
        ;(useMediaQuery as jest.Mock).mockReturnValue(false)
    })

    it('DarkMode should be false when (prefers-color-scheme: dark) is not set', () => {
        const { result } = renderHook(() => useDarkMode())

        expect(result.current.darkMode).toEqual(false)
    })

    it('DarkMode should be true when useMediaQuery is true', () => {
        ;(useMediaQuery as jest.Mock).mockReturnValue(true)

        const { result } = renderHook(() => useDarkMode())

        expect(result.current.darkMode).toEqual(true)
    })
})
