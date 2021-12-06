pragma solidity ^0.8.7;

// Base BeerToken
import './beer-token.sol';

contract KegToken is BeerToken {

    // Number of tokens minted at contract creation time
    uint256 orginalKegCount = 10;

    constructor() BeerToken('Keg Tokens', 'KEG', orginalKegCount, 2){
 
    }
    
}