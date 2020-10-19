import { renderHook } from '@testing-library/react-hooks'

import useMapRef from '../useMapRefHook'

describe('useMapRef', () => {
    it('setMapState should be defned', () => {
        const { result } = renderHook(() => useMapRef())

        expect(result.current).toBeDefined()
    })
})
