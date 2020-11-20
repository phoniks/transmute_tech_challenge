import React, {useState} from 'react'
import {getWalletContents} from './utils'
import {CreateOperation, SelectByImage, GenerateContentsDialog, ICreateOperationProps } from '@material-did/core'
import {Button} from '@material-ui/core'
import {methods} from '@sidetree/wallet' 
import {getVerificationKey} from './ld-sig'
import cultivatorLicense from './credentials/cultivatorLicense.json'
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
  checkForKeys()
  // const index = keyOptions ? keyOptions.length : 0
  
  // const oldFunctionDoIneedIt  = async (mnemonic: (string | null)) => {
    //   console.log(mnemonic)
    //   const index = keyOptions ? keyOptions.length : 0
    //   let createOP
    //   if(!mnemonic == null){
      //     createOP = await methods.getCreateOperationForProfile(mnemonic!, index )
      //   }
      //   setCreateOperation(createOP)
      // }
      const IssueCredentialButton = (componentProps: any) => {
        return (
          <div>
      <p>Your DID: {activeKey}</p>
      <Button component='button' variant={componentProps.variant} color={componentProps.variant} onClick={componentProps.onSubmit} value={componentProps.value}>Continue</Button>
    </div>
  )
}

    return (
        <>
            { ((activeKey === null) && mnemonic == null) && 
            <SelectByImage label={'Active DID'} value={activeKey} options={keyOptions || ""} onChange={setActiveKey}/>}
             {  activeKey &&
              <IssueCredentialButton 
                componentProps={{
                  variant: 'contained',
                  color: 'primary',
                  onSubmit: props.onClick,
                  value: mnemonic
                }} 
              />
            }
        </>
    )
}
export default CreateDID

