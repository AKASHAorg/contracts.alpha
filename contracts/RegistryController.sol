pragma solidity ^0.4.8;
import "./BaseStore.sol";
import "./Profile.sol";
import "./RegistryStore.sol";

contract RegistryController is BaseStore {

    RegistryStore _store;
    event Register(bytes32 indexed id, address profile);
    event UpdateProfile(bytes32 indexed id, address profile);

    function setStore(address store) auth {
        _store = RegistryStore(store);
    }

    function register(bytes32 id, bytes32[2] ipfs)
    returns(address)
    {
        if(!check_format(id)){
            throw;
        }

        var newProfile = new Profile(address(this), ipfs, id, msg.sender);
        var stored = _store.add(id, msg.sender, newProfile);

        if(!stored) {
            throw;
        }

        Register(id, newProfile);
        return newProfile;
    }

    function unregister(bytes32 id) returns(bool){
        var profile = Profile(addressOfKey(msg.sender));
        var removed = _store.remove(id, msg.sender);
        if (removed) {
            profile.destroy();
            return true;
        }
        return false;
    }

    function migrate(address newController) auth {
        _store.setOwner(newController);
        selfdestruct(owner);
    }

    function emitUpdate(bytes32 id) external {
        if(_store.get_by_id(id) != msg.sender){
            throw;
        }
        UpdateProfile(id, msg.sender);
    }

    function addressOf(bytes32 id) constant returns(address profileAddress){
        profileAddress = _store.get_by_id(id);
    }

    function addressOfKey(address key) constant returns(address profileAddress){
        profileAddress = _store.get_by_address(key);
    }

    function isRegistered(address key) constant returns(bool) {
        return (_store.get_by_address(key) != address(0x0));
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