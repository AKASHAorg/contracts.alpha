pragma solidity ^0.4.0;


import './ProfileResolver.sol';
import './AkashaModule.sol';
import 'ens/contracts/ENS.sol';
import 'ens/contracts/FIFSRegistrar.sol';


// also has Registrar functionality
contract ProfileRegistrar is AkashaModule {

    ENS public ens;

    ProfileResolver resolver;

    bytes32 public rootNode;

    event Register(bytes32 indexed label, uint indexed version);

    function ProfileRegistrar(ENS _ens, bytes32 _rootNode) public AkashaModule("profiles", 1)
    {
        ens = _ens;
        rootNode = _rootNode;
    }

    modifier only_subNode_owner(bytes32 subNode)
    {
        var node = keccak256(rootNode, subNode);
        var currentOwner = ens.owner(node);

        require(currentOwner == 0 || currentOwner == msg.sender);
        _;
    }

    // change ENS address
    function setEns(address _ens)
    public
    onlyOwner
    returns (bool)
    {
        ens = ENS(_ens);
        incrementVersion();
        return true;
    }

    function setResolver(address _resolver)
    public
    onlyOwner
    {
        resolver = ProfileResolver(_resolver);
    }

    // AKASHA users can claim a subdomain *.${rootNode}.eth
    //    function register(bytes32 _subNode, address owner)
    //    only_subNode_owner(_subNode)
    //    {
    //        require(check_format(_subNode));
    //        ens.setSubnodeOwner(rootNode, _subNode, owner);
    //    }

    function register(bytes32 _subNode, bool _enableDonations, bytes32 _hash, uint8 _fn, uint8 _digestSize)
    public
    only_subNode_owner(_subNode)
    returns (bool)
    {
        require(check_format(_subNode));

        ens.setSubnodeOwner(rootNode, _subNode, this);
        ens.setResolver(hash(_subNode), resolver);

        ens.setSubnodeOwner(rootNode, _subNode, msg.sender);
        resolver.registerHash(_subNode, hash(_subNode), msg.sender, _enableDonations, _hash, _fn, _digestSize);
        Register(_subNode, version);
        return true;
    }

    // fk squatters
    function adminSetSubNode(bytes32 _subNode, address _newOwner)
    public
    onlyOwner
    returns (bool)
    {
        require(check_format(_subNode));
        ens.setSubnodeOwner(rootNode, _subNode, _newOwner);
        return true;
    }

    // in case something goes wrong :D
    function changeRootOwner(address _newOwner)
    public
    onlyOwner
    returns (bool)
    {
        ens.setOwner(rootNode, _newOwner);
        incrementVersion();
        return true;
    }

    // change domain
    function setRootNode(bytes32 _newRoot)
    public
    onlyOwner
    returns (bool)
    {
        rootNode = _newRoot;
        incrementVersion();
        return true;
    }

    function check_format(bytes32 _subNode)
    public
    pure
    returns (bool)
    {
        // enforce alpha first
        //if (_subNode[0] < 58) {
        //   return false;
        //}

        for (uint8 i = 0; i < _subNode.length; i++)
        {
            if (_subNode[i] == 0) break;

            // ^[a-z0-9]
            if (_subNode[i] > 122 || (_subNode[i] < 97 && _subNode[i] > 57) || _subNode[i] < 48)
            {
                return false;
            }
        }

        return i > 1;
    }

    function hash(bytes32 _subNode)
    public
    view
    returns (bytes32 nameHash)
    {
        nameHash = keccak256(rootNode, _subNode);
    }
}
