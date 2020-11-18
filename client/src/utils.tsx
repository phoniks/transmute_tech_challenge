import Eth from "ethjs";
declare var window: any;

export const getWalletContents = async () => {
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