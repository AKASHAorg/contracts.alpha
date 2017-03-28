pragma solidity ^0.4.8;
import "./BaseStore.sol";
import "./RegistryController.sol";

contract BaseModule is BaseStore {

    RegistryController _controller;

    modifier onlyRegistered() {
        if(!_controller.isRegistered(msg.sender)){ throw;}
        _;
    }

    function setRegistry(address newRegistry) auth {
        _controller = RegistryController(newRegistry);
    }

}