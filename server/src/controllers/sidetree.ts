import { Element } from '@sidetree/element';
import { blockchain } from './ethereum';
const config = {
  batchingIntervalInSeconds: 360,
  contentAddressableStoreServiceUri: '',
  didMethodName: 'elem:ropsten',
  maxConcurrentDownloads: 1,
  observingIntervalInSeconds: 360,
  mongoDbConnectionString: 'mongodb://localhost:27017/',
  databaseName: 'element-test',
};
const protocolVersions: any = [];

console.log(blockchain);
const sidetree = new Element(config, protocolVersions, blockchain);

sidetree.initialize();

const operations = sidetree.handleOperationRequest;
const readDID = sidetree.handleResolveRequest;
const getSideTreeVersion = sidetree.handleGetVersionRequest;

export { operations, readDID, getSideTreeVersion };
