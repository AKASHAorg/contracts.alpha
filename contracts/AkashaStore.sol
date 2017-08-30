pragma solidity ^0.4.0;


import './Bundled.sol';


contract AkashaStore is Bundled {

    address public previousStore;

    struct Store {
    mapping (uint => bytes32) uintBytes;
    mapping (bytes32 => uint) bytesUint;
    }

    mapping (bytes32 => Store) state;

    function AkashaStore(address _owner) Bundled() {

    }

    function set(bytes32 _nameSpace, bytes32 _key, uint _value)
    external
    onlyModule
    returns (bool)
    {
        state[_nameSpace].bytesUint[_key] = _value;

        return state[_nameSpace].bytesUint[_key] == _value;
    }

    function set(bytes32 _nameSpace, uint _key, bytes32 _value)
    external
    onlyModule
    returns (bool)
    {
        state[_nameSpace].uintBytes[_key] = _value;

        return state[_nameSpace].uintBytes[_key] == _value;
    }

    function get(bytes32 _nameSpace, uint _key)
    constant
    returns (bytes32)
    {
        return state[_nameSpace].uintBytes[_key];
    }

    function get(bytes32 _nameSpace, bytes32 _key)
    constant
    returns (uint)
    {
        return state[_nameSpace].bytesUint[_key];
    }

}
