pragma solidity ^0.4.0;

import 'zeppelin-solidity/contracts/ownership/HasNoTokens.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import "./IpfsHash.sol";
import './token/Essence.sol';
import './Votes.sol';
import './Entries.sol';

contract Comments  is HasNoEther, HasNoTokens {
    using SafeMath for uint256;

    Entries entries;

    Essence essence;

    Votes votes;

    uint256 public required_essence = 20;

    uint256 public discount_every = 20000;

    event Publish(address indexed author, bytes32 indexed entryId, uint256 indexed parent, uint256 id);

    event Update(address indexed author, bytes32 indexed entryId, uint256 indexed id);

    struct Comment {
    uint parent;
    IpfsHash.Multihash hash;
    address author;
    bool deleted;
    uint date;
    }

    struct Record {
        uint256 nextId;
        mapping(uint256 => Comment) comment;
    }

    mapping(bytes32 => Record) commentList;

    function Comments()
    HasNoEther()
    HasNoTokens()
    {
    }

    function setEssence(Essence _essence)
    onlyOwner
    {
        essence = _essence;
    }

    function setVotes(Votes _votes)
    onlyOwner
    {
        votes = _votes;
    }

    function setEntries(Entries _entries)
    onlyOwner
    {
        entries = _entries;
    }

    function publish(bytes32 entryId, uint parent, bytes32 _hash, uint8 _fn, uint8 _digestSize)
    returns (bool)
    {
        require(IpfsHash.create(commentList[entryId].comment[commentList[entryId].nextId].hash, _hash, _fn, _digestSize));
        commentList[entryId].comment[commentList[entryId].nextId].author = msg.sender;
        commentList[entryId].comment[commentList[entryId].nextId].parent = parent;
        commentList[entryId].comment[commentList[entryId].nextId].date = now;
        commentList[entryId].nextId++;
        return true;
    }
}
