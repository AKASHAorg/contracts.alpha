pragma solidity ^0.4.0;


import './AETH.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoTokens.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';

contract Essence is HasNoEther, HasNoTokens {
    // this is updated frequently by owner
    bytes32 currentHash;

    mapping(address => mapping(bytes32 => uint256[])) balance;

    function Essence()
    HasNoEther()
    HasNoTokens()
    {

    }

    function newHash(bytes32 _hash)
    onlyOwner
    returns (bool)
    {
        currentHash = _hash;
        return true;
    }

}
