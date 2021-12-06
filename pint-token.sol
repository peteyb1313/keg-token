pragma solidity ^0.8.7;

// Base BeerToken
import './beer-token.sol';

contract PintToken is BeerToken('Pint Tokens', 'PINT', 1000, 0) {
    
    constructor() {}
    
}