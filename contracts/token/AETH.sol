pragma solidity ^0.4.0;


import 'zeppelin-solidity/contracts/token/MintableToken.sol';
import 'zeppelin-solidity/contracts/token/PausableToken.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './Essence.sol';
import '../ProfileResolver.sol';


contract AETH is MintableToken, PausableToken {
    string public name = "AKASHA Token";

    string public symbol = "AETH";

    uint8 public decimals = 18;

    uint256 public lockTime = 7 days;

    Essence essence;

    ProfileResolver resolver;

    enum AethState {Bonded, Cycling, Free}

    event Transition(address owner, AethState state, uint256 value);

    event Donate(address indexed from, address indexed to, uint256 aeth, uint256 eth, string extraData);

    struct CyclingState {
    uint256 amount;
    uint256 unlockDate;
    }

    struct CyclingStates {
    CyclingState[32] states;
    uint8 lastFreed;
    }

    mapping (address => mapping (uint8 => uint256)) tokenRecords;

    mapping (address => CyclingStates) cycles;

    modifier fromEssence()
    {
        require(msg.sender == address(essence));
        _;
    }

    function setEssence(Essence _essence)
    public
    onlyOwner
    {
        essence = _essence;
    }

    function setResolver(ProfileResolver _resolver)
    public
    onlyOwner
    {
        resolver = _resolver;
    }

    function setLockTime(uint256 _time)
    public
    onlyOwner
    {
        lockTime = _time;
    }


    function bondAeth(uint256 _amount)
    public
    returns (bool)
    {
        assert(balances[msg.sender] >= _amount);
        balances[msg.sender] = balances[msg.sender].sub(_amount);
        tokenRecords[msg.sender][uint8(AethState.Bonded)] = tokenRecords[msg.sender][uint8(AethState.Bonded)].add(_amount);
        Transfer(msg.sender, 0x0, _amount);
        Transition(msg.sender, AethState.Bonded, _amount);
        return true;
    }

    function cycleAeth(uint256 _amount)
    public
    returns (bool)
    {
        require(_amount > 0);
        assert(cycles[msg.sender].lastFreed < 32);
        tokenRecords[msg.sender][uint8(AethState.Bonded)] = tokenRecords[msg.sender][uint8(AethState.Bonded)].sub(_amount);
        tokenRecords[msg.sender][uint8(AethState.Cycling)] = tokenRecords[msg.sender][uint8(AethState.Cycling)].add(_amount);
        var state = CyclingState({amount : _amount, unlockDate : now + lockTime});
        cycles[msg.sender].states[cycles[msg.sender].lastFreed] = state;

        if (cycles[msg.sender].lastFreed == 31) {
            cycles[msg.sender].lastFreed = 0;
        }
        else {
            cycles[msg.sender].lastFreed++;
        }
        var found = false;
        while (cycles[msg.sender].lastFreed < 32)
        {
            if (cycles[msg.sender].states[cycles[msg.sender].lastFreed].unlockDate == 0) {
                found = true;
                break;
            }
            cycles[msg.sender].lastFreed++;
        }

        Transition(msg.sender, AethState.Cycling, _amount);
        return true;
    }

    function freeAeth()
    public
    returns (bool)
    {
        uint256 currentAmount;
        for (uint8 i = 0; i < 32; i++) {
            if (cycles[msg.sender].states[i].unlockDate < now && cycles[msg.sender].states[i].amount > 0) {
                currentAmount = cycles[msg.sender].states[i].amount;
                tokenRecords[msg.sender][uint8(AethState.Cycling)] = tokenRecords[msg.sender][uint8(AethState.Cycling)].sub(currentAmount);
                balances[msg.sender] = balances[msg.sender].add(currentAmount);
                delete cycles[msg.sender].states[i];
                // must refactor this
                cycles[msg.sender].lastFreed = i;
                Transition(msg.sender, AethState.Free, currentAmount);
            }
        }
        return true;
    }

    function consumeEssence(address _to, uint256 _amount)
    fromEssence
    external
    returns (bool)
    {
        totalSupply = totalSupply.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        Mint(_to, _amount);
        Transfer(0x0, _to, _amount);
        return true;
    }

    function getCyclingStatesNr(address _holder, uint256 _fromDate)
    public
    constant
    returns (uint8 _total, uint8 _available)
    {
        uint8 total = 0;
        uint8 available = 0;

        for (uint8 i = 0; i < 32; i++) {
            if (cycles[_holder].states[i].amount > 0) {
                total++;
                if (cycles[_holder].states[i].unlockDate <= _fromDate) {
                    available++;
                }
            }
        }

        return (total, available);
    }

    function getCyclingState(address _holder, uint8 _fromIndex)
    public
    constant
    returns (uint256 _amount, uint256 _unlockDate, uint8 _index)
    {
        for (uint8 i = _fromIndex; i < 32; i++) {
            if (cycles[_holder].states[i].amount > 0) {
                _amount = cycles[_holder].states[i].amount;
                _unlockDate = cycles[_holder].states[i].unlockDate;
                _index = i;
                break;
            }
        }
    }

    function bonded(address _holder)
    public
    constant
    returns (uint256 _bonded)
    {
        _bonded = tokenRecords[_holder][uint8(AethState.Bonded)];
    }

    function cycling(address _holder)
    public
    constant
    returns (uint256 _cycling)
    {
        _cycling = tokenRecords[_holder][uint8(AethState.Cycling)];
    }

    function getTokenRecords(address _holder)
    public
    constant
    returns (uint256 _free, uint256 _bonded, uint256 _cycling)
    {
        _free = balances[_holder];
        _bonded = tokenRecords[_holder][uint8(AethState.Bonded)];
        _cycling = tokenRecords[_holder][uint8(AethState.Cycling)];
    }

    function donate(address _to, uint256 _aethAmount, string _extraData)
    public
    payable
    returns (bool)
    {
        require(_aethAmount > 0 || msg.value > 0);
        bytes32 resolved = resolver.reverse(_to);
        if (resolved != bytes32(0x0)) {
            // explicit opt for receiving donations
            require(resolver.donationsEnabled(resolved));
        }
        if (_aethAmount > 0) {
            require(transfer(_to, _aethAmount));
        }

        if (msg.value > 0) {
            require(_to.send(msg.value));
        }
        Donate(msg.sender, _to, _aethAmount, msg.value, _extraData);
    }

}
