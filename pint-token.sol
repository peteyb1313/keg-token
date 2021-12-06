pragma solidity ^0.8.7;

// Base BeerToken
import './beer-token.sol';

//Lets create a BeerToken for tracking PINTs with an intial supply of 1000 PINTs and no decimal places
contract PintToken is BeerToken('Pint Tokens', 'PINT', 1000, 0) {
    
    constructor() {}
    
}