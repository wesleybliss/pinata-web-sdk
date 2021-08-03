import queryBuilder from './queryBuilder'

/**
 * Pin List
 * @param {string} filters
 * @returns {Promise}
 */
async function pinList(filters) {
    
    const baseEndpoint = 'data/pinList'
    const endpoint = queryBuilder(baseEndpoint, filters)
    
    try {
        
        const result = await this.get(endpoint)
        
        if (result.status !== 200)
            throw new Error(`unknown server response while attempting to retrieve user pin list: ${result}`)
        else
            return await result.json()
        
    } catch (e) {
        
        const formattedError = this.handleError(e)
        throw formattedError
        
    }
    
}

export default pinList
