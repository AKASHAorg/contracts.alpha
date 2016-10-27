pragma solidity ^0.4.3;
import "basestore.sol";
import "registrycontroller.sol";

contract Profile is BaseStore {
    bytes32[2] public _hash;

    RegistryController _registrar;
    event UpdateInfo();
    event Tipped(address from, uint value);

    function Profile(RegistryController registrar, bytes32[2] chunks){
        _hash = chunks;
        _registrar = registrar;
    }

    function sendTip() public payable returns(bool) {
        if(owner.send(msg.value)) {
            Tipped(msg.sender, msg.value);
            return true;
        }
        throw;
    }

    function setHash(bytes32[2] chunks) auth{
        _hash = chunks;
        UpdateInfo();
    }
}