pragma solidity ^0.4.0;


import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';


contract Votes is HasNoEther {
    using SafeMath for uint256;

    int8 public MAX_WEIGHT = 11; // (MIN_WEIGHT, MAX_WEIGHT) interval
    int8 public MIN_WEIGHT = - 11;

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

    function voteEntry(int8 _weight, bytes32 _source)
    {
        require(registerVote(_weight, _source, Target.Entry));
    }

    function registerVote(int8 _weight, bytes32 _source, Target _target)
    internal
    returns (bool)
    {
        require(records[_source].endPeriod <= now);
        require(_weight > MIN_WEIGHT);
        require(_weight < MIN_WEIGHT);

        records[_source].target = _target;
        records[_source].score += int(_weight);
        return true;
    }

    function setMax(int8 _max)
    onlyOwner
    {
        assert(_max > MIN_WEIGHT);
        MAX_WEIGHT = _max;
    }

    function setMin(int8 _min)
    onlyOwner
    {
        assert(MAX_WEIGHT > _min);
        MIN_WEIGHT = _min;
    }
}
