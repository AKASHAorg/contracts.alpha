pragma solidity ^0.4.8;
import './BaseModule.sol';
import './Profile.sol';

contract Faucet is BaseModule {

    uint eth_amount = 100 finney;
    uint8 nr_of_claims = 10;
    uint delay_blocks = 30000; // starting from 30k

    struct Receipt {
        uint _blockNr;
        uint8 _nr;
    }
    mapping(address => Receipt) _claims;
    event Receive(address indexed profile, uint amount);

    function claim() onlyRegistered  {
        var myProfile = _controller.addressOfKey(msg.sender);
        var blockNr = _claims[myProfile]._blockNr + delay_blocks;
        var profileObj = Profile(myProfile);
        if(_claims[myProfile]._nr > nr_of_claims || blockNr > block.number){ throw;}
        if(this.balance < eth_amount){ throw;}
        if(!profileObj.sendTip.value(eth_amount)()){
            throw;
        }
        Receive(myProfile, eth_amount);
    }

    function getLastClaim(address profile)
    constant
    returns(uint blockNr)
    {
        return _claims[profile]._blockNr;
    }

    function canClaim(address profile)
    constant
    returns(bool)
    {
        var blockNr = _claims[profile]._blockNr + delay_blocks;
        return block.number > blockNr;
    }
    function setAmount(uint newAmount) auth {
        eth_amount = newAmount;
    }

    function setMaxClaims(uint8 limit) auth {
        nr_of_claims = limit;
    }

    function setTimeoutBlock(uint interval) auth {
        delay_blocks = interval;
    }

    function() payable {}
}