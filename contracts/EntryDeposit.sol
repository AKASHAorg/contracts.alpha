pragma solidity ^0.4.8;
import "./BaseStore.sol";

contract EntryDeposit is BaseStore {

    function destroy(address receiver) auth {
        selfdestruct(receiver);
    }

    function() payable  {}

}