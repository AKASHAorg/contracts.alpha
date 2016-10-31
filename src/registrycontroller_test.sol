pragma solidity ^0.4.3;

import 'dapple/test.sol';
import 'registrycontroller.sol';
import 'registrystore.sol';

contract RegistryControllerTest is Test {
    RegistryController controller;
    Tester proxy_tester;
    RegistryStore store;
    function setUp() {
        controller = new RegistryController();
        store = new RegistryStore();
        store.setOwner(address(controller));
        proxy_tester = new Tester();
        proxy_tester._target(controller);
    }

    function testOwner() {
       assertEq( address(this), controller.owner() );
    }

    function testIdAlphaNum(){
        var x = controller.check_format(bytes32("abcd"));
        assertTrue(x, 'illegal x characters');
        var xx = controller.check_format(bytes32("abcd123"));
        assertTrue(xx, 'illegal xx characters');
    }

    function testIdSpecialChar1(){
        var x = controller.check_format(bytes32("abc_123"));
        assertTrue(x, 'illegal characters');
        var xx = controller.check_format(bytes32("abc.123"));
        assertTrue(xx, 'illegal xx characters');
        var y = controller.check_format(bytes32("abcefghijkl_nopqrstuvxyz12345.78"));
        assertTrue(y, 'illegal y characters');
    }

    function testIdLength(){
        var x = controller.check_format(bytes32("abc"));
        assertFalse(x, 'bypassed min length');
    }

    function testIdCase(){
        var x = controller.check_format(bytes32("aZcc"));
        assertFalse(x, 'bypassed lower case');
    }
    function testRegisterEvent() logs_gas{
        controller.setStore(store);
        var profile = controller.register(bytes32('bobo'), [bytes32('0x1'), bytes32('0x2')]);
        log_address(profile);
    }

    function testFailRegisterDuplicate() {
        controller.register(bytes32('bubu1'), [bytes32('0x3'), bytes32('0x4')]);
        controller.register(bytes32('bubu1'), [bytes32('0x5'), bytes32('0x6')]);
    }

    function testFailRegisterFormat(){
         controller.register(bytes32('Bubu2'), [bytes32('0x3'), bytes32('0x4')]);
         controller.register(bytes32('buBu2'), [bytes32('0x5'), bytes32('0x6')]);
    }

    function testUnregister() {
        controller.setStore(store);
        controller.register(bytes32('bubu3'), [bytes32('0x3'), bytes32('0x4')]);
        var done = controller.unregister(bytes32('bubu3'));
        assertTrue(done);
    }
}

