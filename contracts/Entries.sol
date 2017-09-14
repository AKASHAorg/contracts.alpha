pragma solidity ^0.4.0;


import 'zeppelin-solidity/contracts/ownership/HasNoTokens.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
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


    uint256 public required_essence = 100;

    uint256 public discount_every = 10000;

    uint256 public voting_period = 2 weeks;

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
        required_essence = _amount;
        return true;
    }

    function setVotingPeriod(uint256 _period)
    onlyOwner
    returns (bool)
    {
        voting_period = _period;
        return true;
    }

    function setDiscountEvery(uint256 _amount)
    onlyOwner
    returns (bool)
    {
        discount_every = _amount;
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

    function calcPublishCost(address _author)
    internal
    returns (uint _amount)
    {

        uint256 karma = essence.getCollectedEssence(_author);
        uint256 discount = karma.div(discount_every);
        if (discount >= required_essence) {
            return 1;
        }
        return required_essence.sub(discount);
    }

    function publish(bytes32 _hash, uint8 _fn, uint8 _digestSize, bytes32[] _tags)
    {
        require(_tags.length < 11 && _tags.length > 0);
        require(essence.spendEssence(msg.sender, calcPublishCost(msg.sender), 0x656e7472793a7075626c697368));

        for (uint8 i = 0; i < _tags.length; i++)
        {
            if (!tags.exists(_tags[i])) {
                require(tags.addFromEntry(_tags[i], msg.sender));
            }
            tags.incrementTotalEntries(_tags[i]);
        }
        bytes32 entryId = sha3(msg.sender, entryIndex[msg.sender].total);
        uint256 endPeriod = voting_period.add(now);
        require(IpfsHash.create(entryIndex[msg.sender].records[entryId], _hash, _fn, _digestSize));
        require(votes.registerResource(entryId, endPeriod));
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
    returns (bool)
    {
        return entryIndex[_publisher].records[_entryId].fn != 0;
    }

    function claim(bytes32 _entryId)
    returns (bool)
    {
        require(entryIndex[msg.sender].records[_entryId].fn != 0);
        require(votes.claimEntry(_entryId, msg.sender));
        return true;
    }


}
