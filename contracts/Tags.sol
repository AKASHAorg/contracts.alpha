pragma solidity ^0.4.18;
pragma experimental ABIEncoderV2;

import 'zeppelin-solidity/contracts/ownership/HasNoTokens.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import "./IpfsHash.sol";
import './Entries.sol';
import './token/Essence.sol';
import './Votes.sol';


contract Tags is HasNoEther, HasNoTokens {
    using SafeMath for uint256;

    Entries entry;

    Essence essence;

    Votes votes;

    uint256 public total = 0;

    uint256 public minCollected = 10**21;

    struct TagList {
    IpfsHash.Multihash hash;
    address creator;
    }

    struct Tag {
    uint256 totalEntries;
    bool created;
    }

    mapping (bytes32 => Tag) tags;

    mapping (bytes32 => TagList) lists;

    mapping (address => uint256) listsCount;

    event TagCreate(bytes32 indexed tag);

    event ListCreate(bytes32 indexed name, address indexed publisher, bytes32 id);

    event ListUpdate(bytes32 indexed name, address indexed publisher);

    function Tags()
    public
    HasNoEther()
    HasNoTokens()
    {

    }

    modifier only_creator(bytes32 _name)
    {
        require(lists[keccak256(msg.sender, _name)].creator == msg.sender);
        _;
    }

    modifier only_entry()
    {
        require(msg.sender == address(entry));
        _;
    }

    function setEntry(Entries _entry)
    public
    onlyOwner
    {
        entry = _entry;
    }

    function setEssence(Essence _essence)
    public
    onlyOwner
    {
        essence = _essence;
    }

    function setVotesAddress(address _votes)
    public
    onlyOwner
    returns (bool)
    {
        votes = Votes(_votes);
        return true;
    }

    function incrementTotalEntries(bytes32 _tag)
    public
    only_entry
    {
        require(exists(_tag));
        tags[_tag].totalEntries = tags[_tag].totalEntries.add(1);
    }

    // for migration purpose only
    function adminAdd(bytes32[32] _tags)
    public
    onlyOwner
    {
        for (uint8 i = 0; i < _tags.length; i++)
        {
            if(_tags[i] == bytes32(0x0)) {
                continue;
            }
            require(createTag(_tags[i]));
        }
    }

    function add(bytes32 _tag)
    public
    {
        uint256 karma;
        (karma, ) = essence.getCollected(msg.sender);
        require(karma >= minCollected);
        require(createTag(_tag));
    }

    function addFromEntry(bytes32 _tag, address _creator)
    public
    only_entry
    returns (bool)
    {
        uint256 karma;
        (karma, ) = essence.getCollected(_creator);
        require(karma >= minCollected);
        require(createTag(_tag));
        return true;
    }

    function setMinCollected(uint256 _amount)
    public
    onlyOwner
    {
        minCollected = _amount;
    }

    function canCreate(address _creator)
    public
    view
    returns (bool)
    {
        uint256 karma;
        (karma, ) = essence.getCollected(_creator);
        return (karma >= minCollected);
    }

    function createTag(bytes32 _tag)
    internal
    returns (bool)
    {
        require(check_format(_tag));
        require(!exists(_tag));
        TagCreate(_tag);
        tags[_tag].created = true;
        total = total.add(1);
        return true;
    }

    function create_list(bytes32 _name, bytes32 _hash, uint8 _fn, uint8 _digestSize)
    public
    {
        require(canCreate(msg.sender));
        var listHash = keccak256(msg.sender, _name);
        require(lists[listHash].creator == address(0x0));
        require(IpfsHash.create(lists[listHash].hash, _hash, _fn, _digestSize));
        lists[listHash].creator = msg.sender;
        listsCount[msg.sender] = listsCount[msg.sender].add(1);
        require(votes.registerResource(listHash, 0));
        ListCreate(_name, msg.sender, listHash);
    }

    function total_lists(address _publisher)
    public
    view
    returns (uint256 _total)
    {
        _total = listsCount[_publisher];
    }

    function update_list(bytes32 _name, bytes32 _hash, uint8 _fn, uint8 _digestSize)
    public
    only_creator(_name)
    {
        var listHash = keccak256(msg.sender, _name);
        require(IpfsHash.create(lists[listHash].hash, _hash, _fn, _digestSize));
        ListUpdate(_name, msg.sender);
    }

    function list_exists(bytes32 _id)
    public
    view
    returns (bool)
    {
        return lists[_id].creator != address(0x0);
    }

    function list_creator(bytes32 _id)
    public
    view
    returns (address)
    {
        return lists[_id].creator;
    }

    function get_list(bytes32 _id)
    public
    view
    returns (address _creator, uint8 _fn, uint8 _digestSize, bytes32 _hash)
    {
        _creator = lists[_id].creator;
        (_fn, _digestSize, _hash) = IpfsHash.getHash(lists[_id].hash);
    }

    function get_list_publisher(bytes32 _name, address _publisher)
    public
    view
    returns (address _creator, uint8 _fn, uint8 _digestSize, bytes32 _hash)
    {
        var listHash = keccak256(_publisher, _name);
        return get_list(listHash);
    }

    function exists(bytes32 _tag)
    public
    view
    returns (bool)
    {
        return tags[_tag].created;
    }

    function totalEntries(bytes32 _tag)
    public
    view
    returns(uint _total)
    {
        _total = tags[_tag].totalEntries;
    }

    //[a-z0-9---.]
    function check_format(bytes32 id)
    public
    pure
    returns (bool)
    {

        if (id[0] == 46 || id[0] == 95) {
            return false;
        }

        for (uint8 i = 0; i < id.length; i++)
        {
            if (id[i] == 0) break;

            if (id[i] > 122 || (id[i] < 97 && id[i] > 57) || (id[i] < 48 && id[i] != 46 && id[i] != 45))
            {
                return false;
            }
        }

        if (id[i - 1] == 46 || id[i - 1] == 95) {
            return false;
        }

        return i > 1;
    }
}
