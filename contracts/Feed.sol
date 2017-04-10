pragma solidity ^0.4.8;
import './BaseModule.sol';
import './DLinked.sol';

contract Feed is BaseModule {
    struct Follow {
        uint followersNr;
        uint followingNr;
        mapping(bytes32=>bool) store;
    }

    event Following(bytes32 indexed followed, bytes32 indexed follower, bool action, uint date);

    mapping (bytes32 => Follow) _record;

    function follow(bytes32 followed, bytes32 follower)
    onlyRegistered
    returns(bool)
    {

        var profile = _controller.addressOf(followed);
        var myProfileAddress = _controller.addressOfKey(msg.sender);
        var myProfile = _controller.addressOf(follower);
        if(
            profile == address(0x0)
            || myProfileAddress == address(0x0)
            || myProfileAddress != myProfile
        ){
            return false;
        }
        Following(followed, follower, true, now);
        _record[follower].store[followed] = true;
        _record[follower].followingNr += 1;
        _record[followed].followersNr += 1;
        return true;
    }

    function unFollow(bytes32 followed, bytes32 follower)
    onlyRegistered
    returns(bool)
    {
        var profile = _controller.addressOf(followed);
        var myProfileAddress = _controller.addressOfKey(msg.sender);
        var myProfile = _controller.addressOf(follower);
        if(
        profile == address(0x0)
        || myProfileAddress == address(0x0)
        || myProfileAddress != myProfile
        || !_record[follower].store[followed]
        ){
            return false;
        }
        Following(followed, follower, false, now);
        delete _record[follower].store[followed];
        _record[follower].followingNr -= 1;
        _record[followed].followersNr -= 1;
        return true;
    }

    function isFollowing(bytes32 follower, bytes32 id)
    constant returns(bool)
    {
        return _record[follower].store[id];
    }

    function getFollowCount(bytes32 id)
    constant returns(uint followersCount, uint followingCount)
    {
        followersCount = _record[id].followersNr;
        followingCount = _record[id].followingNr;
    }

}