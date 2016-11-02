pragma solidity ^0.4.4;
import './basemodule.sol';
import './entry.sol';
import './funds.sol';
import './faucet.sol';

contract Votes is BaseModule {

    uint _voteFee = 100 szabo;
    uint _baseCost = 1 finney;

    address _funds;
    Entry _entry;
    address _faucet;

    event Vote(address indexed profile, uint indexed entry, uint indexed voteCount, int8 weight);

    struct VoteStore {
        int _score;
        uint _id;
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

    function setFaucetAddress(address faucet) auth {
        _faucet = faucet;
    }

    function upvote(uint8 weight, uint entryId)
    checkWeight(weight)
    onlyRegistered
    payable
    {
         var myProfile = _controller.addressOfKey(msg.sender);
         var deposit = _entry.getEntryFund(entryId);
         var fundAmount = _baseCost * uint(weight**2);
         _votes[entryId]._id++;
         if(_votes[entryId]._vote[myProfile] != 0 || deposit == address(0x0) || !_entry.isEditable(entryId))
         {
            throw;
         }
          _votes[entryId]._vote[myProfile] = int8(weight);
          _votes[entryId]._score += int(weight);
          DLinked.insert(_votes[entryId]._index, _votes[entryId]._id);
          _votes[entryId]._indexVote[_votes[entryId]._id] = myProfile;

         if(!deposit.send(fundAmount)) { throw;}
         if(!_funds.send(_voteFee)){ throw;}
         var totalSpent = fundAmount + _voteFee;
         if(totalSpent < msg.value) {
            if(!msg.sender.send(msg.value - totalSpent)){ throw;}
         }
         Vote(myProfile, entryId, DLinked.size(_votes[entryId]._index), _votes[entryId]._vote[myProfile]);
    }

    function downvote(uint8 weight, uint entryId)
    checkWeight(weight)
    onlyRegistered
    payable
    {
         var myProfile = _controller.addressOfKey(msg.sender);
         var fundAmount = _baseCost * uint(weight**2);
         _votes[entryId]._id++;
         if(_votes[entryId]._vote[myProfile] != 0 ||  !_entry.isEditable(entryId))
         {
            throw;
         }
          _votes[entryId]._vote[myProfile] = int8(-weight);
          _votes[entryId]._score -= int(weight);
          DLinked.insert(_votes[entryId]._index, _votes[entryId]._id);
          _votes[entryId]._indexVote[_votes[entryId]._id] = myProfile;

         if(!_faucet.send(fundAmount)) { throw;}
         if(!_funds.send(_voteFee)){ throw;}
         var totalSpent = fundAmount + _voteFee;
         if(totalSpent < msg.value) {
            if(!msg.sender.send(msg.value - totalSpent)){ throw;}
         }
         Vote(myProfile, entryId, DLinked.size(_votes[entryId]._index), _votes[entryId]._vote[myProfile]);

    }


    function getVoteCost(uint8 weight)
    constant returns(uint)
    {
        return _baseCost * uint(weight**2) + _voteFee;
    }

    function getVotesCount(uint entryId)
    constant returns(uint)
    {
        return DLinked.size(_votes[entryId]._index);
    }

    function getFirstVoteId(uint entryId)
    constant returns(uint)
    {
        return DLinked.first(_votes[entryId]._index);
    }

    function getLastVoteId(uint entryId)
    constant returns(uint)
    {
        return DLinked.last(_votes[entryId]._index);
    }

    function getNextVoteId(uint entryId, uint voteId)
    constant returns(uint)
    {
        return DLinked.next(_votes[entryId]._index, voteId);
    }

    function getPrevVoteId(uint entryId, uint voteId)
    constant returns(uint)
    {
        return DLinked.prev(_votes[entryId]._index, voteId);
    }

}