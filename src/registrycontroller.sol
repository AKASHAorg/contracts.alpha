pragma solidity ^0.4.3;
import "basestore.sol";
import "profile.sol";
import "registrystore.sol";

contract RegistryController is BaseStore {

    RegistryStore _store;
    event Register(bytes32 indexed id, address profile);

    function setStore(RegistryStore store) auth {
        _store = store;
    }

    function register(bytes32 id, bytes32[2] ipfs) {
        if(!check_format(id)){
            throw;
        }
        var newProfile = new Profile(this, ipfs, msg.sender);
        var stored = _store.add(id, msg.sender, newProfile);
        if(stored) {
            Register(id, newProfile);
        }
    }

    function unregister(bytes32 id) {
        var profile = Profile(addressOfKey(msg.sender));
        var removed = _store.remove(id, msg.sender);
        if (removed) {
            profile.destroy();
        }
    }

    function addressOfId(bytes32 id) constant returns(address profileAddress){
        profileAddress = _store.get_by_id(id);
    }

    function addressOfKey(address key) constant returns(address profileAddress){
        profileAddress = _store.get_by_address(key);
    }

    function check_format(bytes32 id)
    constant returns(bool)
    {
        for(uint8 i=0; i<id.length; i++)
        {
            if(id[i] == 0) break;

            if(id[i] > 122 || (id[i]<97 && id[i] > 57 && id[i] !=95) || (id[i]<48 && id[i]!=46))
            {
                return false;
            }
        }
        return i > 3;
    }

}