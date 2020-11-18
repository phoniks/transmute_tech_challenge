import { EthereumLedger } from '@sidetree/ethereum'
import web3 from 'web3'
const Web3 = new web3()

const Ethereum = new EthereumLedger(Web3, contractAddress)
Ethereum.initialize()

export { Ethereum as blockchain }
