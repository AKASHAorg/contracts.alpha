pragma solidity ^0.4.6;
import "./basestore.sol";
import "./registrycontroller.sol";

contract Profile is BaseStore {
    bytes32[2] public _hash;
    bytes32 public _id;
    address _registrar;
    event Tip(address from, uint value);

    modifier fromRegistrar {
        if(msg.sender != _registrar) {
            throw;
        }
        _;
    }
    function Profile(address registrar, bytes32[2] chunks, bytes32 id, address forwardAddr){
        _hash = chunks;
        _registrar = registrar;
        owner = forwardAddr;
        _id = id;
    }

    function sendTip() public payable returns(bool) {
        if(owner.send(msg.value)) {
            Tip(msg.sender, msg.value);
            return true;
        }
        throw;
    }

    function setHash(bytes32[2] chunks) auth {
        _hash = chunks;
        RegistryController(_registrar).emitUpdate(_id);
    }

    function destroy() fromRegistrar {
        selfdestruct(owner);
    }
}