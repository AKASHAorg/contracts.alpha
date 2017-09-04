pragma solidity ^0.4.0;


import './AETH.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoTokens.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';


contract Essence is HasNoEther, HasNoTokens {
    using SafeMath for uint256;
    // this is updated frequently by owner
    bytes32 currentHash;
    uint256 public transformFactor = 1000;

    AETH aeth;

    struct Pot {
    uint256 total;
    uint256 transformed;
    }

    mapping (address => mapping (bytes32 => uint256)) balance;

    mapping (address => uint256) collectedEssence; // some kind of reputation

    mapping (address => bool) whitelist;

    mapping (bytes32 => Pot) hashBalance;

    event RefreshEssence(bytes32 newHash, uint256 totalToMint);

    event SpendEssence(address indexed spender, bytes32 indexed hash, uint256 amount, uint256 total, bytes32 scope);

    event CollectEssence(address indexed receiver, uint256 amount, bool isNegative);

    modifier onlyWhitelisted()
    {
        require(whitelist[msg.sender]);
        _;
    }

    function Essence(AETH _aeth)
    HasNoEther()
    HasNoTokens()
    {
        aeth = _aeth;
    }

    function newHash(bytes32 _hash, uint256 _total)
    onlyOwner
    returns (bool)
    {
        currentHash = _hash;
        hashBalance[currentHash].total = _total;
        RefreshEssence(currentHash, _total);
        return true;
    }

    function setFactor(uint256 _newFactor)
    onlyOwner
    returns (bool)
    {
        transformFactor = _newFactor;
    }

    function addToWhiteList(address _contract)
    onlyOwner
    returns (bool)
    {
        whitelist[_contract] = true;
        return true;
    }

    function removeWhitelisted(address _contract)
    onlyOwner
    returns (bool)
    {
        require(whitelist[_contract]);
        delete whitelist[_contract];
        return true;
    }

    function spendEssence(address _initiator, uint256 _amount, bytes32 _scope)
    external
    onlyWhitelisted
    returns (bool)
    {
        uint256 totalBonded = aeth.bonded(_initiator);
        balance[_initiator][currentHash] = balance[_initiator][currentHash].add(_amount);

        assert(balance[_initiator][currentHash] <= totalBonded);

        SpendEssence(_initiator, currentHash, _amount, balance[_initiator][currentHash], _scope);
        return true;
    }

    function essence(address _spender)
    returns (uint256 _total, uint256 _spent, uint256 _remaining)
    {
        _total = aeth.bonded(_spender);
        _spent = balance[_spender][currentHash];
        _remaining = _total.sub(_spent);
    }

    function collectFor(address _receiver, uint256 _amount, bool _negative)
    external
    onlyWhitelisted
    returns (bool)
    {
        // must figure out how to enforce collection of negative
        if (_negative && collectedEssence[_receiver] < _amount) {
            return false;
        }
        collectedEssence[_receiver] = _negative ? collectedEssence[_receiver].sub(_amount) : collectedEssence[_receiver].add(_amount);
        CollectEssence(_receiver, _amount, _negative);
        return true;
    }

    function transformKarma(uint256 _amount)
    returns (bool)
    {
        require(_amount > 0);
        require(collectedEssence[msg.sender] >= _amount);
        hashBalance[currentHash].transformed = hashBalance[currentHash].transformed.add(_amount);
        assert(hashBalance[currentHash].total >= hashBalance[currentHash].transformed);
        collectedEssence[msg.sender] = collectedEssence[msg.sender].sub(_amount);
        assert(aeth.transformEssence(msg.sender, _amount.div(transformFactor)));
    }

    function aethValue(uint256 _collected)
    constant
    returns(uint256)
    {
        return _collected.div(transformFactor);
    }

    function getCollectedEssence(address _collector)
    constant
    returns(uint256)
    {
        return collectedEssence[_collector];
    }


}
