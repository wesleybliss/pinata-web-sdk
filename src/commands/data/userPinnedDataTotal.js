
/**
 * User Pinned Data Total
 * @returns {Promise}
 */
export default async function userPinnedDataTotal() {
    
    let endpoint = 'data/userPinnedDataTotal'
    
    try {
        
        const result = await this.fetch(endpoint)
        
        if (result.status !== 200)
            throw new Error(`unknown server response while attempting to retrieve pinned data total: ${result}`)
        else
            return await result.json()
        
    } catch (e) {
        
        const formattedError = this.handleError(e)
        throw formattedError
        
    }
    
}
