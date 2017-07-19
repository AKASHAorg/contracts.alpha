pragma solidity ^0.4.0;
import 'zeppelin-solidity/contracts/ownership/HasNoTokens.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';

contract AkashaModule is HasNoEther, HasNoTokens {
    uint256 public version;
    string public moduleName;

    address public controller;
    address public store;

    function AkashaModule(string _moduleName, uint256 _version)
    HasNoEther()
    HasNoTokens()
    {
        require(version > 0);
        moduleName = _moduleName;
        version = _version;
    }

    function upgradeController()
    onlyOwner
    {
        incrementVersion();
    }

    function upgradeStore()
    onlyOwner
    {
        incrementVersion();
    }

    function incrementVersion()
    internal
    {
        version += 1;
    }

    function upgradeModule()
    onlyOwner
    returns(uint256 _version)
    {
        incrementVersion();
        // controller.setModule();
        // store.setModule();

        return version;
    }

    function destroy()
    onlyOwner
    {
        selfdestruct(owner);
    }
}
