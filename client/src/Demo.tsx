import React from "react";
import { TabPanels } from "@material-did/core";
import Regulator from './Regulator'
const Demo = (props: any) => {
  return (
    <TabPanels
      tabs={[
 
        {
          index: 0,
          label: "California",
          panel: <Regulator/>,
        },
        {
            index: 1,
            label: "Cultivator",
            panel: <Cultivator/>
        },
        {
            index: 2,
            label: "Consumer",
            panel: <Consumer/>
        },
        // {
        //     index: 3,
        //     label: "Help",
        //     panel: <Help/>
        // }
      ]}
    />
  );
};

export default Demo;


const Cultivator = () => {
    return (<> <p>This is the Cultivator Componenet</p> </> )
} 
const Consumer = () => {
    return (<> <p>This is the Consumer Componenet</p> </> )
} 
// const Help = () => {
//     return (
//         <>
//             <p>
//                 You're taking on the roles of three players in California's legal cannabis industry.  
//                 As the Regulator for the state of California, you need to issue a license to the Cultivator.
//                 As the Cultivator, you need to create a proof that you are licensed to Cultivate in California.
//                 As the Consumer, you need to verify that the cannabis you bought was grown in California.
//             </p>
//         </> )
// } 