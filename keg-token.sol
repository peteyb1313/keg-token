pragma solidity ^0.8.7;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol';

contract KegToken is ERC20 {
    address public admin;
    
    constructor() ERC20('Keg Tokens', 'KEGS'){
        _mint(msg.sender, 100000 * 10 ** 2);
        admin = msg.sender;
    }
    
    function decimals() public view override returns (uint8) {
		return 2;
	}
    
    function mint(address to, uint amount) external {
        require(msg.sender == admin, 'No no no, only the brewer');
        _mint(to, amount);
    }
    
    function burn(uint amount) external {
        _burn(msg.sender, amount);
    }
}