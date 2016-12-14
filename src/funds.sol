pragma solidity ^0.4.6;
import './basemodule.sol';

contract Funds is BaseModule {

    bytes32 app_version;
    string release_notes;
    string app_repository;

    event Spend(address indexed to, uint amount);
    event UpdateVersion(bytes32 newVersion, string releaseNotes, uint blockNumber);
    event UpdateRepository(string repository, uint blockNumber);

    function withdraw(address consumer, uint amount) auth  {
        var sendValue = (amount < this.balance) ? amount : this.balance;
        if(!consumer.send(sendValue)){
            throw;
        }
        Spend(consumer, amount);
    }

    function setVersion(bytes32 newVersion, string releaseNotes) auth {
        app_version = newVersion;
        release_notes = releaseNotes;
        UpdateVersion(app_version, release_notes, block.number);
    }

    function setRepository(string repository) auth {
        app_repository = repository;
        UpdateRepository(app_repository, block.number);
    }

    function getAppState() constant returns(bytes32, string, string) {
        return (app_version, app_repository, release_notes);
    }

    function() payable {}
}