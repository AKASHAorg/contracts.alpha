pragma solidity ^0.4.0;


import './AETH.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoTokens.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';


contract Essence is HasNoEther, HasNoTokens {
    using SafeMath for uint256;
    // this is updated frequently by owner
    bytes32 currentHash;

    uint256 public transformFactor = 10^3;
    uint256 public minAmount = 10^21;

    AETH aeth;

    struct Pot {
    uint256 total;
    uint256 transformed;
    }
    struct Collect {
        uint256 karma;
        uint256 essence;
    }

    mapping (address => mapping (bytes32 => uint256)) balance;

    mapping (address => Collect) collected;

    mapping (address => bool) whitelist;

    mapping (bytes32 => Pot) hashBalance;

    event RefreshEssence(bytes32 newHash, uint256 totalToMint);

    event SpendMana(address indexed spender, bytes32 indexed hash, uint256 amount, uint256 total, bytes32 scope);

    event CollectEssence(address indexed receiver, uint256 amount, bytes32 action, bytes32 source);

    modifier onlyWhitelisted()
    {
        require(whitelist[msg.sender]);
        _;
    }

    function Essence()
    HasNoEther()
    HasNoTokens()
    {

    }

    function setAeth(AETH _aeth)
    onlyOwner
    returns (bool)
    {
        aeth = _aeth;
        return true;
    }

    function setMinAmount(uint256 _min)
    onlyOwner
    returns (bool)
    {
        minAmount = _min;
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

    function spendMana(address _initiator, uint256 _amount, bytes32 _scope)
    external
    onlyWhitelisted
    returns (bool)
    {
        uint256 totalBonded = aeth.bonded(_initiator);
        balance[_initiator][currentHash] = balance[_initiator][currentHash].add(_amount);

        assert(balance[_initiator][currentHash] <= totalBonded);

        SpendMana(_initiator, currentHash, _amount, balance[_initiator][currentHash], _scope);
        return true;
    }

    function mana(address _spender)
    constant
    returns (uint256 _total, uint256 _spent, uint256 _remaining)
    {
        _total = aeth.bonded(_spender);
        _spent = balance[_spender][currentHash];
        _remaining = _total.sub(_spent);
    }

    function collectFor(address _receiver, uint256 _amount, bytes32 _action, bytes32 _source)
    external
    onlyWhitelisted
    returns (bool)
    {
        uint256 obtainedEssence = _amount.div(10);
        collected[_receiver].karma = collected[_receiver].karma.add(_amount);
        collected[_receiver].essence = collected[_receiver].essence.add(obtainedEssence);
        CollectEssence(_receiver, _amount, _action, _source);
        return true;
    }

    function transformEssence(uint256 _amount)
    returns (bool)
    {
        require(_amount > minAmount);
        require(collected[msg.sender].essence >= _amount);
        hashBalance[currentHash].transformed = hashBalance[currentHash].transformed.add(_amount);
        assert(hashBalance[currentHash].total >= hashBalance[currentHash].transformed);
        collected[msg.sender].essence = collected[msg.sender].essence.sub(_amount);
        assert(aeth.transformKarma(msg.sender, _amount.div(transformFactor)));
    }

    function aethValueFrom(uint256 _collected)
    constant
    returns (uint256)
    {
        return _collected.div(transformFactor);
    }

    function getCollected(address _collector)
    constant
    returns (uint256 _karma, uint256 _essence)
    {
        return (collected[_collector].karma, collected[_collector].essence);
    }
}
