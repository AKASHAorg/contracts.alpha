pragma solidity ^0.4.0;


import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoTokens.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import './Entries.sol';
import './Tags.sol';
import './token/Essence.sol';
import './Comments.sol';


contract Votes is HasNoEther, HasNoTokens {
    using SafeMath for uint256;

    Entries entries;

    Tags tags;

    Essence essence;

    Comments comments;

    uint256 public required_essence = 10**18;

    uint8 public MAX_WEIGHT = 10; // (MIN_WEIGHT, MAX_WEIGHT) interval
    uint8 public VOTE_KARMA = 1;

    struct Counter {
        uint256 weight;
        uint256 count;
    }
    mapping (address => bool) whitelist;
    mapping (address => Counter) totalVotes;
    enum Target {Entry, Comment, List}
    event Vote(uint8 indexed voteType, bytes32 indexed target, address indexed voter, uint8 weight, bool negative);

    struct VoteKarma {
    uint256 amount;
    bool claimed;
    }

    struct Record {
    bool claimed;
    Target target;
    uint256 endPeriod;
    uint256 totalVotes;
    uint256 totalKarma;
    int score;
    mapping (address => int8) votes;
    mapping (address => VoteKarma) karma;
    }

    mapping (bytes32 => Record) records;

    function Votes()
    public
    HasNoEther()
    HasNoTokens()
    {

    }

    function setEntries(Entries _entries)
    public
    onlyOwner
    {
        entries = _entries;
    }

    function setComments(Comments _comments)
    public
    onlyOwner
    {
        comments = _comments;
    }

    modifier onlyFromEntries () {
        require(msg.sender == address(entries));
        _;
    }

    modifier onlyWhitelisted () {
        require(whitelist[msg.sender]);
        _;
    }

    function setTags(Tags _tags)
    public
    onlyOwner
    {
        tags = _tags;
    }

    function setVoteKarma(uint8 _amount)
    public
    onlyOwner
    {
        VOTE_KARMA = _amount;
    }

    function setEssence(Essence _essence)
    public
    onlyOwner
    {
        essence = _essence;
    }

    function setRequiredEssence(uint256 _amount)
    public
    onlyOwner
    {
        required_essence = _amount;
    }

    function whiteList(address _contract, bool _status)
    public
    onlyOwner
    returns (bool)
    {
        whitelist[_contract] = _status;
        return true;
    }

    function voteEntry(uint8 _weight, bytes32 _source, bool _negative, address _publisher)
    public
    returns (bool)
    {
        require(entries.exists(_publisher, _source));
        require(msg.sender != _publisher);
        uint256 weight = uint256(_weight);
        essence.spendMana(msg.sender, required_essence.mul(weight), 0x656e7472793a766f7465);
        require(registerVote(_weight, _source, _negative, msg.sender, Target.Entry));
        uint256 karmaGenerated = calcKarmaFrom(_weight);
        if (records[_source].endPeriod >= now) {
            if (!_negative) {
                records[_source].totalKarma = records[_source].totalKarma.add(karmaGenerated);
            }
            records[_source].karma[msg.sender].amount = karmaGenerated;
        }

        Vote(uint8(Target.Entry), _source, msg.sender, _weight, _negative);
        return true;
    }

    function calcKarmaFrom(uint8 _weight)
    view
    internal
    returns (uint256 _total)
    {
        uint256 base = uint256(VOTE_KARMA);
        uint256 factor = uint256(_weight);
        uint256 initial = base.mul(factor);
        _total = initial.mul(required_essence);
    }

    function registerResource(bytes32 _id, uint256 _period)
    public
    onlyWhitelisted
    returns (bool)
    {
        records[_id].endPeriod = _period;
        return true;
    }

    function voteComment(uint8 _weight, bytes32 _source, bytes32 _commentId, bool _negative)
    public
    returns (bool)
    {
        uint256 weight = uint256(_weight);
        require(comments.exists(_source, _commentId));
        require(msg.sender != comments.commentAuthor(_source, _commentId));
        require(!comments.isDeleted(_source, _commentId));

        essence.spendMana(msg.sender, required_essence.mul(weight), 0x636f6d6d656e743a766f7465);

        require(registerVote(_weight, _commentId, _negative, msg.sender, Target.Comment));

        if ((!_negative) && (records[_source].endPeriod >= now)) {
            require(essence.collectFor(comments.commentAuthor(_source, _commentId), calcKarmaFrom(_weight), 0x636f6d6d656e743a766f7465, _commentId));
        }

        Vote(uint8(Target.Comment), _commentId, msg.sender, _weight, _negative);
        return true;
    }

    function voteList(uint8 _weight, bytes32 _source, bool _negative)
    public
    returns (bool)
    {
        require(tags.list_exists(_source));
        require(tags.list_creator(_source) != msg.sender);
        uint256 weight = uint256(_weight);
        essence.spendMana(msg.sender, required_essence.mul(weight), 0x6c6973743a766f7465);

        require(registerVote(_weight, _source, _negative, msg.sender, Target.List));

        if (!_negative) {
            require(essence.collectFor(tags.list_creator(_source), calcKarmaFrom(_weight), 0x6c6973743a766f7465, _source));
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
        require(records[_source].votes[_voter] == 0);
        records[_source].target = _target;
        if (_negative) {
            records[_source].score -= int(_weight);
            records[_source].votes[_voter] = int8(- _weight);
        }
        else {
            records[_source].score += int(_weight);
            records[_source].votes[_voter] = int8(_weight);
        }
        totalVotes[_voter].count++;
        totalVotes[_voter].weight = totalVotes[_voter].weight.add(_weight);
        records[_source].totalVotes++;
        return true;
    }

    function voteOf(address _voter, bytes32 _source)
    public
    view
    returns (int8)
    {
        return records[_source].votes[_voter];
    }

    function setMax(uint8 _max)
    public
    onlyOwner
    {
        assert(_max > 0);
        MAX_WEIGHT = _max;
    }

    function claimEntry(bytes32 _id, address _publisher)
    external
    onlyFromEntries
    returns (bool)
    {
        require(records[_id].endPeriod < now);
        require(records[_id].score >= 0);
        require(!records[_id].claimed);

        records[_id].claimed = true;
        require(essence.collectFor(_publisher, records[_id].totalKarma, 0x656e7472793a636c61696d, _id));
        return true;
    }

    function canClaimEntry(bytes32 _id, uint256 _timeStamp)
    public
    view
    returns (bool)
    {
        return (records[_id].endPeriod < _timeStamp && records[_id].score >= 0 && !records[_id].claimed);
    }

    function canClaimEntryVote(bytes32 _id, address _voter, uint256 _timeStamp)
    public
    view
    returns (bool)
    {
        if ((records[_id].endPeriod < _timeStamp) || records[_id].karma[_voter].claimed) {
            return false;
        }

        if (records[_id].score < 0 && (records[_id].votes[_voter] < 0)) {
            return true;
        }

        if (records[_id].score > 0 && (records[_id].votes[_voter] > 0)) {
            return true;
        }
        // voters cant claim if entry score = 0;
        return false;
    }

    function claimKarmaVote(bytes32 _id)
    returns (bool)
    {
        require(canClaimEntryVote(_id, msg.sender, now));
        records[_id].karma[msg.sender].claimed = true;
        require(essence.collectFor(msg.sender, records[_id].karma[msg.sender].amount, 0x656e7472793a766f74653a636c61696d, _id));
        return true;
    }

    function getRecord(bytes32 _id)
    public
    view
    returns (uint256 _totalVotes, int _score, uint256 _endPeriod, uint256 _totalKarma, bool _claimed)
    {
        _totalVotes = records[_id].totalVotes;
        _score = records[_id].score;
        _endPeriod = records[_id].endPeriod;
        _totalKarma = records[_id].totalKarma;
        _claimed = records[_id].claimed;
    }

    function karmaOf(address _voter, bytes32 _id)
    public
    view
    returns (uint _karma, bool _claimed)
    {
        _karma = records[_id].karma[_voter].amount;
        _claimed = records[_id].karma[_voter].claimed;
    }

    function getEssenceCost(uint _weight)
    public
    view
    returns (uint)
    {
        return required_essence.mul(_weight);
    }

    function totalVotesOf(address _voter)
    public
    view
    returns (uint weight, uint count)
    {
        return (totalVotes[_voter].weight, totalVotes[_voter].count);
    }

}
