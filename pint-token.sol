pragma solidity ^0.8.7;

// Base ERC20 implementation from OpenZepplin
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol';

contract PintToken is BeerToken {

    // Number of tokens minted at contract creation time
    uint256 orginalPintCount = 1000;

    constructor() BeerToken('Pint Tokens', 'PINT', orginalPintCount, 0){
 
    }
    
}