import React, {useState} from 'react'
import {getWalletContents} from './utils'
import {CreateOperation, SelectByImage, ISelectByImageProps} from '@material-did/core'
declare var window: any;

const newDID = {
    "@context": "https://w3id.org/did/v1",
  "publicKey": [
    {
      "id": "#primary",
      "type": "JsonWebKey2020",
      "publicKeyJwk": {
        "crv": "Ed25519",
        "x": "2UR1Cz7qUSuoc4b4xw4JNJto1PD4IcTNC28Xdwrbdug",
        "kty": "OKP"
      }
    }
  ]
}

const CreateDID = (props: any) => {
  const [ walletState, setWalletState ] = useState({ contents: [] });
  const [ activeKey, setActiveKey ] = useState(null)
  const [ keyOptions, setKeyOptions] = useState<Array<any> | undefined>(undefined)
  const checkForKeys = async () => {
    const { ethereum } = window;
    if (typeof ethereum !== "undefined") {
      const contents: any = await getWalletContents();
      setWalletState({
        contents,
      });
    }
    const availableDIDs = walletState.contents.filter((entry: any) => entry.id.substring(0,3) === 'did')
    const options = availableDIDs.map(((entry: any) => { return {value: entry.id, logo: entry.image, label: entry.name}} ))
    setKeyOptions(options)
  };

  checkForKeys()
    return (
        <>
            {(activeKey === null) && <SelectByImage label={'Active Keys'} value={activeKey} options={keyOptions} onChange={setActiveKey}/>}
            {activeKey && <CreateOperation operation={} didMethodPrefix={'elem:ropsten'}/>}
        </>
    )
}
export default CreateDID