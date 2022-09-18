pragma solidity ^0.8.9;

import "./interfaces/ISeaport.sol";
import "./interfaces/IERC721.sol";
import {BasicOrderParameters} from "./interfaces/ConsiderationStructs.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
            $$\   $$\ $$$$$$$$\ $$$$$$$$\       $$$$$$$\  $$\   $$\ $$\       $$\       
            $$$\  $$ |$$  _____|\__$$  __|      $$  __$$\ $$ |  $$ |$$ |      $$ |      
            $$$$\ $$ |$$ |         $$ |         $$ |  $$ |$$ |  $$ |$$ |      $$ |      
            $$ $$\$$ |$$$$$\       $$ |         $$$$$$$\ |$$ |  $$ |$$ |      $$ |      
            $$ \$$$$ |$$  __|      $$ |         $$  __$$\ $$ |  $$ |$$ |      $$ |      
            $$ |\$$$ |$$ |         $$ |         $$ |  $$ |$$ |  $$ |$$ |      $$ |      
            $$ | \$$ |$$ |         $$ |         $$$$$$$  |\$$$$$$  |$$$$$$$$\ $$$$$$$$\ 
            \__|  \__|\__|         \__|         \_______/  \______/ \________|\________|                                                                         
 */

interface IMessageRecipient {
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _message
    ) external;
}

contract Controller is ReentrancyGuard, AccessControl, IMessageRecipient{
    address constant SEAPORT_ADDRESS = 0x00000000006c3852cbEf3e08E8dF289169EdE581;
    mapping(address => uint256) balances;
    
    event ReceivedMessage(
        uint32 indexed origin,
        bytes32 indexed sender,
        string message
    );
    event XChainTransfer (address to, address token, uint256 identifier);

    bytes32 public constant ADMIN = keccak256("ADMIN");

    constructor(){
        _setupRole(ADMIN, msg.sender);
    }

    function giveAdminRole(address _address) external {
       require(hasRole(ADMIN, msg.sender), "only admins");
       _setupRole(ADMIN, _address); 
    }

    function deposit() external payable nonReentrant() {
        require(hasRole(ADMIN, msg.sender), "only admins");
        require(msg.value > 0, "msg.value less than 0");
        balances[msg.sender] += msg.value;
    }


    function withdraw(uint256 amount) external nonReentrant() {
        require(hasRole(ADMIN, msg.sender), "only admins");
        require(balances[msg.sender] >= amount, "msg.sender does not have enough deposit");
        balances[msg.sender] -= amount;
        (bool result, ) = msg.sender.call{value:amount}("");
        require(result, "transfer failed");
    }

    // thanks to here: https://ethereum.stackexchange.com/questions/131283/how-do-i-decode-call-data-in-solidity
    function extractCalldata(bytes memory calldataWithSelector) internal pure returns (bytes memory) {
        bytes memory calldataWithoutSelector;

        require(calldataWithSelector.length >= 4);

        assembly {
            let totalLength := mload(calldataWithSelector)
            let targetLength := sub(totalLength, 4)
            calldataWithoutSelector := mload(0x40)
            
            // Set the length of callDataWithoutSelector (initial length - 4)
            mstore(calldataWithoutSelector, targetLength)

            // Mark the memory space taken for callDataWithoutSelector as allocated
            mstore(0x40, add(0x20, targetLength))

            // Process first 32 bytes (we only take the last 28 bytes)
            mstore(add(calldataWithoutSelector, 0x20), shl(0x20, mload(add(calldataWithSelector, 0x20))))

            // Process all other data by chunks of 32 bytes
            for { let i := 0x1C } lt(i, targetLength) { i := add(i, 0x20) } {
                mstore(add(add(calldataWithoutSelector, 0x20), i), mload(add(add(calldataWithSelector, 0x20), add(i, 0x04))))
            }
        }

        return calldataWithoutSelector;
    }
    function _fillOrder(bytes32 recipient,bytes calldata data) internal returns (bool) {
        BasicOrderParameters memory params = abi.decode(
            extractCalldata(data),
            (BasicOrderParameters)
        );
        uint256 val = params.considerationAmount;
        for(uint256 i = 0 ; i < params.additionalRecipients.length;i++){
            val += params.additionalRecipients[i].amount;
        }

        (bool result, ) = SEAPORT_ADDRESS.call{value:val}(data);
        require(result == true, "Failed call on seaport.");
        address receiver = address(uint160(uint256(recipient)));
        IERC721(params.offerToken).safeTransferFrom(address(this),receiver, params.offerIdentifier);
        emit XChainTransfer(receiver, params.offerToken, params.offerIdentifier);
        return true;
    }

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _message
    ) external override {
        bool result = _fillOrder(_sender, _message);
        require(result, "fillOrder failed.");
    }
}