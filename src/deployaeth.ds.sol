pragma solidity ^0.4.4;
import "dapple/script.sol";
import "./registrystore.sol";
import "./registrycontroller.sol";
import "./tags.sol";
import "./entry.sol";
import "./feed.sol";
import "./comments.sol";
import "./faucet.sol";
import "./funds.sol";
import "./votes.sol";

contract DeployAeth is Script {

  function DeployAeth () {
      RegistryStore registryStore = new RegistryStore();
      RegistryController registryController = new RegistryController();
      Tags tags = new Tags();
      Entry entries = new Entry();
      Feed feeds = new Feed();
      Comments comments = new Comments();
      Faucet faucet = new Faucet();
      Funds funds = new Funds();
      Votes votes = new Votes();
      registryController.setStore(registryStore);
      registryStore.setOwner(registryController);
      tags.setRegistry(registryController);
      entries.setTagsSource(tags);
      entries.setRegistry(registryController);
      feeds.setTagSource(tags);
      feeds.setRegistry(registryController);
      comments.setEntryAddress(entries);
      comments.setRegistry(registryController);
      faucet.setRegistry(registryController);
      votes.setRegistry(registryController);
      votes.setFundsAddress(funds);
      votes.setEntriesAddress(entries);
      votes.setFaucetAddress(faucet);
      exportObject("registryStore", registryStore);
      exportObject("registryController", registryController);
      exportObject("tags", tags);
      exportObject("entries", entries);
      exportObject("feeds", feeds);
      exportObject("comments", comments);
      exportObject("faucet", faucet);
      exportObject("funds", funds);
      exportObject("votes", votes);
  }
}