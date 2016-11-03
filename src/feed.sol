pragma solidity ^0.4.4;
import './basemodule.sol';
import './dlinkedlist.sol';
import './tags.sol';

contract Feed is BaseModule {
    using DLinked for DLinked.List;
    struct Following {
        mapping(address => uint) _followingMap;
        mapping(uint => address) _indexedFollowing;
        DLinked.List _index;
    }

    struct Followers {
        mapping(address => uint) _followersMap;
        mapping(uint => address) _indexedFollowers;
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
        var myProfile = _controller.addressOfKey(msg.sender);
        if(profile == address(0x0)){
            throw;
        }

        var following = _following[myProfile];
        var fSize = following._index.getSize();
        fSize++;
        following._followingMap[profile] = fSize;
        following._indexedFollowing[fSize] = profile;
        following._index.insert(fSize);
        Follow(profile, myProfile);

        var followers = _followers[profile];
        var foSize = followers._index.getSize();
        foSize++;
        followers._followersMap[myProfile] = foSize;
        followers._indexedFollowers[foSize] = myProfile;
        followers._index.insert(foSize);
    }

    function unFollow(bytes32 id)
    onlyRegistered
    {
        var profile = _controller.addressOf(id);
        var myProfile = _controller.addressOfKey(msg.sender);
        var following = _following[myProfile];
        var followingId = following._followingMap[profile];
        following._index.remove(followingId);
        delete following._followingMap[profile];
        delete following._indexedFollowing[followingId];

        var followers = _followers[profile];
        var followerId = followers._followersMap[myProfile];
        followers._index.remove(followerId);
        delete followers._followersMap[myProfile];
        delete followers._indexedFollowers[followerId];
    }

    function isFollowing(bytes32 id)
    constant returns(bool)
    {
        var profile = _controller.addressOf(id);
        var myProfile = _controller.addressOfKey(msg.sender);
        var following = _following[myProfile];
        return (following._followingMap[profile] != 0);
    }

    function isFollower(bytes32 id)
    constant returns(bool)
    {
        var profile = _controller.addressOf(id);
        var myProfile = _controller.addressOfKey(msg.sender);
        var followers = _followers[myProfile];
        return (followers._followersMap[profile] != 0);
    }

    function getFollowingCount(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        var following = _following[profile];
        return following._index.getSize();
    }

    function getFollowingFirst(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        var following = _following[profile];
        return following._index.getFirst();
    }

    function getFollowingLast(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        var following = _following[profile];
        return following._index.getLast();
    }

    function getFollowingNext(bytes32 id, uint next)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        var following = _following[profile];
        return following._index.getNext(next);
    }

    function getFollowingPrev(bytes32 id, uint prev)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        var following = _following[profile];
        return following._index.getPrev(prev);
    }

    function getFollowingById(bytes32 id, uint idIndex)
    constant returns(address)
    {
        var profile = _controller.addressOf(id);
        var following = _following[profile];
        return following._indexedFollowing[idIndex];
    }

    function getFollowersCount(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        var followers = _followers[profile];
        return followers._index.getSize();
    }

    function getFollowersFirst(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        var followers = _followers[profile];
        return followers._index.getFirst();
    }

    function getFollowersLast(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        var followers = _followers[profile];
        return followers._index.getLast();
    }

    function getFollowersNext(bytes32 id, uint next)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        var followers = _followers[profile];
        return followers._index.getNext(next);
    }

    function getFollowersPrev(bytes32 id, uint prev)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        var followers = _followers[profile];
        return followers._index.getPrev(prev);
    }

    function getFollowersById(bytes32 id, uint idIndex)
    constant returns(address)
    {
        var profile = _controller.addressOf(id);
        var followers = _followers[profile];
        return followers._indexedFollowers[idIndex];
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

    function subsCount(address profile)
    constant returns(uint)
    {
        return _subscriptions[profile]._index.getSize();
    }

    function subsFirst(address profile)
    constant returns(uint)
    {
        return _subscriptions[profile]._index.getFirst();
    }


    function subsLast(address profile)
    constant returns(uint)
    {
        return _subscriptions[profile]._index.getLast();
    }

    function subsNext(address profile, uint tag)
    constant returns(uint)
    {
        return _subscriptions[profile]._index.getNext(tag);
    }

    function subsPrev(address profile, uint tag)
    constant returns(uint)
    {
        return _subscriptions[profile]._index.getPrev(tag);
    }
}