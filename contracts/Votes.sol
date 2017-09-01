pragma solidity ^0.4.0;


import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoTokens.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import './Entries.sol';
import './Tags.sol';


contract Votes is HasNoEther, HasNoTokens {
    using SafeMath for uint256;

    Entries entries;
    Tags tags;

    uint8 public MAX_WEIGHT = 10; // (MIN_WEIGHT, MAX_WEIGHT) interval

    enum Target {Entry, Comment, List}
    event Vote(uint8 indexed voteType, bytes32 indexed target, address indexed voter, uint8 weight, bool negative);

    struct Record {
        Target target;
        int score;
        uint256 endPeriod;
        uint256 totalVotes;
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


    function voteEntry(uint8 _weight, bytes32 _source, bool _negative, address _publisher)
    returns (bool)
    {
        require(entries.exists(_publisher, _source));
        require(registerVote(_weight, _source, _negative, Target.Entry));
        Vote(uint8(Target.Entry), _source, msg.sender, _weight, _negative);
        return true;
    }

    function voteComment(uint8 _weight, bytes32 _source, bool _negative)
    returns (bool)
    {
        require(registerVote(_weight, _source, _negative, Target.Comment));
       // Vote(uint8(Target.Comment), _source, _weight, _negative);
        return true;
    }

    function voteList(uint8 _weight, bytes32 _source, bool _negative)
    returns (bool)
    {
        require(registerVote(_weight, _source, _negative, Target.List));
       // Vote(uint8(Target.List), _source, _weight, _negative);
        return true;
    }

    function registerVote(uint8 _weight, bytes32 _source, bool _negative, Target _target)
    internal
    returns (bool)
    {
        // require(records[_source].endPeriod <= now);
        require(_weight > 0);
        require(_weight <= MAX_WEIGHT);

        records[_source].target = _target;
        if (_negative) {
            records[_source].score -= int(_weight);
        }
        else {
            records[_source].score += int(_weight);
        }
        records[_source].totalVotes++;
        return true;
    }

    function setMax(uint8 _max)
    onlyOwner
    {
        assert(_max > 0);
        MAX_WEIGHT = _max;
    }

}
