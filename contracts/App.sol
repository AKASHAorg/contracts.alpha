pragma solidity ^0.4.8;
import './BaseStore.sol';

contract App is BaseStore{

    bytes32 public app_version;
    string public release_notes;
    string public app_repository;

    event UpdateVersion(bytes32 newVersion);

    function setVersion(string repository, bytes32 newVersion, string releaseNotes) auth {
        app_version = newVersion;
        release_notes = releaseNotes;
        app_repository = repository;
        UpdateVersion(app_version);
    }

    function getAppState() constant returns(bytes32, string, string) {
        return (app_version, app_repository, release_notes);
    }
}
