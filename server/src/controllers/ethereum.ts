import { EthereumLedger } from '@sidetree/ethereum'
import { ELEMENT_CONTRACT_ADDRESS, ELEMENT_PROVIDER } from '../utils/config'
import web3 from 'web3'
const Web3 = new web3(new web3.providers.HttpProvider(ELEMENT_PROVIDER))

const Ethereum = new EthereumLedger(Web3, ELEMENT_CONTRACT_ADDRESS)
Ethereum.initialize()

export { Ethereum as blockchain }
