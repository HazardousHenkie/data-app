const mockFetch = (mockData: { [key: string]: string | object }) => {
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
            status: 400,
            json: () => Promise.resolve(error)
        })
    )
}

export const mockFetchCleanUp = () => {
    // @ts-ignore
    global.fetch.mockClear()
    delete global.fetch
}

export default mockFetch
