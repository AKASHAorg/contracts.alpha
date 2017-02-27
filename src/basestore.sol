pragma solidity ^0.4.9;
import "ds-whitelist/whitelist.sol";

// this contract will be used by all storage lvl contracts
contract BaseStore is DSWhitelist {
    function destroy() auth {
        selfdestruct(owner);
    }
}