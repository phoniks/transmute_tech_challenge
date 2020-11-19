import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import flash from 'express-flash'
import mongo from 'connect-mongo'
import path from 'path'
import { operations, readDID, getSideTreeVersion } from './controllers/sidetree'
import { blockchain } from './controllers/ethereum'
import { cas } from './controllers/ipfs'
import {DATABASE_URL} from './utils/config'


const appServer = () => {}
const secret = process.env.SESSION_SECRET ? process.env.SESSION_SECRET : 'somesecretthingthatyoushouldntshare'
const MongoStore = mongo(session);
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret,
    store: new MongoStore({
        url: DATABASE_URL!,
        autoReconnect: true
    }) 
}));

app.use(flash());

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app route.
 */
app.get("/", appServer)


/**
 * Sidetree API.
 */
app.post("/operations", operations);
app.get("/identifiers/:did", readDID)
app.get("/version", getSideTreeVersion);

/**
 * Blockchain API.
 */
app.get("/blockchain/time", blockchain.getLatestTime);
app.get("​/blockchain​/time​/:time-hash", blockchain.getLatestTime);
app.get("/blockchain​/transactions", (req) => {
    const transaction = req.body
    blockchain._getTransactions(transaction.startBlock, transaction.endBlock)
});
app.post("/blockchain/transactions", (req) => {
    blockchain.write(req.body.anchorString, req.body._fee)
});
app.post("/blockchain/transactions/first-valid", blockchain.getFirstValidTransaction);
app.get("/blockchain/fee", blockchain.getFee);
app.get("/blockchain/locks/:lock-identifier", blockchain.getValueTimeLock);
app.get("/blockchain/writer-lock", blockchain.getWriterValueTimeLock);
app.post("/blockchain/version", blockchain.getServiceVersion);
/**
 * CAS API.
 */
app.post("/cas", cas.write);
app.get("/cas/version", cas.getServiceVersion)
app.get("/cas/:hash", cas.write)

export default app;

app.listen(3000)
console.log('api listening on port 3000')