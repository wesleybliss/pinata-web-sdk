
/**
 * Pin File to IPFS
 * @param {*} readStream
 * @param {*} options
 * @returns {Promise}
 */
export default async function pinFileToIPFS(file, options) {
    
    const data = new FormData()
    const endpoint = 'pinning/pinFileToIPFS'
    
    data.append('file', file)
    
    if (options) {
        
        if (options.pinataMetadata) {
            this.validateMetadata(options.pinataMetadata)
            data.append('pinataMetadata', JSON.stringify(options.pinataMetadata))
        }
        
        if (options.pinataOptions) {
            this.validatePinataOptions(options.pinataOptions)
            data.append('pinataOptions', JSON.stringify(options.pinataOptions))
        }
        
    }
    
    try {
        
        // Note: intentionally not setting `Content-Type` or `boundary` here,
        // otherwise the headers will be rejected. The browser does this automatically
        const result = await this.post(endpoint, data)
        
        if (result.status !== 200)
            throw new Error(`unknown server response while pinning File to IPFS: ${result}`)
        
        return await result.json()
        
    } catch (e) {
        
        const formattedError = this.handleError(e)
        throw formattedError
        
    }
    
}
