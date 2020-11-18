import React from 'react'
import logo from './logo.png';

const Welcome: any = (props: any) => {

    return (
        <>
        <img src={logo} className="App-logo" alt="logo" /><p>
                    Welcome to my Decentralized Identifiers and <br /> Verifiable Credentials Full-Stack Engineer Demo
        </p>
            <button
                className="App-link"
                onClick = {props.onClick}
            >
                Let's get started!
            </button>
        </>
    )
}

export default Welcome
