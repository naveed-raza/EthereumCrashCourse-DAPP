var Tx = require('ethereumjs-tx');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/0a25048aeb82403092ef588975317941"));

var account1 = "0x88E7F9d05FFba4Cf95B01Bd1c0E959DC93b24845";
var account2 = "0xA132BCa19EF140dd04e3901Cdf4f48787D5Bf815";

var PRIVATE_KEY_1 = Buffer.from('CD27EE061AAB8C20B42D0DD8500C21536B6272E92CFBD2148DBD0FE5C13106B3', 'hex');
var PRIVATE_KEY_2 = Buffer.from('1727EE47D0790F32DC831974E2C13098330C1B14E8A767FBF1FF211FA66E2739', 'hex');


// Sending a tranaction to ropsten 

web3.eth.getTransactionCount(account1, (err, txCount) => {
	//build the transaction
	const txObject = {
		nonce : web3.utils.toHex(txCount),
		to : account2,
		value : web3.utils.toHex(web3.utils.toWei('0.20', 'ether')),
		gasLimit : web3.utils.toHex(21000),
		gasPrice : web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
	}
	console.log(txObject);

	//Sign the transaction
	const tx = new Tx(txObject);
	tx.sign(PRIVATE_KEY_1);

	const serializedTransaction = tx.serialize();
	const raw = '0x' + serializedTransaction.toString('hex');

	console.log("Serialized Transaction : ", serializedTransaction);
	console.log("Raw : ", raw);

	//Broadcast the address
	web3.eth.sendSignedTransaction(raw, (err, txHash) =>{
		console.log("TxHash : ", txHash)
	});

});