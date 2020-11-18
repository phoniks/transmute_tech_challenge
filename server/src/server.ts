import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import flash from 'express-flash'
import path from 'path'
import { SESSION_SECRET } from "./util/secrets";
import { operations, readDID, getSideTreeVersion } from './controllers/sidetree'
import { blockchain } from './controllers/ethereum'
import { cas } from './controllers/ipfs'


const app = express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
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
app.get("/blockchain​/transactions", blockchain._getTransactions);
app.post("/blockchain/transactions", blockchain.write);
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
