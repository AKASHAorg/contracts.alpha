pragma solidity ^0.4.8;
import "./BaseStore.sol";
import "./Profile.sol";
import "./RegistryStore.sol";

contract RegistryController is BaseStore {

    RegistryStore _store;
    event Register(bytes32 indexed id) anonymous;
    event UpdateProfile(bytes32 id) anonymous;

    function setStore(address store) auth {
        _store = RegistryStore(store);
    }

    function register(bytes32 id, bytes32 hash)
    returns(bool)
    {
        if(!check_format(id)){
            return false;
        }

        var newProfile = new Profile(address(_store), msg.sender);
        var stored = _store.add(id, msg.sender, newProfile, hash);

        if(!stored) {
            // until revert() is available
            throw;
        }

        Register(id);
        return true;
    }

    function migrate(address newController) auth {
        _store.setOwner(newController);
        selfdestruct(owner);
    }

    function update(bytes32 id, bytes32 hash) {
        if(_store.update(id, msg.sender, hash)){
            UpdateProfile(id);
        }
    }

    function is_registered(address ethkey)
    constant returns(bool isRegistered)
    {
        return _store.get_by_address(ethkey) != address(0x0);
    }

    function check_format(bytes32 id)
    constant returns(bool)
    {

        if(id[0] == 46 || id[0] == 95){
            return false;
        }

        for(uint8 i=0; i<id.length; i++)
        {
            if(id[i] == 0) break;

            if(id[i] > 122 || (id[i]<97 && id[i] > 57 && id[i] !=95) || (id[i]<48 && id[i]!=46))
            {
                return false;
            }
        }

        if(id[i - 1] == 46 || id[i - 1] == 95){
            return false;
        }

        return i > 1;
    }

}