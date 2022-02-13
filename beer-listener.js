
var Web3 = require('web3');
var Contract = require('web3-eth-contract');
var GoogleFuncs = require('./google-interactions.js');
var WalletHandler = require('./wallet-handler.js');
var ShellyFuncs = require('./shelly-interactions.js');
var minimist = require('minimist');

var args = minimist(process.argv.slice(2), {
    string: [ 'google-ip', 'shelly-ip' ],
    boolean: [ 'enable-google' ],
    alias: { h: 'help', v: 'version' },
    default: { lang: 'en' },
    '--': true,
    stopEarly: true, /* populate _ with first non-option */
    unknown: function () { console.log("Usage: beer-listener.js --enable-google=true --google-ip=<IP> --shelly-ip=<IP>"); process.exit(); } /* invoked on unknown param */
  });

console.log("Starting... \n");

if(args.h) {
    console.log("Usage: beer-listener.js --enable-google=true --google-ip=<IP> --shelly-ip=<IP>");
    process.exit();
}

if(args["enable-google"] && args["google-ip"] == null) {
    console.log("Set a google IP or disable google with --enable-google=false");
    process.exit();
}

const web3 = new Web3("wss://ropsten.infura.io/ws/v3/9d558226a6364ce6a821646ee8c51806");

var googleFuncs = null

if(args["enable-google"]) 
    googleFuncs = new GoogleFuncs(args["google-ip"]);

var shellyFuncs = new ShellyFuncs(args["shelly-ip"]);
var walletHandler = new WalletHandler();

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

            var senderName = walletHandler.getName(sender);
            var receiverName = walletHandler.getName(receiver);

            if(args["enable-google"]) 
                googleFuncs.sendMessage("New pint transaction detected. " +senderName +" sent " +receiverName +" " +numberOfPints +(numberOfPints == 1 ? " pint." : " pints."));

            if(receiver == brewer) {
                console.log("This is a beer redemption from the brewer. Enable the taps!");

                if(args["enable-google"]) 
                    setTimeout(function(){googleFuncs.sendMessage("Enabling taps!");}, 5000);
                
                shellyFuncs.switchRelay(true);
                setTimeout(function(){shellyFuncs.switchRelay(false);}, 20000); // close taps in 20 seconds

            }
        })
        .on('error', console.error);
}




