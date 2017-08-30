pragma solidity ^0.4.0;


import 'zeppelin-solidity/contracts/ownership/HasNoTokens.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';


contract AkashaModule is HasNoEther, HasNoTokens {
    uint256 public version;

    string public moduleName;

    function AkashaModule(string _moduleName, uint256 _version)
    HasNoEther()
    HasNoTokens()
    {
        require(_version > 0);
        moduleName = _moduleName;
        version = _version;
    }

    function incrementVersion()
    internal
    {
        version += 1;
    }

    function destroy()
    onlyOwner
    {
        selfdestruct(owner);
    }
}
