pragma solidity ^0.4.0;
import 'zeppelin-solidity/contracts/token/MintableToken.sol';
import 'zeppelin-solidity/contracts/token/PausableToken.sol';

contract AETH is MintableToken, PausableToken {
    string public name = "AKASHA Token";
    string public symbol = "AETH";
    uint8 public decimals = 18;
    enum AethState { Free, Bonded, Cycling }

    mapping(address => mapping(uint8 => uint256)) tokenRecords;

    function getTokenRecords(address _holder)
    public
    constant
    returns(uint256 _free, uint256 _bonded, uint256 _cycling)
    {
        _free = tokenRecords[_holder][uint8(AethState.Free)];
        _bonded = tokenRecords[_holder][uint8(AethState.Bonded)];
        _cycling = tokenRecords[_holder][uint8(AethState.Cycling)];
    }
}
