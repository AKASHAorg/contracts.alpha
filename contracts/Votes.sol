pragma solidity ^0.4.0;


import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoTokens.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import './Entries.sol';
import './Tags.sol';
import './token/Essence.sol';

contract Votes is HasNoEther, HasNoTokens {
    using SafeMath for uint256;

    Entries entries;

    Tags tags;

    Essence essence;
    uint256 public required_essence;

    uint8 public MAX_WEIGHT = 10; // (MIN_WEIGHT, MAX_WEIGHT) interval

    enum Target {Entry, Comment, List}
    event Vote(uint8 indexed voteType, bytes32 indexed target, address indexed voter, uint8 weight, bool negative);

    struct Record {
    Target target;
    int score;
    uint256 endPeriod;
    uint256 totalVotes;
    mapping(address => int8) votes;
    }

    mapping (bytes32 => Record) records;

    function Votes()
    HasNoEther()
    HasNoTokens()
    {

    }

    function setEntries(Entries _entries)
    onlyOwner
    {
        entries = _entries;
    }


    function setTags(Tags _tags)
    onlyOwner
    {
        tags = _tags;
    }

    function setEssence(Essence _essence)
    onlyOwner
    {
        essence = _essence;
    }

    function setRequiredEssence(uint256 _amount)
    onlyOwner
    {
        required_essence = _amount;
    }

    function voteEntry(uint8 _weight, bytes32 _source, bool _negative, address _publisher)
    returns (bool)
    {
        require(entries.exists(_publisher, _source));
        uint256 weight = uint256(_weight);
        essence.spendEssence(msg.sender, required_essence.mul(weight), 0x656e7472793a766f7465);
        require(registerVote(_weight, _source, _negative, msg.sender, Target.Entry));
        Vote(uint8(Target.Entry), _source, msg.sender, _weight, _negative);
        return true;
    }

    function voteComment(uint8 _weight, bytes32 _source, bool _negative)
    returns (bool)
    {
        uint256 weight = uint256(_weight);
        essence.spendEssence(msg.sender, required_essence.mul(weight), 0x636f6d6d656e743a766f7465);

        require(registerVote(_weight, _source, _negative, msg.sender, Target.Comment));
        Vote(uint8(Target.Comment), _source, msg.sender, _weight, _negative);
        return true;
    }

    function voteList(uint8 _weight, bytes32 _source, bool _negative)
    returns (bool)
    {
        require(tags.list_exists(_source));
        uint256 weight = uint256(_weight);
        essence.spendEssence(msg.sender, required_essence.mul(weight), 0x6c6973743a766f7465);

        require(registerVote(_weight, _source, _negative, msg.sender, Target.List));
        Vote(uint8(Target.List), _source, msg.sender, _weight, _negative);
        return true;
    }

    function registerVote(uint8 _weight, bytes32 _source, bool _negative, address _voter, Target _target)
    internal
    returns (bool)
    {
        // require(records[_source].endPeriod <= now);
        require(_weight > 0);
        require(_weight <= MAX_WEIGHT);
        records[_source].target = _target;
        if (_negative) {
            records[_source].score -= int(_weight);
            records[_source].votes[_voter] = int8(-_weight);
        }
        else {
            records[_source].score += int(_weight);
            records[_source].votes[_voter] = int8(_weight);
        }
        records[_source].totalVotes++;
        return true;
    }

    function voteOf(address _voter, bytes32 _source)
    constant
    returns(int8)
    {
        return records[_source].votes[_voter];
    }

    function setMax(uint8 _max)
    onlyOwner
    {
        assert(_max > 0);
        MAX_WEIGHT = _max;
    }

}
