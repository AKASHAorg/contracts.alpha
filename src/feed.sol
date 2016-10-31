pragma solidity ^0.4.3;
import 'basemodule.sol';
import 'dlinkedlist.sol';
import 'tags.sol';

contract Feed is BaseModule {
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
        var fSize = DLinked.size(following._index);
        fSize++;
        following._followingMap[profile] = fSize;
        following._indexedFollowing[fSize] = profile;
        DLinked.insert(following._index, fSize);
        Follow(profile, myProfile);

        var followers = _followers[profile];
        var foSize = DLinked.size(followers._index);
        foSize++;
        followers._followersMap[myProfile] = foSize;
        followers._indexedFollowers[foSize] = myProfile;
        DLinked.insert(followers._index, foSize);
    }

    function unFollow(bytes32 id)
    onlyRegistered
    {
        var profile = _controller.addressOf(id);
        var myProfile = _controller.addressOfKey(msg.sender);
        var following = _following[myProfile];
        var followingId = following._followingMap[profile];
        DLinked.remove(following._index, followingId);
        delete following._followingMap[profile];
        delete following._indexedFollowing[followingId];

        var followers = _followers[profile];
        var followerId = followers._followersMap[myProfile];
        DLinked.remove(followers._index, followerId);
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
        return DLinked.size(following._index);
    }

    function getFollowingFirst(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        var following = _following[profile];
        return DLinked.first(following._index);
    }

    function getFollowingLast(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        var following = _following[profile];
        return DLinked.last(following._index);
    }

    function getFollowingNext(bytes32 id, uint next)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        var following = _following[profile];
        return DLinked.next(following._index, next);
    }

    function getFollowingPrev(bytes32 id, uint prev)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        var following = _following[profile];
        return DLinked.prev(following._index, prev);
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
        return DLinked.size(followers._index);
    }

    function getFollowersFirst(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        var followers = _followers[profile];
        return DLinked.first(followers._index);
    }

    function getFollowersLast(bytes32 id)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        var followers = _followers[profile];
        return DLinked.last(followers._index);
    }

    function getFollowersNext(bytes32 id, uint next)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        var followers = _followers[profile];
        return DLinked.next(followers._index, next);
    }

    function getFollowersPrev(bytes32 id, uint prev)
    constant returns(uint)
    {
        var profile = _controller.addressOf(id);
        var followers = _followers[profile];
        return DLinked.prev(followers._index, prev);
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
        subscribed = DLinked.insert(_subscriptions[myProfile]._index, tagId);
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
        return DLinked.remove(_subscriptions[myProfile]._index, tagId);
    }

    function subsCount(address profile)
    constant returns(uint)
    {
        return DLinked.size(_subscriptions[profile]._index);
    }

    function subsFirst(address profile)
    constant returns(uint)
    {
        return DLinked.first(_subscriptions[profile]._index);
    }


    function subsLast(address profile)
    constant returns(uint)
    {
        return DLinked.last(_subscriptions[profile]._index);
    }

    function subsNext(address profile, uint tag)
    constant returns(uint)
    {
        return DLinked.next(_subscriptions[profile]._index, tag);
    }

    function subsPrev(address profile, uint tag)
    constant returns(uint)
    {
        return DLinked.prev(_subscriptions[profile]._index, tag);
    }
}