pragma solidity ^0.4.4;
import 'basemodule.sol';
import 'entry.sol';
import 'funds.sol';

contract Votes is BaseModule {

    uint _voteFee = 100 szabo;
    uint _baseCost = 1 finney;

    address _funds;
    Entry _entry;
    event Vote(uint indexed profile, uint indexed entry, uint indexed voteCount, uint8 weight);

    struct VoteStore {
        int _score;
        mapping(address => int8) _vote;
        mapping(uint => address) _indexVote;
        DLinked.List _index;
    }

    mapping(uint => VoteStore) _votes;

    modifier checkWeight(uint8 weight) {
        if(weight<1 || weight>10){ throw;}
        if(getVoteCost(weight)> msg.value){ throw;}
        _;

    }

    function setFundsAddress(address funds) auth {
        _funds = funds;
    }

    function setEntriesAddress(address entries) auth{
        _entry = Entry(entries);
    }

    function upvote(uint8 weight, uint entryId)
    checkWeight(weight)
    onlyRegistered
    payable
    {
         var myProfile = _controller.addressOfKey(msg.sender);
         var deposit = _entry.getEntryFund(entryId);
         var fundAmount = baseCost * uint(weight**2);
         if(_votes[entryId]._vote[myProfile] != 0 || deposit == address(0x0) || !_entry.isEditable(entryId))
         {
            throw;
         }
          _votes[entryId]._vote[myProfile] = weight;
          _votes[entryId]._score += int(weight);

         if(!deposit.send(fundAmount)) { throw;}
         if(!_funds.send(_voteFee)){ throw;}
         var totalSpent = fundAmount + _voteFee;
         if(totalSpent < msg.value) {
            if(!msg.sender.send(msg.value - totalSpent)){ throw;}
         }
         Vote();

    }

    function downvote(uint8 weight, uint entryId)
    checkWeight(weight)
    onlyRegistered
    payable
    {
         var myProfile = _controller.addressOfKey(msg.sender);
         if(_votes[entryId]._vote[myProfile] != 0){ throw;}

    }


    function getVoteCost(uint8 weight)
    constant returns(uint)
    {
        return baseCost * uint(weight**2) + _voteFee;
    }

}