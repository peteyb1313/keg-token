
class WalletHandler {
    constructor(){
        console.log("Loading wallets from ./wallets.json");
        this.wallets = require('./wallets.json');
    }

    getName(address) {
        console.log("Finding address: " +address);
        var wallet = this.wallets.find(x => x.address.toLowerCase() == address.toLowerCase());
        return wallet ? wallet.name : "Stranger";
    }
}

module.exports = WalletHandler;