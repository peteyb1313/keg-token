# Beer Tokens (KEG & PINT)

Every Pint Token (PINT) is redeemable for a 1 pint from the brewery.

Every Keg Token (KEG) is redeemable for a 5 gallon keg.

Conversion table:

- 1 KEG = 5 Gallons
- 0.1  KEG = 5 PINTs
- 0.02 KEG = 1 PINT

# Setup

1. Install Metamask on your phone
2. Setup Metamask wallet
3. At the top of your wallet, change from "Ethereum Main Network" to "Kovan Test Network"
4. At the bottom of your wallet, select "Import Tokens" 
5. For "Token Address" paste `0x921f08D2078b15416876fD219cDADB40A46C2feC` this is the address for Pint Tokens (PINT)
6. Swipe down to refresh your tokens.
7. Send and receive PINTs!

*Optional - for brewclub members only:* Repeate this for KEGs with address `0xf9c4989687a456b40573f0c3b655f3307f24b40a` (KEG - Ropsten)

If you don't have enough Eth for gas, request some here: https://faucet.ropsten.be/

# Installation

1. install node.js
2. `git clone https://github.com/peteyb1313/keg-token`
3. `cd keg-token`
4. `npm install`
5. `node beer-listener.js --enable-google=true --google-ip=192.168.0.105 --shelly-ip=192.168.0.154`


# Tokenomics 

The brewer controls the Beer Token supply. Beer Tokens can be issued by the brewer. Every token is **backed by beer**.

# Technical Details

Currently setup on the Ropsten test network.

- Keg contract: https://ropsten.etherscan.io/token/0xf9c4989687a456b40573f0c3b655f3307f24b40a

- Pint contract: https://ropsten.etherscan.io/token/0x1b12242029405ceb7e1c672e9a6e3c784c1b1865

- Brewer: https://ropsten.etherscan.io/address/0xedb31a4e1ba43701402d60dcb089a0bae0181ddf

- Keg contract deployment hash (Ropsten): 0xF9C4989687a456b40573F0C3B655F3307f24B40a

- Pint contract deployment hash (Ropsten): 0x1B12242029405ceb7e1C672E9A6E3c784c1b1865

- Pint contract deployment hash (Kovan): 0x921f08D2078b15416876fD219cDADB40A46C2feC

- Eth Contract IDE: https://remix.ethereum.org/
