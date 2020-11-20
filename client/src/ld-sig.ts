import {EcdsaSecp256k1VerificationKey2019} from 'ecdsa-secp256k1-verification-key-2019';    
import {CryptoLD} from 'crypto-ld'; 
const cryptoLd = new CryptoLD();

cryptoLd.use(EcdsaSecp256k1VerificationKey2019);

export const getVerificationKey = async (controller: string, seed?: string ) => {
    const keypair = await cryptoLd.generate({type: "EcdsaSecp256k1VerificationKey2019", controller});
    const keyObject = await keypair.export({publicKey: true, privateKey: true})
    return keyObject
}