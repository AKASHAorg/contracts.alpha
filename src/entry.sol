pragma solidity ^0.4.4;
import 'basemodule.sol';
import 'dlinkedlist.sol';
import 'entry_deposit.sol';
import 'tags.sol';

contract Entry is BaseModule {

    struct Source {
       bytes32[2] _hash;
       uint _blockNr;
       address _owner;
    }

    struct Index {
        DLinked.List _index;
    }

    Tags _tags;
    event Publish(address indexed author, bytes32 indexed tag, uint entryId);
    // entry id => ipfs
    mapping(uint => Source) _entry;

    // entry id => funds address
    mapping(uint => address) _entryFunds;

    // tag id => index entry id
    mapping(uint => Index) _indexEntryTag;

    // profile addr => index entry id
    mapping(address => Index) _indexEntryAuthor;
    uint _entryId = 1;
    uint _entryTTL = 2000; // number of blocks to wait until funds can be retrieved
    function setTagsSource(address tags) auth
    {
        _tags = Tags(tags);
    }

    function publish(bytes32[2] hash, bytes32[] tags) onlyRegistered
    {
        if(tags.length == 0 || tags.length>10){ throw; }
        var myProfile = _controller.addressOfKey(msg.sender);
        var deposit = new EntryDeposit();
        _entry[_entryId] = Source({_hash: hash, _blockNr: block.number, _owner: myProfile});
        _entryFunds[_entryId] = deposit;
        for(uint8 i=0; i<tags.length; i++)  {
            if(!_tags.exists(tags[i])){ throw;}
            DLinked.insert(_indexEntryTag[_tags.getTagId(tags[i])]._index, _entryId);
            Publish(myProfile, tags[i], _entryId);
        }

        DLinked.insert(_indexEntryAuthor[myProfile]._index, _entryId);
        _entryId++;
    }

    function updateEntryContent(bytes32[2] hash, uint entryId)
    onlyRegistered
    {
        var myProfile = _controller.addressOfKey(msg.sender);
        if(_entry[entryId]._owner!=myProfile){ throw;}
        if(!isEditable(entryId)){ throw;} //freeze updates after ttl
        _entry[entryId]._hash = hash;
    }

    function claimDeposit(uint entryId)
    onlyRegistered
    {
        var myProfile = _controller.addressOfKey(msg.sender);
        if(!DLinked.exists(_indexEntryAuthor[myProfile]._index, entryId)){ throw;}
        if(isEditable(entryId)){ throw;}
        if(_entryFunds[entryId] == address(0x0)){ throw;}

        EntryDeposit(_entryFunds[entryId]).destroy();
        delete _entryFunds[entryId];
    }

    function getProfileEntriesCount(address profile)
    constant returns(uint)
    {
        return DLinked.size(_indexEntryAuthor[profile]._index);
    }

    function getProfileEntryFirst(address profile)
    constant returns(uint)
    {
        return DLinked.first(_indexEntryAuthor[profile]._index);
    }

    function getProfileEntryLast(address profile)
    constant returns(uint)
    {
        return DLinked.last(_indexEntryAuthor[profile]._index);
    }

    function getProfileEntryNext(address profile, uint profileId)
    constant returns(uint)
    {
        return DLinked.next(_indexEntryAuthor[profile]._index, profileId);
    }

    function getProfileEntryPrev(address profile, uint profileId)
    constant returns(uint)
    {
        return DLinked.prev(_indexEntryAuthor[profile]._index, profileId);
    }

    function getTagEntriesCount(bytes32 tag)
    constant returns(uint)
    {
        var tagId = _tags.getTagId(tag);
        return DLinked.size(_indexEntryTag[tagId]._index);
    }

    function getTagEntryFirst(bytes32 tag)
    constant returns(uint)
    {
        var tagId = _tags.getTagId(tag);
        return DLinked.first(_indexEntryTag[tagId]._index);
    }

    function getTagEntryLast(bytes32 tag)
    constant returns(uint)
    {
        var tagId = _tags.getTagId(tag);
        return DLinked.last(_indexEntryTag[tagId]._index);
    }

    function getTagEntryNext(bytes32 tag, uint entryId)
    constant returns(uint)
    {
        var tagId = _tags.getTagId(tag);
        return DLinked.next(_indexEntryTag[tagId]._index, entryId);
    }

    function getTagEntryPrev(bytes32 tag, uint entryId)
    constant returns(uint)
    {
        var tagId = _tags.getTagId(tag);
        return DLinked.prev(_indexEntryTag[tagId]._index, entryId);
    }

    function isEditable(uint entryId)
    constant returns(bool)
    {
        return ((_entry[entryId]._blockNr + _entryTTL) < block.number);
    }

    function getEntry(uint entryId)
    constant returns(uint blockNr, address publisher, bytes32[2] ipfsHash)
    {
        blockNr = _entry[entryId]._blockNr;
        publisher = _entry[entryId]._owner;
        ipfsHash = _entry[entryId]._hash;
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