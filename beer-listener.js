
var Web3 = require('web3');
var Contract = require('web3-eth-contract');


const web3 = new Web3("wss://ropsten.infura.io/ws/v3/9d558226a6364ce6a821646ee8c51806");

// Pete Main: 0x03509C9F6efB20F70181405DEd5FE1a0f52216D9
// Doc: 0xEDb31a4e1BA43701402D60DcB089A0BAE0181ddF

var wallets = require('./wallets.json');
console.log(wallets);

console.log(wallets.filter(item => {
    return item.name === "Zead";
}));


console.log("Starting event query...");
eventQuery();


async function eventQuery(){

    var contract = new Contract(require('./contracts/pint-abi.json'), '0x1b12242029405ceb7e1c672e9a6e3c784c1b1865');

    contract.setProvider(web3);

    console.log("Contract Address: " +contract.options.address);

    console.log("Getting brewer...");

    var brewer = await contract.methods.brewer().call(function(error, result) {
        if(error != null)
            console.log("Error getting brewer: " + error)
        return result;
    });

    if(brewer == null) {
        console.log("Could not get brewer, exiting.");
        process.exit(1);
    }

    console.log("Brewer: " + brewer);

    console.log("Waiting for beer transfer events...");

    contract.events.Transfer()
        .on('data', (event) => {
            var sender = event.returnValues.from;
            var receiver = event.returnValues.to;
            var numberOfPints = event.returnValues.value;
            
            console.log("Pint Tokens Sent!");
            console.log("Sender: " + sender);
            console.log("Receiver:" +receiver);
            console.log("Number of Pints:" +numberOfPints);

            if(receiver == brewer) {
                console.log("This is a beer redemption from the brewer. Enable the taps!");
            }
        })
        .on('error', console.error);

}




