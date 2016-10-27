pragma solidity ^0.4.3;
import "basestore.sol";
import "registrystore.sol";

contract RegistryController is BaseStore {

    RegistryStore _store;

    function setStore(RegistryStore store) auth {
        _store = store;
    }

    function register(bytes32 id) {
        if(!check_format(id)){
            throw;
        }
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