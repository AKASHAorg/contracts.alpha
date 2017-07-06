pragma solidity ^0.4.0;
import 'zeppelin-solidity/contracts/token/MintableToken.sol';
import 'zeppelin-solidity/contracts/token/PausableToken.sol';

contract AETH is MintableToken, PausableToken {
    string public name = "AKASHA Token";
    string public symbol = "AETH";
    uint8 public decimals = 18;
}
