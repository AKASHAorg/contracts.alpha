pragma solidity ^0.4.0;


import 'zeppelin-solidity/contracts/ownership/HasNoTokens.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import "./IpfsHash.sol";
import './token/Essence.sol';
import './Votes.sol';
import './Entries.sol';


contract Comments is HasNoEther, HasNoTokens {
    using SafeMath for uint256;

    Entries entries;

    Essence essence;

    Votes votes;

    uint256 public required_essence = 2*10**18;

    uint256 public discount_every = 2*10**21;

    uint256 public voting_period = 1 years; // blocks

    mapping (address => uint) totalAddressComments;

    event Publish(address indexed author, bytes32 indexed entryId, bytes32 indexed parent, bytes32 id);

    event Update(address indexed author, bytes32 indexed entryId, bytes32 indexed id);

    struct Comment {
    bytes32 parent;
    IpfsHash.Multihash hash;
    address author;
    bool deleted;
    uint date;
    }

    struct Record {
    uint256 nextId;
    mapping (bytes32 => Comment) comment;
    }

    mapping (bytes32 => Record) commentList;

    function Comments()
    HasNoEther()
    HasNoTokens()
    {
    }

    function setEssence(Essence _essence)
    public
    onlyOwner
    {
        essence = _essence;
    }

    function setVotes(Votes _votes)
    public
    onlyOwner
    {
        votes = _votes;
    }

    function setVotingPeriod(uint256 _period)
    public
    onlyOwner
    returns (bool)
    {
        voting_period = _period;
        return true;
    }

    function setRequiredEssence(uint256 _amount)
    public
    onlyOwner
    returns (bool)
    {
        required_essence = _amount;
        return true;
    }

    function setEntries(Entries _entries)
    public
    onlyOwner
    {
        entries = _entries;
    }

    function calcPublishCost(address _author)
    internal
    returns (uint _amount)
    {
        uint256 essenceAmount;
        (, essenceAmount) = essence.getCollected(_author);
        uint256 discount = essenceAmount.div(discount_every);
        if (discount >= required_essence) {
            return 1;
        }
        return required_essence.sub(discount);
    }

    function publish(bytes32 _entryId, address _entryAuthor, bytes32 _parent, bytes32 _hash, uint8 _fn, uint8 _digestSize)
    public
    returns (bool)
    {
        require(entries.exists(_entryAuthor, _entryId));
        require(essence.spendMana(msg.sender, calcPublishCost(msg.sender), 0x636f6d6d656e743a7075626c697368));
        if (_parent!=bytes32(0x0)) {
            assert(commentList[_entryId].comment[_parent].date > 0);
        }
        bytes32 commentId = keccak256(_entryId, commentList[_entryId].nextId, msg.sender);
        uint256 endPeriod = voting_period.add(now);
        require(IpfsHash.create(commentList[_entryId].comment[commentId].hash, _hash, _fn, _digestSize));
        commentList[_entryId].comment[commentId].author = msg.sender;
        commentList[_entryId].comment[commentId].parent = _parent;
        commentList[_entryId].comment[commentId].date = now;
        require(votes.registerResource(commentId, endPeriod));
        commentList[_entryId].nextId++;
        totalAddressComments[msg.sender]++;
        Publish(msg.sender, _entryId, _parent, commentId);
        return true;
    }

    function edit(bytes32 _entryId, address _entryAuthor, bytes32 _commentId, bytes32 _hash, uint8 _fn, uint8 _digestSize)
    public
    returns (bool)
    {
        require(entries.exists(_entryAuthor, _entryId));
        require(commentList[_entryId].comment[_commentId].author == msg.sender);
        require(IpfsHash.create(commentList[_entryId].comment[_commentId].hash, _hash, _fn, _digestSize));
        Update(msg.sender, _entryId, _commentId);
        return true;
    }

    function deleteComment(bytes32 _entryId, address _entryAuthor, bytes32 _commentId)
    public
    returns (bool)
    {
        require(entries.exists(_entryAuthor, _entryId));
        require(commentList[_entryId].comment[_commentId].author == msg.sender);
        delete commentList[_entryId].comment[_commentId].hash;
        commentList[_entryId].comment[_commentId].deleted = true;
        Update(msg.sender, _entryId, _commentId);
        return true;
    }

    function getComment(bytes32 _entryId, bytes32 _commentId)
    constant
    returns (bytes32 parent, address author, bool deleted, uint256 publishDate, uint8 _fn, uint8 _digestSize, bytes32 _hash)
    {
        parent = commentList[_entryId].comment[_commentId].parent;
        author = commentList[_entryId].comment[_commentId].author;
        deleted = commentList[_entryId].comment[_commentId].deleted;
        publishDate = commentList[_entryId].comment[_commentId].date;
        (_fn, _digestSize, _hash) = IpfsHash.getHash(commentList[_entryId].comment[_commentId].hash);
    }

    function exists(bytes32 _entryId, bytes32 _commentId)
    constant
    returns (bool)
    {
        return (commentList[_entryId].comment[_commentId].author != address(0x0) && !commentList[_entryId].comment[_commentId].deleted);
    }

    function commentAuthor(bytes32 _entryId, bytes32 _commentId)
    constant
    returns (address _author)
    {
        _author = commentList[_entryId].comment[_commentId].author;
    }

    function isDeleted(bytes32 _entryId, bytes32 _commentId)
    constant
    returns (bool _deleted)
    {
        _deleted = commentList[_entryId].comment[_commentId].deleted;
    }

    function totalComments(bytes32 _entryId)
    constant
    returns (uint256 _total)
    {
        _total = commentList[_entryId].nextId;
    }

    function totalCommentsOf(address _publisher)
    constant
    returns (uint)
    {
        return totalAddressComments[_publisher];
    }
}
