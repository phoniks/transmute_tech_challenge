import React, {useState} from 'react'
import {getWalletContents} from './utils'
import {CreateOperation, SelectByImage, GenerateContentsDialog, ICreateOperationProps } from '@material-did/core'
import {Button} from '@material-ui/core'
import {methods} from '@sidetree/wallet' 
declare var window: any;

interface SidetreeCreateOperation {
  type: 'create';
  suffix_data: string;
  delta: string;
}

const CreateDID = (props: any) => {
  const [ walletState, setWalletState ] = useState({ contents: [] });
  const [ activeKey, setActiveKey ] = useState(null)
  const [ mnemonic, setMnemonic ] = useState(null)
  const [ keyOptions, setKeyOptions] = useState<Array<any> | undefined>(undefined)
  const [ createOperation, setCreateOperation ] = useState<SidetreeCreateOperation | undefined>(undefined)
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

  const generateKeyPair = async (mnemonic: (string | null)) => {
    console.log(mnemonic)
    const index = keyOptions ? keyOptions.length : 0
    let createOP
    if(!mnemonic == null){
      createOP = await methods.getCreateOperationForProfile(mnemonic!, index )
    }
    setCreateOperation(createOP)
    console.log(createOperation)
  }
  const CreateKeyPairButton = (componentProps: any) => {
  return (
    <div onClick={componentProps.onSubmit}>
      <Button component='button' variant={componentProps.variant} color={componentProps.variant} onSubmit={componentProps.onSubmit} value={componentProps.value}>Create Key Pair</Button>
    </div>
  )
}

  checkForKeys()
    return (
        <>
            { ((activeKey === null) && mnemonic == null) && 
            <>
            <SelectByImage label={'Active Keys'} value={activeKey} options={keyOptions} onChange={setActiveKey}/>
            <br/>
            OR 
            <br/>
            Generate a new Mnemonic
            <br/>
            <GenerateContentsDialog component={Button} variant="contained" color="secondary" onSubmit={setMnemonic}/>
            </>
            }
            { mnemonic && 
              <CreateKeyPairButton 
                componentProps={{
                  variant: 'contained',
                  color: 'primary',
                  onSubmit: generateKeyPair,
                  value: mnemonic
                }} 
              />
            }
            
            {createOperation && <CreateOperation operation={createOperation} didMethodPrefix={'elem:ropsten'}/>}
        </>
    )
}
export default CreateDID

