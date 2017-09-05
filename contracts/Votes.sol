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

    uint256 public required_essence = 10;

    uint8 public MAX_WEIGHT = 10; // (MIN_WEIGHT, MAX_WEIGHT) interval
    uint8 public VOTE_KARMA = 1;

    enum Target {Entry, Comment, List}
    event Vote(uint8 indexed voteType, bytes32 indexed target, address indexed voter, uint8 weight, bool negative);

    struct Record {
    bool claimed;
    Target target;
    uint256 endPeriod;
    uint256 totalVotes;
    uint256 totalKarma;
    int score;
    mapping (address => int8) votes;
    mapping (address => uint256) karma;
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

    modifier onlyFromEntries () {
        require(msg.sender == address(entries));
        _;
    }

    function setTags(Tags _tags)
    onlyOwner
    {
        tags = _tags;
    }

    function setVoteKarma(uint8 _amount)
    onlyOwner
    {
        VOTE_KARMA = _amount;
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
        require(msg.sender != _publisher);
        uint256 weight = uint256(_weight);
        essence.spendEssence(msg.sender, required_essence.mul(weight), 0x656e7472793a766f7465);
        require(registerVote(_weight, _source, _negative, msg.sender, Target.Entry));
        if (!_negative && records[_source].endPeriod >= now) {
            uint256 karmaGenerated = calcKarmaFrom(_weight);
            records[_source].totalKarma = records[_source].totalKarma.add(karmaGenerated);
            records[_source].karma[msg.sender] = karmaGenerated;
        }
        Vote(uint8(Target.Entry), _source, msg.sender, _weight, _negative);
        return true;
    }

    function calcKarmaFrom(uint8 _weight)
    internal
    returns (uint256)
    {
        uint256 base = uint256(VOTE_KARMA);
        uint256 factor = uint256(_weight);
        return base.mul(factor); // divided by MAX_WEIGHT client side
    }

    function voteComment(uint8 _weight, bytes32 _source, bool _negative)
    returns (bool)
    {
        uint256 weight = uint256(_weight);
        essence.spendEssence(msg.sender, required_essence.mul(weight), 0x636f6d6d656e743a766f7465);

        require(registerVote(_weight, _source, _negative, msg.sender, Target.Comment));

        if (!_negative) {
            essence.collectFor(tags.list_creator(_source), calcKarmaFrom(_weight));
        }

        Vote(uint8(Target.Comment), _source, msg.sender, _weight, _negative);
        return true;
    }

    function voteList(uint8 _weight, bytes32 _source, bool _negative)
    returns (bool)
    {
        require(tags.list_exists(_source));
        require(tags.list_creator(_source) != msg.sender);
        uint256 weight = uint256(_weight);
        essence.spendEssence(msg.sender, required_essence.mul(weight), 0x6c6973743a766f7465);

        require(registerVote(_weight, _source, _negative, msg.sender, Target.List));

        if (!_negative) {
            essence.collectFor(tags.list_creator(_source), calcKarmaFrom(_weight));
        }

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
            records[_source].votes[_voter] = int8(- _weight);
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
    returns (int8)
    {
        return records[_source].votes[_voter];
    }

    function setMax(uint8 _max)
    onlyOwner
    {
        assert(_max > 0);
        MAX_WEIGHT = _max;
    }

    function claimEntry(bytes32 _id, address _publisher)
    onlyFromEntries
    returns (bool)
    {
        require(records[_id].endPeriod < now);
        require(records[_id].score >= 0);
        require(!records[_id].claimed);

        records[_id].claimed = true;
        essence.collectFor(_publisher, records[_id].totalKarma);
        return true;
    }

    function canClaim(bytes32 _id)
    constant
    returns (bool)
    {
        return (records[_id].endPeriod >= now && records[_id].score >= 0 && !records[_id].claimed);
    }

    function getRecord(bytes32 _id)
    constant
    returns (uint256 _totalVotes, int _score, uint256 _endPeriod, uint256 _totalKarma, bool _claimed)
    {
        _totalVotes = records[_id].totalVotes;
        _score = records[_id].score;
        _endPeriod = records[_id].endPeriod;
        _totalKarma = records[_id].totalKarma;
        _claimed = records[_id].claimed;
    }


    function karmaOf(address _voter, bytes32 _id)
    constant
    returns(uint _karma)
    {
        _karma = records[_id].karma[_voter];
    }

}
