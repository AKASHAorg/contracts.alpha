pragma solidity ^0.4.8;
import './DLinked.sol';
import './BaseModule.sol';

contract Tags is BaseModule {
    uint count = 1;
    mapping(bytes32 => bool) _tag;

    event Create(bytes32 indexed tag, uint total) anonymous;
    //event Remove(bytes32 indexed tag);

    function add(bytes32 tag)
    onlyRegistered
    {
        if(!check_format(tag) || exists(tag)){
            throw;
        }
        Create(tag, count);
        _tag[tag] = true;
        count++;
    }

//    function remove(uint tagId)
//    auth
//    {
//        var tag = _indexedTag[tagId];
//        delete _tag[tag];
//        delete _indexedTag[tagId];
//        _index.remove(tagId);
//        Remove(tag);
//    }

    function exists(bytes32 tag)
    constant returns(bool)
    {
        return _tag[tag];
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