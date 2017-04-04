pragma solidity ^0.4.8;
import "./BaseStore.sol";
import "./RegistryStore.sol";

contract Profile is BaseStore {
    RegistryStore _registryStore;

    event Tip(address from, uint value);

    function Profile(address store, address forwardOwner){
        _registryStore = RegistryStore(store);
        owner = forwardOwner;
    }

    function sendTip() public payable returns(bool) {
        if(owner.send(msg.value)) {
            Tip(msg.sender, msg.value);
            return true;
        }
        throw;
    }

    function destroy(bytes32 id) auth {
        if(_registryStore.remove(id, owner)){
            selfdestruct(owner);
        }
    }
}