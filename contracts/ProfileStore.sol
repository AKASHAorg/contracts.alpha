pragma solidity ^0.4.0;
import './Bundled.sol';

contract ProfileStore is Bundled {

    mapping(address => uint) records;

    function ProfileStore()
    Bundled()
    {

    }

    // insert a new key=>value pair
    function insert(address _key, uint _value)
    external
    onlyModule
    returns(bool)
    {
        if (records[_key] != 0) {
            return false;
        }

        records[_key] = _value;
        return true;
    }

    // update an existing record
    function set(address _key, uint _value)
    external
    onlyModule
    returns(bool)
    {
        if (records[_key] == 0) {
            return false;
        }

        records[_key] = _value;
        return true;
    }

    function remove(address _key)
    external
    onlyModule
    returns(bool)
    {
        delete records[_key];
        return true;
    }

    // getter for records
    function get(address _key)
    constant
    returns(uint)
    {
        return records[_key];
    }

}
