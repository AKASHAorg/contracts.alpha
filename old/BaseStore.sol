pragma solidity ^0.4.8;

contract BaseStore {
    address owner;

    modifier auth() {
        if(!isAuthorized()){ throw;}
        _;
    }

    function setOwner(address newOwner)
    auth
    {
        owner = newOwner;
    }

    function BaseStore()
    {
        owner = msg.sender;
    }

    function destroy()
    auth
    {
        selfdestruct(owner);
    }

    function isAuthorized()
    internal
    returns (bool)
    {
        if (owner == msg.sender) {
            return true;
        }
        return false;
    }
}