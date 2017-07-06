pragma solidity ^0.4.8;
import "./BaseStore.sol";

contract RegistryStore is BaseStore {

    struct Record {
        address _owner;
        bytes32 _hash;
    }
    uint public _total = 0;
    // msg.sender => profile
    mapping(address=>address) _profile;
    // id => profile
    mapping(bytes32=>Record) _NS;

    // add a new record
    function add(bytes32 id, address owner, address profile, bytes32 hash)
    auth
    returns(bool)
    {
        if(can_store(id, owner)) {
            _profile[owner] = profile;
            _NS[id] = Record(profile, hash);
            _total += 1;
            return true;
        }
        return false;
    }

    function update(bytes32 id, address owner, bytes32 hash)
    auth
    external
    returns(bool)
    {
        if(has_store(id, owner)) {
            _NS[id]._hash = hash;
            return true;
        }
        return false;
    }

    function remove(bytes32 id, address owner)
    external
    returns(bool)
    {
        if(has_store(id, owner) && _profile[owner] == msg.sender){
            delete _NS[id];
            delete _profile[owner];
            _total -= 1;
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
    constant returns (address profile, bytes32 hash)
    {
        return (_NS[id]._owner, _NS[id]._hash);
    }

    function can_store(bytes32 id, address owner)
    constant returns (bool eligible)
    {
        return(_NS[id]._owner==address(0x0) && _profile[owner]==address(0x0));
    }

    function has_store(bytes32 id, address owner)
    constant returns (bool owned)
    {
        return (_NS[id]._owner == _profile[owner] && _NS[id]._owner != address(0x0));
    }
}