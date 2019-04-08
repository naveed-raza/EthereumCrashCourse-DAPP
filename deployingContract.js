var Tx = require('ethereumjs-tx');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/0a25048aeb82403092ef588975317941"));

var account1 = "0x88E7F9d05FFba4Cf95B01Bd1c0E959DC93b24845";
var account2 = "0xA132BCa19EF140dd04e3901Cdf4f48787D5Bf815";

var PRIVATE_KEY_1 = Buffer.from('CD27EE061AAB8C20B42D0DD8500C21536B6272E92CFBD2148DBD0FE5C13106B3', 'hex');
var PRIVATE_KEY_2 = Buffer.from('1727EE47D0790F32DC831974E2C13098330C1B14E8A767FBF1FF211FA66E2739', 'hex');


//deploying a contract on ropsten testnetwork

const contractData = '0x60806040526040805190810160405280600681526020017f6e617665656400000000000000000000000000000000000000000000000000008152506000908051906020019061004f929190610067565b50601560015534801561006157600080fd5b5061010c565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a857805160ff19168380011785556100d6565b828001600101855582156100d6579182015b828111156100d55782518255916020019190600101906100ba565b5b5090506100e391906100e7565b5090565b61010991905b808211156101055760008160009055506001016100ed565b5090565b90565b6103538061011b6000396000f3fe60806040526004361061005c576000357c01000000000000000000000000000000000000000000000000000000009004806306fdde031461006157806317d7de7c146100f1578063262a9dff14610181578063967e6e65146101ac575b600080fd5b34801561006d57600080fd5b506100766101d7565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100b657808201518184015260208101905061009b565b50505050905090810190601f1680156100e35780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156100fd57600080fd5b50610106610275565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561014657808201518184015260208101905061012b565b50505050905090810190601f1680156101735780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561018d57600080fd5b50610196610317565b6040518082815260200191505060405180910390f35b3480156101b857600080fd5b506101c161031d565b6040518082815260200191505060405180910390f35b60008054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561026d5780601f106102425761010080835404028352916020019161026d565b820191906000526020600020905b81548152906001019060200180831161025057829003601f168201915b505050505081565b606060008054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561030d5780601f106102e25761010080835404028352916020019161030d565b820191906000526020600020905b8154815290600101906020018083116102f057829003601f168201915b5050505050905090565b60015481565b600060015490509056fea165627a7a7230582069832878b07f5a996a4231dfa183663697cc8a0613109ea6ca17555043477e050029';


web3.eth.getTransactionCount(account2, (err, txCount) => {
	//build the transaction
	const txObject = {
		nonce : web3.utils.toHex(txCount),
		data : contractData,
		gasLimit : web3.utils.toHex(1000000),
		gasPrice : web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
	}
	console.log(txObject);

	//Sign the transaction
	const tx = new Tx(txObject);
	tx.sign(PRIVATE_KEY_2);

	const serializedTransaction = tx.serialize();
	const raw = '0x' + serializedTransaction.toString('hex');

	// console.log("Serialized Transaction : ", serializedTransaction);
	// console.log("Raw : ", raw);

	//Broadcast the address
	web3.eth.sendSignedTransaction(raw, (err, txHash) =>{
		console.log("TxHash : ", txHash);
		console.log("Error : ", err);
	});

// });