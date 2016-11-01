pragma solidity ^0.4.4;
import 'basemodule.sol';
import 'dlinkedlist.sol';
import 'entry.sol';

contract Comments is BaseModule {
    struct Comment {
        uint _parent;
        uint _id;
        bytes32[2] _hash;
        address _owner;
        bool _deleted;
    }

    struct Index {
        uint _id;
        DLinked.List _index;
        mapping(uint => Comment) _data;
    }

    Entry _entries;
    event Commented(uint indexed entryId, address indexed profile, uint commentId);
    mapping(uint => Index) entryComment;

    function setEntryAddress(address entryAddress) auth {
        _entries = Entry(entryAddress);
    }

    function comment(uint entryId, bytes32[2] hash, uint parent)
    onlyRegistered
    {
        if(!_entries.entryExists(entryId)){ throw;}

        if(entryComment[entryId]._id == 0){
            entryComment[entryId]._id = 1;
        }
        var myProfile = _controller.addressOfKey(msg.sender);
        entryComment[entryId]._data[entryComment[entryId]._id]._owner = myProfile;
        entryComment[entryId]._data[entryComment[entryId]._id]._hash = hash;
        entryComment[entryId]._data[entryComment[entryId]._id]._id = entryComment[entryId]._id;
        if(parent!=0 && parent< entryComment[entryId]._id) {
            entryComment[entryId]._data[entryComment[entryId]._id]._parent = parent;
        }

        DLinked.insert(entryComment[entryId]._index, entryComment[entryId]._id);
        Commented(entryId, myProfile, entryComment[entryId]._id);
        entryComment[entryId]._id++;
    }

    function removeComment(uint entryId, uint commentId)
    onlyRegistered
    {
        var myProfile = _controller.addressOfKey(msg.sender);
        if(entryComment[entryId]._data[commentId]._owner != myProfile){ throw;}
        entryComment[entryId]._data[commentId]._deleted = true;
    }

    function getComment(uint entryId, uint commentId)
    constant
    returns(address profile, uint id, uint parent, bytes32[2] ipfsHash, bool removed)
    {
        profile = entryComment[entryId]._data[commentId]._owner;
        id = entryComment[entryId]._data[commentId]._id;
        parent = entryComment[entryId]._data[commentId]._parent;
        ipfsHash = entryComment[entryId]._data[commentId]._hash;
        removed = entryComment[entryId]._data[commentId]._deleted;
    }

    function getCommentsCount(uint entryId)
    constant
    returns(uint)
    {
        return DLinked.size(entryComment[entryId]._index);
    }

    function getFirstComment(uint entryId)
    constant
    returns(uint)
    {
        return DLinked.first(entryComment[entryId]._index);
    }

    function getLastComment(uint entryId)
    constant
    returns(uint)
    {
        return DLinked.last(entryComment[entryId]._index);
    }

    function getNextComment(uint entryId, uint commentId)
    constant
    returns(uint)
    {
        return DLinked.next(entryComment[entryId]._index, commentId);
    }

    function getPrevComment(uint entryId, uint commentId)
    constant
    returns(uint)
    {
        return DLinked.prev(entryComment[entryId]._index, commentId);
    }
}