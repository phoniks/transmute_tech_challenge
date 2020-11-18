import React, { useState } from "react";
import {
  IssueVerifiableCredentialDialog,
  WalletContentsTable,
} from "@material-did/core";
import {getWalletContents} from './utils'
import { Button } from "@material-ui/core";
declare var window: any;

export const IssueLicense = (props: any) => {
  const [ walletState, setWalletState ] = useState({ contents: [] });
  const _setUpWallet = async () => {
    const { ethereum } = window;
    if (typeof ethereum !== "undefined") {
      const contents: any = await getWalletContents();
      console.log(contents);
      setWalletState({
        contents,
      });
    }
    console.log(walletState.contents)
  };

  return (
    <>
    { (!walletState.contents.length ) && 
    <>
      <p> Connect to MetaMask to Continue</p>
      <p>
        Since we're dealing with Verifiable Credentials, you'll need a crypto
        wallet to sign transactions. For this demo we'll use MetaMask. If you
        don't already have it installed in your browser, you'll need to{" "}
        <a href="https://metamask.io/download.html">install</a> it to continue.
        If you've already got it installed, click the button down below to
        connect to your wallet.
      </p>
      <Button
        onClick={async () => {
          _setUpWallet();
        }}
      >
        Connect
      </Button>
      </>
    }
      {!!walletState.contents.length && (
        <WalletContentsTable walletState={walletState} />
      )}
        {!!walletState.contents.length && (
        <IssueVerifiableCredentialDialog
          walletState={walletState}
          component={Button}
          componentProps={{
            variant: "contained",
            color: "primary",
          }}
          onSubmit={props.onSubmit}
          {...props}
        />
      )}
    </>
  );
};

