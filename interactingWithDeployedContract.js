var Tx = require('ethereumjs-tx');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/0a25048aeb82403092ef588975317941"));

var account1 = "0x88E7F9d05FFba4Cf95B01Bd1c0E959DC93b24845";
var account2 = "0xA132BCa19EF140dd04e3901Cdf4f48787D5Bf815";

var PRIVATE_KEY_1 = Buffer.from('CD27EE061AAB8C20B42D0DD8500C21536B6272E92CFBD2148DBD0FE5C13106B3', 'hex');
var PRIVATE_KEY_2 = Buffer.from('1727EE47D0790F32DC831974E2C13098330C1B14E8A767FBF1FF211FA66E2739', 'hex');

console.log("Account 1 key : ", PRIVATE_KEY_1);
console.log("Account 2 key : ", PRIVATE_KEY_2);


//interactin with deployed contract
//after deploying contract

const contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"age","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAge","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
const transactionHash = '0xc0f93f2df30e722e688ab034d03b09bb6e8a3b9246fc56ab574930611bcc809f';
const contractAddress = '0xa8dd7103fd7cfd0453fd9982406889aff64919cb';

var contract = new web3.eth.Contract(contractABI, contractAddress);
contract.methods.getAge().call({from : account2}, (err, result) => {
	console.log("Result : ", web3.utils.hexToNumber(result));
	console.log("Error : ", err);
});
