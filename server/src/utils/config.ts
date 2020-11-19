import * as dotenv from "dotenv";

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case "test":
    path = `${__dirname}/../../.env.test`;
    break;
  case "production":
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../.env`;
}
dotenv.config({ path: path });

export const APP_ID = process.env.APP_ID;
export const LOG_LEVEL = process.env.LOG_LEVEL;

export const ELEMENT_PROVIDER = "http://127.0.0.1:8545"
export const ELEMENT_IPFS_MULTIADDR = process.env.ELEMENT_IPFS_MULTIADDR
export const ELEMENT_CONTRACT_ADDRESS = "0x74435D1c1018798243d201B5f4e6187c62562E72"
export const DATABASE_URL = 'mongodb://localhost:27017/element-test'
export const DATABASE_NAME = "element-test"
export const SESSION_SECRET = "379tE844LHttpRe1395entTa3243entTa16219lidRespons8"
export const MNEMONIC = "proud ancient burger emotion verify salad mandate work pizza daughter live section"