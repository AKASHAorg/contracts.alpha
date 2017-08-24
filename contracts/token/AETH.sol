pragma solidity ^0.4.0;
import 'zeppelin-solidity/contracts/token/MintableToken.sol';
import 'zeppelin-solidity/contracts/token/PausableToken.sol';

contract AETH is MintableToken, PausableToken {
    string public name = "AKASHA Token";
    string public symbol = "AETH";
    uint8 public decimals = 18;
    enum AethState { Bonded, Cycling, Free }

    event Transition(address owner, AethState state, uint256 value);

    mapping(address => mapping(uint8 => uint256)) tokenRecords;

    function bondAeth(uint256 _amount)
    returns(bool)
    {
        balances[msg.sender] = balances[msg.sender].sub(_amount);
        tokenRecords[msg.sender][uint8(AethState.Bonded)] = tokenRecords[msg.sender][uint8(AethState.Bonded)].add(_amount);
        Transition(msg.sender, AethState.Bonded, _amount);
        return true;
    }

    function cycleAeth(uint256 _amount)
    returns(bool)
    {
        tokenRecords[msg.sender][uint8(AethState.Bonded)] = tokenRecords[msg.sender][uint8(AethState.Bonded)].sub(_amount);
        tokenRecords[msg.sender][uint8(AethState.Cycling)] = tokenRecords[msg.sender][uint8(AethState.Cycling)].add(_amount);
        Transition(msg.sender, AethState.Cycling, _amount);
        return true;
    }

    function freeAeth(uint256 _amount)
    returns(bool)
    {
        tokenRecords[msg.sender][uint8(AethState.Cycling)] = tokenRecords[msg.sender][uint8(AethState.Cycling)].sub(_amount);
        balances[msg.sender] = balances[msg.sender].add(_amount);
        Transition(msg.sender, AethState.Free, _amount);
        return true;
    }

    function bonded(address _holder)
    public
    constant
    returns(uint256 _bonded)
    {
        _bonded = tokenRecords[_holder][uint8(AethState.Bonded)];
    }

    function cycling(address _holder)
    public
    constant
    returns(uint256 _cycling)
    {
        _cycling = tokenRecords[_holder][uint8(AethState.Cycling)];
    }

    function getTokenRecords(address _holder)
    public
    constant
    returns(uint256 _free, uint256 _bonded, uint256 _cycling)
    {
        _free = balances[_holder];
        _bonded = tokenRecords[_holder][uint8(AethState.Bonded)];
        _cycling = tokenRecords[_holder][uint8(AethState.Cycling)];
    }
}
