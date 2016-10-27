pragma solidity ^0.4.3;
import "ds-auth/auth.sol";

// this contract will be used by all storage lvl contracts
contract BaseStore is DSAuth {
    function destroy() auth {
        selfdestruct(owner);
    }
}