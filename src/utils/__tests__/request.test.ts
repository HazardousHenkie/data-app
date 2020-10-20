import request from '../request'

declare let window: { fetch: jest.Mock }

describe('request', () => {
    beforeEach(() => {
        window.fetch = jest.fn()
    })

    it('test', () => {})
})
