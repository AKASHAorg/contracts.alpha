pragma solidity ^0.4.0;

import './ProfileController.sol';
import './ProfileStore.sol';
import './AkashaModule.sol';
import 'ens/contracts/ENS.sol';

// also has Registrar functionality
contract ProfileModule is AkashaModule {

    ENS ens;
    ProfileController controller;
    ProfileStore store;
    bytes32 rootNode;

    function ProfileModule(ENS _ens, bytes32 _rootNode) AkashaModule('profiles', 1)
    {
        ens = _ens;
        rootNode = _rootNode;
    }

    modifier only_subNode_owner(bytes32 subNode)
    {
        var node = sha3(rootNode, subNode);
        var currentOwner = ens.owner(node);

        require(currentOwner == 0 || currentOwner == msg.sender);
        _;
    }

    // change ENS address
    function setEns(address _ens)
    onlyOwner
    returns(bool)
    {
        ens = ENS(_ens);
        return true;
    }

    // AKASHA users can claim a subdomain *.${rootNode}.eth
    function register(bytes32 _subNode, address owner)
    only_subNode_owner(_subNode)
    returns(bool)
    {
        require(check_format(_subNode));
        ens.setSubnodeOwner(rootNode, _subNode, owner);
        return true;
    }

    // fk squatters
    function adminSetSubNode(bytes32 _subNode, address _newOwner)
    onlyOwner
    returns(bool)
    {
        require(check_format(_subNode));
        ens.setSubnodeOwner(rootNode, _subNode, _newOwner);
        return true;
    }

    // in case something goes wrong :D
    function changeRootOwner(address _newOwner)
    onlyOwner
    returns(bool)
    {
        ens.setOwner(rootNode, _newOwner);
        return true;
    }

    // change domain
    function setRootNode(bytes32 _newRoot)
    onlyOwner
    returns(bool)
    {
        rootNode = _newRoot;
    }

    function check_format(bytes32 _subNode)
    constant returns(bool)
    {
        // enforce alpha first
        if (_subNode[0] < 58) {
            return false;
        }

        for(uint8 i=0; i<_subNode.length; i++)
        {
            if(_subNode[i] == 0) break;

            // ^[a-z0-9]
            if(_subNode[i] > 122 || (_subNode[i]<97 && _subNode[i] > 57) || _subNode[i]<48)
            {
                return false;
            }
        }

        return i > 1;
    }

}
