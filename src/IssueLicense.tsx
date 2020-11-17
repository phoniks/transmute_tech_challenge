import React, { useState } from "react";
import {
  IssueVerifiableCredentialDialog,
  WalletContentsTable,
} from "@material-did/core";
import Eth from "ethjs";
import { Button } from "@material-ui/core";
declare var window: any;
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

const getWalletContents = async () => {
  const { ethereum }: any = window;
  const accounts = await ethereum.enable();
  const eth = new Eth(ethereum);
  const network = "ropsten";
  let i = 0;
  const controllers = await Promise.all(
    accounts.map(async (account: string) => {
      i++;
      return {
        "@context": [
          "https://transmute-industries.github.io/universal-wallet/contexts/wallet-v1.json",
        ],
        id: `did:ethr:${account}`,
        type: "EthereumAddress",
        controller: [`did:ethr:${account}`],
        name: `MetaMask Account ${i}`,
        image: "https://metamask.io/images/webclip.png",
        description: "My ropsten testnet account.",
        privateKeyBrowser: `urn:metamask:${account}`,
      };
    })
  );
  i = 0;
  const currencies = await Promise.all(
    accounts.map(async (account: string) => {
      const balance = await eth.getBalance(account);
      const etherValue = Eth.fromWei(balance.toString(), "ether");
      i++;
      return {
        "@context": [
          "https://transmute-industries.github.io/universal-wallet/contexts/wallet-v1.json",
        ],
        id: `https://${network}.etherscan.io/address/${account}`,
        type: "Currency",
        amount: etherValue,
        currency: "ETH",
        controller: [`did:ethr:${account}`],
        name: `MetaMask Balance ${i}`,
        image: "https://metamask.io/images/webclip.png",
        description: "Hot wallet funds.",
      };
    })
  );
  const contents = [...currencies, ...controllers];
  // console.log(JSON.stringify(contents, null, 2));
  return contents;
};

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
  };

  return (
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

