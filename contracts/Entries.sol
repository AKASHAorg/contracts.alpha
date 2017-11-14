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


    uint256 public required_essence = 10**19;

    uint256 public discount_every = 10**22;

    uint256 public voting_period = 2 weeks;

    enum EntryType { Article, Link, Media, Other }

    event Publish(address indexed author, bytes32 indexed entryId);

    event TagIndex(bytes32 indexed tagName, bytes32 indexed entryId, EntryType indexed entryType);

    event Update(address indexed author, bytes32 indexed entryId);

    struct Entry {
    uint total;
    mapping (bytes32 => IpfsHash.Multihash) records;
    }

    mapping (address => Entry) entryIndex;

    function Entries(Essence _essence)
    public
    HasNoEther()
    HasNoTokens()
    {
        essence = _essence;
    }

    function setRequiredEssence(uint256 _amount)
    public
    onlyOwner
    returns (bool)
    {
        required_essence = _amount;
        return true;
    }

    function setVotingPeriod(uint256 _period)
    public
    onlyOwner
    returns (bool)
    {
        voting_period = _period;
        return true;
    }

    function setDiscountEvery(uint256 _amount)
    public
    onlyOwner
    returns (bool)
    {
        discount_every = _amount;
    }

    function setTagsAddress(address _tags)
    public
    onlyOwner
    returns (bool)
    {
        tags = Tags(_tags);
        return true;
    }

    function setEssenceAddress(address _essence)
    public
    onlyOwner
    returns (bool)
    {
        essence = Essence(_essence);
        return true;
    }

    function setVotesAddress(address _votes)
    public
    onlyOwner
    returns (bool)
    {
        votes = Votes(_votes);
        return true;
    }

    function calcPublishCost(address _author)
    view
    internal
    returns (uint _amount)
    {
        uint256 essenceAmount;
        (, essenceAmount) = essence.getCollected(_author);
        uint256 discount = essenceAmount.div(discount_every);
        if (discount >= required_essence) {
            return 1;
        }
        return required_essence.sub(discount);
    }

    function publish(bytes32 _hash, uint8 _fn, uint8 _digestSize, bytes32[] _tags, EntryType _type)
    internal
    returns(bool)
    {
        require(_tags.length < 11 && _tags.length > 0);
        require(essence.spendMana(msg.sender, calcPublishCost(msg.sender), 0x656e7472793a7075626c697368));
        bytes32 entryId = keccak256(msg.sender, entryIndex[msg.sender].total, now);
        for (uint8 i = 0; i < _tags.length; i++)
        {
            if (!tags.exists(_tags[i])) {
                require(tags.addFromEntry(_tags[i], msg.sender));
            }
            tags.incrementTotalEntries(_tags[i]);
            TagIndex(_tags[i], entryId, _type);
        }

        uint256 endPeriod = voting_period.add(now);
        require(IpfsHash.create(entryIndex[msg.sender].records[entryId], _hash, _fn, _digestSize));
        require(votes.registerResource(entryId, endPeriod));
        entryIndex[msg.sender].total = entryIndex[msg.sender].total.add(1);
        Publish(msg.sender, entryId);
        return true;
    }

    function publishArticle(bytes32 _hash, uint8 _fn, uint8 _digestSize, bytes32[] _tags)
    public
    {
        require(publish(_hash, _fn, _digestSize, _tags, EntryType.Article));
    }

    function publishLink(bytes32 _hash, uint8 _fn, uint8 _digestSize, bytes32[] _tags)
    public
    {
        require(publish(_hash, _fn, _digestSize, _tags, EntryType.Link));
    }

    function publishMedia(bytes32 _hash, uint8 _fn, uint8 _digestSize, bytes32[] _tags)
    public
    {
        require(publish(_hash, _fn, _digestSize, _tags, EntryType.Media));
    }

    function publishOther(bytes32 _hash, uint8 _fn, uint8 _digestSize, bytes32[] _tags)
    public
    {
        require(publish(_hash, _fn, _digestSize, _tags, EntryType.Other));
    }

    function edit(bytes32 _entryId, bytes32 _hash, uint8 _fn, uint8 _digestSize)
    public
    {
        require(entryIndex[msg.sender].records[_entryId].fn != 0);
        require(IpfsHash.create(entryIndex[msg.sender].records[_entryId], _hash, _fn, _digestSize));
        Update(msg.sender, _entryId);
    }

    function getEntryCount(address _publisher)
    public
    view
    returns (uint256)
    {
        return entryIndex[_publisher].total;
    }

    function getEntry(address _publisher, bytes32 _entryId)
    public
    view
    returns (uint8 _fn, uint8 _digestSize, bytes32 _hash)
    {
        (_fn, _digestSize, _hash) = IpfsHash.getHash(entryIndex[_publisher].records[_entryId]);
    }

    function exists(address _publisher, bytes32 _entryId)
    public
    view
    returns (bool)
    {
        return entryIndex[_publisher].records[_entryId].fn != 0;
    }


    function claim(bytes32 _entryId)
    public
    returns (bool)
    {
        require(entryIndex[msg.sender].records[_entryId].fn != 0);
        require(votes.claimEntry(_entryId, msg.sender));
        return true;
    }


}
