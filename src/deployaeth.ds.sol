pragma solidity ^0.4.6;
import "dapple/script.sol";
//import "./registrystore.sol";
//import './registrycontroller.sol';
//import './tags.sol';
//import './feed.sol';
//import './faucet.sol';
//import './funds.sol';
//import './entry.sol';
//import './comments.sol';
//import './votes.sol';
import './dumb.sol';

contract DeployAeth is Script {

  function DeployAeth () {
        C cc = new C();
        exportObject('cc', cc);
//      RegistryStore registrystore = new RegistryStore();
//      RegistryController registrycontroller = new RegistryController();
//      Tags tags = new Tags();
//      Feed feed = new Feed();
//      Faucet faucet = new Faucet();
//      Funds funds = new Funds();
//      Entry entries = new Entry();
//      Comments comments = new Comments();
//      Votes votes = new Votes();
//
//      exportObject("registrystore", registrystore);
//      exportObject("registrycontroller", registrycontroller);
//      exportObject("tags", tags);
//      exportObject("feed", feed);
//      exportObject("faucet", faucet);
//      exportObject("funds", funds);
//      exportObject("entries", entries);
//      exportObject("comments", comments);
//      exportObject("votes", votes);
  }
}