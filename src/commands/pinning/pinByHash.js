import isIPFS from 'is-ipfs'

/**
 * Pin By Hash
 * @param {*} hashToPin
 * @param {*} options
 * @returns {Promise<unknown>}
 */
export default async function pinByHash(hashToPin, options) {
    
    if (!hashToPin)
        throw new Error('hashToPin value is required for pinning by hash')
    
    if (!isIPFS.cid(hashToPin))
        throw new Error('hashToPin value is an invalid IPFS CID')
    
    const endpoint = 'pinning/pinByHash'
    const body = {
        hashToPin: hashToPin,
        pinataOptions: {},
    }
    
    if (options) {
        
        if (options.pinataOptions)
            body.pinataOptions = options.pinataOptions
        
        if (options.pinataMetadata) {
            this.validateMetadata(options.pinataMetadata)
            body.pinataMetadata = options.pinataMetadata
        }
        
    }
    
    try {
        
        const result = await this.post(endpoint, body)
        
        if (result.status !== 200)
            throw new Error(`unknown server response while adding to pin queue: ${result}`)
        
        return await result.json()
        
    } catch (e) {
        
        const formattedError = handleError(e)
        throw formattedError
        
    }
    
}
