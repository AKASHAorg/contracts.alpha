pragma solidity ^0.4.6;
import './basemodule.sol';
import './dlinkedlist.sol';
import './tags.sol';

contract Feed is BaseModule {
    using DLinked for DLinked.List;
    struct Following {
        mapping(address => uint) _followingMap;
        mapping(uint => address) _indexedFollowing;
        uint _fId;
        DLinked.List _index;
    }

    struct Followers {
        mapping(address => uint) _followersMap;
        mapping(uint => address) _indexedFollowers;
        uint _foId;
        DLinked.List _index;
    }

    struct Subscriptions {
        DLinked.List _index;
    }

    mapping(address => Following) _following;
    mapping(address => Followers) _followers;
    mapping(address => Subscriptions) _subscriptions;
    Tags _tags;

    event Follow(address indexed following, address follower);
    event Subscribe(uint indexed tag, address indexed subscriber);

    function setTagSource(address tags)
    auth
    {
        _tags = Tags(tags);
    }

    function follow(bytes32 id)
    onlyRegistered
    {

        var profile = _controller.addressOf(id);
        if(profile == address(0x0)){ throw;}
        var myProfile = _controller.addressOfKey(msg.sender);
        if(_following[myProfile]._followingMap[profile] != 0){ throw;}
        _following[myProfile]._fId++;
        _followers[profile]._foId++;

        _following[myProfile]._followingMap[profile] = _following[myProfile]._fId;
        _following[myProfile]._indexedFollowing[_following[myProfile]._fId] = profile;
        _following[myProfile]._index.insert(_following[myProfile]._fId);

        _followers[profile]._followersMap[myProfile] = _followers[profile]._foId;
        _followers[profile]._indexedFollowers[_followers[profile]._foId] = myProfile;
        _followers[profile]._index.insert(_followers[profile]._foId);
        Follow(profile, myProfile);
    }

    function unFollow(bytes32 id)
    onlyRegistered
    {
        var profile = _controller.addressOf(id);
        var myProfile = _controller.addressOfKey(msg.sender);
        var followingId = _following[myProfile]._followingMap[profile];
        var followerId = _followers[profile]._followersMap[myProfile];
        if(_following[myProfile]._followingMap[profile] == 0){ throw;}

        _following[myProfile]._index.remove(followingId);
        delete _following[myProfile]._followingMap[profile];
        delete _following[myProfile]._indexedFollowing[followingId];
        _followers[profile]._index.remove(followerId);
        delete _followers[profile]._followersMap[myProfile];
        delete _followers[profile]._indexedFollowers[followerId];
    }

    function isFollowing(bytes32 follower, bytes32 id)
    constant returns(bool)
    {
        var profile = _controller.addressOf(id);
        var myProfile = _controller.addressOf(follower);
        return (_following[myProfile]._followingMap[profile] != 0);
    }

    function isFollower(bytes32 id, bytes32 following)
    constant returns(bool)
    {
        var profile = _controller.addressOf(id);
        var myProfile = _controller.addressOf(following);
        return (_followers[myProfile]._followersMap[profile] != 0);
    }

    function getFollowingCount(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _following[profile]._index.getSize();
    }

    function getFollowingFirst(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _following[profile]._index.getFirst();
    }

    function getFollowingLast(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _following[profile]._index.getLast();
    }

    function getFollowingNext(bytes32 id, uint next)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _following[profile]._index.getNext(next);
    }

    function getFollowingPrev(bytes32 id, uint prev)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _following[profile]._index.getPrev(prev);
    }

    function getFollowingById(bytes32 id, uint idIndex)
    constant returns(address)
    {
        var profile = _controller.addressOf(id);
        return _following[profile]._indexedFollowing[idIndex];
    }

    function getFollowersCount(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _followers[profile]._index.getSize();
    }

    function getFollowersFirst(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _followers[profile]._index.getFirst();
    }

    function getFollowersLast(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _followers[profile]._index.getLast();
    }

    function getFollowersNext(bytes32 id, uint next)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _followers[profile]._index.getNext(next);
    }

    function getFollowersPrev(bytes32 id, uint prev)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _followers[profile]._index.getPrev(prev);
    }

    function getFollowersById(bytes32 id, uint idIndex)
    constant returns(address)
    {
        var profile = _controller.addressOf(id);
        return _followers[profile]._indexedFollowers[idIndex];
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
        var profile = _controller.addressOf(id);
        return _subscriptions[profile]._index.getSize();
    }

    function subsFirst(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _subscriptions[profile]._index.getFirst();
    }


    function subsLast(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _subscriptions[profile]._index.getLast();
    }

    function subsNext(bytes32 id, uint tag)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _subscriptions[profile]._index.getNext(tag);
    }

    function subsPrev(bytes32 id, uint tag)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        return _subscriptions[profile]._index.getPrev(tag);
    }
}