<<<<<<< HEAD
import * as dotenv from 'dotenv';
=======
import * as dotenv from "dotenv";
>>>>>>> cdde5da5bfecf6e87f19da33f6ea2694b5ad30e7

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
<<<<<<< HEAD
  case 'test':
    path = `${__dirname}/../../.env.test`;
    break;
  case 'production':
=======
  case "test":
    path = `${__dirname}/../../.env.test`;
    break;
  case "production":
>>>>>>> cdde5da5bfecf6e87f19da33f6ea2694b5ad30e7
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../.env`;
}
dotenv.config({ path: path });

export const APP_ID = process.env.APP_ID;
export const LOG_LEVEL = process.env.LOG_LEVEL;

<<<<<<< HEAD
export const ELEMENT_PROVIDER = 'http://127.0.0.1:8545';
export const ELEMENT_IPFS_MULTIADDR = process.env.ELEMENT_IPFS_MULTIADDR;
export const ELEMENT_CONTRACT_ADDRESS =
  '0x74435D1c1018798243d201B5f4e6187c62562E72';
export const DATABASE_URL = 'mongodb://localhost:27017/element-test';
export const DATABASE_NAME = 'element-test';
export const SESSION_SECRET =
  '379tE844LHttpRe1395entTa3243entTa16219lidRespons8';
export const MNEMONIC =
  'proud ancient burger emotion verify salad mandate work pizza daughter live section';
=======
export const ELEMENT_PROVIDER = "http://127.0.0.1:8545"
export const ELEMENT_IPFS_MULTIADDR = process.env.ELEMENT_IPFS_MULTIADDR
export const ELEMENT_CONTRACT_ADDRESS = "0x74435D1c1018798243d201B5f4e6187c62562E72"
export const DATABASE_URL = 'mongodb://localhost:27017/element-test'
export const DATABASE_NAME = "element-test"
export const SESSION_SECRET = "379tE844LHttpRe1395entTa3243entTa16219lidRespons8"
export const MNEMONIC = "proud ancient burger emotion verify salad mandate work pizza daughter live section"
>>>>>>> cdde5da5bfecf6e87f19da33f6ea2694b5ad30e7
