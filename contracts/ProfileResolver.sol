pragma solidity ^0.4.0;
import './Bundled.sol';
import "./IpfsHash.sol";
import './ResolverInterface.sol';
import 'ens/contracts/ENS.sol';

//@TODO: hash to name
contract ProfileResolver is Bundled {
    uint public totalProfiles;
    bool public disabled;
    ENS ens;
    struct Profile {
        IpfsHash.Multihash contentHash;
        address addr;
        bytes32 name;
    }

    mapping(bytes32 => Profile) profileList;
    mapping(bytes32 => bytes32) reverseRecords;

    bytes32 constant ADDR_REVERSE_NODE = 0x91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2;

    function ProfileResolver(ENS _ens, uint _totalProfiles)
    Bundled()
    {
        ens = _ens;
        totalProfiles = _totalProfiles;
    }

    modifier only_owner(bytes32 node) {
        require(ens.owner(node) == msg.sender);
        _;
    }

    // verify is this controller is in usage
    modifier notDisabled()
    {
        require(disabled == false);
        _;
    }

    // mark as disabled when migrating to a new controller
    function upgradeController()
    onlyModule
    returns(bool)
    {
        disabled = true;
        return true;
    }

    // register an ipfs hash
    function register(bytes32 _node, bytes32 _hash, uint8 _fn, uint8 _digestSize)
    onlyModule
    only_owner(_node)
    returns(uint)
    {
        require(IpfsHash.create(profileList[_node].contentHash, _hash, _fn, _digestSize));
        reverseRecords[sha3(ADDR_REVERSE_NODE, sha3HexAddress(msg.sender))] = _node;
        return totalProfiles++;
    }

    // remove extra data from profile at index
    function removeProfile(bytes32 _node)
    onlyModule
    notDisabled
    returns(bool)
    {
        totalProfiles--;
        delete profileList[_node];
        return true;
    }

    // update profile ipfs hash
    function setHash(bytes32 _node, bytes32 _hash, uint8 _fn, uint8 _digestSize)
    onlyModule
    notDisabled
    returns(bool)
    {
        require(IpfsHash.create(profileList[_node].contentHash, _hash, _fn, _digestSize));
        return true;
    }

    function hash(bytes32 _node)
    constant
    returns(uint8 _fn, uint8 _digestSize, bytes32 _hash)
    {
        (_fn, _digestSize, _hash) = IpfsHash.getHash(profileList[_node].contentHash);
    }

    function addr(bytes32 node)
    constant
    returns (address)
    {
        return profileList[node].addr;
    }

    function setAddr(bytes32 node, address addr)
    only_owner(node)
    {
        profileList[node].addr = addr;
    }

    // reverse eth address to ens node
    function reverse(address owner)
    constant
    returns(bytes32)
    {
        return reverseRecords[sha3(ADDR_REVERSE_NODE, sha3HexAddress(owner))];
    }

    /**
     * https://github.com/ethereum/ens/blob/master/contracts/ReverseRegistrar.sol#L145
     * @dev An optimised function to compute the sha3 of the lower-case
     *      hexadecimal representation of an Ethereum address.
     * @param addr The address to hash
     * @return The SHA3 hash of the lower-case hexadecimal encoding of the
     *         input address.
     */
    function sha3HexAddress(address addr)
    private
    returns (bytes32 ret)
    {
        addr; ret; // Stop warning us about unused variables
        assembly {
            let lookup := 0x3031323334353637383961626364656600000000000000000000000000000000
            let i := 40
        loop:
            i := sub(i, 1)
            mstore8(i, byte(and(addr, 0xf), lookup))
            addr := div(addr, 0x10)
            i := sub(i, 1)
            mstore8(i, byte(and(addr, 0xf), lookup))
            addr := div(addr, 0x10)
            jumpi(loop, i)
            ret := sha3(0, 40)
        }
    }
}
