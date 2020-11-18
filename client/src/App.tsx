import React, {useState} from 'react';
import Welcome from './Welcome'
import Demo from './Demo'
import './App.css';


function App() {
  const [ active, setActive ] = useState("welcome")
  return (
    <div className="App">
      <header className="App-header">
        {active === "welcome" && <Welcome onClick={()=>{setActive("overview")}}/>}
        {active === "overview" && <Overview onClick={()=>{setActive("demo")}}/>}
        {active === "demo" && <Demo setActive={setActive}/>}
      </header>
    </div>
  );
}

export default App;

const Overview = (props: any) =>{
  return <div className="Overview">
    <h3>Here's what you can expect from this demonstration</h3> 
    <p>
      We'll walk through 3 seperate processes in the lifecycle of a Verifiable Credential. You'll be getting you the <b>V.I.P.</b> treatment today... just not in that order.
      First we'll take a look at an <b>I</b>ssuance, then a <b>P</b>roof, or "Presentation", and finally a <b>V</b>erification of Verifiable Credentials. For our example, we're 
      playing the roles of three different participants in the legal cannabis market in California.  First, you'll don the hat of the state regulatory body, and
      <em>issue</em> a credential to licensed cultivator. Then, you'll step into the shoes of a Cultivator, and create a proof for to a dispensary who you want 
      to do business with. Finally, you'll assume the role of consumer, and verify a proof that your cannabis is grown in a particular region of California.
    </p>
    <button onClick={props.onClick}> Next</button>
  </div>
}