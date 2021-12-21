
class WalletHandler {
    constructor(){
        this.wallets = require('./wallets.json');
        console.log(this.wallets);
    }

    getName(address) {
        console.log("Finding address: " +address);
        var wallet = this.wallets.find(x => x.address.toLowerCase() == address.toLowerCase());
        return wallet ? wallet.name : "Stranger";
    }
}

module.exports = WalletHandler;