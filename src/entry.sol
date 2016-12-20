pragma solidity ^0.4.7;
import './basemodule.sol';
import './dlinkedlist.sol';
import './entry_deposit.sol';
import './tags.sol';

contract Entry is BaseModule {
    using DLinked for DLinked.List;

    struct Source {
       bytes32[2] _hash;
       uint _blockNr;
       uint _timeStamp;
       address _owner;
    }

    struct Index {
        DLinked.List _index;
    }

    Tags _tags;
    event Publish(address indexed author, bytes32 indexed tag, uint entryId);
    event Update(address author, uint entryId);

    event Claim(address indexed author, uint entryId, uint amount);
    // entry id => ipfs
    mapping(uint => Source) _entry;

    // entry id => funds address
    mapping(uint => address) _entryFunds;

    // tag id => index entry id
    mapping(uint => Index) _indexEntryTag;

    // profile addr => index entry id
    mapping(address => Index) _indexEntryAuthor;
    uint _entryId = 1;
    uint _entryTTL = 30000; // number of blocks to wait until funds can be retrieved, default 1 epoch
    function setTagsSource(address tags) auth
    {
        _tags = Tags(tags);
    }

    function setEntryTTL(uint blockNr) auth
    {
        _entryTTL = blockNr;
    }

    function publish(bytes32[2] hash, bytes32[] tags) onlyRegistered
    {
        if(tags.length == 0 || tags.length>10){ throw; }
        var myProfile = _controller.addressOfKey(msg.sender);
        var deposit = new EntryDeposit();
        _entry[_entryId] = Source(
            {
                _hash: hash,
                _blockNr: block.number,
                _timeStamp: block.timestamp,
                _owner: myProfile
            }
         );
        _entryFunds[_entryId] = deposit;
        for(uint8 i=0; i<tags.length; i++)  {
            if(!_tags.exists(tags[i])){ throw;}
            _indexEntryTag[_tags.getTagId(tags[i])]._index.insert(_entryId);
            Publish(myProfile, tags[i], _entryId);
        }

        _indexEntryAuthor[myProfile]._index.insert(_entryId);
        _entryId++;
    }

    function updateEntryContent(bytes32[2] hash, uint entryId)
    onlyRegistered
    {
        var myProfile = _controller.addressOfKey(msg.sender);
        if(_entry[entryId]._owner!=myProfile){ throw;}
        if(!isEditable(entryId)){ throw;} //freeze updates after ttl
        _entry[entryId]._hash = hash;
        Update(myProfile, entryId);
    }

    function claimDeposit(uint entryId)
    onlyRegistered
    {
        var myProfile = _controller.addressOfKey(msg.sender);
        if(!_indexEntryAuthor[myProfile]._index.exists(entryId)){ throw;}
        if(isEditable(entryId)){ throw;}
        if(_entryFunds[entryId] == address(0x0)){ throw;}

        Claim(myProfile, entryId, _entryFunds[entryId].balance);
        EntryDeposit(_entryFunds[entryId]).destroy(msg.sender);
        delete _entryFunds[entryId];
    }

    function getProfileEntriesCount(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _indexEntryAuthor[profile]._index.getSize();
    }

    function getProfileEntryFirst(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _indexEntryAuthor[profile]._index.getFirst();
    }

    function getProfileEntryLast(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _indexEntryAuthor[profile]._index.getLast();
    }

    function getProfileEntryNext(bytes32 id, uint profileId)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _indexEntryAuthor[profile]._index.getNext(profileId);
    }

    function getProfileEntryPrev(bytes32 id, uint profileId)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _indexEntryAuthor[profile]._index.getPrev(profileId);
    }

    function getTagEntriesCount(bytes32 tag)
    constant returns(uint)
    {
        var tagId = _tags.getTagId(tag);
        return _indexEntryTag[tagId]._index.getSize();
    }

    function getTagEntryFirst(bytes32 tag)
    constant returns(uint)
    {
        var tagId = _tags.getTagId(tag);
        return _indexEntryTag[tagId]._index.getFirst();
    }

    function getTagEntryLast(bytes32 tag)
    constant returns(uint)
    {
        var tagId = _tags.getTagId(tag);
        return _indexEntryTag[tagId]._index.getLast();
    }

    function getTagEntryNext(bytes32 tag, uint entryId)
    constant returns(uint)
    {
        var tagId = _tags.getTagId(tag);
        return _indexEntryTag[tagId]._index.getNext(entryId);
    }

    function getTagEntryPrev(bytes32 tag, uint entryId)
    constant returns(uint)
    {
        var tagId = _tags.getTagId(tag);
        return _indexEntryTag[tagId]._index.getPrev(entryId);
    }

    function isEditable(uint entryId)
    constant returns(bool)
    {
        var entrySpan = _entry[entryId]._blockNr + _entryTTL;
        return entrySpan > block.number;
    }

    function getLastVoteBlock(uint entryId)
    external returns(uint)
    {
        return _entry[entryId]._blockNr + _entryTTL;
    }

    function getEntry(uint entryId)
    constant returns(uint blockNr, address publisher, bytes32[2] ipfsHash, uint timeStamp)
    {
        blockNr = _entry[entryId]._blockNr;
        publisher = _entry[entryId]._owner;
        ipfsHash = _entry[entryId]._hash;
        timeStamp = _entry[entryId]._timeStamp;
    }

    function getEntryFund(uint entryId)
    constant returns(address funds)
    {
        funds = _entryFunds[entryId];
    }

    function entryExists(uint entryId)
    constant returns(bool)
    {
        return (_entry[entryId]._blockNr != 0);
    }
}