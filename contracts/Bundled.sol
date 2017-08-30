pragma solidity ^0.4.0;


import 'zeppelin-solidity/contracts/ownership/HasNoTokens.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';


contract Bundled is HasNoEther, HasNoTokens {
    address public moduleAddress;

    function Bundled()
    HasNoEther()
    HasNoTokens()
    {

    }

    function setModule(address _moduleAddress)
    onlyOwner
    returns (bool)
    {
        require(_moduleAddress != address(0x0));
        moduleAddress = _moduleAddress;
        return true;
    }

    function updateModule(address _moduleAddress)
    external
    onlyModule
    returns (bool)
    {
        require(_moduleAddress != address(0x0));
        moduleAddress = _moduleAddress;
        return true;
    }

    modifier onlyModule()
    {
        require(msg.sender == moduleAddress);
        _;
    }

    function destroy()
    onlyOwner
    {
        selfdestruct(owner);
    }
}
