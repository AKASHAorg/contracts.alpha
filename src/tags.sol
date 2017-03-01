pragma solidity ^0.4.8;
import './dlinkedlist.sol';
import './basemodule.sol';

contract Tags is BaseModule {
    using DLinked for DLinked.List;
    DLinked.List _index;
    uint idTag = 1;
    mapping(bytes32 => uint) _tag;
    mapping(uint => bytes32) _indexedTag;

    event Create(bytes32 indexed tag, uint id);
    event Remove(bytes32 indexed tag);

    function add(bytes32 tag)
    onlyRegistered
    {
        if(!check_format(tag) || exists(tag)){
            throw;
        }
        _tag[tag] = idTag;
        _index.insert(idTag);
        _indexedTag[idTag] = tag;
        Create(tag, idTag);
        idTag++;
    }

    function remove(uint tagId)
    auth
    {
        var tag = _indexedTag[tagId];
        delete _tag[tag];
        delete _indexedTag[tagId];
        _index.remove(tagId);
        Remove(tag);
    }

    function exists(bytes32 tag)
    constant returns(bool)
    {
        return _tag[tag]!=0;
    }

    function getTagName(uint tagId)
    constant returns(bytes32)
    {
        return _indexedTag[tagId];
    }

    function getTagId(bytes32 tag)
    constant returns(uint)
    {
        return _tag[tag];
    }

    function getTagCount()
    constant returns(uint)
    {
        return _index.getSize();
    }

    function getFirstTag()
    constant returns(uint)
    {
        return _index.getFirst();
    }

    function getLastTag()
    constant returns(uint)
    {
        return _index.getLast();
    }

    function nextTag(uint tagId)
    constant returns(uint)
    {
        return _index.getNext(tagId);
    }

    function prevTag(uint tagId)
    constant returns(uint)
    {
        return _index.getPrev(tagId);
    }

    function check_format(bytes32 tag)
    constant returns(bool)
    {
        for(uint8 i=0; i<tag.length; i++)
        {
            if(tag[i] == 0) break;

            if(tag[i] > 122 || (tag[i]<97 && tag[i] > 57 && tag[i] !=95) || (tag[i]<48 && tag[i]!=45))
            {
                return false;
            }
        }
        return i > 1;
    }
}