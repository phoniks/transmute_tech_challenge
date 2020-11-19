'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var session = _interopDefault(require('express-session'));
var bodyParser = _interopDefault(require('body-parser'));
var flash = _interopDefault(require('express-flash'));
var mongo = _interopDefault(require('connect-mongo'));
var path$1 = _interopDefault(require('path'));
var element = require('@sidetree/element');
var ethereum = require('@sidetree/ethereum');
var dotenv = require('dotenv');
var web3 = _interopDefault(require('web3'));
var cas = require('@sidetree/cas');

dotenv.config();
var path;

switch ("development") {
  case "test":
    path = __dirname + "/../../.env.test";
    break;

  case "production":
    path = __dirname + "/../../.env.production";
    break;

  default:
    path = __dirname + "/../.env";
}

dotenv.config({
  path: path
});
var APP_ID = process.env.APP_ID;
var LOG_LEVEL = process.env.LOG_LEVEL;
var ELEMENT_PROVIDER = "http://127.0.0.1:8545";
var ELEMENT_IPFS_MULTIADDR = process.env.ELEMENT_IPFS_MULTIADDR;
var ELEMENT_CONTRACT_ADDRESS = "0x74435D1c1018798243d201B5f4e6187c62562E72";
var DATABASE_URL = 'mongodb://localhost:27017/element-test';
var DATABASE_NAME = "element-test";

var Web3 = /*#__PURE__*/new web3( /*#__PURE__*/new web3.providers.HttpProvider(ELEMENT_PROVIDER));
var Ethereum = /*#__PURE__*/new ethereum.EthereumLedger(Web3, ELEMENT_CONTRACT_ADDRESS);
Ethereum.initialize();

var config = {
  batchingIntervalInSeconds: 360,
  contentAddressableStoreServiceUri: '',
  didMethodName: 'elem:ropsten',
  maxConcurrentDownloads: 1,
  observingIntervalInSeconds: 360,
  mongoDbConnectionString: "mongodb://localhost:27017/",
  databaseName: 'element-test'
};
var protocolVersions = [];
console.log(Ethereum);
var sidetree = /*#__PURE__*/new element.Element(config, protocolVersions, Ethereum);
sidetree.initialize();
var operations = sidetree.handleOperationRequest;
var readDID = sidetree.handleResolveRequest;
var getSideTreeVersion = sidetree.handleGetVersionRequest;

var IpfsAddress = process.env.ELEMENT_IPFS_MULTIADDR ? process.env.ELEMENT_IPFS_MULTIADDR : "IPFS_ADDY";
var Cas = /*#__PURE__*/new cas.IpfsCasWithCache(IpfsAddress, DATABASE_URL, DATABASE_NAME);
Cas.initialize();

var appServer = function appServer() {};

var secret = process.env.SESSION_SECRET ? process.env.SESSION_SECRET : 'somesecretthingthatyoushouldntshare';
var MongoStore = /*#__PURE__*/mongo(session);
var app = /*#__PURE__*/express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret,
  store: new MongoStore({
    url: DATABASE_URL,
    autoReconnect: true
  })
}));
app.use(flash());
app.use(express["static"](path$1.join(__dirname, "public"), {
  maxAge: 31557600000
}));
/**
 * Primary app route.
 */

app.get("/", appServer);
/**
 * Sidetree API.
 */

app.post("/operations", operations);
app.get("/identifiers/:did", readDID);
app.get("/version", getSideTreeVersion);
/**
 * Blockchain API.
 */

app.get("/blockchain/time", Ethereum.getLatestTime);
app.get("​/blockchain​/time​/:time-hash", Ethereum.getLatestTime);
app.get("/blockchain​/transactions", function (req) {
  var transaction = req.body;

  Ethereum._getTransactions(transaction.startBlock, transaction.endBlock);
});
app.post("/blockchain/transactions", function (req) {
  Ethereum.write(req.body.anchorString, req.body._fee);
});
app.post("/blockchain/transactions/first-valid", Ethereum.getFirstValidTransaction);
app.get("/blockchain/fee", Ethereum.getFee);
app.get("/blockchain/locks/:lock-identifier", Ethereum.getValueTimeLock);
app.get("/blockchain/writer-lock", Ethereum.getWriterValueTimeLock);
app.post("/blockchain/version", Ethereum.getServiceVersion);
/**
 * CAS API.
 */

app.post("/cas", Cas.write);
app.get("/cas/version", Cas.getServiceVersion);
app.get("/cas/:hash", Cas.write);
app.listen(3000);
console.log('api listening on port 3000');

exports.default = app;
//# sourceMappingURL=server.cjs.development.js.map
