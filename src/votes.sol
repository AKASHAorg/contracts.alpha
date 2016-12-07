pragma solidity ^0.4.6;
import './basemodule.sol';
import './entry.sol';
import './funds.sol';
import './faucet.sol';

contract Votes is BaseModule {
    using DLinked for DLinked.List;

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
         if(_votes[entryId]._vote[myProfile] != 0 || _entry.getLastVoteBlock(entryId) < block.number)
         {
            throw;
         }
          _votes[entryId]._vote[myProfile] = int8(weight);
          _votes[entryId]._score += int(weight);
          _votes[entryId]._index.insert(_votes[entryId]._id);
          _votes[entryId]._indexVote[_votes[entryId]._id] = myProfile;

         if(!deposit.send(fundAmount)) { throw;}
         if(!_funds.send(_voteFee)){ throw;}
         var totalSpent = fundAmount + _voteFee;
         if(totalSpent < msg.value) {
            if(!msg.sender.send(msg.value - totalSpent)){ throw;}
         }
         Vote(myProfile, entryId, _votes[entryId]._index.getSize(), _votes[entryId]._vote[myProfile]);
    }

    function downvote(uint8 weight, uint entryId)
    checkWeight(weight)
    onlyRegistered
    payable
    {
         var myProfile = _controller.addressOfKey(msg.sender);
         var fundAmount = _baseCost * uint(weight**2);
         _votes[entryId]._id++;
         if(_votes[entryId]._vote[myProfile] != 0 || _entry.getLastVoteBlock(entryId) < block.number)
         {
            throw;
         }
          _votes[entryId]._vote[myProfile] = int8(-weight);
          _votes[entryId]._score -= int(weight);
          _votes[entryId]._index.insert(_votes[entryId]._id);
          _votes[entryId]._indexVote[_votes[entryId]._id] = myProfile;

         if(!_faucet.send(fundAmount)) { throw;}
         if(!_funds.send(_voteFee)){ throw;}
         var totalSpent = fundAmount + _voteFee;
         if(totalSpent < msg.value) {
            if(!msg.sender.send(msg.value - totalSpent)){ throw;}
         }
         Vote(myProfile, entryId, _votes[entryId]._index.getSize(), _votes[entryId]._vote[myProfile]);

    }


    function getVoteCost(uint8 weight)
    constant returns(uint)
    {
        return _baseCost * uint(weight**2) + _voteFee;
    }

    function getVotesCount(uint entryId)
    constant returns(uint)
    {
        return _votes[entryId]._index.getSize();
    }

    function getFirstVoteId(uint entryId)
    constant returns(uint)
    {
        return _votes[entryId]._index.getFirst();
    }

    function getLastVoteId(uint entryId)
    constant returns(uint)
    {
        return _votes[entryId]._index.getLast();
    }

    function getNextVoteId(uint entryId, uint voteId)
    constant returns(uint)
    {
        return _votes[entryId]._index.getNext(voteId);
    }

    function getPrevVoteId(uint entryId, uint voteId)
    constant returns(uint)
    {
        return _votes[entryId]._index.getPrev(voteId);
    }

    function getVoteOf(uint entryId, uint voteId)
    constant returns(address profile, int8 score)
    {
        profile = _votes[entryId]._indexVote[voteId];
        score = _votes[entryId]._vote[profile];
    }

    function getVoteOfProfile(uint entryId, address profileAddress)
    constant returns(int8 weight)
    {
        return _votes[entryId]._vote[profileAddress];
    }

    function getScore(uint entryId)
    constant returns(int)
    {
        return _votes[entryId]._score;
    }

}