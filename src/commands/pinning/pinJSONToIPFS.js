
/**
 * Pin JSON to IPFS
 * @param {*} body
 * @param {*} options
 * @returns {Promise}
 */
export default async function pinJSONToIPFS(body, options) {
    
    let requestBody = body
    
    if (typeof body !== 'object')
        throw new Error('body must be a valid JSON object')
    
    if (options) {
        
        requestBody = {
            pinataContent: body
        }
        
        if (options.pinataMetadata) {
            this.validateMetadata(options.pinataMetadata)
            requestBody.pinataMetadata = options.pinataMetadata
        }
        
        if (options.pinataOptions) {
            this.validatePinataOptions(options.pinataOptions)
            requestBody.pinataOptions = options.pinataOptions
        }
        
    }
    
    const endpoint = 'pinning/pinJSONToIPFS'
    
    try {
        
        const result = await this.post(endpoint, requestBody)
        
        if (result.status !== 200)
            throw new Error(`unknown server response while pinning JSON to IPFS: ${result}`)
        
        return await result.json()
        
    } catch (e) {
        
        const formattedError = this.handleError(e)
        throw formattedError
        
    }
    
}
