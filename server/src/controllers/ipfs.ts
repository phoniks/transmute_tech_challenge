import {IpfsCasWithCache} from '@sidetree/cas'
const Cas = new IpfsCasWithCache(url, dbUrl, dbName)
Cas.initialize()
export { Cas as cas} 