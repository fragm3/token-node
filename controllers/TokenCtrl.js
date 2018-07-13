const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const {BYTECODE, ABI} from '../contracts/contract'

const provider = new HDWalletProvider(
    'wasp labor vacuum fine assault width ball rural wood gorilla bid improve',
    'https://ropsten.infura.io/STdxqM70t0u4G4kl1yFU '
);

var web3 = new Web3(provider);

var deployToken = function(req, res){

    var initialSupply = req.body.initialSupply
    var tokenName = req.body.tokenName
    var decimalUnits = req.body.decimalUnits
    var tokenSymbol = req.body.tokenSymbol
    var ethereumAddress = req.body.ethereumAddress
    var deployOpts = {
        data : "0x"+BYTECODE,
        arguments : [initialSupply,tokenName,decimalUnits,tokenSymbol]
    };
    let sendOpts = {
        // from: accounts[0],
        from : ethereumAddress,
        gas: 3716260,
        gasPrice: 5000000000
    };

    var standardtokenContract = new web3.eth.Contract(ABI);
    let isMined = false;
    var standardtoken = standardtokenContract.deploy(deployOpts).send(sendOpts)
    .on('error', error => console.log("Error", error)
    .on('transactionHash', function(transactionHash){
        console.log("contract deployment transaction: " + transactionHash);
        res.send({status: "200", message: "Contract created successfully", transactionHash})
    })
    checkTxMined(web3, transactionHash, function txMinedCallback(receipt) {
        if (isMined) return;
        if (receipt) {
        if (receipt.blockNumber) {
            console.log("Contract deployment is mined from polling of tx receipt");
            isMined = true;
            console.log(receipt.contractAddress) // instance with the new contract address
            return cb(null, receipt.contractAddress);
        } else {
            console.log("Still mining... Polling of transaction once more");
            setTimeout(function() {
            checkTxMined(web3, transactionHash, txMinedCallback)
            }, 5000);
        }
        } else {
        console.log("Still mining... Polling of transaction once more");
        setTimeout(function() {
            checkTxMined(web3, transactionHash, txMinedCallback)
        }, 5000);
        }
    })
    })
    .on('confirmation', function(confirmationNumber, receipt) { })
    .then(function(newContractInstance){
    if (!isMined) {
        console.log("Contract deployment is mined from Promise");
        isMined = true;
        console.log(newContractInstance.options.address) // instance with the new contract address
        cb(null, newContractInstance.options.address);
    }

exports.deployToken = deployToken;