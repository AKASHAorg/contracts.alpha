pragma solidity ^0.4.0;


import 'zeppelin-solidity/contracts/ownership/HasNoTokens.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/token/StandardToken.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import './Tags.sol';
import "./IpfsHash.sol";


contract Entries is HasNoEther, HasNoTokens {
    using SafeMath for uint256;

    Tags tags;

    StandardToken aeth;

    event Publish(address indexed author, bytes32[] indexed tagsPublished, uint entryId);

    event Update(address indexed author, uint indexed entryId);

    struct Entry {
    uint total;
    mapping (uint256 => IpfsHash.Multihash) records;
    }

    mapping (address => Entry) entryIndex;

    function Entries()
    HasNoEther()
    HasNoTokens()
    {

    }

    function setTagsAddress(address _tags)
    onlyOwner
    returns (bool)
    {
        tags = Tags(_tags);
        return true;
    }

    function setTokenAddress(address _aeth)
    onlyOwner
    returns (bool)
    {
        aeth = StandardToken(_aeth);
        return true;
    }

    function publish(bytes32 _hash, uint8 _fn, uint8 _digestSize, bytes32[] _tags)
    {
        require(_tags.length < 11 && _tags.length > 0);

        for (uint8 i = 0; i < _tags.length; i++)
        {
            if (!tags.exists(_tags[i])) {
                tags.add(_tags[i]);
            }
            tags.incrementTotalEntries(_tags[i]);
        }
        var entryId = entryIndex[msg.sender].total;

        require(IpfsHash.create(entryIndex[msg.sender].records[entryId], _hash, _fn, _digestSize));
        entryIndex[msg.sender].total = entryIndex[msg.sender].total.add(1);
        Publish(msg.sender, _tags, entryId);
    }

    function edit(uint256 _entryId, bytes32 _hash, uint8 _fn, uint8 _digestSize)
    {
        require(entryIndex[msg.sender].records[_entryId].fn != 0);
        require(IpfsHash.create(entryIndex[msg.sender].records[_entryId], _hash, _fn, _digestSize));
        Update(msg.sender, _entryId);
    }

    function getEntryCount(address _publisher)
    constant
    returns (uint256)
    {
        return entryIndex[_publisher].total;
    }

    function getEntry(address _publisher, uint _entryId)
    constant
    returns (uint8 _fn, uint8 _digestSize, bytes32 _hash)
    {
        (_fn, _digestSize, _hash) = IpfsHash.getHash(entryIndex[_publisher].records[_entryId]);
    }


}
