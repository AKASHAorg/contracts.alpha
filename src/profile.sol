pragma solidity ^0.4.3;
import "basestore.sol";
import "registrycontroller.sol";

contract Profile is BaseStore {
    bytes32[2] public _hash;

    address _registrar;
    event UpdateInfo();
    event Tip(address from, uint value);

    modifier fromRegistrar {
        if(msg.sender != _registrar) {
            throw;
        }
        _;
    }
    function Profile(address registrar, bytes32[2] chunks, address forwardAddr){
        _hash = chunks;
        _registrar = registrar;
        owner = forwardAddr;
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
        UpdateInfo();
    }


    function destroy() fromRegistrar {
        selfdestruct(owner);
    }
}