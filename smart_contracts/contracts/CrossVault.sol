pragma solidity ^0.8.9;
import "./interfaces/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

interface IOutbox {
    function dispatch(
        uint32 _destinationDomain,
        bytes32 _recipientAddress,
        bytes calldata _messageBody
    ) external returns (uint256);
}

contract CrossVault is AccessControl, ReentrancyGuard {
    address constant public FUJI_WETH = 0x6f507aA7d89C256318d2CdfF930c0Ca0B26eDdC4;
    address constant public GOERLI_CONTROLLER_ADDRESS = 0x576834fC77837E0B04c58FBE9A97Eb38E59B3932;
    address constant public GOERLI_INBOX = 0xc507A7c848b59469cC44A3653F8a582aa8BeC71E; 
    uint32 constant GOERLI_DOMAIN = 5;
    bytes32 public constant ADMIN = keccak256("ADMIN");

    constructor(){
         _setupRole(ADMIN, msg.sender);
    }

    function giveAdminRole(address _address) external {
       require(hasRole(ADMIN, msg.sender), "only admins");
       _setupRole(ADMIN, _address); 
    }

    // alignment preserving cast
    function addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));    
    }

    function dispatchCall(
        uint256 weth_to_be_paid,
        bytes calldata data
    ) external nonReentrant() returns (bool) {
        require(IERC20(FUJI_WETH).balanceOf(msg.sender) >= weth_to_be_paid, "weth not enough");
        uint256 balanceBefore = IERC20(FUJI_WETH).balanceOf(address(this));
        IERC20(FUJI_WETH).approve(address(this), weth_to_be_paid);
        IERC20(FUJI_WETH).transferFrom(address(this), address(this), weth_to_be_paid);
        uint256 balanceAfter = IERC20(FUJI_WETH).balanceOf(address(this));
        require(balanceAfter - balanceBefore >= weth_to_be_paid, "contract didn't receive weth");
        IOutbox(GOERLI_INBOX).dispatch(
            GOERLI_DOMAIN,
            addressToBytes32(GOERLI_CONTROLLER_ADDRESS),
            data
        );
        return true;
    }
}