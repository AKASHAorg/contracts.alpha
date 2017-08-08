pragma solidity ^0.4.0;
import './Bundled.sol';
import "./IpfsHash.sol";
import './ProfileStore.sol';

contract ProfileController is Bundled {
    uint public currentIndex;
    uint public totalProfiles;
    bool public disabled;

    struct ProfileExtra {
        IpfsHash.Multihash hash;
        bool disableTips;
    }

    mapping(uint => ProfileExtra) profileList;

    function ProfileController(address _owner, uint _startIndex, uint _totalProfiles)
    Bundled(_owner)
    {
        currentIndex = _startIndex;
        totalProfiles = _totalProfiles;
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
    }

    // register an ipfs hash
    function register(bytes32 _hash, uint8 _fn, uint8 _digestSize, bool _disableTips)
    onlyModule
    notDisabled
    returns(uint)
    {
        require(IpfsHash.create(profileList[currentIndex].hash, _hash, _fn, _digestSize));
        profileList[currentIndex].disableTips = _disableTips;
        totalProfiles++;
        return currentIndex++;
    }

    // update profile ipfs hash
    function updateHash(uint _index, bytes32 _hash, uint8 _fn, uint8 _digestSize)
    onlyModule
    notDisabled
    returns(bool)
    {
        require(IpfsHash.create(profileList[_index].hash, _hash, _fn, _digestSize));
        return true;
    }

    // enable/disable to receive tips
    function toggleTips(uint _index, bool _disableTips)
    onlyModule
    notDisabled
    returns(bool)
    {
        profileList[_index].disableTips = _disableTips;
        return true;
    }

    // remove extra data from profile at index
    function removeProfile(uint _index)
    onlyModule
    notDisabled
    returns(bool)
    {
        totalProfiles--;
        delete profileList[_index];
        return true;
    }

    function getProfileData(uint _index)
    constant
    returns(uint8 _fn, uint8 _digestSize, bytes32 _hash)
    {
        (_fn, _digestSize, _hash) = IpfsHash.getHash(profileList[_index].hash);
    }
}
