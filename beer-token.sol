pragma solidity ^0.8.7;

// Base ERC20 implementation from OpenZepplin
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol';


contract BeerToken is ERC20 {

    // Address of the brewer who brews beer
    address public brewer;

    // Message to send when someone tries to do something only the brewer should be able to do
    string rejectMessage = 'No no no, only the brewer.';

    // Number of decimal places for the token
    uint8 decimalPlaces;

    // Name of the token "My Beer Token"
    string tokenName;

    // Short code for the token "MBT"
    string tokenCode;

    // Number of tokens originally brewed during contract creation 
    uint256 tokenCount;


    constructor(string _tokenName, string _tokenCode, string _tokenCount, uint8 _decimalPlaces) public {   
        tokenName = _tokenName;
        tokenCode = _tokenCode;
        tokenCount = _tokenCount;
        decimalPlaces = _decimalPlaces;

        // set the brewer to the contract creator
        brewer = msg.sender;
        _mint(brewer, tokenCount * 10 ** decimalPlaces);

        // create ERC20 token
        super(tokenName, tokenCode);
    }

    // allow the brewer to mint new tokens for himself
    function brewBeer(uint amount) external {
        require(msg.sender == brewer, rejectMessage);
        _mint(brewer, amount);
    }

    // allow the brewer to assign a new brewer
    function changeBrewer(address newBrewer) external {
        require(msg.sender == brewer, rejectMessage);
        brewer = newBrewer;
    }
    
    // allow the brewer to take back anyone's tokens
    function revokeBeer(address account, uint amount) external {
        require(msg.sender == brewer, rejectMessage);
        _transfer(account, brewer, amount);
    }
    
    // Show how many decimals the token has
    function decimals() public view override returns (uint8) {
        return decimalPlaces;
    }
}