pragma solidity ^0.4.8;
import './basemodule.sol';
import './dlinkedlist.sol';

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

    bytes32 app_version;
    string release_notes;
    string app_repository;

    mapping(address => Following) _following;
    mapping(address => Followers) _followers;

    event Follow(address indexed following, address follower);

    event UpdateVersion(bytes32 newVersion);

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
        return (_followers[_controller.addressOf(following)]._followersMap[_controller.addressOf(id)] != 0);
    }

    function getFollowingCount(bytes32 id)
    constant returns(uint)
    {
        return _following[_controller.addressOf(id)]._index.getSize();
    }

    function getFollowingFirst(bytes32 id)
    constant returns(uint)
    {
        return _following[_controller.addressOf(id)]._index.getFirst();
    }

    function getFollowingLast(bytes32 id)
    constant returns(uint)
    {
        return _following[_controller.addressOf(id)]._index.getLast();
    }

    function getFollowingNext(bytes32 id, uint next)
    constant returns(uint)
    {
        return _following[_controller.addressOf(id)]._index.getNext(next);
    }

    function getFollowingPrev(bytes32 id, uint prev)
    constant returns(uint)
    {
        return _following[_controller.addressOf(id)]._index.getPrev(prev);
    }

    function getFollowingById(bytes32 id, uint idIndex)
    constant returns(address)
    {
        return _following[_controller.addressOf(id)]._indexedFollowing[idIndex];
    }

    function getFollowersCount(bytes32 id)
    constant returns(uint)
    {
        return _followers[_controller.addressOf(id)]._index.getSize();
    }

    function getFollowersFirst(bytes32 id)
    constant returns(uint)
    {
        return _followers[_controller.addressOf(id)]._index.getFirst();
    }

    function getFollowersLast(bytes32 id)
    constant returns(uint)
    {
        return _followers[_controller.addressOf(id)]._index.getLast();
    }

    function getFollowersNext(bytes32 id, uint next)
    constant returns(uint)
    {
        return _followers[_controller.addressOf(id)]._index.getNext(next);
    }

    function getFollowersPrev(bytes32 id, uint prev)
    constant returns(uint)
    {
        return _followers[_controller.addressOf(id)]._index.getPrev(prev);
    }

    function getFollowersById(bytes32 id, uint idIndex)
    constant returns(address)
    {
        return _followers[_controller.addressOf(id)]._indexedFollowers[idIndex];
    }

    function setVersion(string repository, bytes32 newVersion, string releaseNotes) auth {
        app_version = newVersion;
        release_notes = releaseNotes;
        app_repository = repository;
        UpdateVersion(app_version);
    }

    function getAppState() constant returns(bytes32, string, string) {
        return (app_version, app_repository, release_notes);
    }
}