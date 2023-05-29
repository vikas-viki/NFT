require("dotenv").config();
const API_KEY = process.env.API_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const {createAlchemyWeb3} = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_KEY);

const contract = require("../artifacts/contracts/NFT.sol/NFT.json");

const contractAddress = "0x9Ef94a755C47aBB0630eBe2Df6d61A670BDa9740";

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mint(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 3000000,
    data: nftContract.methods.mint(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log("Promise failed:", err);
    });
    console.log(signPromise);
}

mint("http://gateway.pinata.cloud/ipfs/QmZG2U4D8acT19U5Z8EdNVtSXgxwTx5BwvTc8uaKLKKy65");
