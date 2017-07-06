pragma solidity ^0.4.8;
import './BaseModule.sol';
import './DLinked.sol';
import './Tags.sol';

contract Subs is BaseModule {

    Tags _tags;

    mapping(bytes32 => uint) _subsCount;
    mapping(address => mapping(bytes32 => bool)) _subs;

    event Subscribe(bytes32 indexed tag, address indexed subscriber, bool indexed action, uint date) anonymous;

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

        if(_tags.exists(tag) && !_subs[myProfile][tag])
        {
            Subscribe(tag, myProfile, true, now);
            _subs[myProfile][tag] = true;
            _subsCount[tag] += 1;
            return true;
        }
        return false;
    }

    function unSubscribe(bytes32 tag)
    onlyRegistered
    returns(bool)
    {
        var myProfile = _controller.addressOfKey(msg.sender);
        if(_tags.exists(tag) && _subs[myProfile][tag])
        {
            Subscribe(tag, myProfile, false, now);
            delete _subs[myProfile][tag];
            _subsCount[tag] -= 1;
            return true;
        }

        return false;
    }

    function isSubscribed(bytes32 id, bytes32 tag)
    constant returns(bool)
    {
        var profile = _controller.addressOf(id);
        return _subs[profile][tag];
    }

}