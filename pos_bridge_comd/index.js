// const express = require('express')
// const app = express()
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json('application/json'));
// const port = 3000


// // const use = require("@maticnetwork/maticjs")
// const Web3ClientPlugin = require("@maticnetwork/maticjs-web3")
// const {POSClient, use} = require("@maticnetwork/maticjs");
// const HDWalletProvider = require("@truffle/hdwallet-provider")
// // use(Web3ClientPlugin)
// const PlasmaClient = require("@maticnetwork/maticjs-plasma")


// // app.use(Web3ClientPlugin)

// app.get("/demo", async (req, res) => {


//     use(Web3ClientPlugin);
//     var privateKey = "f04d74c1d0afef498f0032adbd22f7af6119b2d7b1c4cafbbb850739b8203c98"

//     const posClient = new POSClient();
//     await posClient.init({
//         network: 'testnet',
//         version: 'mumbai',
//         parent: {
//             provider: new HDWalletProvider(privateKey, "https://mainnet.infura.io/v3/"),
//             defaultConfig: {
//                 from: "0x192b515c92B8aa6D2582b5FDd426Ce34C4dE8f7c"
//             }
//         },
//         child: {
//             provider: new HDWalletProvider(privateKey, "https://mainnet.infura.io/v3/"),
//             defaultConfig: {
//                 from: "0x192b515c92B8aa6D2582b5FDd426Ce34C4dE8f7c"
//             }
//         }
//     });
//     res.status(400)

//     // const getPOSClient = async (network = 'testnet', version = 'mumbai') => {
//     //     const posClient = new POSClient();

//     //   await posClient.init({
//     //       network:  "testnet" ,// <network name>,  // 'testnet' or 'mainnet'
//     //       version:   "mumbai", //<network version>, // 'mumbai' or 'v1'
//     //       parent: {
//     //         provider: "", //<parent provider>,
//     //         defaultConfig: {
//     //               from: "0x192b515c92B8aa6D2582b5FDd426Ce34C4dE8f7c" //<from address>
//     //         }
//     //       },
//     //       child: {
//     //         provider: "" ,//<child provider>,
//     //         defaultConfig: {
//     //               from: "0x192b515c92B8aa6D2582b5FDd426Ce34C4dE8f7c" ,//<from address>
//     //         }
//     //       }
//     //   });
//     // }
//     console.log("getPOSClient", getPOSClient)
//     res.send("getPOSClient", getPOSClient)
// })    
// app.get("/demo2", async (req, res) => {
//     const plasmaClient = new PlasmaClient();

//     await plasmaClient.init({
//         network: "testnet",//<network name>,  // 'testnet' or 'mainnet'
//         version: "mumbai",//<network version>, // 'mumbai' or 'v1'
//         parent: {
//             provider: "", //<parent provider>,
//             defaultConfig: {
//                 from: "0x192b515c92B8aa6D2582b5FDd426Ce34C4dE8f7c"  //<from address>
//             }
//         },
//         child: {
//             provider: "",//<child provider>,
//             defaultConfig: {
//                 from: "0x192b515c92B8aa6D2582b5FDd426Ce34C4dE8f7c" // <from address>
//             }
//         }
//     });
// })




// app.listen(port, () => {
//     console.log(`**********************************************\nChating app listening at http://localhost:${port}\n\n**********************************************\n`)
// })


var Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider')
const {MaticPOSClient }= require('@maticnetwork/maticjs')


async function approveandtransfer() {
    const privateKey = 'f04d74c1d0afef498f0032adbd22f7af6119b2d7b1c4cafbbb850739b8203c98';//owner private key
    
    const from = "0xaa737df2b2c4175205af4644cb4e44d7b9cee5d4";//contract owner address
    const rootToken = "0x10e4FD4Df305881EA392d5486d2345fE5A69415b"; // this is taken from matic docs and discussed below(contractaddress)
    
    const tokenContractAddress = "0x345e6e8af29272dfdee5583c304c0dc0394bcf6a";

    // the following RPC urls will change for mainnet.
    const parentProvider = new HDWalletProvider(privateKey, 'https://rinkeby.infura.io/v3/48bb610378a34e74a242999e8a6429f7');
    const maticProvider = new HDWalletProvider(privateKey, 'https://rpc-mumbai.maticvigil.com/v1/82f5eaa78142abb17715fdb16a3cbfb0fd1da890');
    
      // for mumbai testnet
      const maticPOSClient = new MaticPOSClient({
        network: "testnet",
        version: "mumbai",
        parentProvider: parentProvider,
        maticProvider: maticProvider
    });
    // maticPOSClient.initialize()
    console.log("approve initiated");

    var amount = Web3.utils.toWei('0.0001', 'ether');
    // var amount = 100
    


    await maticPOSClient.approveERC20ForDeposit(rootToken, amount, {
        from: '0x79319A973Be6C6F0cbad2206ea4F6573A9ecF223',
        gasPrice: "10000000000",
    });

    console.log("approve completed and transfer initiated");

    await maticPOSClient.depositERC20ForUser(rootToken, from, amount, {
        from: '0x79319A973Be6C6F0cbad2206ea4F6573A9ecF223',
        gasPrice: "10000000000",
    });

    console.log("transfer complete");

    // var tokenId = 1

    // await maticPOSClient.approveaERC721(tokenContractAddress, tokenId, {
    //     from: '0x79319A973Be6C6F0cbad2206ea4F6573A9ecF223',
    //     gasPrice: "10000000000",
    // });

    // console.log("approve completed and transfer token");

    // await maticPOSClient.depositERC20ForUser(tokenContractAddress, from, tokenId, {
    //     from: '0x79319A973Be6C6F0cbad2206ea4F6573A9ecF223',
    //     gasPrice: "10000000000",
    // });

    // console.log("transfer complete");

    
}

approveandtransfer()