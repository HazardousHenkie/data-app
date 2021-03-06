const mockFetch = (mockData: { [key: string]: string | number | object }) => {
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            status: 200,
            json: () => Promise.resolve(mockData)
        })
    )
}

export const mockFetchError = (error: Error) => {
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            status: 401,
            json: () => Promise.resolve(error)
        })
    )
}

export const mockFetchCleanUp = () => {
    // @ts-ignore
    global.fetch.mockClear()
    // @ts-ignore
    delete global.fetch
}

export default mockFetch
