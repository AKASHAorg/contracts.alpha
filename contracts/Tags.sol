pragma solidity ^0.4.0;
import 'zeppelin-solidity/contracts/ownership/HasNoTokens.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import "./IpfsHash.sol";

contract Tags is HasNoEther, HasNoTokens {
    uint public total = 0;

    struct TagList {
        IpfsHash.Multihash hash;
        address creator;
    }

    mapping(bytes32 => bool) tag;
    mapping(bytes32 => TagList) lists;

    event TagCreate(bytes32 indexed tag);
    event ListCreate(bytes32 indexed name, address indexed publisher, bytes32 id);
    event ListUpdate(bytes32 indexed name);

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

    function add(bytes32 _tag)
    {
        if (!check_format(_tag) || exists(_tag))
        {
            throw;
        }
        TagCreate(_tag);
        tag[_tag] = true;
        total++;
    }

    function create_list(bytes32 _name, bytes32 _hash, uint8 _fn, uint8 _digestSize)
    {
        var listHash = sha3(msg.sender, _name);
        require(lists[listHash].creator == address(0x0));
        require(IpfsHash.create(lists[listHash].hash, _hash, _fn, _digestSize));
        lists[listHash].creator = msg.sender;
        ListCreate(_name, msg.sender, listHash);
    }

    function update_list(bytes32 _name, bytes32 _hash, uint8 _fn, uint8 _digestSize)
    only_creator(_name)
    {
        var listHash = sha3(msg.sender, _name);
        require(IpfsHash.create(lists[listHash].hash, _hash, _fn, _digestSize));
        ListUpdate(_name);
    }

    function get_list(bytes32 _id)
    constant
    returns(address _creator, uint8 _fn, uint8 _digestSize, bytes32 _hash)
    {
        _creator = lists[_id].creator;
        (_fn, _digestSize, _hash) = IpfsHash.getHash(lists[_id].hash);
    }

    function exists(bytes32 _tag)
    constant returns(bool)
    {
        return tag[_tag];
    }

    //[a-z0-9-_-.]
    function check_format(bytes32 id)
    constant returns(bool)
    {

        if(id[0] == 46 || id[0] == 95){
            return false;
        }

        for(uint8 i=0; i<id.length; i++)
        {
            if(id[i] == 0) break;

            if(id[i] > 122 || (id[i]<97 && id[i] > 57 && id[i] !=95) || (id[i]<48 && id[i]!=46))
            {
                return false;
            }
        }

        if(id[i - 1] == 46 || id[i - 1] == 95){
            return false;
        }

        return i > 1;
    }
}
