pragma solidity ^0.4.6;
import "./basestore.sol";
import "./registrycontroller.sol";

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