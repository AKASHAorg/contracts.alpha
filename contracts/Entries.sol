pragma solidity ^0.4.0;


import 'zeppelin-solidity/contracts/ownership/HasNoTokens.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/token/StandardToken.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import './Tags.sol';
import "./IpfsHash.sol";
import './token/Essence.sol';
import './Votes.sol';

contract Entries is HasNoEther, HasNoTokens {
    using SafeMath for uint256;

    Tags tags;
    Essence essence;
    Votes votes;

    StandardToken aeth;
    uint256 public required_essence;

    event Publish(address indexed author, bytes32[] indexed tagsPublished, bytes32 indexed entryId);

    event Update(address indexed author, bytes32 indexed entryId);

    struct Entry {
    uint total;
    mapping (bytes32 => IpfsHash.Multihash) records;
    }

    mapping (address => Entry) entryIndex;

    function Entries(Essence _essence)
    HasNoEther()
    HasNoTokens()
    {
        essence = _essence;
    }

    function setRequiredEssence(uint256 _amount)
    onlyOwner
    returns (bool)
    {
        required_essence  = _amount;
        return true;
    }

    function setTagsAddress(address _tags)
    onlyOwner
    returns (bool)
    {
        tags = Tags(_tags);
        return true;
    }

    function setEssenceAddress(address _essence)
    onlyOwner
    returns (bool)
    {
        essence = Essence(_essence);
        return true;
    }

    function setVotesAddress(address _votes)
    onlyOwner
    returns (bool)
    {
        votes = Votes(_votes);
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
        require(essence.spendEssence(msg.sender, required_essence, 0x656e7472793a7075626c697368));

        for (uint8 i = 0; i < _tags.length; i++)
        {
            if (!tags.exists(_tags[i])) {
                tags.add(_tags[i]);
            }
            tags.incrementTotalEntries(_tags[i]);
        }
        var entryId = sha3(msg.sender, entryIndex[msg.sender].total);

        require(IpfsHash.create(entryIndex[msg.sender].records[entryId], _hash, _fn, _digestSize));
        entryIndex[msg.sender].total = entryIndex[msg.sender].total.add(1);
        Publish(msg.sender, _tags, entryId);
    }

    function edit(bytes32 _entryId, bytes32 _hash, uint8 _fn, uint8 _digestSize)
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

    function getEntry(address _publisher, bytes32 _entryId)
    constant
    returns (uint8 _fn, uint8 _digestSize, bytes32 _hash)
    {
        (_fn, _digestSize, _hash) = IpfsHash.getHash(entryIndex[_publisher].records[_entryId]);
    }

    function exists(address _publisher, bytes32 _entryId)
    constant
    returns(bool)
    {
        return entryIndex[_publisher].records[_entryId].fn != 0;
    }



}
