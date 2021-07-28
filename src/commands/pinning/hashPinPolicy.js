import isIPFS from 'is-ipfs'

/**
 * Hash Pin Policy
 * @param {*} ipfsPinHash
 * @param {*} newPinPolicy
 * @returns {Promise}
 */
export default async function hashPinPolicy(ipfsPinHash, newPinPolicy) {
    
    this.validatePinPolicyStructure(newPinPolicy)
    
    if (!ipfsPinHash)
        throw new Error('ipfsPinHash value is required for changing the pin policy of a pin')
    
    if (!isIPFS.cid(ipfsPinHash))
        throw new Error('ipfsPinHash value is an invalid IPFS CID')
    
    if (!newPinPolicy)
        throw new Error('newPinPolicy is required for changing the pin policy of a pin')
    
    const endpoint = 'pinning/hashPinPolicy'
    const body = {
        ipfsPinHash: ipfsPinHash,
        newPinPolicy: newPinPolicy,
    }
    
    try {
        
        const result = await this.put(endpoint, body)
        
        if (result.status !== 200)
            throw new Error(`unknown server response while changing pin policy for hash: ${result}`)
        
        return await result.json()
        
    } catch (e) {
        
        const formattedError = this.handleError(e)
        throw formattedError
        
    }
    
}
