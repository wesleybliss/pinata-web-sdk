import pinByHash from './commands/pinning/pinByHash'
import hashMetadata from './commands/pinning/hashMetadata'
import hashPinPolicy from './commands/pinning/hashPinPolicy'
import pinFileToIPFS from './commands/pinning/pinFileToIPFS'
import pinFromFS from './commands/pinning/pinFromFS'
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
const pinataClient = pinataJWT => {

    let client = {}

    client.pinByHash = (hashToPin, options) => pinByHash(pinataJWT, hashToPin, options)
    client.hashMetadata = (ipfsPinHash, metadata) => hashMetadata(pinataJWT, ipfsPinHash, metadata)
    client.hashPinPolicy = (ipfsPinHash, newPinPolicy) => hashPinPolicy(pinataJWT, ipfsPinHash, newPinPolicy)
    client.pinFileToIPFS = (readableStream, options) => pinFileToIPFS(pinataJWT, readableStream, options)
    client.pinFromFS = (sourcePath, options) => pinFromFS(pinataJWT, sourcePath, options)
    client.pinJSONToIPFS = (body, options) => pinJSONToIPFS(pinataJWT, body, options)
    client.pinJobs = (filters) => pinJobs(pinataJWT, filters)
    client.unpin = (hashToUnpin) => unpin(pinataJWT, hashToUnpin)
    client.userPinPolicy = (newPinPolicy) => userPinPolicy(pinataJWT, newPinPolicy)
    client.testAuthentication = () => testAuthentication(pinataJWT)
    client.pinList = (filters) => pinList(pinataJWT, filters)
    client.userPinnedDataTotal = () => userPinnedDataTotal(pinataJWT)

    return client

}

export default pinataClient
