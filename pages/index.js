import { BigNumber, Contract, providers, utils } from "ethers";
import div from "next/head";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { STAKE_CONTRACT_ADDRESS, stake_abi, TOKEN_ADDRESS, token_abi, NFT_ADDRESS, nft_abi } from "../constants";
import styles from "../styles/Home.module.css";

export default function Home() {
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);
  // checks if the currently connected MetaMask wallet is the owner of the contract
  const [isOwner, setIsOwner] = useState(false);
  // tokenIdsMinted keeps track of the number of tokenIds that have been minted
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");

  const [stakedNFTs, setNfts] = useState([]);
  const [enterId, setEnter] = useState("");

  const [rewardsToken, setRewards] = useState();
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();

  const nftContainer = useRef();

  /**
   * presaleMint: Mint an NFT during the presale
   */
  const presaleMint = async () => {
    // try {
    //   // We need a Signer here since this is a 'write' transaction.
    //   const signer = await getProviderOrSigner(true);
    //   // Create a new instance of the Contract with a Signer, which allows
    //   // update methods
    //   const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
    //   // call the presaleMint from the contract, only whitelisted addresses would be able to mint
    //   const tx = await nftContract.presaleMint({
    //     // value signifies the cost of one crypto dev which is "0.01" eth.
    //     // We are parsing `0.01` string to ether using the utils library from ethers.js
    //     value: utils.parseEther("0.01"),
    //   });
    //   setLoading(true);
    //   // wait for the transaction to get mined
    //   await tx.wait();
    //   setLoading(false);
    //   window.alert("You successfully minted a Crypto Dev!");
    // } catch (err) {
    //   console.error(err);
    // }
  };

  /**
   * publicMint: Mint an NFT after the presale
   */
  const publicMint = async () => {
    // try {
    //   // We need a Signer here since this is a 'write' transaction.
    //   const signer = await getProviderOrSigner(true);
    //   // Create a new instance of the Contract with a Signer, which allows
    //   // update methods
    //   const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
    //   // call the mint from the contract to mint the Crypto Dev
    //   const tx = await nftContract.mint({
    //     // value signifies the cost of one crypto dev which is "0.01" eth.
    //     // We are parsing `0.01` string to ether using the utils library from ethers.js
    //     value: utils.parseEther("0.01"),
    //   });
    //   setLoading(true);
    //   // wait for the transaction to get mined
    //   await tx.wait();
    //   setLoading(false);
    //   window.alert("You successfully minted a Crypto Dev!");
    // } catch (err) {
    //   console.error(err);
    // }
  };

  /*
      connectWallet: Connects the MetaMask wallet
    */
  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };


  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Goerli network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  /**
   * startPresale: starts the presale for the NFT Collection
   */
  const startPresale = async () => {
    // try {
    //   // We need a Signer here since this is a 'write' transaction.
    //   const signer = await getProviderOrSigner(true);
    //   // Create a new instance of the Contract with a Signer, which allows
    //   // update methods
    //   const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
    //   // call the startPresale from the contract
    //   const tx = await nftContract.startPresale();
    //   setLoading(true);
    //   // wait for the transaction to get mined
    //   await tx.wait();
    //   setLoading(false);
    //   // set the presale started to true
    //   await checkIfPresaleStarted();
    // } catch (err) {
    //   console.error(err);
    // }
  };

  /**
   * checkIfPresaleStarted: checks if the presale has started by quering the `presaleStarted`
   * variable in the contract
   */
  const checkIfPresaleStarted = async () => {
    // try {
    //   // Get the provider from web3Modal, which in our case is MetaMask
    //   // No need for the Signer here, as we are only reading state from the blockchain
    //   const provider = await getProviderOrSigner();
    //   // We connect to the Contract using a Provider, so we will only
    //   // have read-only access to the Contract
    //   const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
    //   // call the presaleStarted from the contract
    //   const _presaleStarted = await nftContract.presaleStarted();
    //   if (!_presaleStarted) {
    //     await getOwner();
    //   }
    //   setPresaleStarted(_presaleStarted);
    //   return _presaleStarted;
    // } catch (err) {
    //   console.error(err);
    //   return false;
    // }
  };

  /**
   * checkIfPresaleEnded: checks if the presale has ended by quering the `presaleEnded`
   * variable in the contract
   */
  const checkIfPresaleEnded = async () => {
    // try {
    //   // Get the provider from web3Modal, which in our case is MetaMask
    //   // No need for the Signer here, as we are only reading state from the blockchain
    //   const provider = await getProviderOrSigner();
    //   // We connect to the Contract using a Provider, so we will only
    //   // have read-only access to the Contract
    //   const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
    //   // call the presaleEnded from the contract
    //   const _presaleEnded = await nftContract.presaleEnded();
    //   // _presaleEnded is a Big Number, so we are using the lt(less than function) instead of `<`
    //   // Date.now()/1000 returns the current time in seconds
    //   // We compare if the _presaleEnded timestamp is less than the current time
    //   // which means presale has ended
    //   const hasEnded = _presaleEnded.lt(Math.floor(Date.now() / 1000));
    //   if (hasEnded) {
    //     setPresaleEnded(true);
    //   } else {
    //     setPresaleEnded(false);
    //   }
    //   return hasEnded;
    // } catch (err) {
    //   console.error(err);
    //   return false;
    // }
  };

  /**
   * getOwner: calls the contract to retrieve the owner
   */
  const getOwner = async () => {
    // try {
    //   // Get the provider from web3Modal, which in our case is MetaMask
    //   // No need for the Signer here, as we are only reading state from the blockchain
    //   const provider = await getProviderOrSigner();
    //   // We connect to the Contract using a Provider, so we will only
    //   // have read-only access to the Contract
    //   const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
    //   // call the owner function from the contract
    //   const _owner = await nftContract.owner();
    //   // We will get the signer now to extract the address of the currently connected MetaMask account
    //   const signer = await getProviderOrSigner(true);
    //   // Get the address associated to the signer which is connected to  MetaMask
    //   const address = await signer.getAddress();
    //   if (address.toLowerCase() === _owner.toLowerCase()) {
    //     setIsOwner(true);
    //   }
    // } catch (err) {
    //   console.error(err.message);
    // }
  };

  /**
   * getTokenIdsMinted: gets the number of tokenIds that have been minted
   */
  const getTokenIdsMinted = async () => {
    // try {
    //   // Get the provider from web3Modal, which in our case is MetaMask
    //   // No need for the Signer here, as we are only reading state from the blockchain
    //   const provider = await getProviderOrSigner();
    //   // We connect to the Contract using a Provider, so we will only
    //   // have read-only access to the Contract
    //   const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
    //   // call the tokenIds from the contract
    //   const _tokenIds = await nftContract.tokenIds();
    //   //_tokenIds is a `Big Number`. We need to convert the Big Number to a string
    //   setTokenIdsMinted(_tokenIds.toString());
    // } catch (err) {
    //   console.error(err);
    // }
  };
  const stakeNFT = async (event) => {
    try {
      event.preventDefault();
      const signer = await getProviderOrSigner(true);
      const stakeContract = new Contract(STAKE_CONTRACT_ADDRESS, stake_abi, signer);
      const tx = await stakeContract.stake(enterId);
      setLoading(true);
      await tx.wait();
      setLoading(false);
      nfts_container();

    } catch (err) {
      console.error(err);
    }

  }

  const withdraw = async (event) => {
    try {
      event.preventDefault;
      const signer = await getProviderOrSigner(true);
      const stakeContract = new Contract(STAKE_CONTRACT_ADDRESS, stake_abi, signer);
      const num = event.target.name.split('#');
      const tx = await stakeContract.withdraw(num[1]);
      setLoading(true);
      await tx.wait();
      setLoading(false);
      nfts_container();

    } catch (err) {
      console.error(err);
    }
  }
  
  const claimRewards = async (event) => {
    try {
      event.preventDefault;
      const signer = await getProviderOrSigner(true);
      const stakeContract = new Contract(STAKE_CONTRACT_ADDRESS, stake_abi, signer);
      const num = event.target.name.split('#');
      const tx = await stakeContract.claimRewards();
      setLoading(true);
      await tx.wait();
      setLoading(false);
      nfts_container();

    } catch (err) {
      console.error(err);
    }
  }

  const getRewards = async () =>{
    try {
      // event.preventDefault();
      const signer = await getProviderOrSigner(true);
      const stakeContract = new Contract(STAKE_CONTRACT_ADDRESS, stake_abi, signer);
      const addr = await signer.getAddress();
      const clientData = await stakeContract.availableRewards(addr);
      setRewards(utils.formatEther(clientData));
    } catch (err) {
      console.error(err);
    }
  }


  const nfts_container = async () => {
    try {
      // event.preventDefault();
      const nftdata = [];
      const provider = await getProviderOrSigner(true);
      const addr = await provider.getAddress();
      const stakeContract = new Contract(STAKE_CONTRACT_ADDRESS, stake_abi, provider);
      const vintage = new Contract(NFT_ADDRESS, nft_abi, provider);
      const nfts1 = await stakeContract.getStakedTokens(addr);
      const result = nfts1.map(nf => { return utils.formatEther(nf[1]) });
      nfts1.forEach(async element => {
        const dtax = await vintage.tokenURI(element[1]);
        fetch(dtax)
          .then(response => response.json())
          .then(data => { nftdata.push({ "tokenId": utils.formatEther(element[1]), "data": data }); });

      });
      await setNfts(nftdata);
      console.log(stakedNFTs);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  // const retunrChild = (dnfts, keyi) => {
  //   return (<div className={styles.card} key={keyi}> <div className={styles.card_image}> <Image src="https://ipfs.io/ipfs/QmYeB4Bxsarmt5X5PAoGtQvCYrHn4j9kTKw3Xtgfi7HWkV/Picture3.jpg" layout='fill' alt="nft image" /></div> <div className={styles.card_title}></div> <button onClick={(e)=>{withdraw(e)}}>Withdraw #${Math.round(parseFloat(dnfts["tokenId"]) * (10 ** 18))}</button> </div>)
  // }

  // const nftcontainer = () => {
  //   const snfts = stakedNFTs;
  //   snfts.forEach((dnfts, keyi) =>{
  //     // const nftCard = parse(``);
  //     nftContainer.current.insertAdjacentHTML('beforeend',parse(retunrChild(dnfts, keyi)));
  //   })
  // }


  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal className to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
      nfts_container();
      console.log(rewardsToken);
      setInterval(async function () {
        await getRewards();
      }, 5 * 1000);
    }
  }, [walletConnected]);

  // useEffect(()=>{
  //   nfts_container();
  //   getRewards;
  // })

  /*
      renderButton: Returns a button based on the state of the dapp
    */
  const renderButton = () => {
    // If wallet is not connected, return a button which allows them to connect their wllet
    if (!walletConnected) {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    } else {
      return (
        <form className={`${styles.container} ${styles.stakeForm}`}>
          <input type="number" value={enterId} onChange={(event) => { event.preventDefault; const data = event.target.value; setEnter(data); }} />
          <button onClick={(e) => {stakeNFT(e)}}>{loading ? "Loading ":"Stake"}</button>
        </form>
      );
    }

    // // If we are currently waiting for something, return a loading button
    // if (loading) {
    //   return <button classNameName={styles.button}>Loading...</button>;
    // }

    // // If connected user is the owner, and presale hasnt started yet, allow them to start the presale
    // if (isOwner && !presaleStarted) {
    //   return (
    //     <button classNameName={styles.button} onClick={startPresale}>
    //       Start Presale!
    //     </button>
    //   );
    // }

    // // If connected user is not the owner but presale hasn't started yet, tell them that
    // if (!presaleStarted) {
    //   return (
    //     <div>
    //       <div classNameName={styles.description}>Presale hasnt started!</div>
    //     </div>
    //   );
    // }

    // // If presale started, but hasn't ended yet, allow for minting during the presale period
    // if (presaleStarted && !presaleEnded) {
    //   return (
    //     <div>
    //       <div classNameName={styles.description}>
    //         Presale has started!!! If your address is whitelisted, Mint a Crypto
    //         Dev 🥳
    //       </div>
    //       <button classNameName={styles.button} onClick={presaleMint}>
    //         Presale Mint 🚀
    //       </button>
    //     </div>
    //   );
    // }

    // // If presale started and has ended, its time for public minting
    // if (presaleStarted && presaleEnded) {
    //   return (
    //     <button classNameName={styles.button} onClick={publicMint}>
    //       Public Mint 🚀
    //     </button>
    //   );
    // }
  };

  return (
    <div>
      <div className={styles.back}></div>

      <div className={styles.main}>
        <div className={styles.header}>
          <div>Staking decentralized application</div>
        </div>
        <div className={styles.bar}>
          <div  className={styles.rewards}>Claimable Rewards</div>
        </div>
        <div className={styles.bar_label}>
          <div className={styles.rewards}>{rewardsToken}</div>
          <button onClick={(e)=>{claimRewards(e)}} className={`${styles.staken} ${styles.claimrwrds}`}>{loading ? "Loading ...":"Claim Rewards"}</button>
        </div>
        <div className={styles.stake}>
          {renderButton()}
        </div>

        <div className={styles.container} ref={nftContainer} id="container">
          {[...stakedNFTs].map((stkn, keyi) => {
            const srcpath = stkn["data"]["image"].split("/");
            return (
              <div className={styles.card} key={keyi}>
                <div className={styles.card_image}> <Image src={`https://ipfs.io/ipfs/${srcpath[2]}/${srcpath[3]}`} width={'270px'} height='180px' alt="nft image" /></div>
                <div className={styles.card_title}></div>
                <button onClick={(e)=>{withdraw(e)}} name={"nft#"+Math.round(parseFloat(stkn["tokenId"]) * (10 ** 18))}>{loading ? "Loading ...":"Withdraw"}</button>
              </div>
            )
          })}
        </div>

      </div>

      {/* <template>
      <div className={styles.card} id="">
        <div className={styles.card_image}> <Image src="/" width="100%" height="100%" onError={() => {this.src='../public/error.png'}} alt="nft image"/></div>
        <div className={styles.card_title}></div>
        <button onClick="">Withdraw</button>
      </div>
    </template> */}
    </div>
  );
}