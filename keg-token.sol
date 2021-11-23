pragma solidity ^0.8.7;

// Base ERC20 implementation from OpenZepplin
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol';

contract KegToken is ERC20 {

    // Address of the brewer who issues tokens
    address brewer;

    // Message to send when someone tries to do something only the brewer should be able to do
    string rejectMessage = 'No no no, only the brewer.';

    // Number of decimal places for the token
    uint8 decimals = 2;

    // Number of tokens minted at contract creation time
    uint256 orginalKegCount = 100000;

    constructor() ERC20('Keg Tokens', 'KEG'){
        _mint(msg.sender, orginalKegCount * 10 ** decimals);
        this.brewer = msg.sender;
    }
    
    // allow the brewer to mint new tokens for himself
    function brewKegs(uint amount) external {
        require(msg.sender == this.brewer, rejectMessage);
        _mint(this.brewer, amount);
    }

    // allow the brewer to assign a new brewer
    function changeBrewer(address newBrewer) external {
        require(msg.sender == this.brewer, rejectMessage);
        this.brewer = newBrewer;
    }
    
    // allow the brewer to take back anyone's tokens
    function revokeKegs(address account, uint amount) external {
        require(msg.sender == this.brewer, rejectMessage);
        _transfer(account, this.brewer, amount);
    }

    // Show how many decimals the token has
    function decimals() public view override returns (uint8) {
        return decimals;
    }
}