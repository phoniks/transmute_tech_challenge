import React, {useState} from 'react'
import { JSONEditor } from '@material-did/core'
import {Button} from '@material-ui/core'
import moment from 'moment'
import {IssueLicense} from './IssueLicense'




moment.locale('en')

const applicationData = {
    "@context": ["https://localhost:4986/CDFA_Cultivators_License"],
    "@type": "CDFA Cultivator License",
    "applicant": "A.C.M.E. Cannabis Cultivators",
    "dateRecieved": moment(Date.now()).format('MM/DD/YYYY HH:mm A'),    
    "backgroundChecksOkay": true,
    "feePaid": true
}


const California = () => {
    const [regulatorPage, setRegulatorPage] = useState('regulator')
    const [license, submitLicense] = useState()
    
    return (<>
    {regulatorPage === 'regulator' && <RegulatorIntro onClick={() => setRegulatorPage('application')} />}
    {regulatorPage === 'application' && <CultivatorApplication onClick={() => setRegulatorPage('issue')}/>}
    {regulatorPage === 'issue' && <IssueLicense onSubmit={submitLicense} license={license}/>}
    </>)
} 

export default California

const RegulatorIntro = (props: any) => {
    return (<>
    <p>You're a part of the regulatory body for California's cannabis market. You've recieved a completed
        application for a cultivator license. Now you need to issue a Verifiable Credential to the operator.</p>
        <Button onClick={props.onClick}>Okay!</Button>
    </>)
}

const CultivatorApplication = (props: any) => {
    return (
        <>
        <JSONEditor value={JSON.stringify(applicationData, null, `\t`)}/>
        <button onClick={props.onClick}>Issue Credential</button>
        </>
    )
}



