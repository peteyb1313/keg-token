pragma solidity ^0.8.7;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol';

contract KegToken is ERC20 {

    address public brewer;
    string rejectMessage = 'No no no, only the brewer';

    constructor() ERC20('Keg Tokens', 'KEG'){
        _mint(msg.sender, 100000 * 10 ** 2);
        admin = msg.sender;
    }
    
    function decimals() public view override returns (uint8) {
        return 2;
    }
    
    function mint(address to, uint amount) external {
        require(msg.sender == this.brewer, rejectMessage);
        _mint(to, amount);
    }

    function changeBrewer(address newBrewer) external {
        require(msg.sender == this.brewer, rejectMessage);
        this.brewer = newBrewer;
    }
    
    function burn(uint amount) external {
        _burn(msg.sender, amount);
    }
}