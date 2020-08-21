import request from '../request'

declare let window: { fetch: jest.Mock }

describe('request', () => {
    beforeEach(() => {
        window.fetch = jest.fn()
    })

    describe('stubbing successful response', () => {
        beforeEach(() => {
            const res = new Response('{"successfull":"response"}', {
                status: 200,
                headers: {
                    'Content-type': 'application/json'
                }
            })

            window.fetch.mockReturnValue(Promise.resolve(res))
        })

        it('should format the response correctly', done => {
            request('/test-url')
                .catch(done)
                .then(json => {
                    expect(json.successfull).toBe('response')
                    done()
                })
        })
    })

    describe('stubbing 204 response', () => {
        beforeEach(() => {
            const res = new Response('', {
                status: 204,
                statusText: 'No Content'
            })

            window.fetch.mockReturnValue(Promise.resolve(res))
        })

        it('should return null on 204 response', done => {
            request('/test-url').then(json => {
                expect(json).toBeNull()
                done()
            })
        })
    })

    describe('stubbing 205 response', () => {
        beforeEach(() => {
            const res = new Response('', {
                status: 205,
                statusText: 'No Content'
            })

            window.fetch.mockReturnValue(Promise.resolve(res))
        })

        it('should return null on 205 response', done => {
            request('/test-url').then(json => {
                expect(json).toBeNull()
                done()
            })
        })
    })

    describe('stubbing 203 response', () => {
        beforeEach(() => {
            const res = new Response('', {
                status: 203,
                statusText: 'No Content',
                headers: {
                    'Content-type': 'application/json'
                }
            })

            window.fetch.mockReturnValue(Promise.resolve(res))
        })

        it('should return error on 203 response', done => {
            request('/test-url').catch(error => {
                expect(error).toStrictEqual(Error("Can't parse JSON."))
                done()
            })
        })
    })

    describe('stubbing error response', () => {
        beforeEach(() => {
            const res = new Response('{"bad":"response"}', {
                status: 404,
                statusText: 'Not Found',
                headers: {
                    'Content-type': 'application/json'
                }
            })

            window.fetch.mockReturnValue(Promise.resolve(res))
        })

        it('should catch errors', done => {
            request('/test-route').catch(error => {
                expect(error.responseText.bad).toBe('response')
                expect(error.response.status).toBe(404)
                expect(error.response.statusText).toBe('Not Found')
                done()
            })
        })
    })
})
