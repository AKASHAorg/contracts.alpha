pragma solidity ^0.4.8;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/RegistryController.sol";

contract TestRegistryController {
    RegistryController registryController = RegistryController(DeployedAddresses.RegistryController());

    function testIdValidation() {
        bytes32 tesUser1 = bytes32("test.user1");
        Assert.isTrue(registryController.check_format(tesUser1), "It should contain only [a-z] and .");

        bytes32 testUser2 = bytes32("test.user!");
        Assert.isFalse(registryController.check_format(testUser2), "It should not contain special characters.");
    }

    function testRegister(){
        bytes32 testUser = bytes32("test.user");
        bytes32[2] memory ipfsHash = [bytes32("QmVrGUNU7QphE3op8M6EnZ"), bytes32("BdA41CziV37wVwgYcVHu3ukm")];
        Assert.isNotZero(registryController.register(testUser, ipfsHash), "It should register new user.");
    }
}