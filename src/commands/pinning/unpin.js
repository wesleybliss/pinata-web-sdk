import isIPFS from 'is-ipfs'

/**
 * Unpin
 * @param {string} hashToUnpin
 * @returns {Promise}
 */
export default async function unpin(hashToUnpin) {
    
    if (!hashToUnpin)
        throw new Error('hashToUnpin value is required for removing a pin from Pinata')
    
    if (!isIPFS.cid(hashToUnpin))
        throw new Error(`${hashToUnpin} is an invalid IPFS CID`)
    
    const endpoint = `pinning/unpin/${hashToUnpin}`
    
    try {
        
        const result = await this.del(endpoint)
        
        if (result.status !== 200)
            throw new Error(`unknown server response while removing pin from IPFS: ${result}`)
        
        return await result.json()
        
    } catch (e) {
        const formattedError = this.handleError(e)
        throw formattedError
        
    }
    
}
