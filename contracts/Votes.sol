pragma solidity ^0.4.0;


import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';


contract Votes is HasNoEther {
    using SafeMath for uint256;

    uint8 public MAX_WEIGHT = 10; // (MIN_WEIGHT, MAX_WEIGHT) interval

    enum Target {Entry, Comment, List}

    struct Vote {
    Target target;
    int score;
    uint endPeriod;
    }

    mapping (bytes32 => Vote) records;

    function Votes()
    HasNoEther()
    {

    }

    function voteEntry(uint8 _weight, bytes32 _source, bool _negative)
    {
        require(registerVote(_weight, _source, _negative, Target.Entry));
    }

    function registerVote(uint8 _weight, bytes32 _source, bool _negative, Target _target)
    internal
    returns (bool)
    {
        require(records[_source].endPeriod <= now);
        require(_weight > 0);
        require(_weight <= MAX_WEIGHT);

        records[_source].target = _target;
        if(_negative){
            records[_source].score -= int(_weight);
        } else {
            records[_source].score += int(_weight);
        }

        return true;
    }

    function setMax(uint8 _max)
    onlyOwner
    {
        assert(_max > 0);
        MAX_WEIGHT = _max;
    }

}
