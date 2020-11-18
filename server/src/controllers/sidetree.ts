import {Element} from '@sidetree/element'
import { blockchain } from './ethereum'
import web3 from 'web3'
const config = {
    batchingIntervalInSeconds: 0,
    contentAddressableStoreServiceUri: '', 
    didMethodName: '', 
    maxConcurrentDownloads: 0,
    observingIntervalInSeconds: 0,
    mongoDbConnectionString: '', 
    databaseName: '',
}
const protocolVersions = []


const sidetree = new Element(config, protocolVersions, blockchain )

sidetree.initialize() 

const operations = sidetree.handleOperationRequest
const readDID = sidetree.handleResolveRequest
const getSideTreeVersion = sidetree.handleGetVersionRequest

export { operations, readDID, getSideTreeVersion }