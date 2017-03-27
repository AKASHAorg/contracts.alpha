pragma solidity ^0.4.8;
import './basemodule.sol';

contract Funds is BaseModule {

    event Spend(address indexed to, uint amount);

    function withdraw(address consumer, uint amount) auth  {
        var sendValue = (amount < this.balance) ? amount : this.balance;
        if(!consumer.send(sendValue)){
            throw;
        }
        Spend(consumer, amount);
    }

    function() payable {}
}