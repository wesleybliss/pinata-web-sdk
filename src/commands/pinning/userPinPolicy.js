
/**
 * User Pin Policy
 * @param {*} newPinPolicy
 * @returns {Promise}
 */
export default async function userPinPolicy(newPinPolicy) {
    
    this.validatePinPolicyStructure(newPinPolicy)
    
    if (!newPinPolicy)
        throw new Error('newPinPolicy is required for changing the pin policy of a pin')
    
    const endpoint = 'pinning/userPinPolicy'
    const body = {
        newPinPolicy: newPinPolicy,
    }
    
    try {
        
        const result = await this.put(endpoint, body)
        
        if (result.status !== 200)
            throw new Error(`unknown server response while changing pin policy for user: ${result}`)
        
        return await result.json()
        
    } catch (e) {
        
        const formattedError = this.handleError(e)
        throw formattedError
        
    }
    
}
