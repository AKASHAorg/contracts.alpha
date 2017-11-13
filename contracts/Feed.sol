pragma solidity ^0.4.0;


import 'zeppelin-solidity/contracts/ownership/HasNoTokens.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';


contract Feed is HasNoEther, HasNoTokens {

    struct FollowRecord {
    mapping (address => bool) following;
    uint total;
    }

    mapping (address => uint) followersCount;

    mapping (address => FollowRecord) followingRecords;

    event Follow(address indexed followed, address indexed follower);

    event UnFollow(address indexed followed, address indexed follower);

    function Feed()
    HasNoEther()
    HasNoTokens()
    {

    }

    function follow(address _profile)
    public
    returns (bool)
    {
        require(!followingRecords[msg.sender].following[_profile]);
        followingRecords[msg.sender].following[_profile] = true;

        followingRecords[msg.sender].total++;
        followersCount[_profile]++;

        Follow(_profile, msg.sender);
        return true;
    }

    function unFollow(address _profile)
    public
    returns (bool)
    {
        require(followingRecords[msg.sender].following[_profile]);
        followingRecords[msg.sender].following[_profile] = false;

        followingRecords[msg.sender].total--;
        followersCount[_profile]--;

        UnFollow(_profile, msg.sender);
        return true;
    }

    function totalFollowers(address _profile)
    constant
    returns (uint _total)
    {
        _total = followersCount[_profile];
    }

    function totalFollowing(address _profile)
    constant
    returns (uint _total)
    {
        _total = followingRecords[_profile].total;
    }

    function followsCount(address _profile)
    constant
    returns (uint _followersCount, uint _followingCount)
    {
        _followersCount = totalFollowers(_profile);
        _followingCount = totalFollowing(_profile);
    }

    function follows(address _follower, address _following)
    constant
    returns (bool)
    {
        return followingRecords[_follower].following[_following];
    }

}
