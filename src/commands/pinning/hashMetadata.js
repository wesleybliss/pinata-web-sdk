import isIPFS from 'is-ipfs'

/**
 * Hash Meta Data
 * @param {*} ipfsPinHash
 * @param {*} metadata
 * @returns {Promise<unknown>}
 */
export default async function hashMetadata(ipfsPinHash, metadata) {
    
    if (!ipfsPinHash)
        throw new Error('ipfsPinHash value is required for changing the pin policy of a pin')
    
    if (!isIPFS.cid(ipfsPinHash))
        throw new Error('ipfsPinHash value is an invalid IPFS CID')
    
    if (!metadata)
        throw new Error('no metadata object provided')
    
    this.validateMetadata(metadata)
    
    const endpoint = 'pinning/hashMetadata'
    const body = {
        ipfsPinHash: ipfsPinHash
    }
    
    if (metadata.name)
        body.name = metadata.name
    
    if (metadata.keyvalues)
        body.keyvalues = metadata.keyvalues
    
    try {
        
        const result = await this.put(endpoint, body)
        
        if (result.status !== 200)
            throw new Error(`unknown server response while changing metadata for hash: ${result}`)
        else
            return await result.json()
        
    } catch (e) {
        
        const formattedError = this.handleError(e)
        throw formattedError
        
    }
    
}
