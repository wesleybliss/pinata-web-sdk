import merge from 'lodash.merge'
import {
    validateJWT,
    validateHostNodes,
    validateMetadata,
    validatePinPolicyStructure,
    validatePinataOptions,
} from './util/validators'

import handleError from './util/errorResponse'

import pinByHash from './commands/pinning/pinByHash'
import hashMetadata from './commands/pinning/hashMetadata'
import hashPinPolicy from './commands/pinning/hashPinPolicy'
import pinFileToIPFS from './commands/pinning/pinFileToIPFS'
import pinJSONToIPFS from './commands/pinning/pinJSONToIPFS'
import pinJobs from './commands/pinning/pinJobs/pinJobs'
import unpin from './commands/pinning/unpin'
import userPinPolicy from './commands/pinning/userPinPolicy'
import testAuthentication from './commands/data/testAuthentication'
import pinList from './commands/data/pinList/pinList'
import userPinnedDataTotal from './commands/data/userPinnedDataTotal'

/**
 * Pinata Client
 *
 * @param {string} pinataJWT
 * @returns {PinataClient}
 */
class PinataSDK {
    
    constructor(pinataJWT) {
        
        if (!pinataJWT || !pinataJWT.length)
            throw new Error('Invalid Pinata JWT: ' + pinataJWT)
        
        this.jwt = pinataJWT
        
        this.baseURL = 'https://api.pinata.cloud'
        
        this.defaultOpts = {
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        }
        
        this.handleError = handleError.bind(this)
        
        this.validateJWT = validateJWT.bind(this)
        this.validateHostNodes = validateHostNodes.bind(this)
        this.validateMetadata = validateMetadata.bind(this)
        this.validatePinPolicyStructure = validatePinPolicyStructure.bind(this)
        this.validatePinataOptions = validatePinataOptions.bind(this)
        
        this.pinByHash = pinByHash.bind(this)
        this.hashMetadata = hashMetadata.bind(this)
        this.hashPinPolicy = hashPinPolicy.bind(this)
        this.pinFileToIPFS = pinFileToIPFS.bind(this)
        this.pinJSONToIPFS = pinJSONToIPFS.bind(this)
        this.pinJobs = pinJobs.bind(this)
        this.unpin = unpin.bind(this)
        this.userPinPolicy = userPinPolicy.bind(this)
        this.testAuthentication = testAuthentication.bind(this)
        this.pinList = pinList.bind(this)
        this.userPinnedDataTotal = userPinnedDataTotal.bind(this)
        
    }
    
    makeUrl(endpoint) {
        return `${this.baseURL}/${endpoint}`
    }
    
    makeOpts(...opts) {
        const newOpts = merge(this.defaultOpts, ...opts)
        // Make sure nobody nukes the auth header on accident
        newOpts.headers.Authorization = this.defaultOpts.headers.Authorization
        return newOpts
    }
    
    defaultInterceptor(url, opts) {
        return {
            url,
            options: opts,
        }
    }
    
    async fetch(endpoint, opts = {}, intercept = this.defaultInterceptor) {
        const { url, options } = intercept(
            this.makeUrl(endpoint),
            this.makeOpts(opts)
        )
        const response = await fetch(url, options)
        return response
    }
    
    async post(endpoint, data, opts = {}, intercept = this.defaultInterceptor) {
        const { url, options } = intercept(
            this.makeUrl(endpoint),
            this.makeOpts(opts, {
                method: 'POST',
                body: data,
            })
        )
        console.log('@@post with opts', url, options)
        const response = await fetch(url, options)
        return response
    }
    
    async postJSON(endpoint, data, opts = {}) {
        return await this.post(
            endpoint,
            (typeof data === 'string') ? data : JSON.stringify(data),
            opts
        )
    }
    
    async put(endpoint, data, opts = {}, intercept = this.defaultInterceptor) {
        const { url, options } = intercept(
            this.makeUrl(endpoint),
            this.makeOpts(opts, {
                method: 'PUT',
                body: (typeof data === 'string') ? data : JSON.stringify(data),
            })
        )
        const response = await fetch(url, options)
        return response
    }
    
    async del(endpoint, intercept = this.defaultInterceptor) {
        const { url, options } = intercept(
            this.makeUrl(endpoint),
            this.makeOpts({}, {
                method: 'DELETE',
            })
        )
        const response = await fetch(url, options)
        return response
    }
    
}

export default PinataSDK
