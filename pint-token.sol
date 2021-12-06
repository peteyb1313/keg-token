pragma solidity ^0.8.7;

// Base BeerToken
import './beer-token.sol';

contract PintToken is BeerToken {

    // Number of tokens minted at contract creation time
    uint256 orginalPintCount = 1000;

    constructor() BeerToken('Pint Tokens', 'PINT', orginalPintCount, 0){
 
    }
    
}