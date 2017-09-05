pragma solidity ^0.4.0;


import 'zeppelin-solidity/contracts/ownership/HasNoTokens.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import "./IpfsHash.sol";
import './token/Essence.sol';


contract Tags is HasNoEther, HasNoTokens {
    using SafeMath for uint256;

    address public entry;

    Essence essence;

    uint256 public total = 0;

    uint256 public minCollected = 1000;

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
    HasNoEther()
    HasNoTokens()
    {

    }

    modifier only_creator(bytes32 _name)
    {
        require(lists[sha3(msg.sender, _name)].creator == msg.sender);
        _;
    }

    modifier only_entry()
    {
        require(msg.sender == entry);
        _;
    }

    function setEntryAddress(address _entry)
    onlyOwner
    {
        entry = _entry;
    }

    function setEssence(Essence _essence)
    onlyOwner
    {
        essence = _essence;
    }

    function incrementTotalEntries(bytes32 _tag)
    only_entry
    {
        require(exists(_tag));
        tags[_tag].totalEntries = tags[_tag].totalEntries.add(1);
    }


    function adminAdd(bytes32 _tag)
    onlyOwner
    {
        require(createTag(_tag));
    }

    function add(bytes32 _tag)
    {
        require(essence.getCollectedEssence(msg.sender) >= minCollected);
        require(createTag(_tag));
    }

    function addFromEntry(bytes32 _tag, address _creator)
    only_entry
    returns (bool)
    {
        require(essence.getCollectedEssence(_creator) >= minCollected);
        require(createTag(_tag));
        return true;
    }

    function setMinCollected(uint256 _amount)
    onlyOwner
    {
        minCollected = _amount;
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
    {
        var listHash = sha3(msg.sender, _name);
        require(lists[listHash].creator == address(0x0));
        require(IpfsHash.create(lists[listHash].hash, _hash, _fn, _digestSize));
        lists[listHash].creator = msg.sender;
        listsCount[msg.sender] = listsCount[msg.sender].add(1);
        ListCreate(_name, msg.sender, listHash);
    }

    function total_lists(address _publisher)
    constant
    returns (uint256 _total)
    {
        _total = listsCount[_publisher];
    }

    function update_list(bytes32 _name, bytes32 _hash, uint8 _fn, uint8 _digestSize)
    only_creator(_name)
    {
        var listHash = sha3(msg.sender, _name);
        require(IpfsHash.create(lists[listHash].hash, _hash, _fn, _digestSize));
        ListUpdate(_name, msg.sender);
    }

    function list_exists(bytes32 _id)
    constant
    returns (bool)
    {
        return lists[_id].creator != address(0x0);
    }

    function list_creator(bytes32 _id)
    constant
    returns (address)
    {
        return lists[_id].creator;
    }

    function get_list(bytes32 _id)
    constant
    returns (address _creator, uint8 _fn, uint8 _digestSize, bytes32 _hash)
    {
        _creator = lists[_id].creator;
        (_fn, _digestSize, _hash) = IpfsHash.getHash(lists[_id].hash);
    }

    function get_list_publisher(bytes32 _name, address _publisher)
    constant
    returns (address _creator, uint8 _fn, uint8 _digestSize, bytes32 _hash)
    {
        var listHash = sha3(_publisher, _name);
        return get_list(listHash);
    }

    function exists(bytes32 _tag)
    constant returns (bool)
    {
        return tags[_tag].created;
    }

    //[a-z0-9---.]
    function check_format(bytes32 id)
    constant returns (bool)
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
