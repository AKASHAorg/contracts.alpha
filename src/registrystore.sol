pragma solidity ^0.4.9;
import "./basestore.sol";

contract RegistryStore is BaseStore {
    // msg.sender => profile
    mapping(address=>address) _profile;
    // id => profile
    mapping(bytes32=>address) _NS;

    function add(bytes32 id, address owner, address profile)
    auth
    returns(bool)
    {
        //@info adding id `bytes32 id` for key `address owner` at `address profile`
        if(can_store(id, owner)) {
            _profile[owner] = profile;
            _NS[id] = profile;
            return true;
        }
        return false;
    }

    function remove(bytes32 id, address owner)
    auth
    returns(bool)
    {
        if(has_store(id, owner)){
            delete _NS[id];
            delete _profile[owner];
            return true;
        }
        return false;
    }

    function get_by_address(address ethkey)
    constant returns(address profile)
    {
        return _profile[ethkey];
    }

    function get_by_id(bytes32 id)
    constant returns (address profile)
    {
        return _NS[id];
    }

    function can_store(bytes32 id, address owner)
    constant returns (bool eligible)
    {
        return(get_by_id(id)==address(0x0) && get_by_address(owner)==address(0x0));
    }

    function has_store(bytes32 id, address owner)
    constant returns (bool owned)
    {
        return (_NS[id] == _profile[owner]);
    }
}