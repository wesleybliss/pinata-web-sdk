import queryBuilder from './queryBuilder'

/**
 * Pin Jobs
 * @param {*} filters
 * @returns {Promise}
 */
export default async function pinJobs(filters) {
    
    let endpoint = 'pinning/pinJobs'
    
    if (filters)
        endpoint = queryBuilder(endpoint, filters)
    
    try {
        
        const result = await this.fetch(endpoint)
        
        if (result.status !== 200)
            throw new Error(`unknown server response while attempting to retrieve pin jobs: ${result}`)
        else
            return await result.json()
        
    } catch (e) {
        
        const formattedError = this.handleError(e)
        throw formattedError
        
    }
    
}
