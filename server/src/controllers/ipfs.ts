import {IpfsCasWithCache} from '@sidetree/cas'
const IpfsAddress = process.env.ELEMENT_IPFS_MULTIADDR ? process.env.ELEMENT_IPFS_MULTIADDR : "IPFS_ADDY"
import {DATABASE_URL, DATABASE_NAME} from '../utils/config'

const Cas = new IpfsCasWithCache(IpfsAddress, DATABASE_URL!, DATABASE_NAME)
Cas.initialize()
export { Cas as cas} 