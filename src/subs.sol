pragma solidity ^0.4.9;
import './basemodule.sol';
import './dlinkedlist.sol';
import './tags.sol';

contract Subs is BaseModule {
    using DLinked for DLinked.List;

    struct TagSubs {
        DLinked.List _index;
    }
    Tags _tags;

    mapping(address => TagSubs) _subscriptions;

    event Subscribe(uint indexed tag, address indexed subscriber);

    function setTagSource(address tags)
    auth
    {
       _tags = Tags(tags);
    }

    function subscribe(bytes32 tag)
    onlyRegistered
    returns(bool subscribed)
    {
        var myProfile = _controller.addressOfKey(msg.sender);
        var tagId = _tags.getTagId(tag);
        subscribed = _subscriptions[myProfile]._index.insert(tagId);
        if(subscribed){
            Subscribe(tagId, myProfile);
        }
    }

    function unSubscribe(bytes32 tag)
    onlyRegistered
    returns(bool)
    {
        var myProfile = _controller.addressOfKey(msg.sender);
        var tagId = _tags.getTagId(tag);
        return _subscriptions[myProfile]._index.remove(tagId);
    }

    function isSubscribed(bytes32 id, bytes32 tag)
    constant returns(bool)
    {
        var profile = _controller.addressOf(id);
        var tagId = _tags.getTagId(tag);
        return _subscriptions[profile]._index.exists(tagId);
    }

    function subsCount(bytes32 id)
    constant returns(uint)
    {
        return _subscriptions[_controller.addressOf(id)]._index.getSize();
    }

    function subsFirst(bytes32 id)
    constant returns(uint)
    {
        return _subscriptions[_controller.addressOf(id)]._index.getFirst();
    }


    function subsLast(bytes32 id)
    constant returns(uint)
    {
        return _subscriptions[_controller.addressOf(id)]._index.getLast();
    }

    function subsNext(bytes32 id, uint tag)
    constant returns(uint)
    {
        return _subscriptions[_controller.addressOf(id)]._index.getNext(tag);
    }

    function subsPrev(bytes32 id, uint tag)
    constant returns(uint)
    {
        return _subscriptions[_controller.addressOf(id)]._index.getPrev(tag);
    }

}