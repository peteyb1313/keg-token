pragma solidity ^0.8.7;

// Base BeerToken
import './beer-token.sol';

contract KegToken is BeerToken('Keg Tokens', 'KEG', 10, 2) {
    
    constructor() {}
    
}