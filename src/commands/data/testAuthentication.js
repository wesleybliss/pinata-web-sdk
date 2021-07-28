
/**
 * Test Authentication
 * @returns {Promise}
 */
export default async function testAuthentication() {
    
    //  test authentication to make sure that the user's provided keys are legit
    const endpoint = 'data/testAuthentication'
    
    try {
        
        const result = await this.fetch(endpoint)
        
        if (result.status !== 200)
            throw new Error(`unknown server response while authenticating: ${result}`)
        else
            return { authenticated: true }
        
    } catch (e) {
        
        const formattedError = this.handleError(e)
        throw formattedError
        
    }
    
}
