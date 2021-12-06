pragma solidity ^0.8.7;

// Base BeerToken
import './beer-token.sol';

//Let's create a BeerToken for tracking KEGs with an initial supply of 10 KEGs which can be divided by 2 decimal places
contract KegToken is BeerToken('Keg Tokens', 'KEG', 10, 2) {
    
    constructor() {}
    
}