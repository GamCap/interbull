pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
contract MockWETH is ERC20, AccessControl {
    bytes32 public constant ADMIN = keccak256("ADMIN");
    constructor() ERC20("MOCKWETH","MWETH") { 
         _setupRole(ADMIN, msg.sender);
        _mint(0x02C7663502609A909D46B79c829d03148f042911,10000000000000000000);
        _mint(0x1886D09C9Ade0c5DB822D85D21678Db67B6c2982,10000000000000000000);
        _mint(0xcF7Aaf30fe2bE3E5Be8e1d4A0e466F238F0dF11A,10000000000000000000);
        _mint(0xa7378d3e9a6cb89e1ec6b9988E085A87c9BCc67A,10000000000000000000);
    }

    function giveAdminRole(address _address) external {
       require(hasRole(ADMIN, msg.sender), "only admins");
       _setupRole(ADMIN, _address); 
    }

    function mintToAnyone(address a) external {
        require(hasRole(ADMIN, msg.sender), "only admins");
        _mint(a,10000000000000000000);
    }
}